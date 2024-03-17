<script setup>
import { ref } from 'vue'
import {
  getAssetsListService,
  deleteAssetsService,
  filterAssetsService
} from '@/api/assets'
import { Edit, Delete } from '@element-plus/icons-vue'
// eslint-disable-next-line no-unused-vars
import AssetsEdit from './components/AssetsEdit.vue'
import { ElMessage } from 'element-plus'
// 资产列表
const assetsList = ref([])

// 状态和资产类型的筛选器选项
const stateFilter = ref('')
const assetTypeFilter = ref('')

const state_options = [
  {
    value: '',
    label: '全部'
  },
  {
    value: 'in_use',
    label: '使用中'
  },
  {
    value: 'maintenance',
    label: '维护中'
  },
  {
    value: 'disposed',
    label: '处置中'
  }
]
const asset_type_options = [
  // 已存在的类型
  { value: '', label: '全部' },
  { value: 'computer', label: '计算机' },
  { value: 'furniture', label: '家具' },
  { value: 'equipment', label: '设备' },
  { value: 'physical_education', label: '体育设备' },
  { value: 'electronics', label: '电子设备' },
  { value: 'books_and_materials', label: '图书资料' },
  { value: 'office_equipment', label: '办公设备' },
  { value: 'art_and_decorations', label: '艺术品和装饰' },
  { value: 'vehicles', label: '交通工具' },
  { value: 'research_equipment', label: '科研设备' },
  { value: 'security_equipment', label: '安全设备' },
  { value: 'it_infrastructure', label: 'IT基础设施' },
  { value: 'laboratory_equipment', label: '实验室设备' },
  { value: 'musical_instruments', label: '乐器' },
  { value: 'audio_visual_equipment', label: '音视频设备' },
  { value: 'library_collections', label: '图书馆藏书' },
  { value: 'teaching_aids', label: '教学辅助材料' },
  { value: 'computer_lab_equipment', label: '计算机实验室设备' },
  { value: 'medical_equipment', label: '医疗设备' },
  { value: 'campus_infrastructure', label: '校园基础设施' },
  { value: 'land_and_buildings', label: '土地和建筑物' },
  { value: 'horticultural_assets', label: '园艺资产' },
  { value: 'canteen_equipment', label: '食堂设备' },
  { value: 'dormitory_furnishings', label: '宿舍家具' },
  { value: 'workshop_machinery', label: '车间机械' },
  { value: 'sporting_facilities', label: '体育设施' },
  { value: 'sanitation_facilities', label: '卫生设施' },
  { value: 'energy_and_utilities', label: '能源及公用设施' }
]

// 加载状态
const loading = ref(false)

const assetsEdit = ref()

// 获取资产列表
const getAssetsList = async () => {
  loading.value = true
  // 假设是客户端过滤，若是从后端获取需根据实际情况调整
  const rest = await getAssetsListService()
  const filteredData = rest.data.filter((item) => {
    return (
      (stateFilter.value ? item.state === stateFilter.value : true) &&
      (assetTypeFilter.value ? item.asset_type === assetTypeFilter.value : true)
    )
  })
  assetsList.value = filteredData
  loading.value = false
}
getAssetsList()

// 编辑资产
const onEditAssets = (row) => {
  assetsEdit.value.open(row)
}
// 删除资产
const onDeleteAssets = async (row) => {
  await deleteAssetsService(row.id)
  ElMessage.success('删除成功')
  getAssetsList()
}

// 新建资产
const onAddAssets = () => {
  assetsEdit.value.open({})
}
const onSuccess = () => {
  getAssetsList()
}

//筛选
const FilterFunc = async () => {
  const rest = await filterAssetsService(
    stateFilter.value,
    assetTypeFilter.value
  )
  ElMessage.success('筛选成功')
  assetsList.value = rest.data
}
</script>
<template>
  <page-container title="资产信息">
    <el-button type="primary" @click="onAddAssets">新建资产</el-button>
    <template #extra>
      <el-form inline>
        <el-form-item label="状态">
          <el-select
            v-model="stateFilter"
            placeholder="请选择状态"
            clearable
            style="width: 200px"
          >
            <el-option
              v-for="item in state_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产类型">
          <el-select
            v-model="assetTypeFilter"
            placeholder="请选择资产类型"
            clearable
            style="width: 200px"
          >
            <el-option
              v-for="item in asset_type_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="FilterFunc">筛选</el-button>
      </el-form>
    </template>
    <el-table v-loading="loading" style="width: 100%" :data="assetsList">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="name" label="资产名称"></el-table-column>
      <el-table-column prop="asset_type" label="资产类型"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="purchase_date" label="购买日期"></el-table-column>
      <el-table-column prop="cost" label="成本"></el-table-column>
      <el-table-column
        prop="supplier_info"
        label="供应商信息"
      ></el-table-column>
      <el-table-column prop="location" label="存放位置"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            type="primary"
            circle
            palin
            @click="onEditAssets(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            type="danger"
            circle
            plain
            @click="onDeleteAssets(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <assets-edit ref="assetsEdit" @success="onSuccess"></assets-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>

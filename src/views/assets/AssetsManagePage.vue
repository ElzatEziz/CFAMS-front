<script setup>
import { ref } from 'vue'
import { getAssetsListService, deleteAssetsService } from '@/api/assets'
import { Edit, Delete } from '@element-plus/icons-vue'
// eslint-disable-next-line no-unused-vars
import AssetsEdit from './components/AssetsEdit.vue'
// 资产列表
const assetsList = ref([])

// 加载状态
const loading = ref(false)

const assetsEdit = ref()

// 获取资产列表
const getAssetsList = async () => {
  loading.value = true
  // 获取资产列表
  const rest = await getAssetsListService()
  console.log(rest)
  assetsList.value = rest.data
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
</script>
<template>
  <page-container title="资产信息">
    <template #extra>
      <el-button type="primary" @click="onAddAssets">新建资产</el-button>
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

<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import {
  deleteDisposalsService,
  getDisposalsListService
} from '@/api/disposals'

// eslint-disable-next-line no-unused-vars
import DisposalsEdit from './components/DisposalsEdit.vue'
import { ElMessage } from 'element-plus'

// 处置列表
const disposalsList = ref([])

// 加载状态
const loading = ref(false)

//获取资产列表
const getDisposalsList = async () => {
  loading.value = true
  try {
    const rest = await getDisposalsListService()
    disposalsList.value = rest.data
  } catch (error) {
    ElMessage.error('获取处置列表失败')
  } finally {
    loading.value = false
  }
}
getDisposalsList()

const disposalsEdit = ref()

// 编辑资产
const onEditAssets = (row) => {
  disposalsEdit.value.open(row)
}
// 删除资产
const onDeleteAssets = async (row) => {
  await deleteDisposalsService(row.id)
  ElMessage.success('删除成功')
}
// 新建资产
const onAddAssets = () => {
  disposalsEdit.value.open({})
}
const onSuccess = () => {
  getDisposalsList()
}
</script>
<template>
  <page-container title="资产处置">
    <template #extra>
      <el-button type="primary" @click="onAddAssets">新建处置</el-button>
    </template>
    <el-table v-loading="loading" style="width: 100%" :data="disposalsList">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="asset_name" label="资产名称"></el-table-column>
      <el-table-column prop="disposal_date" label="处置日期"></el-table-column>
      <el-table-column
        prop="disposal_method"
        label="处置方式"
      ></el-table-column>
      <el-table-column prop="recipient" label="接收方"></el-table-column>
      <el-table-column
        prop="cost_or_revenue"
        label="相关成本和收入"
      ></el-table-column>
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
            palin
            @click="onDeleteAssets(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <disposals-edit ref="disposalsEdit" @success="onSuccess"></disposals-edit>
  </page-container>
</template>

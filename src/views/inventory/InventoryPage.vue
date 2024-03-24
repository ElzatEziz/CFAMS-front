<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import {
  getInventoryListService,
  deleteInventoryService
} from '@/api/inventory'

// eslint-disable-next-line no-unused-vars
import InventoryEdit from './components/InventoryEdit.vue'
import { ElMessage } from 'element-plus'

// 盘点列表
const inventoryList = ref([])
// 加载状态
const loading = ref(false)
// 获取盘点

const getInventoryList = async () => {
  loading.value = true
  try {
    const rest = await getInventoryListService()
    inventoryList.value = rest.data
  } catch (error) {
    ElMessage.error('获取盘点列表失败')
  } finally {
    loading.value = false
  }
}
getInventoryList()

const inventoryEdit = ref()
// 编辑盘点列表
const onEditInventory = (row) => {
  inventoryEdit.value.open(row)
}
// 删除盘点
const onDeleteInventory = async (row) => {
  await deleteInventoryService(row.id)
  ElMessage.success('删除成功')
}
// 新建盘点
const onAddInventory = () => {
  inventoryEdit.value.open({})
}

const onSuccess = () => {
  getInventoryList()
}
</script>
<template>
  <page-container title="资产盘点">
    <el-button type="primary" @click="onAddInventory">新建盘点</el-button>
    <el-table v-loading="loading" style="width: 100%" :data="inventoryList">
      <el-table-column type="index" lable="序号" width="100"></el-table-column>
      <el-table-column prop="asset_name" label="盘点名称"></el-table-column>
      <el-table-column
        prop="actual_location"
        label="盘点地点"
      ></el-table-column>
      <el-table-column
        prop="inventory_personnel"
        label="盘点人员"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            type="primary"
            circle
            palin
            @click="onEditInventory(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            type="danger"
            circle
            palin
            @click="onDeleteInventory(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <inventory-edit ref="inventoryEdit" @success="onSuccess"></inventory-edit>
  </page-container>
</template>
<style></style>

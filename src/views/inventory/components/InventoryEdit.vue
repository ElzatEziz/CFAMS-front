<script setup>
import { ref } from 'vue'
import { getAssetsListService } from '@/api/assets'
import { addInventoryService, updateInventoryService } from '@/api/inventory'
const dialogVisible = ref(false)
// 表单数据
const formModel = ref({
  id: '',
  asset: '',
  asset_name: '',
  inventory_date: '',
  actual_location: '',
  status: '',
  inventory_personnel: ''
})

// 资产列表
const assetsList = ref([])
// 获取资产列表
const getAssetsList = async () => {
  const rest = await getAssetsListService()
  assetsList.value = rest.data
}
getAssetsList()

// 表单验证规则
const rules = {
  asset: [{ required: true, message: '请选择资产', trigger: 'change' }],
  inventory_date: [
    { required: true, message: '请选择盘点日期', trigger: 'change' }
  ],
  actual_location: [
    { required: true, message: '请输入盘点位置', trigger: 'blur' }
  ],
  status: [{ required: true, message: '请选择盘点状态', trigger: 'change' }],
  inventory_personnel: [
    { required: true, message: '请输入盘点人员', trigger: 'blur' }
  ]
}

// 将状态转换为值
const convertLabelToValue = (label, options) => {
  const option = options.find((option) => option.label === label)
  return option ? option.value : null
}

const open = (row) => {
  dialogVisible.value = true
  formModel.value = {
    ...row,
    status: convertLabelToValue(row.status, status_options)
  }
}
const status_options = [
  {
    value: 'Good',
    label: '良好'
  },
  {
    value: 'Damaged',
    label: '损坏'
  },
  {
    value: 'Missing',
    label: '丢失'
  },
  {
    value: 'Needs Repair',
    label: '待报修'
  },
  {
    value: 'Scrapped',
    label: '报废'
  },
  {
    value: 'In Stock',
    label: '在库'
  },
  {
    value: 'Faulty',
    label: '故障'
  },
  {
    value: 'Normal',
    label: '正常'
  }
]

const formRef = ref(null)
const emit = defineEmits(['success'])

const onSubmit = async () => {
  await formRef.value.validate()
  console.log(formModel.value)
  const isEdit = formModel.value.id
  if (isEdit) {
    // 编辑
    await updateInventoryService(isEdit, formModel.value)
    ElMessage.success('编辑成功')
  } else {
    // 新建
    await addInventoryService(formModel.value)
    ElMessage.success('新建成功')
  }
  dialogVisible.value = false
  getAssetsList()
  emit('success')
}
defineExpose({
  open
})
</script>
<template>
  <el-dialog v-model="dialogVisible" title="添加弹层" width="30%">
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="资产" prop="asset_name" placeholder="请选择资产">
        <el-select
          v-model="formModel.asset"
          class="m-2"
          placeholder="请选择资产"
          style="width: 240px"
        >
          <el-option
            v-for="item in assetsList"
            :key="item.name"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        lable="盘点日期"
        prop="inventory_date"
        placeholder="请选择盘点日期"
      >
        <el-date-picker
          v-model="formModel.inventory_date"
          type="date"
          placeholder="请选择盘点日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        label="盘点位置"
        prop="actual_localtion"
        placeholder="请选择盘点位置"
      >
        <el-input v-model="formModel.actual_location"></el-input>
      </el-form-item>
      <el-form-item label="盘点状态" prop="status">
        <el-select
          v-model="formModel.status"
          class="m-2"
          placeholder="请选择盘点状态"
          style="width: 240px"
        >
          <el-option
            v-for="item in status_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="盘点人员"
        prop="inventory_personnel"
        placeholder="请输入盘点人员"
      >
        <el-input v-model="formModel.inventory_personnel"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

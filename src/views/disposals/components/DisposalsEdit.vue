<script setup>
import { ref } from 'vue'
import { addDisposalsService, updateDisposalsService } from '@/api/disposals'
const dialogVisible = ref(false)
const formModel = ref({
  id: '',
  asset: '',
  asset_name: '',
  disposal_date: '',
  disposal_method: '',
  recipient: '',
  cost_or_revenue: ''
})

const convertLabelToValue = (label, options) => {
  const option = options.find((option) => option.label === label)
  return option ? option.value : null
}

const open = (row) => {
  dialogVisible.value = true
  formModel.value = {
    ...row,
    disposal_method: convertLabelToValue(
      row.disposal_method,
      disposal_method_options
    )
  }
}
const disposal_method_options = [
  {
    value: 'sale',
    label: '销售'
  },
  {
    value: 'donation',
    label: '捐赠'
  },
  {
    value: 'scrap',
    label: '报废'
  }
]
const rules = {
  asset: [{ required: true, message: '请选择资产', trigger: 'change' }],
  disposal_date: [
    { required: true, message: '请选择处置日期', trigger: 'change' }
  ],
  disposal_method: [
    { required: true, message: '请选择处置方式', trigger: 'change' }
  ],
  recipient: [{ required: true, message: '请输入接收方', trigger: 'blur' }],
  cost_or_revenue: [
    { required: true, message: '请输入成本或收益', trigger: 'blur' }
  ]
}
const formRef = ref(null)
const emit = defineEmits(['success'])

const onSubmit = async () => {
  await formRef.value.validate()
  console.log(formModel.value)
  const isEdit = formModel.value.id
  if (isEdit) {
    // 编辑
    await updateDisposalsService(isEdit, formModel.value)
    ElMessage.success('编辑成功')
  } else {
    // 新建
    await addDisposalsService(formModel.value)
    ElMessage.success('新建成功')
  }
  dialogVisible.value = false
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
      <el-form-item
        label="资产名称"
        prop="asset_name"
        placeholder="请输入资产名称"
      >
        <el-input v-model="formModel.asset_name"></el-input>
      </el-form-item>
      <el-form-item
        label="处置日期"
        prop="disposal_date"
        placeholder="请选择处置日期"
      >
        <el-date-picker
          v-model="formModel.disposal_date"
          type="date"
          placeholder="选择处置日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item
        label="处置方式"
        prop="disposal_method"
        placeholder="请选择处置方式"
      >
        <el-select
          v-model="formModel.disposal_date"
          class="m-2"
          placeholder="请选择处置方式"
          style="width: 240px"
        >
          <el-option
            v-for="item in disposal_method_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="接收方" prop="recipient" placeholder="请输入接收方">
        <el-input v-model="formModel.recipient"></el-input>
      </el-form-item>
      <el-form-item
        label="相关成本或收入"
        prop="cost"
        placeholder="请输入相关成本或收入"
      >
        <el-input v-model="formModel.cost_or_revenue"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { addAssetsService, updateAssetsService } from '@/api/assets'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)

const formModel = ref({
  id: '',
  name: '',
  asset_type: '',
  state: '',
  purchase_date: '',
  cost: '',
  supplier_info: '',
  location: ''
})
const convertLabelToValue = (label, options) => {
  const option = options.find((option) => option.label === label)
  return option ? option.value : null
}

const open = (row) => {
  dialogVisible.value = true
  // 假设 row 中的 asset_type 和 state 是 label，需要转换
  formModel.value = {
    ...row,
    asset_type: convertLabelToValue(row.asset_type, asset_type_options),
    state: convertLabelToValue(row.state, state_options)
  }
}
const state_options = [
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

const rules = {
  name: [{ required: true, message: '请输入资产名称', trigger: 'blur' }],
  asset_type: [{ required: true, message: '请输入资产类型', trigger: 'blur' }],
  state: [{ required: true, message: '请选择资产状态', trigger: 'blur' }],
  purchase_date: [
    { required: true, message: '请输入购买日期', trigger: 'blur' }
  ],
  cost: [{ required: true, message: '请输入购买成本', trigger: 'blur' }],
  supplier_info: [
    { required: true, message: '请输入供应商信息', trigger: 'blur' }
  ],
  location: [{ required: true, message: '请输入存放位置', trigger: 'blur' }]
}
const formRef = ref()
const emit = defineEmits(['success'])

const onSubmit = async () => {
  await formRef.value.validate()
  console.log(formModel.value)
  const isEdit = formModel.value.id
  if (isEdit) {
    // 编辑
    await updateAssetsService(isEdit, formModel.value)
    ElMessage.success('编辑成功')
  } else {
    // 新建
    await addAssetsService(formModel.value)
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
      <el-form-item label="资产名称" prop="name" placeholder="请输入资产名称">
        <el-input v-model="formModel.name"></el-input>
      </el-form-item>
      <el-form-item label="资产类型" prop="state" placeholder="请选择资产类型">
        <el-select
          v-model="formModel.asset_type"
          class="m-2"
          placeholder="请选择资产类型"
          style="width: 240px"
        >
          <el-option
            v-for="item in asset_type_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="state" placeholder="请选择资产状态">
        <el-select
          v-model="formModel.state"
          class="m-2"
          placeholder="请选择资产状态"
          style="width: 240px"
        >
          <el-option
            v-for="item in state_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="购买日期"
        prop="purchase_date"
        placeholder="请输入购买日期"
      >
        <el-date-picker
          v-model="formModel.purchase_date"
          type="date"
          placeholder="选择购买日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="成本" prop="cost" placeholder="请输入购买成本">
        <el-input v-model="formModel.cost"></el-input>
      </el-form-item>
      <el-form-item
        label="供应商信息"
        prop="supplier_info"
        placeholder="请输入供应商信息"
      >
        <el-input v-model="formModel.supplier_info"></el-input>
      </el-form-item>
      <el-form-item
        label="存放位置"
        prop="location"
        placeholder="请输入存放位置"
      >
        <el-input v-model="formModel.location"></el-input>
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

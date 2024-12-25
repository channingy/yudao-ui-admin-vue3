<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="职务编码" prop="code">
        <el-input v-model="formData.code" placeholder="请输入职务编码" />
      </el-form-item>
      <el-form-item label="职务名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入职务名称" />
      </el-form-item>
      <el-form-item label="职务英文名称" prop="englishName">
        <el-input v-model="formData.englishName" placeholder="请输入职务英文名称" />
      </el-form-item>
      <el-form-item label="默认职级" prop="defaultLevel">
        <el-input v-model="formData.defaultLevel" placeholder="请输入默认职级" />
      </el-form-item>
      <el-form-item label="状态（0正常 1停用）" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio
            v-for="dict in getIntDictOptions(DICT_TYPE.COMMON_STATUS)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import { PositionApi, PositionVO } from '@/api/hcm/position'

/** 职务信息 表单 */
defineOptions({ name: 'PositionForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  code: undefined,
  name: undefined,
  englishName: undefined,
  defaultLevel: undefined,
  status: undefined
})
const formRules = reactive({
  code: [{ required: true, message: '职务编码不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '职务名称不能为空', trigger: 'blur' }],
  englishName: [{ required: true, message: '职务英文名称不能为空', trigger: 'blur' }],
  defaultLevel: [{ required: true, message: '默认职级不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态（0正常 1停用）不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await PositionApi.getPosition(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as PositionVO
    if (formType.value === 'create') {
      await PositionApi.createPosition(data)
      message.success(t('common.createSuccess'))
    } else {
      await PositionApi.updatePosition(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    code: undefined,
    name: undefined,
    englishName: undefined,
    defaultLevel: undefined,
    status: undefined
  }
  formRef.value?.resetFields()
}
</script>
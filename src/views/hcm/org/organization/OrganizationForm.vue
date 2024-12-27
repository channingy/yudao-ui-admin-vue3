<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="组织编码" prop="code">
        <el-input v-model="formData.code" placeholder="请输入组织编码" />
      </el-form-item>
      <el-form-item label="组织简称" prop="shortName">
        <el-input v-model="formData.shortName" placeholder="请输入组织简称" />
      </el-form-item>
      <el-form-item label="组织全称" prop="fullName">
        <el-input v-model="formData.fullName" placeholder="请输入组织全称" />
      </el-form-item>
      <el-form-item label="组织英文名" prop="englishName">
        <el-input v-model="formData.englishName" placeholder="请输入组织英文名" />
      </el-form-item>
      <el-form-item label="组织层级" prop="level">
        <el-input v-model="formData.level" placeholder="请输入组织层级" />
      </el-form-item>
      <el-form-item label="组织类别" prop="category">
        <el-input v-model="formData.category" placeholder="请输入组织类别" />
      </el-form-item>
      <el-form-item label="生效日期" prop="estDate">
        <el-date-picker
          v-model="formData.estDate"
          type="date"
          value-format="x"
          placeholder="选择生效日期"
        />
      </el-form-item>
      <el-form-item label="失效日期" prop="expDate">
        <el-date-picker
          v-model="formData.expDate"
          type="date"
          value-format="x"
          placeholder="选择失效日期"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio value="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-input v-model="formData.leader" placeholder="请输入负责人" />
      </el-form-item>
      <el-form-item label="负责人工号" prop="leaderEmpNo">
        <el-input v-model="formData.leaderEmpNo" placeholder="请输入负责人工号" />
      </el-form-item>
      <el-form-item label="父级编号" prop="parentId">
        <el-tree-select
          v-model="formData.parentId"
          :data="organizationTree"
          :props="{ ...defaultProps, label: 'shortName' }"
          check-strictly
          default-expand-all
          placeholder="请选择父级编号"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { OrganizationApi, OrganizationVO } from '@/api/hcm/organization'
import { defaultProps, handleTree } from '@/utils/tree'

/** 组织 表单 */
defineOptions({ name: 'OrganizationForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  code: undefined,
  shortName: undefined,
  fullName: undefined,
  englishName: undefined,
  level: undefined,
  category: undefined,
  estDate: undefined,
  expDate: undefined,
  status: undefined,
  leader: undefined,
  leaderEmpNo: undefined,
  parentId: undefined
})
const formRules = reactive({
  code: [{ required: true, message: '组织编码不能为空', trigger: 'blur' }],
  shortName: [{ required: true, message: '组织简称不能为空', trigger: 'blur' }],
  fullName: [{ required: true, message: '组织全称不能为空', trigger: 'blur' }],
  englishName: [{ required: true, message: '组织英文名不能为空', trigger: 'blur' }],
  level: [{ required: true, message: '组织层级不能为空', trigger: 'blur' }],
  category: [{ required: true, message: '组织类别不能为空', trigger: 'blur' }],
  estDate: [{ required: true, message: '生效日期不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'blur' }],
  leader: [{ required: true, message: '负责人不能为空', trigger: 'blur' }],
  leaderEmpNo: [{ required: true, message: '负责人工号不能为空', trigger: 'blur' }],
  parentId: [{ required: true, message: '父级编号不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref
const organizationTree = ref() // 树形结构

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
      formData.value = await OrganizationApi.getOrganization(id)
    } finally {
      formLoading.value = false
    }
  }
  await getOrganizationTree()
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
    const data = formData.value as unknown as OrganizationVO
    if (formType.value === 'create') {
      await OrganizationApi.createOrganization(data)
      message.success(t('common.createSuccess'))
    } else {
      await OrganizationApi.updateOrganization(data)
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
    shortName: undefined,
    fullName: undefined,
    englishName: undefined,
    level: undefined,
    category: undefined,
    estDate: undefined,
    expDate: undefined,
    status: undefined,
    leader: undefined,
    leaderEmpNo: undefined,
    parentId: undefined
  }
  formRef.value?.resetFields()
}

/** 获得组织树 */
const getOrganizationTree = async () => {
  organizationTree.value = []
  const data = await OrganizationApi.getOrganizationList()
  const root: Tree = { id: 0, name: '顶级组织', children: [] }
  root.children = handleTree(data, 'id', 'parentId')
  organizationTree.value.push(root)
}
</script>

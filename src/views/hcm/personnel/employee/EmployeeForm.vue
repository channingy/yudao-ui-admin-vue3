<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="工号" prop="empNo">
        <el-input v-model="formData.empNo" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="员工姓名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入员工姓名" />
      </el-form-item>
      <el-form-item label="姓名拼音" prop="namePinyin">
        <el-input v-model="formData.namePinyin" placeholder="请输入姓名拼音" />
      </el-form-item>
      <el-form-item label="英文名" prop="englishName">
        <el-input v-model="formData.englishName" placeholder="请输入英文名" />
      </el-form-item>
      <el-form-item label="入职日期" prop="entryDate">
        <el-date-picker
          v-model="formData.entryDate"
          type="date"
          value-format="x"
          placeholder="选择入职日期"
        />
      </el-form-item>
      <el-form-item label="离职日期" prop="leaveDate">
        <el-date-picker
          v-model="formData.leaveDate"
          type="date"
          value-format="x"
          placeholder="选择离职日期"
        />
      </el-form-item>
      <el-form-item label="公司" prop="company">
        <el-input v-model="formData.company" placeholder="请输入公司" />
      </el-form-item>
      <el-form-item label="末级组织" prop="orgUnit">
        <el-input v-model="formData.orgUnit" placeholder="请输入末级组织" />
      </el-form-item>
      <el-form-item label="组织层级" prop="orgLevel">
        <el-select v-model="formData.orgLevel" placeholder="请选择组织层级">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.HCM_ORG_LEVEL)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职位" prop="job">
        <el-input v-model="formData.job" placeholder="请输入职位" />
      </el-form-item>
      <el-form-item label="职务" prop="position">
        <el-select v-model="formData.position" placeholder="请选择职务">
          <el-option
            v-for="item in positionList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职级" prop="rank">
        <el-input v-model="formData.rank" placeholder="请输入职级" />
      </el-form-item>
      <el-form-item label="职等" prop="jobLevel">
        <el-input v-model="formData.jobLevel" placeholder="请输入职等" />
      </el-form-item>
      <el-form-item label="原工号" prop="oldEmpNo">
        <el-input v-model="formData.oldEmpNo" placeholder="请输入原工号" />
      </el-form-item>
      <el-form-item label="证件类型" prop="idType">
        <el-select v-model="formData.idType" placeholder="请选择证件类型">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.HCM_ID_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="idNumber">
        <el-input v-model="formData.idNumber" placeholder="请输入证件号码" />
      </el-form-item>
      <el-form-item label="出生日期" prop="birthDate">
        <el-date-picker
          v-model="formData.birthDate"
          type="date"
          value-format="x"
          placeholder="选择出生日期"
        />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="formData.age" placeholder="请输入年龄" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="formData.gender" placeholder="请选择性别">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.HCM_GENDER)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="国籍" prop="nationality">
        <el-select v-model="formData.nationality" placeholder="请选择国籍">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.HCM_NATIONALITY)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="民族" prop="ethnicGroup">
        <el-select v-model="formData.ethnicGroup" placeholder="请选择民族">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.HCM_ETHNIC_GROUP)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="编制情况" prop="staffStatus">
        <el-select v-model="formData.staffStatus" placeholder="请选择编制情况">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.HCM_STAFF_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="员工类别" prop="empType">
        <el-select v-model="formData.empType" placeholder="请选择员工类别">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.HCM_EMP_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年假制度" prop="annualLeaveType">
        <el-select v-model="formData.annualLeaveType" placeholder="请选择年假制度">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="工龄起算日" prop="workYearsStart">
        <el-input v-model="formData.workYearsStart" placeholder="请输入工龄起算日" />
      </el-form-item>
      <el-form-item label="工龄调整月" prop="workYearsAdjust">
        <el-input v-model="formData.workYearsAdjust" placeholder="请输入工龄调整月" />
      </el-form-item>
      <el-form-item label="工龄" prop="workYears">
        <el-input v-model="formData.workYears" placeholder="请输入工龄" />
      </el-form-item>
      <el-form-item label="司龄起算日" prop="companyYearsStart">
        <el-input v-model="formData.companyYearsStart" placeholder="请输入司龄起算日" />
      </el-form-item>
      <el-form-item label="司龄调整月" prop="companyYearsAdjust">
        <el-input v-model="formData.companyYearsAdjust" placeholder="请输入司龄调整月" />
      </el-form-item>
      <el-form-item label="司龄" prop="companyYears">
        <el-input v-model="formData.companyYears" placeholder="请输入司龄" />
      </el-form-item>
      <el-form-item label="户籍" prop="householdType">
        <el-select v-model="formData.householdType" placeholder="请选择户籍">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="户籍地址" prop="householdAddr">
        <el-input v-model="formData.householdAddr" placeholder="请输入户籍地址" />
      </el-form-item>
      <el-form-item label="移动电话" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入移动电话" />
      </el-form-item>
      <el-form-item label="个人邮箱" prop="personalEmail">
        <el-input v-model="formData.personalEmail" placeholder="请输入个人邮箱" />
      </el-form-item>
      <el-form-item label="公司邮箱" prop="workEmail">
        <el-input v-model="formData.workEmail" placeholder="请输入公司邮箱" />
      </el-form-item>
      <el-form-item label="居住城市" prop="residenceCity">
        <el-input v-model="formData.residenceCity" placeholder="请输入居住城市" />
      </el-form-item>
      <el-form-item label="居住地址" prop="residenceAddr">
        <el-input v-model="formData.residenceAddr" placeholder="请输入居住地址" />
      </el-form-item>
      <el-form-item label="居住邮编" prop="residencePostcode">
        <el-input v-model="formData.residencePostcode" placeholder="请输入居住邮编" />
      </el-form-item>
      <el-form-item label="预入职日期" prop="preEntryDate">
        <el-date-picker
          v-model="formData.preEntryDate"
          type="date"
          value-format="x"
          placeholder="选择预入职日期"
        />
      </el-form-item>
      <el-form-item label="员工状态" prop="status">
        <el-select v-model="formData.status" placeholder="请选择员工状态">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.HCM_EMP_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="直线汇报人" prop="directSupervisor">
        <el-input v-model="formData.directSupervisor" placeholder="请输入直线汇报人" />
      </el-form-item>
      <el-form-item label="虚线汇报人" prop="indirectSupervisor">
        <el-input v-model="formData.indirectSupervisor" placeholder="请输入虚线汇报人" />
      </el-form-item>
      <el-form-item label="任职类型" prop="jobNature">
        <el-input v-model="formData.jobNature" placeholder="请输入任职类型" />
      </el-form-item>
      <el-form-item label="是否试用期" prop="isProbation">
        <el-select v-model="formData.isProbation" placeholder="请选择是否试用期">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.INFRA_BOOLEAN_STRING)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否在黑名单" prop="isBlacklist">
        <el-select v-model="formData.isBlacklist" placeholder="请选择是否在黑名单">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.INFRA_BOOLEAN_STRING)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="首次入职日期" prop="firstEntryDate">
        <el-date-picker
          v-model="formData.firstEntryDate"
          type="date"
          value-format="x"
          placeholder="选择首次入职日期"
        />
      </el-form-item>
      <el-form-item label="就业证有效期" prop="workPermitExp">
        <el-input v-model="formData.workPermitExp" placeholder="请输入就业证有效期" />
      </el-form-item>
      <el-form-item label="居住证有效期" prop="residencePermitExp">
        <el-input v-model="formData.residencePermitExp" placeholder="请输入居住证有效期" />
      </el-form-item>
      <el-form-item label="签证过期日" prop="visaExp">
        <el-input v-model="formData.visaExp" placeholder="请输入签证过期日" />
      </el-form-item>
      <el-form-item label="招聘来源" prop="recruitSource">
        <el-input v-model="formData.recruitSource" placeholder="请输入招聘来源" />
      </el-form-item>
      <el-form-item label="内部推荐人" prop="referrer">
        <el-input v-model="formData.referrer" placeholder="请输入内部推荐人" />
      </el-form-item>
      <el-form-item label="推荐渠道" prop="referChannel">
        <el-input v-model="formData.referChannel" placeholder="请输入推荐渠道" />
      </el-form-item>
      <el-form-item label="是否兼职" prop="isPartTime">
        <el-radio-group v-model="formData.isPartTime">
          <el-radio value="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { DICT_TYPE, getIntDictOptions, getStrDictOptions } from '@/utils/dict'
import { EmployeeApi, EmployeeVO } from '@/api/hcm/employee'
import { PositionApi } from '@/api/hcm/position'

/** 员工 表单 */
defineOptions({ name: 'EmployeeForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  empNo: undefined,
  name: undefined,
  namePinyin: undefined,
  englishName: undefined,
  entryDate: undefined,
  leaveDate: undefined,
  company: undefined,
  orgUnit: undefined,
  orgLevel: undefined,
  job: undefined,
  position: undefined,
  rank: undefined,
  jobLevel: undefined,
  oldEmpNo: undefined,
  idType: undefined,
  idNumber: undefined,
  birthDate: undefined,
  age: undefined,
  gender: undefined,
  nationality: undefined,
  ethnicGroup: undefined,
  staffStatus: undefined,
  empType: undefined,
  annualLeaveType: undefined,
  workYearsStart: undefined,
  workYearsAdjust: undefined,
  workYears: undefined,
  companyYearsStart: undefined,
  companyYearsAdjust: undefined,
  companyYears: undefined,
  householdType: undefined,
  householdAddr: undefined,
  mobile: undefined,
  personalEmail: undefined,
  workEmail: undefined,
  residenceCity: undefined,
  residenceAddr: undefined,
  residencePostcode: undefined,
  preEntryDate: undefined,
  status: undefined,
  directSupervisor: undefined,
  indirectSupervisor: undefined,
  jobNature: undefined,
  isProbation: undefined,
  isBlacklist: undefined,
  firstEntryDate: undefined,
  workPermitExp: undefined,
  residencePermitExp: undefined,
  visaExp: undefined,
  recruitSource: undefined,
  referrer: undefined,
  referChannel: undefined,
  isPartTime: undefined,
  remark: undefined
})
const formRules = reactive({
  empNo: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '员工姓名不能为空', trigger: 'blur' }],
  entryDate: [{ required: true, message: '入职日期不能为空', trigger: 'blur' }],
  company: [{ required: true, message: '公司不能为空', trigger: 'blur' }],
  orgUnit: [{ required: true, message: '末级组织不能为空', trigger: 'blur' }],
  orgLevel: [{ required: true, message: '组织层级不能为空', trigger: 'blur' }],
  gender: [{ required: true, message: '性别不能为空', trigger: 'change' }],
  empType: [{ required: true, message: '员工类别不能为空', trigger: 'change' }],
  status: [{ required: true, message: '员工状态不能为空', trigger: 'blur' }],
  isProbation: [{ required: true, message: '是否试用期不能为空', trigger: 'blur' }],
  isBlacklist: [{ required: true, message: '是否在黑名单不能为空', trigger: 'blur' }],
  isPartTime: [{ required: true, message: '是否兼职不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 添加职务列表状态 */
const positionList = ref([]) // 职务列表

/** 获取职务列表 */
const getPositionList = async () => {
  const res = await PositionApi.getPositionSimpleList()
  positionList.value = res
}

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 获取职务列表
  await getPositionList()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await EmployeeApi.getEmployee(id)
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
    const data = formData.value as unknown as EmployeeVO
    if (formType.value === 'create') {
      await EmployeeApi.createEmployee(data)
      message.success(t('common.createSuccess'))
    } else {
      await EmployeeApi.updateEmployee(data)
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
    empNo: undefined,
    name: undefined,
    namePinyin: undefined,
    englishName: undefined,
    entryDate: undefined,
    leaveDate: undefined,
    company: undefined,
    orgUnit: undefined,
    orgLevel: undefined,
    job: undefined,
    position: undefined,
    rank: undefined,
    jobLevel: undefined,
    oldEmpNo: undefined,
    idType: undefined,
    idNumber: undefined,
    birthDate: undefined,
    age: undefined,
    gender: undefined,
    nationality: undefined,
    ethnicGroup: undefined,
    staffStatus: undefined,
    empType: undefined,
    annualLeaveType: undefined,
    workYearsStart: undefined,
    workYearsAdjust: undefined,
    workYears: undefined,
    companyYearsStart: undefined,
    companyYearsAdjust: undefined,
    companyYears: undefined,
    householdType: undefined,
    householdAddr: undefined,
    mobile: undefined,
    personalEmail: undefined,
    workEmail: undefined,
    residenceCity: undefined,
    residenceAddr: undefined,
    residencePostcode: undefined,
    preEntryDate: undefined,
    status: undefined,
    directSupervisor: undefined,
    indirectSupervisor: undefined,
    jobNature: undefined,
    isProbation: undefined,
    isBlacklist: undefined,
    firstEntryDate: undefined,
    workPermitExp: undefined,
    residencePermitExp: undefined,
    visaExp: undefined,
    recruitSource: undefined,
    referrer: undefined,
    referChannel: undefined,
    isPartTime: undefined,
    remark: undefined
  }
  formRef.value?.resetFields()
}
</script>

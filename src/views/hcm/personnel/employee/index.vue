<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="工号" prop="empNo">
        <el-input
          v-model="queryParams.empNo"
          placeholder="请输入工号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="员工姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入员工姓名"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="姓名拼音" prop="namePinyin">
        <el-input
          v-model="queryParams.namePinyin"
          placeholder="请输入姓名拼音"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="英文名" prop="englishName">
        <el-input
          v-model="queryParams.englishName"
          placeholder="请输入英文名"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>

      <el-form-item label="公司" prop="company">
        <el-input
          v-model="queryParams.company"
          placeholder="请输入公司"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="末级组织" prop="orgUnit">
        <el-input
          v-model="queryParams.orgUnit"
          placeholder="请输入末级组织"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>

      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['hcm:employee:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['hcm:employee:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="工号" align="center" prop="empNo" />
      <el-table-column label="员工姓名" align="center" prop="name" />
      <el-table-column label="姓名拼音" align="center" prop="namePinyin" />
      <el-table-column label="英文名" align="center" prop="englishName" />
      <el-table-column label="入职日期" align="center" prop="entryDate" />
      <el-table-column label="离职日期" align="center" prop="leaveDate" />
      <el-table-column label="公司" align="center" prop="company" />
      <el-table-column label="末级组织" align="center" prop="orgUnit" />
      <el-table-column label="组织层级" align="center" prop="orgLevel" />
      <el-table-column label="职位" align="center" prop="job" />
      <el-table-column label="职务" align="center" prop="position" />
      <el-table-column label="职级" align="center" prop="rank" />
      <el-table-column label="职等" align="center" prop="jobLevel" />
      <el-table-column label="原工号" align="center" prop="oldEmpNo" />
      <el-table-column label="证件类型" align="center" prop="idType" />
      <el-table-column label="证件号码" align="center" prop="idNumber" />
      <el-table-column label="出生日期" align="center" prop="birthDate" />
      <el-table-column label="年龄" align="center" prop="age" />
      <el-table-column label="性别" align="center" prop="gender" />
      <el-table-column label="国籍" align="center" prop="nationality" />
      <el-table-column label="民族" align="center" prop="ethnicGroup" />
      <el-table-column label="编制情况" align="center" prop="staffStatus" />
      <el-table-column label="员工类别" align="center" prop="empType" />
      <el-table-column label="年假制度" align="center" prop="annualLeaveType" />
      <el-table-column label="工龄起算日" align="center" prop="workYearsStart" />
      <el-table-column label="工龄调整月" align="center" prop="workYearsAdjust" />
      <el-table-column label="工龄" align="center" prop="workYears" />
      <el-table-column label="司龄起算日" align="center" prop="companyYearsStart" />
      <el-table-column label="司龄调整月" align="center" prop="companyYearsAdjust" />
      <el-table-column label="司龄" align="center" prop="companyYears" />
      <el-table-column label="户籍" align="center" prop="householdType" />
      <el-table-column label="户籍地址" align="center" prop="householdAddr" />
      <el-table-column label="移动电话" align="center" prop="mobile" />
      <el-table-column label="个人邮箱" align="center" prop="personalEmail" />
      <el-table-column label="公司邮箱" align="center" prop="workEmail" />
      <el-table-column label="居住城市" align="center" prop="residenceCity" />
      <el-table-column label="居住地址" align="center" prop="residenceAddr" />
      <el-table-column label="居住邮编" align="center" prop="residencePostcode" />
      <el-table-column label="预入职日期" align="center" prop="preEntryDate" />
      <el-table-column label="员工状态（0在职 1离职）" align="center" prop="status" />
      <el-table-column label="直线汇报人" align="center" prop="directSupervisor" />
      <el-table-column label="虚线汇报人" align="center" prop="indirectSupervisor" />
      <el-table-column label="任职类型" align="center" prop="jobNature" />
      <el-table-column label="是否试用期" align="center" prop="isProbation" />
      <el-table-column label="是否在黑名单" align="center" prop="isBlacklist" />
      <el-table-column label="首次入职日期" align="center" prop="firstEntryDate" />
      <el-table-column label="就业证有效期" align="center" prop="workPermitExp" />
      <el-table-column label="居住证有效期" align="center" prop="residencePermitExp" />
      <el-table-column label="签证过期日" align="center" prop="visaExp" />
      <el-table-column label="招聘来源" align="center" prop="recruitSource" />
      <el-table-column label="内部推荐人" align="center" prop="referrer" />
      <el-table-column label="推荐渠道" align="center" prop="referChannel" />
      <el-table-column label="是否兼职" align="center" prop="isPartTime" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="操作" align="center" min-width="120px">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['hcm:employee:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['hcm:employee:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <EmployeeForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { EmployeeApi, EmployeeVO } from '@/api/hcm/employee'
import EmployeeForm from './EmployeeForm.vue'

/** 员工 列表 */
defineOptions({ name: 'Employee' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<EmployeeVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  empNo: undefined,
  name: undefined,
  namePinyin: undefined,
  englishName: undefined,
  entryDate: [],
  leaveDate: [],
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
  birthDate: [],
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
  preEntryDate: [],
  status: undefined,
  directSupervisor: undefined,
  indirectSupervisor: undefined,
  jobNature: undefined,
  isProbation: undefined,
  isBlacklist: undefined,
  firstEntryDate: [],
  workPermitExp: undefined,
  residencePermitExp: undefined,
  visaExp: undefined,
  recruitSource: undefined,
  referrer: undefined,
  referChannel: undefined,
  isPartTime: [],
  remark: undefined,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await EmployeeApi.getEmployeePage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await EmployeeApi.deleteEmployee(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await EmployeeApi.exportEmployee(queryParams)
    download.excel(data, '员工.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>

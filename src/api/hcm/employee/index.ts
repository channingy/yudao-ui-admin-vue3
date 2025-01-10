import request from '@/config/axios'

// 员工 VO
export interface EmployeeVO {
  id: number // 编号
  empNo: string // 工号
  name: string // 员工姓名
  namePinyin: string // 姓名拼音
  englishName: string // 英文名
  entryDate: Date // 入职日期
  leaveDate: Date // 离职日期
  company: number // 公司
  orgUnit: number // 末级组织
  orgLevel: number // 组织层级
  job: number // 职位
  position: string // 职务
  rank: string // 职级
  jobLevel: string // 职等
  oldEmpNo: string // 原工号
  idType: string // 证件类型
  idNumber: string // 证件号码
  birthDate: Date // 出生日期
  age: number // 年龄
  gender: number // 性别
  nationality: string // 国籍
  ethnicGroup: string // 民族
  staffStatus: string // 编制情况
  empType: string // 员工类别
  annualLeaveType: string // 年假制度
  workYearsStart: Date // 工龄起算日
  workYearsAdjust: number // 工龄调整月
  workYears: number // 工龄
  companyYearsStart: Date // 司龄起算日
  companyYearsAdjust: number // 司龄调整月
  companyYears: number // 司龄
  householdType: string // 户籍
  householdAddr: string // 户籍地址
  mobile: string // 移动电话
  personalEmail: string // 个人邮箱
  workEmail: string // 公司邮箱
  residenceCity: string // 居住城市
  residenceAddr: string // 居住地址
  residencePostcode: string // 居住邮编
  preEntryDate: Date // 预入职日期
  status: number // 员工状态
  directSupervisor: string // 直线汇报人
  indirectSupervisor: string // 虚线汇报人
  jobNature: string // 任职类型
  isProbation: boolean // 是否试用期
  isBlacklist: boolean // 是否在黑名单
  firstEntryDate: Date // 首次入职日期
  workPermitExp: Date // 就业证有效期
  residencePermitExp: Date // 居住证有效期
  visaExp: Date // 签证过期日
  recruitSource: string // 招聘来源
  referrer: string // 内部推荐人
  referChannel: string // 推荐渠道
  isPartTime: boolean // 是否兼职
  remark: string // 备注
}

// 员工 API
export const EmployeeApi = {
  // 查询员工分页
  getEmployeePage: async (params: any) => {
    return await request.get({ url: `/hcm/employee/page`, params })
  },

  // 查询员工详情
  getEmployee: async (id: number) => {
    return await request.get({ url: `/hcm/employee/get?id=` + id })
  },

  // 新增员工
  createEmployee: async (data: EmployeeVO) => {
    return await request.post({ url: `/hcm/employee/create`, data })
  },

  // 修改员工
  updateEmployee: async (data: EmployeeVO) => {
    return await request.put({ url: `/hcm/employee/update`, data })
  },

  // 删除员工
  deleteEmployee: async (id: number) => {
    return await request.delete({ url: `/hcm/employee/delete?id=` + id })
  },

  // 导出员工 Excel
  exportEmployee: async (params) => {
    return await request.download({ url: `/hcm/employee/export-excel`, params })
  }
}
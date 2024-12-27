import request from '@/config/axios'

// 组织 VO
export interface OrganizationVO {
  id: number // 编号
  code: string // 组织编码
  shortName: string // 组织简称
  fullName: string // 组织全称
  englishName: string // 组织英文名
  level: number // 组织层级
  category: string // 组织类别（公司，部门）
  estDate: Date // 生效日期
  expDate: Date // 失效日期
  status: number // 状态（0正常 1停用）
  leader: string // 负责人
  leaderEmpNo: string // 负责人工号
  parentId: number // 父级编号
}

// 组织 API
export const OrganizationApi = {
  // 查询组织列表
  getOrganizationList: async (params) => {
    return await request.get({ url: `/hcm/organization/list`, params })
  },

  // 查询组织详情
  getOrganization: async (id: number) => {
    return await request.get({ url: `/hcm/organization/get?id=` + id })
  },

  // 新增组织
  createOrganization: async (data: OrganizationVO) => {
    return await request.post({ url: `/hcm/organization/create`, data })
  },

  // 修改组织
  updateOrganization: async (data: OrganizationVO) => {
    return await request.put({ url: `/hcm/organization/update`, data })
  },

  // 删除组织
  deleteOrganization: async (id: number) => {
    return await request.delete({ url: `/hcm/organization/delete?id=` + id })
  },

  // 导出组织 Excel
  exportOrganization: async (params) => {
    return await request.download({ url: `/hcm/organization/export-excel`, params })
  }
}
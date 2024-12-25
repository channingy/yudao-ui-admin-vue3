import request from '@/config/axios'

// 职务信息 VO
export interface PositionVO {
  id: number // 职务ID
  code: string // 职务编码
  name: string // 职务名称
  englishName: string // 职务英文名称
  defaultLevel: number // 默认职级
  status: number // 状态（0正常 1停用）
}

// 职务信息 API
export const PositionApi = {
  // 查询职务信息分页
  getPositionPage: async (params: any) => {
    return await request.get({ url: `/hcm/position/page`, params })
  },

  // 查询职务信息详情
  getPosition: async (id: number) => {
    return await request.get({ url: `/hcm/position/get?id=` + id })
  },

  // 新增职务信息
  createPosition: async (data: PositionVO) => {
    return await request.post({ url: `/hcm/position/create`, data })
  },

  // 修改职务信息
  updatePosition: async (data: PositionVO) => {
    return await request.put({ url: `/hcm/position/update`, data })
  },

  // 删除职务信息
  deletePosition: async (id: number) => {
    return await request.delete({ url: `/hcm/position/delete?id=` + id })
  },

  // 导出职务信息 Excel
  exportPosition: async (params) => {
    return await request.download({ url: `/hcm/position/export-excel`, params })
  }
}
const Mock = require('mockjs')
const { config } = require('./common')

const { apiPrefix } = config

// 业务分组数据 
let BusData = Mock.mock({
  'list|8-10': [
    {
      id: "@id",
      name: "@ctitle",
    }
  ]
})

// 负责人分组数据
let HeadData = Mock.mock({
  'list|5-8': [
    {
      id: "@id",
      name: "@cname",
    }
  ]
})

module.exports = {

  [`GET ${apiPrefix}/BusData`](req, res) {
    res.status(200).json(BusData)
  },

  [`GET ${apiPrefix}/HeadData`](req, res) {
    res.status(200).json(HeadData)
  },

}

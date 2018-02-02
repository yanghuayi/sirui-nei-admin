const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

let menuData = Mock.mock({
  'list|4-6': [
    {
      id: '@id',
      name: '@ctitle',
      'childern|1-6': [
        {
          id: '@id',
          name: '@ctitle',
        },
      ],
    },
  ],
})

const menu = menuData.list

const titles = [
  '思锐共享汽车平台',
  '思锐安装测试工具',
  '思锐运维管理系统',
  '思锐皮皮车平台',
  '思锐S4汽车管理平台',
  '思锐云警管理平台',
  'Vue',
  'Webpack',
]
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
]

const avatars2 = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
]

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
]
const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
]

const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
]

export function projectList (count) {
  const list = []
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - (1000 * 60 * 60 * 2 * i)),
      createdAt: new Date(new Date().getTime() - (1000 * 60 * 60 * 2 * i)),
      subDescription: desc[i % 5],
      description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeInterface: Math.ceil(Math.random() * 1000) + 100,
      newInterface: Math.ceil(Math.random() * 100) + 10,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
        },
      ],
    })
  }

  return list
}

const interfaceList = Mock.mock({
  'list|40-60': [
    {
      id: '@id',
      name: '@ctitle',
      'method|1': ['GET', 'POST', 'DELETE', 'PUT', 'HEAD', 'PATCH'],
      path: '@url',
      tips: function () {
        let List = ['暂定', '待测试', '延后开发', '待开发', '已测试']
        let num = parseInt(3 * Math.random(), 10)
        let data = []
        for (let i = 0; i < num; i++) {
          data.push(List[parseInt(5 * Math.random(), 10)])
        }
        return data
      },
      group: '@ctitle(3, 5)',
      'state|1': ['开发中', '未开始', '已完成'],
      principal: '@cname',
      'version|1': ['1.0.1', '2.0', '1.4', '3.2.3', '1.3.4', '2.3.1'],
      creator: '@cname',
      creatTime: '@datetime',
    },
  ],
})

const interfaceDetail = {
  title: '机构管理--查询列表',
  tips: ['tips'],
  group: '门户--系统管理',
  decs: '',
  state: '开发中',
  creator: '侯门霸王',
  principal: '侯门霸王',
  request: {
    url: '/sys/org/list',
    method: 'GET',
    header: [
      { name: '', value: '', decs: '' },
      { name: '', value: '', decs: '' }
    ],
    data: [
      { name: 'name', type: 'String', decs: '名称', isRequired: 1, defaultValue: '', rules: '' },
      { name: 'levelCode', type: 'String', decs: '机构的LevelCode', isRequired: 1, defaultValue: '', rules: '' },
    ],
    example: {
      name: 'dk3zHK27Is',
      levelCode: 'h5Nq0kJSrR',
    },
  },
  response: {
    header: [
      { name: '', value: '', decs: '' },
      { name: '', value: '', decs: '' }
    ],
    data: [
      { id: 1, name: 'total', type: 'Number', decs: '总数', isRequired: 1, defaultValue: '', rules: '' },
      {
        id: 2, name: 'result', type: 'Object', decs: '返回状态', isRequired: 1, defaultValue: '', rules: '',
        children: [
          { id: 21, name: 'resultCode', type: 'Number', decs: '返回状态码', isRequired: 1, defaultValue: '', rules: '', },
          { id: 22, name: 'resultMessage', type: 'String', decs: '返回状态信息', isRequired: 1, defaultValue: '', rules: '', },
        ]
      },
      { id: 3, name: 'sort', type: 'Number', decs: '排序', isRequired: 1, defaultValue: '', rules: '', },
      { id: 4, name: 'entity', type: 'Object', decs: '返回数据', isRequired: 1, defaultValue: '', rules: '',
        children: [
          { id: 41, name: 'lastPage', type: 'Boolean', decs: '是否为最后一页', isRequired: 1, defaultValue: false, rules: '', },
          { id: 42, name: 'pageSize', type: 'Number', decs: '每页数据长度', isRequired: 1, defaudefaultValuelt: 10, rules: '', },
          { id: 43, name: 'pageNumber', type: 'Number', decs: '当前页码', isRequired: 1, defaultValue: 1, rules: '', },
          { id: 44, name: 'firstPage', type: 'String', decs: '是否为第一页', isRequired: 1, defaultValue: true, rules: '', },
          { id: 45, name: 'list', type: 'Array', decs: '数据List', isRequired: 1, defaultValue: '2017-07-13 09:54:44', rules: '',
            children: [
              { id: 451, name: 'create_time', type: 'String', decs: '创建时间', isRequired: 1, defaultValue: '2017-07-13 09:54:44', rules: '', },
              { id: 452, name: 'creator', type: 'String', decs: '创建者', isRequired: 1, defaultValue: '', rules: '', },
              { id: 453, name: 'levelcode', type: 'String', decs: '机构的LevelCode', isRequired: 1, defaultValue: '', rules: '', },
              { id: 454, name: 'memo', type: 'String', decs: '备注', isRequired: 1, defaultValue: '', rules: '', },
              { id: 455, name: 'name', type: 'String', decs: '机构名称', isRequired: 1, defaultValue: '成都集团', rules: '', },
              { id: 456, name: 'orgid', type: 'Number', decs: '机构ID', isRequired: 1, defaultValue: '', rules: '', }
            ]
          },
          { id: 42, name: 'totalRow', type: 'Number', decs: '数据总数', isRequired: 1, defaultValue: 0, rules: '', },
          { id: 43, name: 'totalPage', type: 'Number', decs: '页面总数', isRequired: 1, defaultValue: 0, rules: '', },
        ]
      },
      { id: 5, name: 'sort', type: 'Number', decs: '排序', isRequired: 1, defaultValue: '', rules: '', },
      { id: 6, name: 'option', type: 'Variable', decs: '', isRequired: 1, defaultValue: '', rules: '', },
      { id: 7, name: 'rows', type: 'Array', decs: '排序', isRequired: 1, defaultValue: '', rules: '', },
    ]
  }
}

const dataModal = [{
  key: 1,
  name: 'John',
  type: 'number',
  desc: 'descrption',
  default: '',
  rule: '1 Lake Park',
}, {
  key: 2,
  name: 'Brown',
  type: 'number',
  desc: 'descrption',
  default: '',
  rule: 'London No',
}, {
  key: 3,
  name: 'Joe',
  type: 'number',
  desc: 'descrption',
  default: '',
  rule: 'London No',
}]

module.exports = {
  [`GET ${apiPrefix}/project/menu`] (req, res) {
    res.status(200).json({
      data: menu,
    })
  },

  [`POST ${apiPrefix}/project/interface`] (req, res) {
    const { query } = req
    let newData = interfaceList.list
    for (let key in query) {
      if ({}.hasOwnProperty.call(query, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }
    res.status(200).json({
      data: newData,
    })
  },

  [`GET ${apiPrefix}/project/list`] (req, res) {
    res.status(200).json({
      data: projectList(8),
    })
  },

  [`GET ${apiPrefix}/project/sub`] (req, res) {
    res.status(200).json({
      data: projectList(5),
    })
  },

  [`POST ${apiPrefix}/project/interface/detail`] (req, res) {
    res.status(200).json({
      data: interfaceDetail,
    })
  },

  [`GET ${apiPrefix}/project/dataModal`] (req, res) {
    res.status(200).json({
      data: dataModal,
    })
  },
}

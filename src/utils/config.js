const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  name: '桴之科测试管理系统',
  prefix: '桴之科测试管理系统',
  footerText: '桴之科测试管理系统  © 2017 桴之科',
  logo: '/logo.svg',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
    projectMenu: `${APIV1}/project/menu`,
    projectList: `${APIV1}/project/list`,
    projectSub: `${APIV1}/project/sub`,
    BusData: `${APIV1}/BusData`,
    HeadData: `${APIV1}/HeadData`,
    AddInterface: `${APIV1}/project/addInterface`,
    AddInterfaceRequest: `${APIV1}/project/addInterfaceRequest`,
    projectInterface: `${APIV1}/project/interface`,
    projectDataModal: `${APIV1}/project/dataModal`,
    projectGroup: `${APIV1}/project/group`,
    interfaceDetail: `${APIV1}/project/interface/detail`,
    dataModalDetail: `${APIV1}/project/dataModal/detail`,
  },
}

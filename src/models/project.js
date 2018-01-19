import { config } from 'utils'

import * as projectService from 'services/project'

const {getMenu, getList} = projectService

export default {
  namespace: 'project',

  state: {
    backShow: false,
    menuData: [],
    dataSource: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      let i = 1
      history.listen((location) => {
        if (location.pathname.indexOf('/project') !== -1 && i < 2) {
          dispatch({
            type: 'getMenu',
          })
          i++
        }
        if (location.pathname === '/project') {
          dispatch({
            type: 'getList',
          })
        }
        if (location.pathname.indexOf('/project/') !== -1) {
          dispatch({
            type: 'backShow',
          })
        } else {
          dispatch({
            type: 'backHidden',
          })
        }
      })
    },
  },

  effects: {
    * getMenu ({payload = {}}, {call, put}) {
      const data = yield call(getMenu, payload)
      yield put({type: 'menuUpdate', payload: data.data})
    },
    * getList ({payload = {}}, {call, put}) {
      const data = yield call(getList, payload)
      yield put({type: 'dataSave', payload: data.data})
    },
    * backShow (_, {put}) {
      yield put({type: 'backSwitch', payload: true})
    },
    * backHidden (_, {put}) {
      yield put({type: 'backSwitch', payload: false})
    },
  },

  reducers: {
    menuUpdate(state, {payload}) {
      if (!state.menuData.length) {
        return {...state, menuData: payload}
      } else {
        return { ...state }
      }
    },
    dataSave(state, {payload}) {
      return {...state, dataSource: payload}
    },
    backSwitch(state, {payload}) {
      return {...state, backShow: payload}
    },
  },
}

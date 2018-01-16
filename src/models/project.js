import queryString from 'query-string'
import {config} from 'utils'

import * as projectService from 'services/project'

const {getMenu, getList, getSub} = projectService

export default {
  namespace: 'project',

  state: {
    menuState: true,
    menuData: [],
    dataSource: [],
    dataSub: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/project') {
          dispatch({
            type: 'getMenu',
          })
          dispatch({
            type: 'getList',
          })
        } else if (location.pathname.indexOf('/project/sub') !== -1) {
          dispatch({
            type: 'getSub'
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
    * getSub ({payload = {}}, {call, put}) {
      const data = yield call(getSub, payload)
      yield put({type: 'saveSub', payload: data.data})
    },
  },

  reducers: {
    menuUpdate(state, {payload}) {
      return {...state, menuData: payload}
    },
    dataSave(state, {payload}) {
      return {...state, dataSource: payload}
    },
    saveSub(state, {payload}) {
      return {...state, dataSub: payload}
    },
  },
}

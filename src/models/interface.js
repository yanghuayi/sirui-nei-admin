import { routerRedux } from 'dva/router'
import { getInterDetail } from 'services/project'

export default {
  namespace: 'interface',
  state: {
    detailLoading: true,
    pageData: {},
  },
  effects: {
    * add (_, { put }) {
      yield put(routerRedux.push({
        pathname: '/appstore/interfaceAdd',
      }))
    },
    * detail ({ payload }, { put }) {
      yield put(routerRedux.push({
        pathname: '/appstore/interfaceDetail',
        search: `?id=${payload.id}`,
      }))
    },
    * getData ({ payload }, { call, put }) {
      const data = yield call(getInterDetail, payload)
      yield put({
        type: 'updateDetail',
        payload: data,
      })
      yield put({
        type: 'loadingFlase',
      })
    },
  },
  reducers: {
    updateDetail (state, { payload }) {
      return {
        ...state,
        pageData: payload,
      }
    },
    loadingFlase (state) {
      return {
        ...state,
        detailLoading: false,
      }
    },
  },
}

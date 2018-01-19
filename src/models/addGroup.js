
import * as projectService from 'services/project'

const { getBusGroup, getHead } = projectService

export default {
  namespace: 'addGroup',

  state: {
    // 业务分组数据
    busGroup: [],
    // 负责人数据
    head: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname.indexOf('/project/addGroup') !== -1) {
          dispatch({
            type: ['getBusGroup', 'getHead'],
          })
        }
      })
    },
  },

  effects: {
    * getBusGroup ({payload = {}}, {call, put}) {
      const data = yield call(getBusGroup, payload)
      yield put({type: 'saveBus', payload: data.data})
    },
  },

  reducers: {
    saveBus(state, {payload}) {
      return {...state, busGroup: payload}
    },
  },
}

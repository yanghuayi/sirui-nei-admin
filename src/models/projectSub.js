
import * as projectService from 'services/project'

const { getSub } = projectService

export default {
  namespace: 'projectSub',

  state: {
    dataSub: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname.indexOf('/project/sub') !== -1) {
          dispatch({
            type: 'getSub',
          })
        }
      })
    },
  },

  effects: {
    * getSub ({payload = {}}, {call, put}) {
      const data = yield call(getSub, payload)
      yield put({type: 'saveSub', payload: data.data})
    },
  },

  reducers: {
    saveSub(state, {payload}) {
      return {...state, dataSub: payload}
    },
  },
}

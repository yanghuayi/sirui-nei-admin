
import * as projectService from 'services/project'

const { getBusGroup, getHead } = projectService

export default {
  namespace: 'addGroup',

  state: {
    // 业务分组数据
    busGroup: [],
    // 负责人分组数据
    head: [],
    // 新建业务分组数据
    modalVisible: false,
    addLoading: true,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname.indexOf('/project/addGroup') !== -1) {
          dispatch({ type: 'getBusGroup', })
          dispatch({ type: 'getHead', })
        }
      })
    },
  },

  effects: {
    * getBusGroup({ payload = {} }, { call, put }) {
      const data = yield call(getBusGroup, payload)
      console.log(data.list)
      yield put({ type: 'saveBus', payload: data.list })
    },
    * getHead({ payload = {} }, { call, put }) {
      const data = yield call(getHead, payload)
      yield put({ type: 'saveHead', payload: data.list })
    },
    * modalSwitch(_, {put}) {
      yield put({type: 'switchModal'})
    }
  },

  reducers: {
    saveBus(state, { payload }) {
      return { ...state, busGroup: payload }
    },
    saveHead(state, { payload }) {
      return { ...state, head: payload }
    },
    switchModal(state) {
      return {...state, modalVisible: !state.modalVisible }
    }
  },
}

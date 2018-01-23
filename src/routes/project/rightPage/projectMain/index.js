import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Tabs } from 'antd'

import styles from './index.less'
import Interface from './Interface'
import DataModal from './DataModal'

const TabPane = Tabs.TabPane

const Index = ({ dispatch, loading, projectDetail}) => {
  const interfaceProps = {
    tableOpreat (e, record) {
      console.log(record)
    },
    interfaceAdd () {
      dispatch(routerRedux.push('/project/interfaceAdd'))
    },
  }
  return (
    <Tabs className={styles.projectMain}>
      <TabPane tab="异步接口" key="1">
        <Interface {...interfaceProps} />
      </TabPane>
      <TabPane tab="数据模型" key="2">
        <DataModal />
      </TabPane>
      <TabPane tab="业务分组" key="3">

      </TabPane>
    </Tabs>
  )
}

Index.propTypes = {
  loading: PropTypes.object,
  projectDetail: PropTypes.object,
}

export default connect((loading, projectDetail) => (loading, projectDetail))(Index)

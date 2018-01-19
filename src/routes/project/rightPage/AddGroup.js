import React from 'react'
import { Form, Input, Select, Button } from 'antd'
import {connect} from 'dva'
import { routerRedux } from 'dva/router'

import styles from './addGroup.less'

const AddGroup = ({
  loading, addGroup, form,
}) => {
  const { getFieldDecorator } = form
  return (
    <div className={styles.addGroup}>

    </div>
  )
}

let AddGroupClass = Form.create(AddGroup)

export default connect(({addGroup, loading}) => ({addGroup, loading}))(AddGroupClass)

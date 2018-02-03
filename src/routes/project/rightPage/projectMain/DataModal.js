import React, { PureComponent } from 'react'

import { Table, Input, Card, Button } from 'antd'
import { Link } from 'dva/router'

import { getDataModal } from 'services/project'
import styles from './dataModal.less'

const ButtonGroup = Button.Group
const { Search } = Input

export default class DataModal extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      data: [],
      selectedRowKeys: [],
    }
  }

  fetch () {
    this.setState({ loading: true })
    getDataModal().then((ret) => {
      this.setState({
        data: ret.data,
        loading: false,
      })
    })
  }

  componentDidMount () {
    this.fetch()
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  render () {
    let { loading } = this.state
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      render: (text, record) => {
        return (
          <Link to={`attr/${record.key}`}>{text}</Link>
        )
      },
    }, {
      title: '类别',
      dataIndex: 'type',
    }, {
      title: '描述',
      dataIndex: 'desc',
    }, {
      title: '标签',
      dataIndex: 'default',
    }, {
      title: '分组',
      dataIndex: 'rule',
    }]
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0
    const extraContent = (
      <div className={styles.extraContent}>
        <ButtonGroup>
          <Link to="attrAdd"><Button type="primary">新建模型</Button></Link>
          <Button onClick={this.handleAdd} type="primary" disabled={!hasSelected}>删除</Button>
        </ButtonGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={() => ({})}
        />
      </div>
    )
    return (
      <Card bordered={false} extra={extraContent}>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} pagination={false} loading={loading} />
      </Card>
    )
  }
}

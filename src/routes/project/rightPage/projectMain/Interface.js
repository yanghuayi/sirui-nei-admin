import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import PropTypes from 'prop-types'
import { config } from 'utils'
import { Tag } from 'antd'
import FilterTable from 'components/FilterTable/FilterTable'

import styles from './interface.less'

const { APIV1 } = config
@connect(state => ({
  interface: state.interface,
}))

export default class Interface extends PureComponent {
  constructor (props) {
    super(props)
    // let tableHeight = window.innerHeight - 260;
    let tagColor = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
    let color = null
    this.state = {
      FilterTableParams: {
        filterList: [
          { key: 'name', type: 'input', label: '名称', placeholder: '请输入接口名称' },
          { key: 'path', type: 'input', label: '路径', placeholder: '请输入接口路径' },
          { key: 'group', type: 'input', label: '分组', placeholder: '请输入接口分组' },
        ],
        filterGrade: [],
        filterForm: { name: '', path: '', group: ''},
        addBtn: true,
        fetch: { url: `${APIV1}/project/interface`, data: () => this.filterForm, },
        tableList: [
          {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render (text, record) {
              return <Link to={`/project/interfaceDetail?id=${record.id}`}>{text}</Link>
            },
          },
          { title: '方法', dataIndex: 'method', key: 'method' },
          { title: '路径', dataIndex: 'path', key: 'path' },
          {
            title: '标签',
            dataIndex: 'tips',
            key: 'tips',
            render (text) {
              return text.map(item => <Tag > {item} </Tag>)
            },
          },
          {
            title: '分组',
            dataIndex: 'group',
            key: 'group',
            filters: [{
              text: '门户-登录登出',
              value: 'login',
            }, {
              text: '门户-车辆管理',
              value: 'car',
            }],
          },
          {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render (text) {
              switch(text) {
                case '未开始':
                  color = 'red'
                  break
                case '开发中':
                  color = 'blue'
                  break
                case '已完成':
                  color = 'green'
                  break
              }
              return <Tag color={color}>{text}</Tag>
            },
          },
          { title: '版本', dataIndex: 'version', key: 'version' },
          { title: '负责人', dataIndex: 'principal', key: 'principal' },
          { title: '创建者', dataIndex: 'creator', key: 'creator' },
          { title: '创建时间', dataIndex: 'creatTime', key: 'creatTime' },
        ],
        otherList: [],
        opreat: [{ key: 1, name: '详情' }, { key: 2, name: '删除' }],
        rowKey: 'id',
        localName: 'equipment',
        pagination: false,
        // scroll: tableHeight,
      }
    }
  }

  render () {
    let { FilterTableParams } = this.state
    FilterTableParams.menuClick = this.props.tableOpreat
    FilterTableParams.onAdd = this.props.addFun
    return (
      <FilterTable {...FilterTableParams}   />
    )
  }
}

Interface.propTypes = {
  tableOpreat: PropTypes.func,
  addFun: PropTypes.func,
}

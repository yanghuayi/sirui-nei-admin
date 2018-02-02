import React, { PureComponent } from 'react'
import { Card, Form, Input, Select, Spin, Table, Button } from 'antd'
import queryString from 'query-string'
import { config, request } from 'utils'
import { EditableCell, DropOption } from 'components'

import styles from './interfaceDetail.less'

const FormItem = Form.Item
const Option = Select.Option

class DetailInterface extends PureComponent {
  constructor (props) {
    super(props)
    const self = this
    const option = [
      { value: 0, label: '否' },
      { value: 1, label: '是' },
    ]
    const opreat = [{ key: 1, name: '新增' }, { key: 2, name: '删除' }]
    this.state = {
      detailLoading: true,
      tabList: [
        { key: 'request', tab: '请求信息' },
        { key: 'response', tab: '响应信息' },
      ],
      tabKey: 'request',
      textList: [
        { label: '标签', value: 'tips' },
        { label: '创建者', value: 'creator' },
        { label: '业务分组', value: 'group' },
        { label: '负责人', value: 'principal' },
        { label: '描述', value: 'decs' },
      ],
      formList: [
        { type: 'input', placeholder: '标签', key: 'tips', rules: [] },
        { type: 'input', placeholder: '创建者', key: 'creator', rules: [] },
        { type: 'input', placeholder: '业务分组', key: 'group', rules: [] },
        { type: 'input', placeholder: '负责人', key: 'principal', rules: [] },
        { type: 'input', placeholder: '描述', key: 'decs', rules: [] },
      ],
      pageData: {},
      columns: [{
        title: '名称',
        dataIndex: 'name',
        render (text) {
          return (
            <EditableCell value={text} type="input" />
          )
        },
      }, {
        title: '类型',
        dataIndex: 'type',
        render (text) {
          return (
            <EditableCell value={text} type="input" />
          )
        },
      }, {
        title: '描述',
        dataIndex: 'decs',
        render (text) {
          return (
            <EditableCell value={text} type="input" />
          )
        },
      }, {
        title: '必需',
        dataIndex: 'isRequired',
        render (text) {
          return (
            <EditableCell value={text} type="select" option={option} />
          )
        },
      }, {
        title: '默认值',
        dataIndex: 'defaultValue',
        render (text) {
          return (
            <EditableCell value={text} type="input" />
          )
        },
      }, {
        title: '生成规则',
        dataIndex: 'rules',
        render (text) {
          return (
            <EditableCell value={text} type="input" />
          )
        },
      }, {
        title: '操作',
        dataIndex: 'opreat',
        render (text, record) {
          return (
            <DropOption onMenuClick={e => self.menuClick(e, record)} menuOptions={opreat} />
          )
        }
      }],
    }
  }

  componentDidMount () {
    request({
      url: config.api.interfaceDetail,
      method: 'POST',
      params: queryString.parse(this.props.location.search),
    }).then(data => {
      this.setState({
        pageData: data.data,
        detailLoading: false,
      })
    })
  }

  menuClick (e, record) {
    console.log(record);
  }

  onTabChange(value) {
    console.log(value)
    this.setState({
    })
  }

  reqAdd () {
    let { pageData } = this.state
    pageData.request.data.push({ id: 7, name: '新增', type: '', decs: '。。。', isRequired: 1, defaultValue: '', rules: '', })
    this.setState({
      pageData: pageData,
    })
  }

  resAdd () {
    let { pageData } = this.state
    pageData.response.data.push({ id: 7, name: '新增', type: '', decs: '。。。', isRequired: 1, defaultValue: '', rules: '', })
    this.setState({
      pageData: pageData,
    })
  }

  contentList = (key) => {
    const { pageData: { request, response }, columns } = this.state
    const List = {
      request: <div className={styles.requestWrap}>
        { request ? <div>
          <span>请求地址：</span>
          <Select defaultValue={request.method} style={{width: '150px', marginRight: '10px' }} onChange={this.onTabChange} >
            <Option value="POST">POST</Option>
            <Option value="GET">GET</Option>
            <Option value="DELETE">DELETE</Option>
            <Option value="PATCH">PATCH</Option>
            <Option value="PUT">PUT</Option>
          </Select>
          <Input value={request.url} style={{width: '350px'}} />
          <div style={{marginTop: '20px'}}>
            <Table columns={columns} dataSource={this.state.pageData.request.data} rowKey={record => record.name} pagination={false} />
          </div>
        </div> : <Spin /> }
        <div className={styles.btnWrap}>
          <Button type="primary" onClick={this.reqAdd}>新增</Button>
        </div>
      </div>,
      response:
        <div className={styles.responseWrap}>
          {
            response ?
              <div className={styles.tableWrap}>
                <Table columns={columns} dataSource={this.state.pageData.response.data} rowKey={record => record.name} pagination={false} />

              </div>
              : <Spin />
          }
          <div className={styles.btnWrap}>
            <Button type="primary" onClick={this.resAdd}>新增</Button>
          </div>
        </div>
    }
    return List[key]
  }

  handleSubmit = () => {
  }

  onTabChange = (key) => {
    this.setState({
      tabKey: key,
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const { pageData, tabList, tabKey, detailLoading } = this.state
    return (
      <Card loading={detailLoading} title={pageData.title} className={styles.interDetailWrap}>
        <Form className={styles.topForm} layout="inline" onSubmit={this.handleSubmit} >
          <FormItem label="标签" {...formItemLayout} >
            {getFieldDecorator('tips', {
              initialValue: pageData.tips,
            })(
              <Input placeholder="标签" />
            )}
          </FormItem>
          <FormItem label="创建者" {...formItemLayout} >
            {getFieldDecorator('creator', {
              initialValue: pageData.creator,
            })(
              <Input placeholder="创建者" />
            )}
          </FormItem>
          <FormItem label="分组" {...formItemLayout} >
            {getFieldDecorator('group', {
              initialValue: pageData.group,
            })(
              <Input placeholder="分组" />
            )}
          </FormItem>
          <FormItem label="负责人" {...formItemLayout} >
            {getFieldDecorator('principal', {
              initialValue: pageData.principal,
            })(
              <Input placeholder="负责人" />
            )}
          </FormItem>
          <FormItem label="描述" {...formItemLayout} >
            {getFieldDecorator('decs', {
              initialValue: pageData.decs,
            })(
              <Input placeholder="描述" />
            )}
          </FormItem>
        </Form>
        <Card
          className={styles.sideTab}
          tabList={tabList}
          onTabChange={key => this.onTabChange(key)}
        >
          {this.contentList([tabKey])}
        </Card>
      </Card>
    )
  }
}

const InterfaceDetail = Form.create()(DetailInterface)

export default InterfaceDetail

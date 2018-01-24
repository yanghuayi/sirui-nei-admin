import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Card, Select, Button, Row, Col, Modal, Alert } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { getBusGroup, getHead } from 'services/project'

import * as styles from './addGroup.less'
import index from '../../../../node_modules/_antd@3.0.3@antd/lib/radio';

const FormItem = Form.Item
const Option = Select.Option

class AddGroup extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      busGroup: [],
      head: [],
      visible: false,
      addLoading: false,
    }
  }

  componentDidMount() {
    this.getBusGroup();
    this.getHead();
  }

  getBusGroup() {
    getBusGroup().then(data => {
      this.setState({
        busGroup: data.list,
      })
    })
  }

  getHead() {
    getHead().then(data => {
      this.setState({
        head: data.list,
      })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { busGroup, head, visible, addLoading } = this.state
    const ModalProps = {
      visible,
      modalText: 'content',
      addLoading,
      title: '新建业务分组',
      onCancel: () => {
        this.setState({
          visible: false,
        })
      }
    }
    // 表单位置
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }

    // 按钮位置
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 3,
        },
      }
    }

    const requestSelector = getFieldDecorator('prefix', {
      initialValue: 'GET',
    })(
      <Select style={{ width: 85 }}>
        <Option value="GET">GET</Option>
        <Option value="POST">POST</Option>
        <Option value="PUT">PUT</Option>
        <Option value="PATCH">PATCH</Option>
        <Option value="DELETE">DELETE</Option>
        <Option value="HEAD">HEAD</Option>
      </Select>
      )


    const submitFun = (e) => {
      e.preventDefault()
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      })
    }
    const showModal = (e) => {
      e.preventDefault()
      this.setState({
        visible: true,
      })
    }
    const handleCancel = (e) => {
      e.preventDefault()
      console.log('cancel')
    }
    return (
      <Card title='新增异步接口'>
        <Form onSubmit={submitFun}>

          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入接口名称',
              }],
            })(
              <div>
                <Input placeholder="请输入名称" style={{ width: '60%' }} />
                <Alert message="请输入异步接口名称，最多20个中文或者40个英文字符" type="info" style={{ width: '60%', marginTop: '5px' }} />
              </div>
              )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="请求"
          >
            {getFieldDecorator('request', {
              rules: [{ required: true, message: '请输入接口地址' }],
            })(
              <div>
                <Input addonBefore={requestSelector} style={{ width: '60%' }} />
                <Alert message="请输入相对路径，支持路径参数，例如：/api/get/:id" type="info" style={{ width: '60%', marginTop: '5px' }} />
              </div>
              )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('describe', {
              rules: [{
                required: false, message: '请输入异步接口描述信息',
              }],
            })(
              <Input style={{ width: '60%' }} placeholder="请输入异步接口描述信息" />
              )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="代码映射 "
          >
            {getFieldDecorator('codeMap', {
              rules: [{
                required: false, message: '请输入类名',
              }],
            })(
              <div>
                <Input style={{ width: '60%' }} placeholder="请输入类名" />
                <Alert message="自动生成代码时，作为该异步接口的类名" type="info" style={{ width: '60%', marginTop: '5px' }} />
              </div>
              )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="业务分组 "
          >
            {getFieldDecorator('busGroup')(
              <div>
                <Select style={{ width: '25%' }}>
                  {busGroup.map((item, index) => <Option key={index}>{item.name}</Option>)}
                </Select>
                <Button type="primary" onClick={showModal} style={{ marginLeft: "10px" }}>新建</Button>
                <Modal {...ModalProps}>
                  <Form>
                    <FormItem
                      {...formItemLayout}
                      label="名称"
                    >
                      {getFieldDecorator('groupName', {
                        rules: [{
                          required: true, message: "请输入接口名称"
                        }],
                      })(
                        <Input style={{ width: '100%' }} placeholder="请输入名称" />
                        )}
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="描述"
                    >
                      {getFieldDecorator('groupDescribe', {
                        rules: [{
                          required: false, message: '请输入异步接口描述信息',
                        }],
                      })(
                        <Input style={{ width: '100%' }} placeholder="请输入异步接口描述信息" />
                        )}
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="负责人"
                    >
                      {getFieldDecorator('groupHead')(
                        <Select style={{ width: '50%' }}>
                          {head.map((item, index) => <Option key={index}>{item.name}</Option>)}
                        </Select>
                      )}
                    </FormItem>
                  </Form>
                </Modal>
              </div>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="负责人 "
          >
            {getFieldDecorator('head')(
              <Select style={{ width: '25%' }}>
                {head.map((item, index) => <Option key={index}>{item.name}</Option>)}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="关注人 "
          >
            {getFieldDecorator('focus', {
              rules: [{
                required: false, message: '请选择关注人',
              }],
            })(
              <Input style={{ width: '60%' }} placeholder="请选择关注人" />
              )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="标签 "
          >
            {getFieldDecorator('tips', {
              rules: [{
                required: false, message: '请输入标签',
              }],
            })(
              <Select mode="tags" style={{ width: '60%' }} placeholder="请输入标签" />
              )}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">提交</Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(AddGroup)
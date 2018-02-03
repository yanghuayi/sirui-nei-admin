import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Card, Select, Button, Row, Col, Modal, Alert, Message } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { getBusGroup, getHead } from 'services/project'
import { addInterface, addInterfaceRequest } from 'services/project'
import * as styles from './addInterface.less'

const FormItem = Form.Item
const Option = Select.Option

class AddGroup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false,
    }
  }
  render() {
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
    const { getFieldDecorator } = this.props.form;
    let { head, visible, onCancel, AddBack } = this.props;
    const { confirmLoading } = this.state;
    // 对话框
    const modalInfo = {
      title: "新建业务分组",
      disabled: 'true',
      okText: '提交',
      visible,
      confirmLoading,
      onCancel,
      onOk: () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            addInterfaceRequest(values).then((data) => {
              this.setState({
                confirmLoading: true
              })
              setTimeout(() => {
                if (!data.status) {
                  Message.success(data.msg)
                  AddBack(0)
                } else {
                  Message.error(data.msg)
                  AddBack(1)
                }
                this.setState({
                  confirmLoading: false
                })
              }, 1800)
            }).catch((err) => {
              Message.error(err.message)
            })
          }
        })
      }
    }


    return (
      <Modal {...modalInfo}>
        <Form ref="addGroup">
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {getFieldDecorator('groupName', {
              rules: [{
                type: 'pattern', pattern: '[\u4E00-\u9FA5|A-Za-z]{1,20}$', message: '请输入正确的接口名称'
              }, {
                required: true, message: "请输入正确的接口名称"
              }],
            })(
              <Input style={{ width: '100%', position: "relative" }} placeholder="请输入名称" />
              )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('groupDescribe', {
              rules: [{
                required: false,
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
                {head.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>)}
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const AddGroupForm = Form.create()(AddGroup);

class AddInterface extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      busGroup: [],
      head: [],
      visible: false,
    }
  }

  componentDidMount() {
    this.getBusGroup();
    this.getHead();
  }

  getBusGroup = () => {
    getBusGroup().then(data => {
      this.setState({
        busGroup: data.list,
      })
    })
  }

  getHead = () => {
    getHead().then(data => {
      this.setState({
        head: data.list,
      })
    })
  }

  render() {
    const self = this
    const { getFieldDecorator } = this.props.form
    const { busGroup, head, visible } = this.state

    // addGroupProps
    const addGroupProps = {
      head,
      visible,
      onCancel() {
        self.setState({
          visible: false
        });
      },
      AddBack(val) {
        if (!val) {
          self.setState({
            visible: false
          });
        }
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
          addInterface(values).then((data) => {
            if (data.status) {
              Message.error(data.msg);
            } else {
              Message.success(data.msg);
              this.props.dispatch(routerRedux.goBack());
            }
          }).catch(err => {
            Message.error(err.message)
          })
        }
      })
    }

    let showModal = () => {
      this.setState({
        visible: true,
      })
    }

    return (
      <div>
        <AddGroupForm {...addGroupProps} />
        <Card title='新增异步接口'>
          <Form onSubmit={submitFun}>
            <FormItem
              {...formItemLayout}
              label="名称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  pattern: '[\u4E00-\u9FA5]{1,20}|[A-Za-z]{1,40}$', message: '请输入接口名称'
                }, {
                  required: true, message: '请输入正确的接口名称',
                }],
              })(
                <div>
                  <Input placeholder="请输入名称" style={{ width: '60%' }} />
                  <Alert
                    message="请输入异步接口名称，最多20个中文或者40个英文字符"
                    type="info"
                    style={{ display: 'inline-block', width: '38%', marginLeft: '10px', position: 'absolute' }}
                  />
                </div>
                )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="请求"
            >
              {getFieldDecorator('path', {
                rules: [{
                  pattern: '[a-zA-Z0-9|///+]+$', message: '请输入接口请求地址'
                }, {
                  required: true, message: '请输入正确的接口请求'
                }],
              })(
                <div>
                  <Input addonBefore={requestSelector} style={{ width: '60%' }} />
                  <Alert
                    message="请输入相对路径，支持路径参数，例如：/api/get/:id"
                    type="info"
                    style={{ display: 'inline-block', width: '38%', marginLeft: '10px', position: 'absolute' }}
                  />
                </div>
                )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="描述"
            >
              {getFieldDecorator('describe', {
                rules: [{
                  required: false,
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
                  required: false,
                }],
              })(
                <div>
                  <Input style={{ width: '60%' }} placeholder="请输入类名" />
                  <Alert
                    message="自动生成代码时，作为该异步接口的类名"
                    type="info"
                    style={{ display: 'inline-block', width: '38%', marginLeft: '10px', position: 'absolute' }}
                  />
                </div>
                )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="业务分组 "
            >
              {getFieldDecorator('busGroup')(
                <Select style={{ width: '25%' }}>
                  {busGroup.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>)}
                </Select>
              )}
              <Button type="primary" onClick={showModal} style={{ marginLeft: "10px" }}>新建</Button>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="负责人 "
            >
              {getFieldDecorator('head')(
                <Select style={{ width: '25%' }}>
                  {head.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>)}
                </Select>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="关注人 "
            >
              {getFieldDecorator('focus', {
                rules: [{
                  required: false,
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
                  required: false,
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
      </div>
    )
  }
}

export default connect()(Form.create()(AddInterface))
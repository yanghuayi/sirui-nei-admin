import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Button, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

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

class AddParams extends PureComponent {
  constructor (props) {
    super(props)
    
    this.state = {}
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const ModalProps = {}
    return (
      <Modal {...ModalProps}>
        <Form>
          <FormItem
              {...formItemLayout}
              label="名称"
            >
            {
              getFieldDecorator('name', {
                rules: [{
                  required: true, message: "请输入名称"
                }],
              })(
                <Input placeholder="请输入名称" />
              )
            }
          </FormItem>
          <FormItem
              {...formItemLayout}
              label="类型"
            >
            {
              getFieldDecorator('type', {
                rules: [{
                  required: true, message: "请选择类型"
                }],
              })(
                <Select>
                  
                </Select>
              )
            }
          </FormItem>
          <FormItem
              {...formItemLayout}
              label="类型"
            >
            {
              getFieldDecorator('type', {
                rules: [{
                  required: true, message: "请输入正确的接口名称"
                }],
              })(
                <Input placeholder="请输入名称" />
              )
            }
          </FormItem>
          <FormItem
              {...formItemLayout}
              label="名称"
            >
            {
              getFieldDecorator('name', {
                rules: [{
                  required: true, message: "请输入正确的接口名称"
                }],
              })(
                <Input placeholder="请输入名称" />
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

AddParams.propsTypes = {
  visiable: PropTypes.bool.isRequied,
  callBack: propsTypes.func.isRequied,
}

export default Form.create()(AddParams)
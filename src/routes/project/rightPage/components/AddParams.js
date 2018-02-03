import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Button, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class AddParams extends PureComponent {
  constructor (props) {
    super(props)
    
    this.state = {}
  }

  render () {
    const ModalProps = {}
    return (
      <Modal {...ModalProps}>
        <Form>
          <FormItem></FormItem>
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
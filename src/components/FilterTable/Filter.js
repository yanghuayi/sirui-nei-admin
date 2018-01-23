import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cascader, Form, Row, Col, Input, Select, Radio, DatePicker, Button, Icon, Tooltip, Modal, Checkbox } from 'antd'
import styles from './filter.less'

const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const CheckboxGroup = Checkbox.Group
const FormItem = Form.Item

export default class Filter extends Component {
  constructor (props) {
    super(props)
    const { filterList, filterGrade, filterForm, addBtn, tableList, otherList } = this.props
    let tableAll = [...tableList, ...otherList]
    let checkboxList = []
    for (let i in tableAll) {
      checkboxList[i] = {
        value: tableAll[i].key,
        label: tableAll[i].title
      }
    }
    let checkboxDefault = []
    for (let i in tableList) {
      checkboxDefault[i] = tableList[i].key
    }
    this.state = {
      grade: false,
      setModal: false,
      filterList: filterList,
      filterGrade: filterGrade,
      filterForm: filterForm,
      addBtn: addBtn,
      tableAll: checkboxList,
      tableDefault: checkboxDefault
    }
  }
  
  componentWillMount () {
  }
  
  opensetModal () {
    this.setState({
      setModal: true
    })
  }

  setCancel = () =>  {
    this.setState({
      setModal: false
    })
  }

  saveTable () {

  }

  settingTable = () => {
    this.props.tableSetFun()
  }

  filterItem (item) {
    const self = this
    let Dom = null

    function itemChange (value) {
      const _this = this
      let filterForm = self.state.filterForm
      filterForm[_this['data-key']] = value
      self.setState({
        filterForm: filterForm
      })
    }

    let inputChange = (e) => {
      let key = e.target.getAttribute('data-key')
      let value = e.target.value
      let filterForm = this.state.filterForm
      filterForm[key] = value
      self.setState({
        filterForm: filterForm
      })
    }
    switch (item.type) {
      case 'cascader':
      Dom = <Cascader options={item.options} data-key={item.key} onChange={itemChange} placeholder={item.placeholder} />
      break;
      case 'input':
      Dom = <Input onChange={inputChange} data-key={item.key} addonAfter={item.unit} placeholder={item.placeholder} />
      break;
      case 'select':
      Dom = 
          <Select placeholder={item.placeholder}  data-key={item.key} onChange={itemChange}>
            <Option value="">全部</Option>
            { item.options.map((item) => { return (<Option key={item.key} value={item.key + ''}>{item.label}</Option>) }) }
          </Select>
      break;
      case 'radio':
      Dom = 
          <RadioGroup  data-key={item.key} onChange={itemChange}>
            { item.options.map((item) => { return (<RadioButton key={item.key} value={item.key}>{item.label}</RadioButton>) }) }
          </RadioGroup>
      break;
      case 'dateTime':
      Dom = <RangePicker data-key={item.key} showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" placeholder={[item.placeholder[0], item.placeholder[1]]} onChange={itemChange} />
      break;
    }
    let formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Col span={this.state.grade ? 6 : 4} xl={this.state.grade ? 6 : 4} lg={this.state.grade ? 8 : 6} md={this.state.grade ? 8 : 6} sm={this.state.grade ? 12 : 8} xs={12} key={item.key}>
        {
          this.state.grade ? 
          <FormItem label={this.state.grade ? item.label + '：' : null} {...formItemLayout}  className={styles.itemForm} key={item.key} data-key={item.key}>
            {Dom}
          </FormItem>
          : 
          <FormItem className={styles.itemForm} key={item.key} data-key={item.key}>
            {Dom}
          </FormItem>
        }
      </Col>
    )
  }

  checkBoxChange () {

  }

  render () {
    const self = this
    const { filterList, filterGrade, filterForm, addBtn, tableAll, tableDefault } = this.state
    let checkBoxParams = {
      options: tableAll,
      defaultValue: tableDefault,
      onChange: this.checkBoxChange,
    }
    let search = () => {
      self.props.onSearch(this.state.filterForm)
    }
    let gradeToggle = () => {
      if (self.state.grade) {
        self.setState({
          grade: false
        })
      } else {
        self.setState({
          grade: true
        })
      }
    }
    let addFun = () => {
      self.props.onAdd(self.state.addBtn)
    }
    return (
      <div className={styles.filterWrap}>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={40}>
            <div className={styles.filterNomal}>
              {
                filterList.map((item) => {
                  return this.filterItem(item)
                })
              }
              {
                filterGrade.length && this.state.grade ? 
                <div className={[styles.filterGrade, this.state.grade ? styles.gradeShow : styles.gradeHide ]}>
                  {
                    filterGrade.map((item) => {
                      return this.filterItem(item)
                    })
                  }
                </div> : null
              }
              <Col span={this.state.grade ? 20: 7} offset={this.state.grade ? 2 : 0} lg={this.state.grade ? 20: 7} xs={this.state.grade ? 20: 22}>
                <FormItem style={{ marginBottom: '0'}}>
                  <div className={styles.filterBtn}>
                    <Button type="primary" icon="search" onClick={search}>搜索</Button>
                    <Button icon="reload" onClick={search}>重置</Button>
                    { 
                      filterGrade.length ? 
                      <a style={{ marginLeft: 8, fontSize: 14 }} onClick={gradeToggle}>
                        {this.state.grade ? '普通搜索' : '高级搜索'} <Icon type={this.state.grade ? 'up' : 'down'} />
                      </a>
                      : null
                    }
                    
                  </div>
                </FormItem>
              </Col>
            </div>
          </Row>
        </Form>
        <div className={styles.tableBtn}>
          { this.state.addBtn ? <Button onClick={addFun} icon="plus">新增</Button> : null }
          <Tooltip placement="bottom" title={'导出表格'}>
            <Button shape="circle" onClick={() => this.saveTable()} icon="export" />
          </Tooltip>
          <Tooltip placement="bottom" title={'表格设置'}>
            <Button shape="circle" onClick={() => {this.opensetModal()}} icon="setting" />
          </Tooltip>
        </div>
        <Modal
          title="表格设置"
          visible={this.state.setModal}
          onOk={this.settingTable}
          onCancel={this.setCancel}
        >
          <CheckboxGroup className={styles.checkboxList} {...checkBoxParams} />
        </Modal>
      </div>
    )
  }
}

Filter.propTypes = {
  filterList: PropTypes.array.isRequired,
  filterGrade: PropTypes.array,
  filterForm: PropTypes.object.isRequired,
  addBtn: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  tableList: PropTypes.array.isRequired,
  otherList: PropTypes.array.isRequired,
  onAdd: PropTypes.func,
  tableSetFun: PropTypes.func.isRequired,
}
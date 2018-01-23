import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './filterTable.less'

import Filter from './Filter'
import MTable from './MTable'

class FilterTable extends Component {
  constructor (props) {
    super(props)
    const self = this
    let {filterList, filterGrade, filterForm, fetch, addBtn, rowKey, opreat, tableList, otherList, localName, pagination, menuClick, scroll, onAdd} = this.props
    let filterParams = {
      filterList,
      filterGrade,
      filterForm,
      tableList,
      otherList,
      addBtn,
      onAdd,
      onSearch (value) {
        tableParams.fetch.data = value
        self.setState({
          tableParams: tableParams
        })
      },
      tableSetFun (value) {

      }
    }
    let tableParams = {
      columns: tableList,
      otherList,
      fetch,
      localName,
      rowKey,
      pagination,
      opreat,
      menuClick,
      scroll,
    }
    tableParams.fetch.data = filterParams.filterForm
    this.state = {
      filterParams,
      tableParams,
    }
  }

  render () {
    return (
      <div className={styles.tablePage}>
        <Filter {...this.state.filterParams} />
        <MTable {...this.state.tableParams} />
      </div>
    )
  }
}

FilterTable.propTypes = {
  filterList: PropTypes.array.isRequired,
  filterGrade: PropTypes.array,
  filterForm: PropTypes.object,
  addBtn: PropTypes.bool,
  onAdd: PropTypes.func,
  fetch: PropTypes.object.isRequired,
  tableList: PropTypes.array.isRequired,
  otherList: PropTypes.array,
  opreat: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  rowKey: PropTypes.string.isRequired,
  localName: PropTypes.string.isRequired,
  menuClick: PropTypes.func,
  scroll: PropTypes.number,
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
}

export default FilterTable

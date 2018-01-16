import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Menu, Spin, Icon } from 'antd'
import styles from './LeftMenu.less'
import List from "../user/List";

const SubMenu = Menu.SubMenu

const LeftMenu = ({
  menuData, menuLoading, onMenuClick
}) => {
  const menuProps = {
    onClick: onMenuClick,
    mode: 'inline',
  }
  const menuItem = (item) => {
    if (item.childern) {
      return item.childern.map((items) => {
        return (
          <Menu.Item key={items.id}>{items.name}</Menu.Item>
        )
      })
    } else {
      return null
    }
  }
  return (
    <div className={styles.leftMenu}>
      <Spin spinning={menuLoading}>
        <h1 className={styles.title}>
          <Icon type="appstore-o" />
          <span>项目组</span>
        </h1>
        <Menu {...menuProps}>
          {
            menuData.map((item) => {
              return (
                <SubMenu key={item.id} title={item.name}>
                  { menuItem(item) }
                </SubMenu>
              )
            })
          }
        </Menu>
      </Spin>
    </div>
  )
}

LeftMenu.propTypes = {
  menuData: PropTypes.array,
  onMenuClick: PropTypes.func,
  menuLoading: PropTypes.bool,
}

export default LeftMenu

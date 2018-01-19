import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Spin, Icon } from 'antd'
import QueueAnim from 'rc-queue-anim'
import { routerRedux } from 'dva/router'

import styles from './LeftMenu.less'

const SubMenu = Menu.SubMenu

const LeftMenu = ({
  menuData, menuLoading, onMenuClick, backShow, dispatch,
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
  const backFun = () => {
    dispatch(routerRedux.goBack())
  }
  return (
    <div className={styles.leftMenu}>
      <Spin spinning={menuLoading}>
        <h1 className={styles.title}>
          <QueueAnim
            className="demo-content"
            key="demo"
            type={['right', 'left']}
            ease={['easeOutQuart', 'easeInOutQuart']}
          >
            {
              backShow ?
                <div onClick={backFun} className={styles.backBtn}>
                  <Icon type="caret-left" />
                  <span>返回</span>
                </div>
                :
                <div>
                  <Icon type="appstore-o" />
                  <span>项目组</span>
                </div>
            }
          </QueueAnim>
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
  backShow: PropTypes.bool,
  dispatch: PropTypes.func,
}

export default LeftMenu

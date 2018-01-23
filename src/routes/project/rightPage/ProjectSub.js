import React from 'react'
import { List, Card, Tooltip, Icon, Avatar } from 'antd'
import numeral from 'numeral'
import {connect} from 'dva'
import { routerRedux } from 'dva/router'

import styles from './projectSub.less'

const formatWan = (val) => {
  const v = val * 1
  if (!v || isNaN(v)) return ''

  let result = val
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = <span>{result}<em className={styles.wan}>万</em></span>;
  }
  return result
}

const ProjectSub = ({projectSub, loading, dispatch}) => {
  let { dataSub } = projectSub
  if (dataSub.length && dataSub[dataSub.length - 1].id !== 'add') {
    dataSub.push({
      id: 'add',
    })
  }
  const listProps = {
    rowKey: 'id',
    style: { marginTop: 24 },
    loading: loading.effects['project/getSub'],
    grid: {gutter: 24, lg: 4, md: 3, sm: 2, xs: 1},
    dataSource: dataSub,
  }

  const CardInfo = ({ activeInterface, newInterface }) => (
    <div className={styles.cardInfo}>
      <div>
        <p>接口数量</p>
        <p>{activeInterface}</p>
      </div>
      <div>
        <p>新增接口</p>
        <p>{newInterface}</p>
      </div>
    </div>
  );
  const itemClick = (id) => {
    dispatch(routerRedux.push(`/project/detail?id=${id}`))
  }
  const addGroup = () => {
    dispatch(routerRedux.push('/project/addGroup'))
  }
  return (
    <div className={styles.filterCardList}>
      <List
        {...listProps}
        renderItem={item => (
          <List.Item onClick={() => itemClick(item.id)} key={item.id}>
            {
              item.id !== 'add' ?
                <Card
                  hoverable
                  bodyStyle={{ paddingBottom: 20 }}
                  actions={[
                    <Tooltip title="异步接口"><Icon type="api" /></Tooltip>,
                    <Tooltip title="数据模型"><Icon type="database" /></Tooltip>,
                    <Tooltip title="接口分组"><Icon type="folder-open" /></Tooltip>,
                  ]}
                >
                  <Card.Meta
                    avatar={<Avatar size="small" src={item.avatar} />}
                    title={item.title}
                  />
                  <div className={styles.cardItemContent}>
                    <CardInfo
                      activeInterface={formatWan(item.activeInterface)}
                      newInterface={numeral(item.newInterface).format('0,0')}
                    />
                  </div>
                </Card> :
                <Card hoverable onClick={addGroup} className={styles.addCard}>
                  <Icon type="plus" />
                  <p className={styles.text}>
                    新增项目分组
                  </p>
                </Card>
            }
          </List.Item>
        )}
      />
    </div>
  )
}

export default connect(({projectSub, loading}) => ({projectSub, loading}))(ProjectSub)

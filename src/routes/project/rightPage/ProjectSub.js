import React from 'react'
import { List, Card, Tooltip, Icon, Avatar } from 'antd'
import numeral from 'numeral'
import {connect} from 'dva'

import styles from './projectSub.less'

const formatWan = (val) => {
  const v = val * 1;
  if (!v || isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = <span>{result}<em className={styles.wan}>万</em></span>;
  }
  return result;
};

const ProjectSub = ({project, loading}) => {
  let { dataSub } = project
  const listProps = {
    rowKey: 'id',
    style: { marginTop: 24 },
    loading: loading.effects['project/getSub'],
    grid: {gutter: 24, lg: 4, md: 3, sm: 2, xs: 1},
    dataSource: dataSub,
  }

  const CardInfo = ({ activeUser, newUser }) => (
    <div className={styles.cardInfo}>
      <div>
        <p>活跃用户</p>
        <p>{activeUser}</p>
      </div>
      <div>
        <p>新增用户</p>
        <p>{newUser}</p>
      </div>
    </div>
  );

  return (
    <div className={styles.filterCardList}>
      <List
        {...listProps}
        renderItem={item => (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              actions={[
                <Tooltip title="下载"><Icon type="download" /></Tooltip>,
                <Tooltip title="编辑"><Icon type="edit" /></Tooltip>,
                <Tooltip title="分享"><Icon type="share-alt" /></Tooltip>,
              ]}
            >
              <Card.Meta
                avatar={<Avatar size="small" src={item.avatar} />}
                title={item.title}
              />
              <div className={styles.cardItemContent}>
                <CardInfo
                  activeUser={formatWan(item.activeUser)}
                  newUser={numeral(item.newUser).format('0,0')}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default connect(({project, loading}) => ({project, loading}))(ProjectSub)

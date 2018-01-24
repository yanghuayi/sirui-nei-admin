import React from 'react'
import {List, Card} from 'antd'
import moment from 'moment';
import {AvatarList} from 'components'
import {connect} from 'dva'
import {Link} from 'dva/router'

import styles from './projectList.less'

const ProjectList = ({project, loading, match}) => {
  let {dataSource} = project
  console.log(project)
  const listProps = {
    rowKey: 'id',
    loading: loading.effects['project/getList'],
    grid: {gutter: 24, lg: 4, md: 3, sm: 2, xs: 1},
    dataSource,
  }
  return (
    <div className={styles.projectList}>
      <List
        {...listProps}
        renderItem={item => (
          <List.Item>
            <Link to={`${match.url}/sub/${item.id}`}>
              <Card
                className={styles.card}
                hoverable
                cover={<img alt={item.title} src={item.cover} height={154}/>}
              >
                <Card.Meta
                  title={<span>{item.title}</span>}
                  description={item.subDescription}
                />
                <div className={styles.cardItemContent}>
                  <span>{moment(item.updatedAt).fromNow()}</span>
                  <div className={styles.avatarList}>
                    <AvatarList size="mini">
                      {
                        item.members.map((member, i) => (
                          <AvatarList.Item
                            key={`${item.id}-avatar-${i}`}
                            src={member.avatar}
                            tips={member.name}
                          />
                        ))
                      }
                    </AvatarList>
                  </div>
                </div>
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  )
}

export default connect(({project, loading}) => ({project, loading}))(ProjectList)

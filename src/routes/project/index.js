import React from 'react'
import PropTypes from 'prop-types'
import {Switch, Route, Redirect} from 'dva/router'
import {connect} from 'dva'
import {Page} from 'components'
import dynamic from "dva/dynamic"

import LeftMenu from './LeftMenu'

import styles from './index.less'

const Project = ({apps, project, loading, match, history}) => {
  const {menuData} = project
  const LeftMenuProps = {
    menuData,
    menuLoading: loading.effects['project/getMenu'],
    onMenuClick(item) {
      console.log(item)
    }
  }
  const routes = [
    {
      path: `${match.path}`,
      component: dynamic({
        app: apps,
        models: () => [import('models/project')],
        component: () => import('./rightPage/ProjectList'),
      }),
    },
    {
      path: `${match.path}/sub/:id`,
      component: dynamic({
        app: apps,
        models: () => [import('models/project')],
        component: () => import('./rightPage/ProjectSub'),
      })
    },
  ]
  return (
    <Page className={styles.project}>
      <LeftMenu {...LeftMenuProps}/>
      <Switch>
        {
          routes.map(({path, component}, key) => (
            <Route
              key={key}
              exact
              path={path}
              component={component}
            />
          ))
        }
      </Switch>
    </Page>
  )
}

Project.propTypes = {
  project: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({app, project, loading}) => ({app, project, loading}))(Project)

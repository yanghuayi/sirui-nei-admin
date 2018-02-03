import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import dynamic from 'dva/dynamic'

import LeftMenu from './LeftMenu'

import styles from './index.less'

const Project = ({apps, project, dispatch, loading, match}) => {
  const { menuData, backShow } = project
  const LeftMenuProps = {
    menuData,
    backShow,
    dispatch,
    menuLoading: loading.effects['project/getMenu'],
    onMenuClick (item) {
      console.log(item)
    },
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
        models: () => [import('models/projectSub')],
        component: () => import('./rightPage/ProjectSub'),
      }),
    },
    {
      path: `${match.path}/addInterface`,
      component: dynamic({
        app: apps,
        component: () => import('./rightPage/AddInterface'),
      }),
    },
    {
      path: `${match.path}/detail`,
      component: dynamic({
        app: apps,
        component: () => import('./rightPage/projectMain/index'),
      }),
    },
    {
      path: `${match.path}/interfaceDetail`,
      component: dynamic({
        app: apps,
        component: () => import('./rightPage/InterfaceDetail'),
      }),
    },
  ]
  return (
    <Page className={styles.project}>
      <LeftMenu {...LeftMenuProps} />
      <Switch>
        {
          routes.map(({ path, component }, key) => (
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
  apps: PropTypes.object,
  project: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  match: PropTypes.object,
}

export default connect(({ project, loading}) => ({ project, loading}))(Project)

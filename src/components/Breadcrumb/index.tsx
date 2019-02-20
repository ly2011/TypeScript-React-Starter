import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

interface breadcrumbItemProps {
  title: string
  active: boolean
}

const Breadcrumb = (breadcrumb: Array<breadcrumbItemProps>) =>
  breadcrumb &&
  breadcrumb.length && (
    <ol className={styles.breadcrumb}>
      {breadcrumb.map((item: breadcrumbItemProps) => (
        <li className={styles[item.active ? 'active' : '']}>
          item.active ? <Fragment>{item.title}</Fragment> :{' '}
          <Fragment>
            <Link to="/">{item.title}</Link>
            <span className="divider">/</span>
          </Fragment>
        </li>
      ))}
    </ol>
  )
export default Breadcrumb

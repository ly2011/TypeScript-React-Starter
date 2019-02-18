import React from 'react'

import styles from './index.module.scss'
class Topics extends React.Component {
  render() {
    return (
      <section className={styles.container}>
        <div className="main">
          <div className="content">
            <header className={styles.header}>
              <h3>Topics - 我是标题</h3>
            </header>
          </div>
        </div>
      </section>
    )
  }
}

export default Topics
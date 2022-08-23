import React from 'react'
import * as styles from './TabContentAsPlainBlock.module.scss'

const TabContentAsPlainBlock = (tabItem) => {
  return (
    <div
      className={`${styles.TabContentAsPlainBlock} plainCopyTabWrapper ${
        tabItem.medPadding ? 'padding--med' : ''
      }`}
    >
      <div className="TabContentAsPlainBlock__wrap">
        <h2
          dangerouslySetInnerHTML={{ __html: tabItem?.sectionData?.title }}
        ></h2>
        {tabItem.sectionData.tabReference.map((cardItem, index) => (
          <div
            className="content-wrapper"
            key={index}
            style={{ marginBottom: '40px' }}
          >
            <h3 dangerouslySetInnerHTML={{ __html: cardItem?.title }}></h3>
            <p
              dangerouslySetInnerHTML={{
                __html: cardItem?.titleLongDescription?.titleLongDescription
              }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TabContentAsPlainBlock

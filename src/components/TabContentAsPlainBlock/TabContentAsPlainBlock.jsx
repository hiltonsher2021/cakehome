import React from 'react'
import * as styles from './TabContentAsPlainBlock.module.scss'

const TabContentAsPlainBlock = (tabItem) => {
  console.log("tabItem", tabItem)
  return (
    <div className="plainCopyTabWrapper">
      <h2 dangerouslySetInnerHTML={{ __html: tabItem?.sectionData?.tabTitle }}></h2>
      {tabItem.sectionData.tabReference.map((cardItem, index) => (
            <div className="container" style={{marginBottom: "60px"}}>
              <div className="PlainCopyBlock__wrap">
                  <h3 dangerouslySetInnerHTML={{ __html: cardItem?.title }}></h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: cardItem?.subTitle
                    }}
                  ></p>
              </div>
            </div>
        )
      )}
    </div>
  )
}

export default TabContentAsPlainBlock

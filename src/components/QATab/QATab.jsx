import React, { useEffect, useState } from 'react'
import * as styles from './QATab.module.scss'
import HeaderCopyCtaSmall from 'components/HeaderCopyCtaSmall/HeaderCopyCtaSmall'

const QATab = (data) => {
  let tabData = data?.tabData?.items;
  let tabItem = []
  const [tabDetails, setTabDetails] = useState([])
  const [indexValue, setIndex] = useState(0)

  useEffect(() => {
    if (tabDetails.length === 0) {
      chooseTabSection(0)
    }
  }, [tabDetails])

  const chooseTabSection = (e) => {
    setIndex(e)
    tabItem = tabData?.map((value) => {
      return value.tabReference
    })
    setTabDetails(tabItem[e || 0])
  }


  return (
    <div className={`${styles.QATab}`}>
      <div className="QATab__wrap">
        <div className="QATab__tab-btn-holder">
          {tabData.map((item, index) => {
            return (
              <>
                <button
                  className={`tab-btn ${
                    item?.tabTitle === 'Refinance Advice'
                      ? 'purple'
                      : item?.tabTitle === 'Purchase Advice'
                      ? 'orange'
                      : 'green'
                  }
                  ${(indexValue === index) ? 'active' : ''}`}
                  key={index}
                  onClick={(e) => chooseTabSection(index)}
                >
                  {item?.tabTitle}
                </button>
              </>
            )
          })}
        </div>
        <div
          className={`QATab__tab-pane ${
            (indexValue === 0) ? 'purple' : (indexValue === 1) ? 'orange' : 'green'
          }`}
        >
          <figure className="QATab__tab-pane-bg">
            {' '}
            <img src="/images/QA-tab-bg-logo.png" alt="QA-tab-bg-logo" />
          </figure>

          <div className="QATab__tab-pane-holder">
            {tabDetails[0]?.cardItems?.map((item, index) => {
              return (
                <div className="QATab__tab-pane-item" key={index}>
                  <HeaderCopyCtaSmall value={item} multipleItems={true} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QATab

import React from 'react'
import * as styles from './ExpertKnowledge.module.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import VideoCopyCard from 'components/VideoCopyCard/VideoCopyCard'
import sectionModel from 'models/Section'

const ExpertKnowledge = (data) => {
  let image
  let modeledData = []
  let itemsList = []
  const showCalculator = (e) => {
    data.showModal('refinance')
  }
  if (data) {
    let filterData = data?.sectionData.filter((item) => {
      if (item?.handle?.includes('2')) return item
    })
    modeledData = sectionModel(filterData[0])
    itemsList = modeledData?.sectionReference[0]
  }
  return (
    <div className={`${styles.ExpertKnowledge}`}>
      <div className="container">
        <div className="ExpertKnowledge__title-wrapper">
          <h2>{modeledData?.mainTitle}</h2>
          <p  dangerouslySetInnerHTML={{ __html: modeledData?.description?.description }} ></p>
          {/* <p>{modeledData?.subTitle}</p> */}
        </div>
        {/* Commented as videos are not available */}
        {/* <div className="ExpertKnowledge__card-wrapper">
          {itemsList?.items.map((item, index) => {
            return (
              <div className="ExpertKnowledge__card" key={index}>
                <VideoCopyCard videoDetails={item} />
              </div>
            )
          })}
        </div>
        <div className="ExpertKnowledge__cta-wrapper" onClick={showCalculator}>
          <a className="btn dark">{modeledData?.ctaText}</a>
        </div> */}
      </div>
    </div>
  )
}

export default ExpertKnowledge

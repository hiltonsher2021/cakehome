import React from 'react'
import * as styles from './HowItWorks.module.scss'
import EasyStepsCard from 'components/EasyStepsCard/EasyStepsCard'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import sectionModel from 'models/Section'
import CheckYourSavings from 'components/CheckYourSavings/CheckYourSavings'


const HowItWorks = (data) => {
  let modeledData = [];
  let filterData = [];

  if (data) {
    switch(data?.handle) {
      case 'homepage':
        filterData = data.sectionData.filter((item) => {
          if (item.handle === '2') return item
        })
        break;
      case 'getstarted':
        filterData = data.sectionData.filter((item) => {
          if (item.handle.includes('2')) return item
        })
        break;
    }

    modeledData = sectionModel(filterData[0])
  }

  return (
    <div className={`${styles.HowItWorks} isgerstarted-works`}>
      {/* // new class added */}
      <div className="container container--sm">
        {/* <h2 className="title">{modeledData?.mainTitle}</h2>
        <h3 className="sub-title">{modeledData?.subTitle}</h3>
        <p className="copy">{modeledData?.description?.description}</p> */}
        <div className="easy-step-wrapper">
          <EasyStepsCard tabData={modeledData?.sectionReference} description={modeledData?.description?.description}/>
          {/* <p className="copy mob">{modeledData?.description?.description}</p> */}
        </div>
      </div>
    </div>
  )
}

export default HowItWorks

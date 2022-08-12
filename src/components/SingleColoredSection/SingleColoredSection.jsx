import React from 'react'
import * as styles from './SingleColoredSection.module.scss'
import EasyStepsCardSingle from 'components/EasyStepsCardSingle/EasyStepsCardSingle'
import sectionModel from 'models/Section'

const SingleColoredSection = (data) => {
  let modeledData = []
  let filterData = []
console.log("here", data)
  if (data) {
    switch (data?.handle) {
      case 'homepage':
        filterData = data.sectionData.filter((item) => {
          if (item.handle === '2') return item
        })
        break
      case 'getstarted':
        filterData = data.sectionData.filter((item) => {
          if (item.handle.includes('2')) return item
        })
        break
    }

    modeledData = sectionModel(filterData[0])
  }

  console.log("here2", modeledData)

  return (
    <div
      className={`${styles.HowItWorks} ${
        data?.handle === 'getstarted' ? 'isGetstarted-works' : ''
      } `}
    >
      <div className="container container--sm">
        <div className="easy-step-wrapper">
          <EasyStepsCardSingle
            tabData={modeledData?.sectionReference}
            description={modeledData?.description?.description}
            handle={data?.handle}
            bgColor={data?.bgColor}
            tabIndex={data?.tabIndex}
          />
        </div>
      </div>
    </div>
  )
}

export default SingleColoredSection

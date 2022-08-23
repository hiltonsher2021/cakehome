import React from 'react'
import * as styles from './SingleColoredSection.module.scss'
import EasyStepsCardSingle from 'components/EasyStepsCardSingle/EasyStepsCardSingle'
import sectionModel from 'models/Section'

const SingleColoredSection = (data) => {
  let modeledData = []
  let filterData = []

  if (data) {
    switch (data?.handle) {
      case 'frontpage':
        filterData = data.sectionData.filter((item) => {
          if (item.handle === '32') return item
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

  return (
    <div
      className={`${styles.HowItWorks} ${
        data?.handle === 'getstarted' ? 'isGetstarted-works' : ''
      } ${data?.noTopPadding ? 'no-top-padding' : ''} ${
        data?.noCssPos ? 'no-pos' : ''
      }`}
    >
      <div className="container container--sm">
        <div
          className={`easy-step-wrapper ${
            data?.noInnerTopMargin ? 'no-top-margin' : ''
          }`}
        >
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

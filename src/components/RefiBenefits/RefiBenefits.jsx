import React from 'react'
import * as styles from './RefiBenefits.module.scss'
import IconCopyCard from 'components/IconCopyCard/IconCopyCard'
import CtaBig from 'components/CtaBig/CtaBig'
import sectionModel from 'models/Section'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import api from 'utils/api'

const RefiBenefits = (data) => {
  let modeledData = []
  let image
  let filterData = []
  const showCalculator = (e) => {
    data.showModal(data?.handle === 'refinance' ? 'refinance' : 'purchase')
  }

  if (data) {
    switch (data?.handle) {
      case 'refinance':
        filterData = data.sectionData.filter((item) => {
          if (item?.handle.includes('2')) return item
        })
        break
      case 'homepurchase':
        filterData = data.sectionData.filter((item) => {
          if (item.handle.includes('3')) return item
        })
        break
    }
    modeledData = sectionModel(filterData[0])
    image = getImage(modeledData?.image?.gatsbyImageData)
  }
  return (
    <div className={`${styles.RefiBenefits} ${modeledData?.backgroundColour}`}>
      <div className="container">
        <div className="RefiBenefits__title-wrap">
          <h2>{modeledData?.mainTitle}</h2>
          <p>{modeledData?.subTitle}</p>
        </div>
        <div className="RefiBenefits__main-wrap">
          <div className="left-side">

            <div className="cake-video">
              {data?.handle === 'refinance' ? (
                <img src="/images/Cake_Refi_iphonex-clay-nocursor.gif" alt="Refinance gif" />
              ) : (
                <img src="/images/Cake_Purchase_iphonex-clay-nocursor.gif" alt="Homepurchase gif" />
              )}
            </div>
          </div>
          <div className="right-side">
            {modeledData?.sectionReference.map((item, index) => {
              return (
                <div className="RefiBenefits__card-wrap" key={index}>
                  <IconCopyCard
                    cardData={item}
                    fontColour={
                      modeledData?.backgroundColour === 'orange'
                        ? 'light'
                        : 'dark'
                    }
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className="RefiBenefits__cta-wrapper" onClick={showCalculator}>
          <CtaBig
            ctaText={modeledData?.ctaText}
            ctaMobText={modeledData?.ctaMobText}
          />
          {/* ctaLink={modeledData?.ctaLink} */}
        </div>
      </div>
    </div>
  )
}

export default RefiBenefits

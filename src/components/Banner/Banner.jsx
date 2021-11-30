import React from 'react'
import * as styles from './Banner.module.scss'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import sectionModel from 'models/Section'
import CtaBig from 'components/CtaBig/CtaBig'

const Banner = (data) => {
  let modeledData;
  let image;
  if (data) {
    let filterData = data.bannerData.filter((item) => {
      if (item.handle === '0') return item
    })
    modeledData = sectionModel(filterData[0]);
    image = getImage(modeledData?.image?.gatsbyImageData)
  }

  const showCalculator = (e) => {
    data.showModal(data?.handle === 'refinance' ? 'refinance' : 'purchase');
  }

  return (
    <div className={`${styles.cakebanner} ${ data?.handle} ${data?.className}`}>
      <div className="container">
        <div className="banner__wrapper">
          <div className="banner__contents">
            <span className="eyebrow">
              {modeledData?.headerText}
            </span>
            <h1>{modeledData?.mainTitle} </h1>
            <div className="banner__image--mobile">
            {(data?.handle !== 'homepurchase' ) ? (
              <GatsbyImage
                className="banner__image-img"
                image={image}
                alt={modeledData?.image?.title || ""}
              />
            ) : (
            <img src="/images/Door02_OrgangeColor.gif" alt="Door02_OrgangeColor"/>
            )}
            </div>
            <p>{modeledData?.subTitle?.subTitle}</p>


            {data?.handle === 'homepurchase' &&
              <div className="banner__copy-cta-wrap" onClick={showCalculator}>
              {/* home purchase page only*/}
              <CtaBig ctaText={modeledData?.ctaText} ctaMobText={modeledData?.ctaMobText} />
            </div>}




          </div>
          <div className="banner__image">
          {(data?.handle !== 'homepurchase' ) ? (
              <GatsbyImage
                className="banner__image-img"
                image={image}
                alt={modeledData?.image?.title || ""}
              />
            ) : (
            <img src="/images/Door02_OrgangeColor.gif" alt="Door02_OrgangeColor"/>
            )}
          </div>
        </div>
        {(modeledData?.ctaText && data?.handle !== 'homepurchase' )&& (
          <div className="banner__cta-wrapper"  onClick={showCalculator}>
            <CtaBig ctaText={modeledData?.ctaText} ctaMobText={modeledData?.ctaMobText} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Banner

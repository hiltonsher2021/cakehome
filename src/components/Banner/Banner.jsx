import React from 'react'
import * as styles from './Banner.module.scss'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import sectionModel from 'models/Section'
import CtaBig from 'components/CtaBig/CtaBig'
import { Link } from 'gatsby'

const Banner = (data) => {
  let modeledData
  let { campaignUrl } = data
  let image
  if (data) {
    let filterData = data.bannerData.filter((item) => {
      if (item.handle === '0') return item
    })
    modeledData = sectionModel(filterData[0])
    image = getImage(modeledData?.image?.gatsbyImageData)
  }

  const showCalculator = (e) => {
    data.showModal(data?.handle === 'refinance' ? 'refinance' : 'purchase')
  }

  const getHomePageData = (handle) => {
    if (handle === 'homepage' || handle === 'frontpage') {
      return 'homepage'
    } else {
      return handle
    }
  }

  return (
    <div className={`${styles.cakebanner} ${getHomePageData(data?.handle)} ${data?.className}`}>
      <div className="container">
        <div className="banner__wrapper">
          <div className="banner__contents">
            <span className="eyebrow">{modeledData?.headerText}</span>
            {data?.handle === 'frontpage' ? (
              <span className="span_like_header">{modeledData?.mainTitle}</span>
            ) : (
              <h1>{modeledData?.mainTitle}</h1>
            )}
            <div className="banner__image--mobile">
              {data?.handle !== 'homepurchase' ? (
                <GatsbyImage
                  className="banner__image-img"
                  image={image}
                  alt={modeledData?.image?.title || ''}
                  backgroundColor="transparent"
                />
              ) : (
                <img
                  src="https://images.ctfassets.net/ptoa5hrem9k5/4sYBLhWRQzcQb4cgbW970K/8a396bfcf3999e1a0f5885a7ba637740/door-opened-orange-colours-smily.gif"
                  alt="Door Opened Orange Colours smily"
                />
              )}
            </div>
            {(data?.handle === 'homepage' || data?.handle === 'frontpage') && (
            <div className="banner__copy-cta-wrap">
              <Link
                title={`${modeledData?.ctaText}`}
                to={`${modeledData?.ctaUrl}`}
                className="btn dark hid-desktop-cta"
              >
                {modeledData?.ctaText}
              </Link>
            </div>
            )}
            <p  dangerouslySetInnerHTML={{ __html: modeledData?.subTitle?.subTitle }} ></p>
            {data?.handle === 'homepurchase' && (
              <div className="banner__copy-cta-wrap">
                {/* home purchase page only*/}
                <CtaBig
                  ctaText={modeledData?.ctaText}
                  ctaMobText={modeledData?.ctaMobText}
                  campaignUrl={campaignUrl}
                />
              </div>
            )}

            {/* Home page CTA section */}
            {(data?.handle === 'homepage' || data?.handle === 'frontpage') && (
              <div className="banner__copy-cta-wrap">
                {/* home page only*/}
                {/* add class hid-dsktp */}
                <Link
                  title={`${modeledData?.ctaText}`}
                  to={`${modeledData?.ctaUrl}`}
                  className="btn dark hid-mob-cta"
                >
                  {modeledData?.ctaText}
                </Link>
              </div>
            )}
            {/* End of Home page CTA section */}
          </div>
          <div className="banner__image">
            {data?.handle !== 'homepurchase' ? (
              <GatsbyImage
                className="banner__image-img"
                image={image}
                alt={modeledData?.image?.title || ''}
                backgroundColor="transparent"
              />
            ) : (
              <img
                src="https://images.ctfassets.net/ptoa5hrem9k5/4sYBLhWRQzcQb4cgbW970K/8a396bfcf3999e1a0f5885a7ba637740/door-opened-orange-colours-smily.gif"
                alt="Door Opened Orange Colours smily"
              />
            )}
          </div>
        </div>
        {modeledData?.ctaText &&
          data?.handle !== 'homepurchase' && data?.handle !== 'frontpage' &&
          data?.handle !== 'homepage' && data?.handle !== 'refinance' && (
            <div className="banner__cta-wrapper" onClick={showCalculator}>
              <CtaBig
                ctaText={modeledData?.ctaText}
                ctaMobText={modeledData?.ctaMobText}
                campaignUrl={campaignUrl}
              />
            </div>
          )}
        {modeledData?.ctaText &&
          data?.handle === 'refinance' && data?.handle !== 'homepurchase' && (
            <div className="banner__cta-wrapper">
              <CtaBig
                ctaText={modeledData?.ctaText}
                ctaMobText={modeledData?.ctaMobText}
                campaignUrl={campaignUrl}
              />
            </div>
          )}
      </div>
    </div>
  )
}

export default Banner

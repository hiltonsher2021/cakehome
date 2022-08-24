import React from 'react'
import Slider from 'react-slick'
import * as styles from './AdviceBlock.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import AdviceCard from 'components/AdviceCard/AdviceCard'
import sectionModel from 'models/Section'

const AdviceBlock = (data) => {
  let modeledData = []
  let modeledRefiAdviceData = []
  let mainCard = []
  let mainRefiAdviceCardData = []
  let refiAdviceArticleList = []
  let carouselData = []
  let articleList = []
  let carouselFirstTwoData = []
  let carouselRefiAdviceData = []
  let carouselRefiAdviceFirstTwoData = []
  let filterAdviceData = []
  let filterRefiAdviceData = []

  if (data?.sectionData) {
    filterRefiAdviceData = data?.sectionData.filter((item) => {

      if (item?.handle?.includes('3')) {
        return item
      }
    })

    filterAdviceData = data?.sectionData.filter((item) => {
      if (item?.handle?.includes('8')) {
        return item
      }
    })

    if(filterRefiAdviceData.length !== 0) {
      modeledData = sectionModel(filterRefiAdviceData[0])
    modeledData?.section.map((item) => {
      if (item?.name === 'Article list') {
        articleList = item
      } else {
        mainCard = item
      }
      splitFirstTwoData(articleList?.items)
    })
    }

    function splitFirstTwoData(data) {
      data?.map((item, index) => {
        if (index <= 1) {
          carouselFirstTwoData.push(item)
        } else {
          carouselData.push(item)
        }
      })
    }
    function splitFirstTwoDataRefi(data) {
      data?.map((item, index) => {
        if (index <= 1) {
          carouselRefiAdviceFirstTwoData.push(item)
        } else {
          carouselRefiAdviceData.push(item)
        }
      })
    }

    if(filterAdviceData.length !== 0) {
      modeledRefiAdviceData = sectionModel(filterAdviceData[0])
      modeledRefiAdviceData?.section.map((item) => {
        if (item?.name === 'Article list') {
          refiAdviceArticleList = item
        } else {
          mainRefiAdviceCardData = item
        }
        splitFirstTwoDataRefi(refiAdviceArticleList?.items)
      })
    }

  }
  var settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: '28px',
    responsive: [
      {
        breakpoint: 9999,
        settings: 'unslick',
      },
      {
        breakpoint: 479,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    ],
  }
  return (
    <div>
      {modeledData.length !== 0 && (
        <>
          {/* <div className={`${styles.AdviceBlock}`}>
            <div className="container">
              <div className="AdviceBlock__title-wrap">
                <h2>{modeledData?.mainTitle}</h2>
                <p>{modeledData?.subTitle?.subTitle}</p>
              </div>
              <div className="AdviceBlock__article-wrap">
                <div className="AdviceBlock_card-main">
                  <div className="AdviceCardMain">
                    <span className="eyebrow">{mainCard?.footerText}</span>
                    <h4>{mainCard?.title}</h4>
                    <p>{mainCard?.subTitle?.subTitle} </p>
                    <a className="btn dark" href="#">
                      {mainCard?.ctaText}
                    </a>
                  </div>
                </div>
                {carouselFirstTwoData?.map((item, index) => {
                  return (
                    <div className="AdviceBlock_card" key={index}>
                      <AdviceCard cardData={item} />
                    </div>
                  )
                })}
              </div>

              <Slider
                {...settings}
                className="AdviceBlock__article-wrap mob-slider"
              >
                {carouselData?.map((item, index) => {
                  return (
                    <div className="AdviceBlock_card" key={index}>
                      <AdviceCard cardData={item} />
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div> */}

          <div className={`${styles.AdviceBlock} posRelative`}>
            <span id="home-buy-advice"></span>
            <div className="container">
              <div className="AdviceBlock__title-wrap">
                <h2>{modeledRefiAdviceData?.mainTitle}</h2>
                <p>{modeledRefiAdviceData?.subTitle?.subTitle}</p>
              </div>
              <div className="AdviceBlock__article-wrap">
                <div className="AdviceBlock_card-main">
                  <div className="AdviceCardMain">
                    <span className="eyebrow">
                      {mainRefiAdviceCardData?.footerText}
                    </span>
                    <h4>{mainRefiAdviceCardData?.title}</h4>
                    <p>{mainRefiAdviceCardData?.subTitle} </p>
                    <a className="btn dark" href="#">
                      {mainRefiAdviceCardData?.ctaText}
                    </a>
                  </div>
                </div>
                {carouselRefiAdviceFirstTwoData?.map((item, index) => {
                  return (
                    <div className="AdviceBlock_card" key={index}>
                      <AdviceCard cardData={item} />
                    </div>
                  )
                })}
              </div>

              <Slider
                {...settings}
                className="AdviceBlock__article-wrap mob-slider"
              >
                {carouselRefiAdviceData?.map((item, index) => {
                  return (
                    <div className="AdviceBlock_card" key={index}>
                      <AdviceCard cardData={item} />
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AdviceBlock

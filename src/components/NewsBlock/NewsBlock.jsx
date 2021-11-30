import React from 'react'
import Slider from 'react-slick'
import * as styles from './NewsBlock.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import sectionModel from 'models/Section'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { AnchorLink } from 'gatsby-plugin-anchor-links'

const NewsBlock = (data) => {
  let modeledData = [];
  let image;

  if (data) {
    let filterData = data?.sectionData.filter((item) => {
      if (item?.handle?.includes('4')) return item
    })
    if(filterData.length !== 0) {
      modeledData = sectionModel(filterData[0]);
      image = getImage(modeledData?.image?.gatsbyImageData);
    }

  }
  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 9999,
        settings: 'unslick',
      },
      {
        breakpoint: 480,
        speed: 500,
      },
    ],
  }
  return (
    <div className={`${styles.NewsBlock}`}>
      {modeledData.length !== 0 &&
      <div className="container">
      <div className="NewsBlock__wrapper">
        <div className="NewsBlock__holder desktop">
          <div className="NewsBlock__card-hold main">
            <div className="NewsBlock__card main">
              <span className="eyebrow">{modeledData?.mainTitle}</span>
              <figure>
                <GatsbyImage
                  image={image}
                  className="NewsBlock__logo"
                  alt={modeledData?.image?.title}
                />
              </figure>
            </div>
          </div>
          {modeledData?.sectionReference?.map((item, index) => {
            return (
              <div className="NewsBlock__card-hold" key={index}>
                <div className="NewsBlock__card">
                  <h6>{item?.title}</h6>
                  <p>{item?.subTitle}</p>
                  <a className="readmore" href="#">
                    {item?.ctaText}
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        <Slider {...settings} className="NewsBlock__holder mobile">
          {modeledData?.sectionReference?.map((item, index) => {
            return (
              <div className="slide NewsBlock__card-hold">
                <div className="NewsBlock__card">
                  <h6>{item?.title}</h6>
                  <p>{item?.subTitle}</p>
                  <a className="readmore" href="#">
                    {item?.ctaText}
                  </a>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
    }
    </div>
  )
}

export default NewsBlock

import React from 'react'
import Slider from 'react-slick'
import * as styles from './RefiTestimonials.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import sectionModel from 'models/Section'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import RefiTestimonialCard from 'components/RefiTestimonialCard/RefiTestimonialCard'

const RefiTestimonials = (data) => {
  let modeledData
  let image
  let iconImage
  let iconsList = [];
  let starList = [];
  let filterData= [];
  let testimonialList = [];

  if (data) {
    switch(data?.handle) {
      case 'refinance':
        filterData = data?.sectionData.filter((item) => {
          if (item?.handle?.includes('5')) return item
        })
        break;
      case 'homepurchase':
        filterData = data?.sectionData.filter((item) => {
          if (item?.handle?.includes('4')) return item
        })
        break;
    }
    modeledData = sectionModel(filterData[0]);

    modeledData?.sectionReference.filter((item) => {
      if (item.name === 'Social media icons list') {
        iconsList = item;
      } else if(item.name === 'Star lists') {
        starList = item;
      } else {
        testimonialList = item;
      }
    })
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
        breakpoint: 768,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    ],
  }
  return (
    <div className={`${styles.RefiTestimonials} ${data?.className}`}>
      <div className="container">
        <div className="RefiTestimonials__title-wrap">
          <h2>{modeledData?.mainTitle}</h2>
          <div className="RefiTestimonials__social-wrap">
            {iconsList?.items.map((item, index) => {
              iconImage = getImage(item?.image?.gatsbyImageData)
              return (
                <AnchorLink key={index}>
                  <GatsbyImage image={iconImage} alt={item?.image?.title} />
                </AnchorLink>
              )
            })}
          </div>
        </div>
        <div className="RefiTestimonials-desktopCards">
          <div className="RefiTestimonials__Wrapper">
            {/* Main card */}
            <div className="RefiTestimonials__item">
              <div className="RefiTestimonialCard main">
                <div className="RefiTestimonialCard__top">
                  <h2>{modeledData?.mainTitle}</h2>
                </div>
                <div className="RefiTestimonialCard__middle">
                  <p>{modeledData?.subTitle}</p>
                </div>
                <div className="RefiTestimonialCard__bottom">
                  <div className="RefiTestimonialCard__mn-social-wrap">
                    {iconsList?.items.map((item, index) => {
                      iconImage = getImage(item?.image?.gatsbyImageData)
                      return (
                        <AnchorLink key={index}>
                          <GatsbyImage
                            image={iconImage}
                            alt={item?.image?.title}
                          />
                        </AnchorLink>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            {testimonialList?.cardItems.map((value, index) => {
              return (
                <div className="RefiTestimonials__item" key={index}>
                  <RefiTestimonialCard cardData={value} starList={starList} />
                </div>
              )
            })}
          </div>
        </div>
        {/* slider for mobile without first card */}
        <div className="RefiTestimonials-sliderMob">
          <Slider {...settings} className="RefiTestimonials__Wrapper">
            {testimonialList?.cardItems.map((value, index) => {
              return (
                <div className="RefiTestimonials__item" key={index}>
                  <RefiTestimonialCard cardData={value} starList={starList}/>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default RefiTestimonials

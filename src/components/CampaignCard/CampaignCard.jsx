import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import * as styles from './CampaignCard.module.scss'
import RefiTestimonialCard from 'components/RefiTestimonialCard/RefiTestimonialCard'
import TestimonialCard from 'components/TestimonialCard/TestimonialCard'
import sectionModel from 'models/Section'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const CampaignCard = (data) => {
  let modeledData
  let modeledIcons
  let modeledStarList
  let image
  let iconImage
  let iconsList = []
  let starList = []
  let filterData = []
  let testimonialList = []


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        slidesToShow: 3,
        slidesToScroll: 1,
      },
      {
        breakpoint: 768,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    ],
  }
  return (
    <div className={`${styles.CampaignCard} purchase`}>
      <div className="container">
        <div className="CampaignCard__title-wrap">
          <h2>{modeledData?.mainTitle}</h2>
          <div className="CampaignCard__social-wrap">
            {/* {iconsList?.items.map((item, index) => {
              iconImage = getImage(item?.image?.gatsbyImageData)
              return (
                <AnchorLink key={index}>
                  <GatsbyImage image={iconImage} alt={item?.image?.title} />
                </AnchorLink>
              )
            })} */}
          </div>
        </div>

        <div className="CampaignCard__title-wrap">
          <h2>Title</h2>
        </div>
        <div className="CampaignCard-desktopCards">
          {/* slider section */}
          <Slider {...settings} className="CampaignCard__Wrapper">
            <div className="CampaignCard__item">
              <TestimonialCard />
            </div>
            <div className="CampaignCard__item">
              <TestimonialCard />
            </div>
            <div className="CampaignCard__item">
              <TestimonialCard />
            </div>
            <div className="CampaignCard__item">
              <TestimonialCard />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default CampaignCard

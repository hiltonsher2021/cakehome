import React from 'react'
import Slider from 'react-slick'
import * as styles from './CampaignBanner.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CampaignBanner = (data) => {
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
      Banner component
      {/* Add slider component here */}
      {/* <Slider
                {...settings}
              >1</Slider> */}
    </div>
  )
}

export default CampaignBanner

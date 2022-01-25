import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import * as styles from './CampaignCard.module.scss'
import RefiTestimonialCard from 'components/RefiTestimonialCard/RefiTestimonialCard'

const CampaignCard = (data) => {
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
    <div className={`${styles.CampaignCard} purchase`}>
      <div className="container">
        <div className="CampaignCard__title-wrap">
          <h2>Title</h2>
        </div>
        <div className="CampaignCard-desktopCards">
          {/* slider section */}
          <Slider {...settings} className="CampaignCard__Wrapper">
            <div className="CampaignCard__item">
              <RefiTestimonialCard />
            </div>
            <div className="CampaignCard__item">
              <RefiTestimonialCard />
            </div>
            <div className="CampaignCard__item">
              <RefiTestimonialCard />
            </div>
            <div className="CampaignCard__item">
              <RefiTestimonialCard />
            </div>
          </Slider>

          {/* <div className="CampaignCard__Wrapper">
            <div className="CampaignCard__item">
              <RefiTestimonialCard />
            </div>
            <div className="CampaignCard__item">
              <RefiTestimonialCard />
            </div>
            <div className="CampaignCard__item">
              <RefiTestimonialCard />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default CampaignCard

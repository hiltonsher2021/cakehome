import React from 'react'
import * as styles from './Carousel.module.scss'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Carousel = (data) => {
  let carouselItems = data.carouselData.cardItems
  let carouselItemsDesktop = []
  carouselItemsDesktop = groupArray(carouselItems, 2)

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
    ],
  }

  function groupArray(data, n) {
    var group = []
    for (var i = 0, j = 0; i < data.length; i++) {
      if (i >= n && i % n === 0) j++
      group[j] = group[j] || []
      group[j].push(data[i])
    }
    return group
  }

  return (
    <div className={`${styles.Carousel}`}>
      <div className="dsktp">
        <Slider {...settings}>
          {carouselItemsDesktop.map((itemData, indexData) => {
            return (
              <div className="slider-card-wrap" key={indexData}>
                {itemData.map((item, index) => {
                  return (
                    <div className="slider-card" key={index}>
                      <div className="slider-card-top">
                        <h4 className="slider-card-caption">{item?.title}</h4>
                      </div>
                      <div className="slider-card-middle">
                        <p>{item?.subTitle}</p>
                      </div>
                      <div className="slider-card-bottom">
                        <span className="foot-note">{item?.footerText}</span>
                        <span className="foot-social">
                          <a href="#">
                            <img src="/images/google.png" alt="google" />
                          </a>
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </Slider>
      </div>
      <div className="mob">
        <Slider {...settings}>
          {carouselItems.map((item, index) => {
            return (
              <div className="slider-card" key={index}>
                <div className="slider-card-top">
                  <h4 className="slider-card-caption">{item?.title}</h4>
                </div>
                <div className="slider-card-middle">
                  <p>{item?.subTitle}</p>
                </div>
                <div className="slider-card-bottom">
                  <span className="foot-note">{item?.footerText}</span>
                  <span className="foot-social">
                    <a href="#">
                      <img src="/images/google.png" alt="google" />
                    </a>
                  </span>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default Carousel

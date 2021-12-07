import React from 'react'
// import Plx from 'react-plx';
import Slider from 'react-slick'
import { useEffect, useState } from 'react'
import * as styles from './ImageAnimation.module.scss'
import sectionModel from 'models/Section'

const ImageAnimation = (data) => {
  let filterData = []
  let modeledData = []
  let image

  // const parallaxData1 = [
  //   {
  //     start: 'self',
  //     duration: 700,
  //     properties: [
  //       {
  //         startValue: 150,
  //         endValue: 0,
  //         property: 'translateY',
  //       },
  //     ],
  //   },
  // ];

  // const parallaxData2 = [
  //   {
  //     start: 'self',
  //     duration: 700,
  //     properties: [
  //       {
  //         startValue: 220,
  //         endValue: 0,
  //         property: 'translateY',
  //       },
  //     ],
  //   },
  // ];

  var settingsDsktop = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: false,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: function (currentSlide, nextSlide) {
      document
        .getElementsByClassName('dsktpSlider')[0]
        .classList.toggle('reverse')
    },
  }
  var settingsMob = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: false,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: function (currentSlide, nextSlide) {
      document
        .getElementsByClassName('mobSlider')[0]
        .classList.toggle('reverse')
    },
  }

  const showCalculator = (e) => {
    data.showModal('refinance')
  }

  if (data) {
    switch (data?.handle) {
      case 'refinance':
        filterData = data.sectionData.filter((item) => {
          if (item?.handle.includes('3')) return item
        })
        break
      case 'homepage':
        filterData = data.sectionData.filter((item) => {
          if (item.handle === '4') return item
        })
        break
      case 'aboutcake':
        filterData = data.sectionData.filter((item) => {
          if (item.handle.includes('6')) return item
        })
        break
    }
    modeledData = sectionModel(filterData[0])
    // image = getImage(modeledData?.image?.gatsbyImageData)
  }
  const [calculatorOpen, toggleCalculator] = useState(false)
  const [calculatorValue, setCalculatorDiv] = useState('')
  const [indexValue, setIndexValue] = useState('')

  const handleCalculatorToggle = (value) => {
    toggleCalculator(value)
  }
  const handleCalculatorClose = (value) => {
    for (let el of document.querySelectorAll('.sgi-wrapper'))
      el.style.display = 'none'

    handleCalculatorToggle(value)
    setCalculatorDiv('')
    let elementBlock = document.getElementById('ImageAnimation__wrap')
    elementBlock.setAttribute('style', 'display: block')
    document.getElementsByTagName('BODY')[0].classList.remove('isModal')
  }

  const handleCalculatorOpen = (value, name, colour) => {
    setCalculatorDiv(value)
    setIndexValue(value)
    handleCalculatorToggle(true)
    let elementsTitle = document.querySelector(
      '.' + colour + '-wrapper .sgi-wrapper:nth-child(' + (value + 1) + ')'
    )
    let elementBlock = document.getElementById('ImageAnimation__wrap')
    for (let el of document.querySelectorAll('.sgi-wrapper'))
      el.style.display = 'none'

    elementBlock.setAttribute('style', 'display: none')
    elementsTitle.setAttribute('style', 'display: block')
    document.getElementsByTagName('BODY')[0].classList.add('isModal')
  }

  return (
    <div
      className={`${styles.ImageAnimation} ${modeledData?.backgroundColour} ${data?.className}`}
      id="refi-calculator-section"
    >
      <div className="container">
        <div id="ImageAnimation__wrap">
          <div className="ImageAnimation__wrap">
            <div className="ImageAnimation__copy">
              <span className="eyebrow">{modeledData?.footerText}</span>
              <h2>{modeledData?.mainTitle}</h2>
              {modeledData?.subTitle && <h2>{modeledData?.subTitle}</h2>}
              <div className="figure-holder">
                <Slider
                  {...settingsMob}
                  className="ImageAnimationSlider mobSlider"
                >
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-1.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-2.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-3.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-4.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-5.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-6.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-7.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-8.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-9.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-10.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-11.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-12.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-13.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                  <div className="ImageAnimationSlide">
                    <figure>
                      <img
                        src="/images/customer-review-14.png"
                        alt="Customer Review"
                      />
                    </figure>
                  </div>
                </Slider>
              </div>
              <p>{modeledData?.description?.description}</p>
              {modeledData?.sectionReference?.map((item, index) => {
                if (data?.handle !== 'aboutcake') {
                  return (
                    <button
                      className={`btn ${index % 2 ? 'light' : 'dark'}`}
                      key={index}
                      data-element={item?.title}
                      onClick={showCalculator}

              /* Commented as Signal intent is not working */
                      // onClick={() =>
                      //   handleCalculatorOpen(
                      //     index,
                      //     item?.title,
                      //     modeledData?.backgroundColour
                      //   )
                      // }
                    >
                      {item?.title}
                    </button>
                  )
                } else if (data?.handle === 'aboutcake') {
                  return (
                    <button
                      className={`btn dark`}
                      key={index}
                      data-element={item?.title}
                    >
                      {item?.title}
                    </button>
                  )
                }
              })}
            </div>
            <div className="ImageAnimation__figure">
              <Slider
                {...settingsDsktop}
                className="ImageAnimationSlider dsktpSlider"
                id="ImageAnimationSlider"
              >
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-1.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-2.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-3.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-4.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-5.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-6.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-7.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-8.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-9.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-10.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-11.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-12.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-13.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
                <div className="ImageAnimationSlide">
                  <figure>
                    <img
                      src="/images/customer-review-14.png"
                      alt="Customer Review"
                    />
                  </figure>
                </div>
              </Slider>
            </div>
          </div>
        </div>
        <div
          id="calculatorContainer"
          className={`calculatorContainer ${
            calculatorValue !== '' ? 'anim' : ''
          }`}
          style={{ display: calculatorValue !== '' ? 'block' : 'none' }}
        >
          <div className="calculatorContainer__wrapper">
            <button
              className="menu-close"
              onClick={() => handleCalculatorClose(false)}
            >
              <img src="/images/menu-close.svg" alt="close button" />
            </button>
            <div className={`${modeledData?.backgroundColour}-wrapper`}>
              <div className="sgi-wrapper">
                <div
                  id="sgi"
                  data-guid="b34b1d74-dfd7-4952-85df-b36cbef511d8"
                ></div>
              </div>
              <div className="sgi-wrapper">
                <div
                  id="sgi"
                  data-guid="939c5277-29a7-4626-9eb4-36166fb48734"
                ></div>
              </div>
              <div className="sgi-wrapper">
                <div
                  id="sgi"
                  data-guid="ce70efb1-59c1-4b68-aed5-e41ef1626d8e"
                ></div>
              </div>
            </div>
            <div className="calculatorContainer__ad">
              {/* <figure>
                <img src="/images/cake-ad.jpg" alt="Cake" />
              </figure> */}
              {indexValue === 0 ? (
                <>
                  <img
                    src="/images/Mortgage-Payoff-Calculator.gif"
                    alt="Mortgage-Payoff-Calculator"
                  />
                </>
              ) : indexValue === 1 ? (
                <img src="/images/home-refinance.gif" alt="Home refinance" />
              ) : (
                <img src="/images/cashOut.gif" alt="Cash out" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageAnimation

import React from 'react'
import { useEffect, useState } from 'react'
import * as styles from './CalculatorScript.module.scss'
import sectionModel from 'models/Section'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

const CalculatorScript = (data) => {
  let { campaignUrl } = data
  let filterData = []
  let modeledData = []
  let image

  if (data) {
    switch (data?.handle) {
      case 'refinance':
        filterData = data?.sectionData.filter((item) => {
          if (item?.handle?.includes('4')) return item
        })
        break
      case 'homepage':
      case 'frontpage':
        filterData = data?.sectionData.filter((item) => {
          if (item?.handle === '5' || item?.handle === '35') return item
        })
        break
    }
    modeledData = sectionModel(filterData[0])
    image = getImage(modeledData?.image?.gatsbyImageData)
  }

  const [calculatorOpen, toggleCalculator] = useState(false)
  const [calculatorValue, setCalculatorDiv] = useState('')

  const showCalculator = (e) => {
    if(data?.handle === 'refinance') {
      data.showModal('refinance')
    }else {
      data.showModal('purchase')
    }
  }

  const handleCalculatorToggle = (value) => {
    toggleCalculator(value)
  }
  const handleCalculatorClose = (value) => {
    for (let el of document.querySelectorAll('.sgi')) el.style.display = 'none'

    handleCalculatorToggle(value)
    setCalculatorDiv('')
    let elementBlock = document.getElementById('CalculatorScript__wrap')
    elementBlock.setAttribute('style', 'display: block');
    document.getElementsByTagName("BODY")[0].classList.remove("isModal");
  }

  const handleCalculatorOpen = (value, name, colour) => {
    setCalculatorDiv(value)
    handleCalculatorToggle(true)
    let elementsTitle
    if (data?.handle === 'refinance') {
      elementsTitle = document.querySelector(
        '.' + colour + '-wrapper .sgi:nth-child(' + (value + 4) + ')'
      )
    } else {
      elementsTitle = document.querySelector(
        '.' + colour + '-wrapper .sgi:nth-child(' + (value + 1) + ')'
      )
    }

    let elementBlock = document.getElementById('CalculatorScript__wrap')
    for (let el of document.querySelectorAll('.sgi')) el.style.display = 'none'

    elementBlock.setAttribute('style', 'display: none')
    elementsTitle.setAttribute('style', 'display: block')
    document.getElementsByTagName("BODY")[0].classList.add("isModal")
  }

  return (
    <div
      className={`${styles.CalculatorScript} ${modeledData?.backgroundColour} ${data?.className}`}
      id="home-calculator-section"
    >
      <div className="container">
        <div id="CalculatorScript__wrap">
          <div className="CalculatorScript__wrap">
            <div className="CalculatorScript__copy">
              <span className="eyebrow">{modeledData?.footerText}</span>
              <h2>{modeledData?.mainTitle}</h2>
              {modeledData?.subTitle?.subTitle && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: modeledData?.subTitle?.subTitle,
                  }}
                ></p>
              )}
              <div className="figure-holder">
                <GatsbyImage
                  className="banner__image-img"
                  image={image}
                  alt={modeledData?.image?.title}
                />
              </div>
              <p  dangerouslySetInnerHTML={{ __html: modeledData?.description?.description }} ></p>
              {modeledData?.sectionReference.map((item, index) => {
                return (
                  <Link
                    className={`btn ${index % 2 ? 'light' : 'dark'}`}
                    key={index}
                    data-element={item?.title}
                    to={campaignUrl}
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
                  </Link>
                )
              })}
            </div>
            <div className="CalculatorScript__figure">
              <div className="figure-holder">
                <GatsbyImage
                  className="banner__image-img"
                  image={image}
                  alt={modeledData?.image?.title}
                />
              </div>
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
              <img src="/images/menu-close.svg" alt="close-menu" />
            </button>
            <div className={`${modeledData?.backgroundColour}-wrapper`}>
              <div className="sgi">
                <div
                  id="sgi"
                  data-guid="1ac6be03-d77d-483b-bb1d-2d41188b51f0"
                ></div>
              </div>
              <div className="sgi">
                <div
                  id="sgi"
                  data-guid="e00f784a-91cc-4818-af76-61aeaac2a33a"
                ></div>
              </div>
              <div className="sgi">
                <div
                  id="sgi"
                  data-guid="4290fc81-aec8-4cf7-938a-8de326a1b714"
                ></div>
              </div>
              <div className="sgi">
                <div
                  id="sgi"
                  data-guid="ce70efb1-59c1-4b68-aed5-e41ef1626d8e"
                ></div>
              </div>
            </div>
            <div className="calculatorContainer__ad">
              {/* <figure> */}

                {data?.handle !== 'refinance' ? (
                <>
                <img src="/images/New-home-all.gif" alt="Home refinance" />
                </>
              ) : (
                <img src="https://images.ctfassets.net/ptoa5hrem9k5/CoWV8aFDjqUl0WxpxBP19/606b474236e275ff37a3312a9f4030c6/your-equity-your-cash-your-dream.gif" alt="Your Equity Your Cash Your Dream" />
              )}
              {/* </figure> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculatorScript

import React from 'react'
import { useEffect, useState } from 'react'
import * as styles from './MonthlyPaymentCalculator.module.scss'
import sectionModel from 'models/Section'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const MonthlyPaymentCalculator = (data) => {
  let filterData = []
  let modeledData = []
  let image

  if (data) {
    filterData = data?.sectionData.filter((item) => {
      if (item?.handle?.includes('7')) return item
    })
    modeledData = sectionModel(filterData[0])
    image = getImage(modeledData?.image?.gatsbyImageData)
  }
  const [calculatorOpen, toggleCalculator] = useState(false)
  const [calculatorValue, setCalculatorDiv] = useState('')

  const handleCalculatorToggle = (value) => {
    toggleCalculator(value)
  }
  const handleCalculatorClose = (value) => {
    handleCalculatorToggle(value)
    setCalculatorDiv('')
    let elementBlock = document.getElementById('MonthlyPaymentCalculator__wrap')
    elementBlock.setAttribute('style', 'display: block')
    document.getElementsByTagName("BODY")[0].classList.remove("isModal");
  }

  const handleCalculatorOpen = (value) => {
    setCalculatorDiv(value)

    handleCalculatorToggle(true)
    let elementsTitle = document.querySelector(
      '.' + 'green' + '-wrapper .sgi-wrapper-class'
    )
    let elementBlock = document.getElementById('MonthlyPaymentCalculator__wrap')

    elementBlock.setAttribute('style', 'display: none')
    elementsTitle.setAttribute('style', 'display: block')
    document.getElementsByTagName("BODY")[0].classList.add("isModal");
  }

  useEffect(() => {
    // load app assets
  }, [])

  return (
    <div className={`${styles.MonthlyPaymentCalculator} green small-copy-sec refi purchase`}>
      <div className="container">
        <div id="MonthlyPaymentCalculator__wrap">
          <div className="MonthlyPaymentCalculator__wrap">
            <div className="MonthlyPaymentCalculator__copy">
              <span className="eyebrow">{modeledData?.footerText}</span>
              <h2>{modeledData?.mainTitle}</h2>
              {modeledData?.subTitle && <h2>{modeledData?.subTitle}</h2>}
              <div className="figure-holder">
                <GatsbyImage
                  className="banner__image-img"
                  image={image}
                  alt={modeledData?.title}
                />
              </div>
              <p dangerouslySetInnerHTML={{ __html: modeledData?.description?.description }}></p>
              {/* /* Commented as Signal intent is not working */}
              {/* <button
                className={`btn dark`}
                data-element={modeledData?.ctaText}
                onClick={() => handleCalculatorOpen(modeledData?.ctaText)}
              >
                {modeledData?.ctaText}
              </button> */}
            </div>
            <div className="MonthlyPaymentCalculator__figure">
              <div className="figure-holder">
              <img src="/images/HouseUpgrade.gif" alt="HouseUpgrade" />
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
              <img src="/images/menu-close.svg" alt="close button" />
            </button>
            <div className={`green-wrapper`}>
              <div className="sgi-wrapper-class">
                <div
                  id="sgi"
                  data-guid="1ac6be03-d77d-483b-bb1d-2d41188b51f0"
                ></div>
              </div>
            </div>

            <div className="calculatorContainer__ad">
              {/* <figure> */}
              <img src="/images/New-home-all.gif" alt="New home all" />
              {/* </figure> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthlyPaymentCalculator

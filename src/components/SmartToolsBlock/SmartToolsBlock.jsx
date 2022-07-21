import React, { useEffect, useState } from 'react'
import * as styles from './SmartToolsBlock.module.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import SmartToolsCard from 'components/SmartToolsCard/SmartToolsCard'
import ImageTransform from 'components/ImageTransform/ImageTransform'
import sectionModel from 'models/Section'

const SmartToolsBlock = (data) => {
  const [calculatorValue, setCalculatorDiv] = useState('')
  const [calculatorOpen, toggleCalculator] = useState(false)
  const [indexValue, setIndexValue] = useState('')

  let modeledData = []

  if (data) {
    let filterData = data.sectionData.filter((item) => {
      if (item.handle.includes('2')) return item
    })
    modeledData = sectionModel(filterData[0])
  }
  const ImageTransformoptions = {
    max: 5,
    perspective: 500,
    scale: 1.05,
  }
  const handleCalculatorToggle = (value) => {
    toggleCalculator(value)
  }

  const handleCalculatorClose = (value) => {
    for (let el of document.querySelectorAll('.sgi')) el.style.display = 'none'
    handleCalculatorToggle(value)
    setCalculatorDiv('')
    document.getElementsByTagName('BODY')[0].classList.remove('isModal')
  }

  const handleCalculatorOpen = (value) => {
    setCalculatorDiv(value)
    setIndexValue(value)
    handleCalculatorToggle(true)
    let elementsTitle
    elementsTitle = document.querySelector(
      '.colour-wrapper .sgi:nth-child(' + (value + 1) + ')'
    )
    for (let el of document.querySelectorAll('.sgi')) el.style.display = 'none'
    elementsTitle.setAttribute('style', 'display: block')
    document.getElementsByTagName('BODY')[0].classList.add('isModal')
  }
  return (
    <div className={`${styles.SmartToolsBlock}`}>
      <div className="container">
        {/* <div className="SmartToolsBlock__title-wrap">
          <h2>
            <a className="dskt-res" href={modeledData?.ctaLink}>
              {modeledData?.mainTitle}
            </a>
          </h2>
          <h5>{modeledData?.subTitle?.subTitle}</h5>
        </div> */}
        <div className="SmartToolsBlock__card-wrap">
          {modeledData?.section.map((item, index) => {
            return (
              <div
                className="SmartToolsBlock__card"
                key={index}
                onClick={() => handleCalculatorOpen(index)}
              >
                <ImageTransform options={ImageTransformoptions}>
                  <SmartToolsCard cardData={item} />
                </ImageTransform>
              </div>
            )
          })}
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
          <div className="colour-wrapper">
            <div className="sgi">
              <div
                id="sgi"
                data-guid="1ac6be03-d77d-483b-bb1d-2d41188b51f0"
              ></div>
            </div>
            <div className="sgi">
              <div
                id="sgi"
                data-guid="939c5277-29a7-4626-9eb4-36166fb48734"
              ></div>
            </div>
            <div className="sgi">
              <div
                id="sgi"
                data-guid="ce70efb1-59c1-4b68-aed5-e41ef1626d8e"
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
                data-guid="1058623c-775d-4e95-b9fc-bb035e7f9e32"
              ></div>
            </div>
          </div>
          <div className="calculatorContainer__ad">
            {/* <figure>
              </figure> */}
            {indexValue === 0 || indexValue === 3 || indexValue === 4 ? (
              <>
                <img src="/images/New-home-all.gif" alt="New home gif" />
              </>
            ) : indexValue === 1 ? (
              <img src="/images/home-refinance.gif" alt="Home refinance" />
            ) : indexValue === 2 ? (
              <img src="https://images.ctfassets.net/ptoa5hrem9k5/CoWV8aFDjqUl0WxpxBP19/606b474236e275ff37a3312a9f4030c6/your-equity-your-cash-your-dream.gif" alt="Your Equity Your Cash Your Dream" />
            ) : (
              <img src="/images/cake-ad.jpg" alt="Cake" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmartToolsBlock

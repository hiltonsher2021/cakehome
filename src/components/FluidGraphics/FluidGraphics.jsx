import React from 'react'
import { useEffect, useState } from 'react'
import * as styles from './FluidGraphics.module.scss'
import CtaBig from 'components/CtaBig/CtaBig'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import sectionModel from 'models/Section'

const FluidGraphics = (data) => {
  let image
  let modeledData = []
  if (data) {
    let filterData = data?.sectionData.filter((item) => {
      if (item?.handle.includes('7')) return item
    })
    modeledData = sectionModel(filterData[0])
    image = getImage(modeledData?.sectionReference[0]?.image?.gatsbyImageData)
  }

  const [calculatorOpen, toggleCalculator] = useState(false)
  const [calculatorValue, setCalculatorDiv] = useState('')

  const handleCalculatorToggle = (value) => {
    toggleCalculator(value)
  }
  const handleCalculatorClose = (value) => {
    for (let el of document.querySelectorAll('.sgi-wrapper'))
      el.style.display = 'none'

    handleCalculatorToggle(value)
    setCalculatorDiv('')
    let elementBlock = document.getElementById('FluidGraphics__wrapper')
    elementBlock.setAttribute('style', 'display: block')
    document.getElementsByTagName("BODY")[0].classList.remove("isModal");
  }

  const handleCalculatorOpen = (value, name, colour) => {
    setCalculatorDiv(value)

    handleCalculatorToggle(true)
    let elementsTitle = document.querySelector(
      '.' + colour + '-wrapper .sgi-wrapper:nth-child(' + (value + 1) + ')'
    )
    let elementBlock = document.getElementById('FluidGraphics__wrapper')
    for (let el of document.querySelectorAll('.sgi-wrapper'))
      el.style.display = 'none'

    elementBlock.setAttribute('style', 'display: none')
    elementsTitle.setAttribute('style', 'display: block')
    document.getElementsByTagName("BODY")[0].classList.add("isModal");
  }

  useEffect(() => {
    // load app assets
  }, [])

  return (
    <div className={`${styles.FluidGraphics}`}>
      <div className="container">
        <div id="FluidGraphics__wrapper">
          <div className="FluidGraphics__wrapper">
            <div className="FluidGraphics__graphic">
              <GatsbyImage image={image} alt="image" />
            </div>
            <div className="FluidGraphics__cta-wrapper hid-dsktp">
              {/* classname - FluidGraphics */}
              {/* <CtaBig className="FluidGraphics" ctaText="MONTHLY PAYMENT CALCULATOR" /> */}
            </div>
            {/* Commented as Signal intent is not working  */}

            {/* <div className="FluidGraphics__card-wrapper">
              {modeledData?.sectionReference.map((item) => {
                return (
                  <>
                    {item?.items.map((list, indexValue) => {
                      return (
                        <div className="FluidGraphics__card" key={indexValue}>
                          <h3>{list?.title}</h3>
                          <p className="FluidGraphics__card-copy">
                            {list?.subTitle}
                          </p> */}

                          {/* <a href="#" className="btn dark">
                          {list?.ctaText}
                        </a> */}


                          {/* <div>
                            <button
                              className={`btn dark`}
                              key={indexValue}
                              data-element={list?.ctaText}
                              onClick={() =>
                                handleCalculatorOpen(
                                  indexValue,
                                  list?.ctaText,
                                  modeledData?.backgroundColour
                                )
                              }
                            >
                              {list?.ctaText}
                            </button>
                          </div> */}
                        {/* </div>
                      )
                    })}
                  </>
                )
              })}
            </div> */}

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
                  data-guid="e00f784a-91cc-4818-af76-61aeaac2a33a"
                ></div>
              </div>
              <div className="sgi-wrapper">
                <div
                  id="sgi"
                  data-guid="4290fc81-aec8-4cf7-938a-8de326a1b714"
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

export default FluidGraphics

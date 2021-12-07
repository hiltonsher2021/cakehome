import React from 'react'
import { useEffect, useState } from 'react'
import * as styles from './CopyFigure2Column.module.scss'
import sectionModel from 'models/Section'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'


const CopyFigure2Column = (data) => {
  let filterData = []
  let modeledData = []
  let image

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
    image = getImage(modeledData?.image?.gatsbyImageData)
  }
  const [calculatorOpen, toggleCalculator] = useState(false)
  const [calculatorValue, setCalculatorDiv] = useState('')
  const [indexValue, setIndexValue] = useState('')

  const showCalculator = (e) => {
    data.showModal('purchase')
  }

  const handleCalculatorToggle = (value) => {
    toggleCalculator(value)
  }
  const handleCalculatorClose = (value) => {
    for (let el of document.querySelectorAll('.sgi-wrapper'))
      el.style.display = 'none'

    handleCalculatorToggle(value)
    setCalculatorDiv('')
    let elementBlock = document.getElementById('CopyFigure2Column__wrap')
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
    let elementBlock = document.getElementById('CopyFigure2Column__wrap')
    for (let el of document.querySelectorAll('.sgi-wrapper'))
      el.style.display = 'none'

    elementBlock.setAttribute('style', 'display: none')
    elementsTitle.setAttribute('style', 'display: block')
    document.getElementsByTagName('BODY')[0].classList.add('isModal')
  }

  return (
    <div
      className={`${styles.CopyFigure2Column} ${modeledData?.backgroundColour} ${data?.className} posRelative`}
    >
      <span id={data?.handle}></span>
      <div className="container">
        <div id="CopyFigure2Column__wrap">
          <div className="CopyFigure2Column__wrap">
            <div className="CopyFigure2Column__copy">
              <span className="eyebrow">{modeledData?.footerText}</span>
              <h2>{modeledData?.mainTitle}</h2>
              {modeledData?.subTitle && <h2>{modeledData?.subTitle}</h2>}
              <div className="figure-holder">
                <GatsbyImage
                  className="banner__image-img"
                  image={image}
                  alt={modeledData?.image?.title}
                />
              </div>
              <p>{modeledData?.description?.description}</p>
              {modeledData?.sectionReference?.map((item, index) => {
                if (data?.handle !== 'aboutcake') {
                  return (
                    <Link
                      className={`btn dark`}
                      key={index}
                      to={item?.link}
                    >
                      {item?.title}
                    </Link>

                      /* Commented as Signal intent is not working */

                      // onClick={() =>
                      //   handleCalculatorOpen(
                      //     index,
                      //     item?.title,
                      //     modeledData?.backgroundColour
                      //   )
                      // }
                    // >
                    //   {item?.title}
                    // </button>
                  )
                } else if (data?.handle === 'aboutcake') {
                  return (
                    <a
                      className={`btn dark`}
                      key={index}
                      href={item?.linkPath}
                      target="_blank"
                    >
                      {item?.title}
                    </a>
                  )
                }
              })}
            </div>
            <div className="CopyFigure2Column__figure">
              <div className="figure-holder">
                {data?.handle === 'refinance' ? (
                  <img src="/images/Pig2Bull.gif" alt="Pig2bull" />
                ) : (
                  <GatsbyImage
                    className="banner__image-img"
                    image={image}
                    alt={modeledData?.image?.title}
                  />
                )}
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
            <div className={`${modeledData?.backgroundColour}-wrapper`}>
              <div className="sgi-wrapper">
                <div
                  id="sgi"
                  data-guid="939c5277-29a7-4626-9eb4-36166fb48734"
                ></div>
              </div>
              <div className="sgi-wrapper">
                <div
                  id="sgi"
                  data-guid="b34b1d74-dfd7-4952-85df-b36cbef511d8"
                ></div>
              </div>
              {/* <div className="sgi-wrapper">
                <div
                  id="sgi"
                  data-guid="1058623c-775d-4e95-b9fc-bb035e7f9e32"
                ></div>
              </div> */}
            </div>
            <div className="calculatorContainer__ad">
              {/* <figure> */}
              {indexValue === 0 ? (
                <>
                  <img src="/images/home-refinance.gif" alt="Home refinance" />
                </>
              ) : (
                <img
                  src="/images/Mortgage-Payoff-Calculator.gif"
                  alt="Mortgage-Payoff-Calculator"
                />
              )}
              {/* </figure> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CopyFigure2Column

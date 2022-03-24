import React, { useEffect, useState } from 'react'
import * as styles from './PurchaseProcessBlock.module.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import IconCopyCtaCard from 'components/IconCopyCtaCard/IconCopyCtaCard'
import sectionModel from 'models/Section'

const PurchaseProcessBlock = (data) => {
  let { campaignUrl } = data

  let modeledData = []

  const [calculatorValue, setCalculatorDiv] = useState('')
  const [calculatorOpen, toggleCalculator] = useState(false)

  const handleCalculatorToggle = (value) => {
    toggleCalculator(value)
  }

  const showModalText = (value) => {
    data.showModal(value)
  }

  const handleCalculatorClose = (value) => {
    for (let el of document.querySelectorAll('.sgi')) el.style.display = 'none'

    handleCalculatorToggle(value)
    setCalculatorDiv('')
    document.getElementsByTagName('BODY')[0].classList.remove('isModal')
  }

  const handleCalculatorOpen = (value) => {
    if (value !== 1) {
      setCalculatorDiv(value)
      handleCalculatorToggle(true)
      let elementsTitle
      elementsTitle = document.querySelector(
        '.colour-wrapper .sgi:nth-child(' + (value + 1) + ')'
      )
      for (let el of document.querySelectorAll('.sgi'))
        el.style.display = 'none'
      elementsTitle.setAttribute('style', 'display: block')
      document.getElementsByTagName('BODY')[0].classList.add('isModal')
    }
  }

  if (data) {
    let filterData = data?.sectionData.filter((item) => {
      if (item?.handle?.includes('2')) return item
    })
    modeledData = sectionModel(filterData[0])
  }

  return (
    <div className={`${styles.PurchaseProcessBlock}`}>
      <div className="container">
        <div className="PurchaseProcessBlock__wrapper">
          <div className="PurchaseProcessBlock__title-sec">
            <h2>{modeledData?.mainTitle}</h2>
            <p>{modeledData?.subTitle}</p>
          </div>
          <div className="PurchaseProcessBlock__card-wrap">
            {modeledData?.sectionReference.map((item, index) => {
              return (
                <div
                  className="PurchaseProcessBlock__card-item"
                  key={index}
                  // onClick={() =>
                  //   handleCalculatorOpen(index)
                  // }
                >
                  {/* /* Commented as Signal intent is not working - removed 2 items from contentful */}
                  <IconCopyCtaCard
                    cardData={item}
                    indexValue={index}
                    showModalText={showModalText}
                    campaignUrl={campaignUrl}
                  />
                </div>
              )
            })}
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
          <div className="colour-wrapper">
            <div className="sgi">
              <div
                id="sgi"
                data-guid="e00f784a-91cc-4818-af76-61aeaac2a33a"
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
  )
}

export default PurchaseProcessBlock

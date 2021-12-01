import React, { useEffect, useState } from 'react'
import Reel from 'react-reel'
import * as styles from './RateBanner.module.scss'
import RateDetailCard from 'components/RateDetailCard/RateDetailCard'
import CtaBig from 'components/CtaBig/CtaBig'
import sectionModel from 'models/Section'
import api from 'utils/api'
import ReactTooltip from 'react-tooltip'
import { Link } from 'gatsby'

const isBrowser = typeof window !== 'undefined'

const RateBanner = (data) => {
  const [currentTab, setCurrentTab] = useState('refinance')
  let [tabSectionValue, setSection] = useState('rate')
  let parseDataRefinance = []
  let parseDataPurchase = []
  let responseRefinanceData = []
  let responsePurchaseData = []

  const setValues = () => {
    api({
      url: 'rates/latest',
      method: 'GET',
      // params: {
      //   page: 1
      // },
    }).then((response) => {
      response?.data?.data?.filter((item) => {
        if (item?.job === 1) {
          responsePurchaseData = item
        } else {
          responseRefinanceData = item
        }
      })
      parseDataRefinance = JSON.parse(responseRefinanceData?.json_response)
      parseDataPurchase = JSON.parse(responsePurchaseData?.json_response)

      if (currentTab === 'purchase') {
        parseDataPurchase?.products.map((item) => {
          if (item.loanTerm === '30' && tabSectionValue === 'apr') {
            let formatNumber = Number(item?.apr).toFixed(3)
            setValue(formatNumber.toString())
          } else if (item.loanTerm === '30' && tabSectionValue === 'rate') {
            let formatNumberRate = Number(item?.rate).toFixed(3)
            setValue(formatNumberRate.toString())
          }
        })
      } else {
        parseDataRefinance?.products.map((item) => {
          if (item.loanTerm === '10' && tabSectionValue === 'apr') {
            let formatNumber = Number(item?.apr).toFixed(3)
            setValue(formatNumber.toString())
          } else if (item.loanTerm === '10' && tabSectionValue === 'rate') {
            let formatNumberRate = Number(item?.rate).toFixed(3)
            setValue(formatNumberRate.toString())
          }
        })
      }
    })
  }

  useEffect(() => {
    setValues()
  }, [currentTab, tabSectionValue])

  const showCalculator = (e) => {
    data.showModal(currentTab)
  }
  const setSelectedTab = (value) => {
    setCurrentTab(value)
    setSection(tabSectionValue)
  }

  let bannerDetails = data?.bannerData
  let modeledData = []
  let filterData = []

  if (data) {
    filterData = bannerDetails.filter((item) => {
      if (item?.handle === '1-rates') return item
    })
    modeledData = sectionModel(filterData[0])
  }

  // on viewport slotmachine animation
  let flg = true
  let [rateValue, setValue] = useState('0.000')

  let eventNames = 'scroll load'
  let events = eventNames.split(' ')
  if (isBrowser) {
    for (var i = 0, iLen = events.length; i < iLen; i++) {
      window.addEventListener(events[i], function () {
        var element = document.querySelector('.jsAnimRate')
        if (typeof element != 'undefined' && element != null) {
          var position = element.getBoundingClientRect()

          // checking whether fully visible
          if (
            position.top >= 0 &&
            position.bottom <= window.innerHeight &&
            flg
          ) {
            setValues()
            flg = false
          } else {
            setValue('0.000')
          }
        }
      })
    }
  }

  return (
    <div className={`${styles.RateBanner}`}>
      <div className="container">
        <div className="RateBanner__wrapper">
          <div className="left-side">
            <h1>{modeledData?.mainTitle}</h1>
            <p>{modeledData?.subTitle?.subTitle}</p>
          </div>

          <div className="right-side">
            <div className="RateBanner__main-rate">
              <div className="mn-tab-wrapper">
                <button
                  className={`mntab-btn  ${
                    currentTab === 'refinance' ? 'active refinance' : ''
                  }`}
                  onClick={(e) => setSelectedTab('refinance')}
                >
                  REFINANCE RATES
                </button>
                <button
                  className={`mntab-btn  ${
                    currentTab === 'purchase' ? ' active purchase' : ''
                  }`}
                  onClick={(e) => setSelectedTab('purchase')}
                >
                  PURCHASE RATES
                </button>
              </div>
              <div className="rate-wrapper">
                {' '}
                <span className="rate jsAnimRate">
                  <Reel text={rateValue} />
                </span>
                <span className="right-side-rate">
                  <em>%</em>
                  <span>
                    {tabSectionValue}
                    {/* <sup>1 </sup> */}
                  </span>
                </span>
              </div>
              <div className="tab-wrapper">
                <button
                  className={`tab-btn ${
                    tabSectionValue === 'rate' ? 'active' : ''
                  }`}
                  onClick={() => setSection('rate')}
                >
                  RATE
                </button>
                <button
                  className={`tab-btn ${
                    tabSectionValue === 'apr' ? 'active' : ''
                  }`}
                  onClick={() => setSection('apr')}
                >
                  APR
                </button>
              </div>
              {/* <p className="rate-details">
                Delectus officiis provident fuga debitis porro sint id unde in.
                Et veritatis consequatur beatae eius ut temporibus. Nemo
                accusantium aut iure ut aut aut aut.
              </p> */}
              <p className="rate-details small">
                {/* <sup>*</sup> Rate based on a 10-year refinance / 30-year */}
                {currentTab === 'purchase' ? (
                  <>
                    <span data-tip="Rate based on 30 Year Fixed, 760+ Credit Score, 400k Loan Amount, No Cash Out Refinance, Single Family Primary Residence, LTV <=50%">
                      *Rate Terms
                    </span>
                  </>
                ) : (
                  <>
                    <span data-tip="Rate based on 10 Year Fixed, 760+ Credit Score, 400k Loan Amount, No Cash Out Refinance, Single Family Primary Residence, LTV <=50%">
                      *Rate Terms
                    </span>{' '}
                  </>
                )}
                <a>
                <Link to="/disclosure" title="Disclosure">
                  Disclosure
                </Link>
                </a>

              </p>
              <ReactTooltip
                effect="solid"
                place="top"
                multiline={true}
                className="customTooltip"
              />
            </div>
          </div>
          <div className="RateBanner__cta-wrap">
            {/* className -  RateBanner*/}
            <a><Link to="/disclosure" title="Disclosure">
              Disclosure
            </Link></a>

            <div onClick={showCalculator}>
              <CtaBig ctaText={modeledData?.ctaText} className="RateBanner" />
            </div>
          </div>
        </div>
      </div>
      {/* <PersonalizeRateBlock /> */}
    </div>
  )
}

export default RateBanner

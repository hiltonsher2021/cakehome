import React, { useEffect, useState } from 'react'
import * as styles from './RateCard.module.scss'
import Reel from 'react-reel'
import api from 'utils/api'
import { Link } from 'gatsby'

const isBrowser = typeof window !== 'undefined'

const RateCard = (data) => {
  let cardData = data.value

  // on viewport slotmachine animation
  let flg = true
  let [rateValue, setValue] = useState('0.000')
  let [tabValue, setTab] = useState('')
  let [tabSectionValue, setSection] = useState('rate')
  let [apiResponseForRefinance, setApiResponseForRefinance] = useState([])
  let [apiResponseForPurchase, setApiResponseForPurchase] = useState([])
  let responsePurchaseData = []
  let responseRefinanceData = []
  let parseDataRefinance = []
  let parseDataPurchase = []

  useEffect(() => {
    api({
      url: 'rates/latest',
      method: 'GET',
      // params: {
      //   page: 1
      // },
    }).then((response) => {
        response?.data?.data.filter((item) => {
          if (item?.job === 1) {
            responsePurchaseData = item
          } else {
            responseRefinanceData = item
          }
        })
        parseDataRefinance = JSON.parse(responseRefinanceData?.json_response)
        parseDataPurchase = JSON.parse(responsePurchaseData?.json_response)
        setApiResponseForPurchase(parseDataPurchase)
        setApiResponseForRefinance(parseDataRefinance)
        if (cardData?.title === 'Purchase') {
          parseDataPurchase?.products?.map((item) => {
            if (item?.loanTerm === '30' && tabSectionValue === 'apr') {
              let formatNumber = Number(item?.apr).toFixed(3)
              setValue(formatNumber.toString())
            } else if (item?.loanTerm === '30' && tabSectionValue === 'rate') {
              let formatNumberRate = Number(item?.rate).toFixed(3)
              setValue(formatNumberRate.toString())
            }
          })
        } else {
          parseDataRefinance?.products?.map((item) => {
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
  }, [])

  useEffect(() => {
    if (tabValue === '') {
      if (cardData.title === 'Purchase') {
        setValues('30')
      } else {
        setValues('10')
      }
    } else {
      setValues(tabValue)
    }
  }, [tabSectionValue])

  const setValues = (year) => {
    setTab(year)
        if (cardData?.title === 'Purchase') {
          apiResponseForPurchase?.products?.map((item) => {
            if (item?.loanTerm === year && tabSectionValue === 'apr') {
              let formatNumber = Number(item?.apr).toFixed(3)
              setValue(formatNumber.toString())
            } else if (item?.loanTerm === year && tabSectionValue === 'rate') {
              let formatNumberRate = Number(item?.rate).toFixed(3)
              setValue(formatNumberRate.toString())
            }
          })
        } else {
          apiResponseForRefinance?.products?.map((item) => {
            if (item.loanTerm === year && tabSectionValue === 'apr') {
              let formatNumber = Number(item?.apr).toFixed(3)
              setValue(formatNumber.toString())
            } else if (item.loanTerm === year && tabSectionValue === 'rate') {
              let formatNumberRate = Number(item?.rate).toFixed(3)
              setValue(formatNumberRate.toString())
            }
          })
        }
  }

  const updateCounter = (value) => {
    data.setCounter(value)
  }

  let eventNames = 'scroll load'
  let events = eventNames.split(' ')
  if (isBrowser) {
    for (var i = 0, iLen = events.length; i < iLen; i++) {
      window.addEventListener(events[i], function () {
        // var elmId = document.getElementsByClassName("jsAnimRate")[0].id
        var element = ''
        if (cardData.title === 'Purchase') {
          element = document.getElementById('jsAnimRateorange')
        } else {
          element = document.getElementById('jsAnimRatepurple')
        }
        if (typeof element != 'undefined' && element != null) {
          var position = element.getBoundingClientRect()
          // checking whether fully visible
          if (
            position.top >= 0 &&
            position.bottom <= window.innerHeight - 50 &&
            flg
          ) {
            setValues(tabValue)
            setSection(tabSectionValue)
            flg = false
          } else {
            setValue('0.000')
          }
        }
      })
    }
  }

  return (
    <div>
      <div
        className={`${styles.RateCard} ${
          cardData.title == 'Purchase' ? 'orange' : 'purple'
        }`}
      >
        <h2 className="title">{cardData?.title}</h2>
        <div className="tab-wrapper">
          <button
            className={`tab-btn ${tabSectionValue === 'rate' ? 'active' : ''}`}
            onClick={() => setSection('rate')}
          >
            RATE
          </button>
          <button
            className={`tab-btn ${tabSectionValue === 'apr' ? 'active' : ''}`}
            onClick={() => setSection('apr')}
          >
            APR
          </button>
        </div>
        <div className="rate-wrapper">
          <span
            className={`rate jsAnimRate`}
            id={`jsAnimRate${
              cardData.title == 'Purchase' ? 'orange' : 'purple'
            }`}
          >
            <Reel text={rateValue} />
          </span>
          <span className="right-side">
            <em>%</em>
            <span>
              {tabSectionValue}
              {/* <sup>1</sup> */}
            </span>
          </span>
        </div>
        <div className="year-wrapper">
          <button
            className={`choose-year ${tabValue === '30' ? 'active' : ''}`}
            onClick={() => setValues('30')}
          >
            30 yr Fixed
          </button>
          <button
            className={`choose-year ${tabValue === '20' ? 'active' : ''}`}
            onClick={() => setValues('20')}
          >
            20 yr Fixed
          </button>
          <button
            className={`choose-year ${tabValue === '15' ? 'active' : ''}`}
            onClick={() => setValues('15')}
          >
            15 yr Fixed
          </button>
          <button
            className={`choose-year ${tabValue === '10' ? 'active' : ''}`}
            onClick={() => setValues('10')}
          >
            10 yr Fixed
          </button>
        </div>
        {/* <p className="rate-details">
          Delectus officiis provident fuga debitis porro sint id unde in. Et
          veritatis consequatur beatae eius ut temporibus. Nemo accusantium aut
          iure ut aut aut aut.
        </p> */}
        {/* <a className="btn dark dark--lg" href="#"> */}
        {/* </a> */}
        <button
          title="APPLY NOW"
          className="menu-item btn dark"
          onClick={() => updateCounter(cardData?.title)}
        >
          APPLY NOW
        </button>
        <p className="rate-details small">
          <a href="/terms-conditions">
            <sup>*</sup> <Link to="/disclosure" title="Disclosure">
                  Disclosure
                </Link>
          </a>
        </p>
      </div>
    </div>
  )
}

export default RateCard

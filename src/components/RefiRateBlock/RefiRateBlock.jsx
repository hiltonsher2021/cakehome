import React, { useEffect, useState } from 'react'
import * as styles from './RefiRateBlock.module.scss'
import RefiOtherRates from 'components/RefiOtherRates/RefiOtherRates'
import sectionModel from 'models/Section'
import Reel from 'react-reel'
import ReactTooltip from 'react-tooltip'
import api from 'utils/api'
const isBrowser = typeof window !== 'undefined'

const RefiRateBlock = (data) => {
  let [tabSectionValue, setSection] = useState('rate')
  let flg = true
  let [rateValue, setValue] = useState('0.000')
  let eventNames = 'scroll load'
  let events = eventNames.split(' ')
  let apiResponseForRefinance = []
  let apiResponseForPurchase = []
  let responsePurchaseData = []
  let parseDataRefinance = []
  let parseDataPurchase = []
  let responseRefinanceData = []

  useEffect(() => {
    setValues()
  }, [tabSectionValue])

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
      apiResponseForRefinance = parseDataRefinance
      apiResponseForPurchase = parseDataPurchase
      if (data?.handle === 'homepurchase') {
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

  let modeledData = []
  if (data) {
    let filterData = data?.sectionData.filter((item) => {
      if (item?.handle?.includes('1')) return item
    })
    modeledData = sectionModel(filterData[0])
  }

  // on viewport slotmachine animation
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
    <div className={`${styles.RefiRateBlock}`}>
      <div className="container">
        <div className="RefiRateBlock__Wrapper">
          <h2>{modeledData?.mainTitle}</h2>
          <div className="RefiRateBlock__Rate-wrap">
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
            <div className="rate-wrap">
              <div className="rate-logo">
                <figure>
                  {' '}
                  <img src="/images/cake-logo.png" alt="cake" />
                </figure>
              </div>
              <div className="rate-detailes-wrap">
                <div className="rate-wrapper">
                  {' '}
                  <span className="rate jsAnimRate">
                    <Reel text={rateValue} />
                  </span>
                  <span className="right-side">
                    {' '}
                    <em>%</em>
                    <span>
                      {tabSectionValue}
                      {/* <sup>1</sup> */}
                    </span>
                  </span>
                </div>
                {/* <p className="rate-details">
                  Delectus officiis provident fuga debitis porro sint id unde
                  in. Et veritatis consequatur beatae eius ut temporibus. Nemo
                  accusantium aut iure ut aut aut aut.
                </p> */}
                <p className="rate-details small">
                  {data?.handle === 'homepurchase' ? (
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
                </p>
                <ReactTooltip
                  effect="solid"
                  place="top"
                  multiline={true}
                  className="customTooltip"
                />
              </div>
            </div>
          </div>

          <div className="RefiRateBlock__Other-rate-wrap">
            {modeledData?.sectionReference?.map((item, index) => {
              return <RefiOtherRates key={index} itemData={item} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefiRateBlock

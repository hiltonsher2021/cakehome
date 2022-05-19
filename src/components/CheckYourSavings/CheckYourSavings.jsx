import React, { useEffect, useState } from 'react'
import * as styles from './CheckYourSavings.module.scss'
import sectionModel from 'models/Section'
import { Range, getTrackBackground } from 'react-range'
import api from 'utils/api'
import { Link } from 'gatsby'

const CheckYourSavings = (data) => {
  let { campaignUrl } = data
  let modeledData = []
  let referencedData = []
  let customCalcData = []
  let responseRefinanceData
  let responsePurchaseData
  let parseDataRefinance = []

  const [values, setRangeValue] = useState([''])
  const [parseDataRefinanceValue, setParseDataRefinanceValue] = useState([''])
  const [loanMonths, setLoanMonths] = useState('')
  const [paymentsMade, setPaymentsMade] = useState('')
  const [gif_src, setGifSrc] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [interestDifference, setInterestDifference] = useState(0)
  const [calculatorMessage, setCalculatorMessage] = useState('')
  const [monthCounter, setMonthCounter] = useState(0)
  const [yearCounter, setYearCounter] = useState(0)
  const [differenceNum, setDifferenceNum] = useState(0)
  const [showCustomCalculator, setShowCustomCalculator] = useState(false)
  const [newRangeValue, setNewRangeValue] = useState(0)
  const [showPersonalizeButton, setPersonalizeButton] = useState(false)
  const [differenceInterestRatesMonthly, setDifferenceInterestRatesMonthly] =
    useState(0)

  function onlyNumberKey(evt) {
    // Only ASCII character in that range allowed
    var ASCIICode = evt.which ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
      return false
    } else {
      return true
    }
  }

  const rangeValueChange = (value, isInputValueChange, event) => {
    onlyNumberKey(event)
    let numConv
    var testVal = value[0] || value
    if (isInputValueChange && value !== 0 && value[0] !== '' && value !== []) {
      numConv = testVal.replace(/\,/g, '')
      numConv = parseInt(numConv, 10)
      if (numConv > 2000000) {
        event.preventDefault()
        return
      }
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(numConv)
      setNewRangeValue(test)
      setRangeValue([numConv])
    } else {
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(value)
      setNewRangeValue(test)
      setRangeValue(value)
    }
  }

  useEffect(() => {}, [showCustomCalculator, gif_src, values])

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
      setParseDataRefinanceValue(parseDataRefinance)
    })
  }, [])

  const showCustomCalc = () => {
    setShowCustomCalculator(true)
  }
  const showCalculator = (e) => {
    data.showModal('refinance')
  }

  if (data) {
    let filterData = data.sectionData.filter((item) => {
      if (item.handle === '3') return item
    })
    modeledData = sectionModel(filterData[0])
    referencedData = modeledData?.sectionReference
      ? modeledData?.sectionReference[0]
      : modeledData?.section[0]
    customCalcData = modeledData?.sectionReference
      ? modeledData?.sectionReference[1]
      : modeledData?.section[1]
  }
  const isBrowser = typeof window !== 'undefined'
  const handleSubmit = async (event) => {
    setGifSrc('')
    event.preventDefault()
    calculateLoanFromUser(loanMonths, values, paymentsMade, interestRate)
    setPersonalizeButton(true)

    // Google tag tracking
    if (isBrowser) {
      var { url, gtag } = window
      var callback = function () {
        if (typeof url != 'undefined') {
          window.location = url
        }
      }
      gtag('event', 'conversion', {
        send_to: 'AW-793052739/x_nbCPDS_YYDEMOMlPoC',
        event_callback: callback,
      })
      return false
    }

    // end of Google tag tracking
  }

  function calculateLoanFromUser(
    loanMonths,
    values,
    paymentsMade,
    interestRate
  ) {
    setInterestDifference(0)
    let rate_value
    if (parseDataRefinanceValue?.products.length !== 0) {
      rate_value = parseDataRefinanceValue?.products.filter((item) => {
        if (item.loanTerm === '10') {
          return item.rate
        }
      })
    }
    let start_orig = values[0]
    let d = new Date()
    setGifSrc('/images/Chi-MezCalculatorDoor.gif?cake=' + d.getTime())

    let ir = interestRate
    let payment_schedule = []

    let cake_payment_schedule = []
    let emi =
      (start_orig * ((ir / (12 * 100)) * Math.pow(1 + ir / (12 * 100), 360))) /
      (Math.pow(1 + ir / (12 * 100), 360) - 1)
    let cake_ir = rate_value[0]?.rate // 2.56 (prev value) (value from OB json file)
    let cake_emi = emi // same as normal emi
    let start = undefined
    let cake_start = undefined
    let temp_interest
    let temp_principal
    let end
    let cake_end
    let cake_temp_interest
    let cake_temp_principal
    let interestForDifference = ir / (12 * 100)
    let differenceMonthsRemaining = loanMonths - paymentsMade
    // setMonthsDifference(differenceMonthsRemaining)

    let futureValue =
      values * Math.pow(1 + interestForDifference, paymentsMade) -
      emi *
        ((Math.pow(1 + interestForDifference, paymentsMade) - 1) /
          interestForDifference)

    let emi_cake = (
      (futureValue *
        ((cake_ir / (12 * 100)) *
          Math.pow(1 + cake_ir / (12 * 100), differenceMonthsRemaining))) /
      (Math.pow(1 + cake_ir / (12 * 100), differenceMonthsRemaining) - 1)
    ).toFixed(2)
    setDifferenceInterestRatesMonthly(Math.abs(emi - emi_cake))

    for (var i = 1; i <= 360; i++) {
      if (start == undefined) {
        start = start_orig
      }
      if (start < 0) {
        start = 0
      }
      temp_interest = (((start * ir) / (12 * 100)) * 100) / 100
      if (start < emi) {
        temp_principal = start
      } else {
        if (temp_interest > 0) {
          temp_principal = ((emi - temp_interest) * 100) / 100
        } else {
          temp_principal = 0
        }
      }
      end = start - temp_principal
      payment_schedule.push({
        start: start,
        interest: temp_interest,
        principal: temp_principal,
        end: end,
      })
      start = end

      if (cake_start == undefined) {
        cake_start = start_orig
      }
      if (cake_start < 0) {
        cake_start = 0
      }
      cake_temp_interest = (((cake_start * cake_ir) / (12 * 100)) * 100) / 100
      if (cake_start < cake_emi) {
        cake_temp_principal = cake_start
      } else {
        if (cake_temp_interest > 0) {
          cake_temp_principal = ((cake_emi - cake_temp_interest) * 100) / 100
        } else {
          cake_temp_principal = 0
        }
      }
      cake_end = ((cake_start - cake_temp_principal) * 100) / 100
      cake_payment_schedule.push({
        start: cake_start,
        interest: cake_temp_interest,
        principal: cake_temp_principal,
        end: cake_end,
      })
      if (i > paymentsMade) {
        cake_start = cake_end
      } else {
        cake_start = start
      }
    }

    // setActualInterestRate(temp_interest - cake_temp_interest); // Difference between old and new interest rates (monthly)

    let interest_to_pay = 0
    for (var j = paymentsMade; j < payment_schedule.length; j++) {
      interest_to_pay = interest_to_pay + payment_schedule[j]['interest']
    }

    let cake_interest_to_pay = 0
    for (var j = paymentsMade; j < cake_payment_schedule.length; j++) {
      cake_interest_to_pay =
        cake_interest_to_pay + cake_payment_schedule[j]['interest']
    }

    let difference = (interest_to_pay - cake_interest_to_pay).toFixed(2)
    setDifferenceNum(difference)

    if (difference > 0) {
      let nf = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
      })
      let newNum = nf.format(difference)
      setInterestDifference(newNum)
      setCalculatorMessage('')
    } else {
      setCalculatorMessage(
        'It seems that you have a great rate, it might not be the best time for you to refinance.'
      )
    }

    let run_flag = true
    let month_counter = 0
    let yearCount = 0

    let counter = cake_payment_schedule.length - 1
    while (run_flag) {
      if (cake_payment_schedule[counter]['start'] == 0) {
        month_counter += 1
      } else {
        run_flag = false
      }
      counter = counter - 1
    }
    setMonthCounter(month_counter)
    if (month_counter > 6) {
      setYearCounter(Math.floor(month_counter / 6) / 2)
    }
  }

  return (
    <div className={`${styles.CheckYourSavings}`} id="chi-mez-calculator">
      <div className="container">
        <div className="CheckYourSavings__wrap">
          <div className="CheckYourSavings__top">
            <div className="left-side">
              {' '}
              <span className="eyebrow">{modeledData?.subTitle?.subtitle}</span>
              <h2>{modeledData?.mainTitle}</h2>
            </div>
            <div className="right-side">
              <p>{modeledData?.description?.description} </p>
            </div>
          </div>
          <div className="CheckYourSavings__holder">
            <div className="left-side">
              <h5>{customCalcData?.subTitle}</h5>
              {!showCustomCalculator && (
                <button
                  className={`btn dark hid-dsktp mobile-form-toggle`}
                  onClick={showCustomCalc}
                >
                  {customCalcData?.ctaText}
                  <img src="/images/cake-logo.png" alt="door" />
                  {customCalcData?.footerText}
                </button>
              )}

              <div
                className={`CheckYourSavings__form ${
                  showCustomCalculator ? '' : 'hid-mob'
                }`}
              >
                <form onSubmit={handleSubmit}>
                  <div className="CakeFormWrap">
                    <div className="CakeFieldWrap">
                      <label htmlFor="">Your Current Loan Amount</label>
                      <span className="input--dollar-wrap">
                        <input
                          type="text"
                          value={newRangeValue}
                          max="2000000"
                          placeholder="0"
                          onChange={(e) =>
                            rangeValueChange([e.target.value], true, e)
                          }
                        />
                      </span>

                      <div className="custom-range">
                        <Range
                          step={1000}
                          min={0}
                          max={2000000}
                          values={values}
                          onChange={(e) => rangeValueChange(e, false, e)}
                          renderTrack={({ props, children }) => (
                            <div
                              className="custom-range__track"
                              {...props}
                              style={{
                                ...props.style,
                                background: getTrackBackground({
                                  values: values,
                                  colors: ['white', 'rgba(0,0,0,0.45)'],
                                  min: 0,
                                  max: 2000000,
                                }),
                              }}
                            >
                              {children}
                            </div>
                          )}
                          renderThumb={({ props }) => {
                            return (
                              <div
                                className="custom-range__thumb"
                                {...props}
                                style={{
                                  ...props.style,
                                }}
                              >
                                <span className="thumb-value">${values}</span>
                              </div>
                            )
                          }}
                        />
                      </div>
                    </div>
                    <div className="CakeFieldWrap">
                      <label htmlFor="">Loan Term in Months</label>
                      <input
                        type="text"
                        value={loanMonths}
                        placeholder="360"
                        onChange={(e) => setLoanMonths(e.target.value)}
                      />
                      {loanMonths > 360 && <label>*Max loan term is 360</label>}
                    </div>
                    <div className="CakeFieldWrap">
                      <label htmlFor="">Payments Made</label>
                      <input
                        type="text"
                        placeholder="36"
                        value={paymentsMade}
                        onChange={(e) => setPaymentsMade(e.target.value)}
                      />
                    </div>
                    <div className="CakeFieldWrap">
                      <label htmlFor="">Your Current Interest Rate</label>
                      <input
                        type="text"
                        placeholder="3.5"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                      />
                    </div>
                    <button
                      className={`btn dark ${
                        showCustomCalculator ? 'hid-mob' : ''
                      } ${
                        loanMonths !== 0 &&
                        loanMonths !== '' &&
                        loanMonths < 361 &&
                        values > [0] &&
                        paymentsMade !== 0 &&
                        paymentsMade !== '' &&
                        interestRate !== 0 &&
                        interestRate !== ''
                          ? ''
                          : 'dis-btn'
                      }`}
                      type="submit"
                    >
                      {customCalcData?.ctaText}
                      <img src="/images/cake-logo.png" alt="door" />
                      {customCalcData?.footerText}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div
              className={`right-side ${showCustomCalculator ? '' : 'hid-mob'}`}
            >
              <div
                className={`refinance__wrap ${
                  showPersonalizeButton ? '' : 'personalize_no_button'
                }`}
              >
                {calculatorMessage === '' && (
                  <h3 className="top">
                    Making the same payment with a{' '}
                    <span>Cake Express Refinance</span> could save you more than you realize. The best way to decide if a new mortgage loan is right for you is to calculate your potential savings.
                  </h3>
                )}

                {differenceNum > 0 ? (
                  <>
                    <h2>
                      <span>$</span>
                      {interestDifference}
                    </h2>
                    <h3>in interest over the life of the loan</h3>
                    <h3>
                      And you could own your house{' '}
                      <span className="block">
                        {monthCounter < 11
                          ? monthCounter + ' month(s)'
                          : yearCounter + ' year(s)'}{' '}
                        sooner!
                      </span>
                    </h3>
                    <h3>
                      Or save ${differenceInterestRatesMonthly.toFixed(2)} per
                      month
                    </h3>
                    <span className="small-text">
                      <sup>*</sup> Calculations compare your current cost to
                      cake’s great 10-year rate
                    </span>
                  </>
                ) : (
                  <>
                    <h3>{calculatorMessage}</h3>
                    {calculatorMessage !== '' && (
                      <>
                        <span className="small-text">
                          <sup>*</sup> Calculations compare your current cost to
                          cake’s great 10-year rate
                        </span>
                      </>
                    )}
                  </>
                )}
                {showPersonalizeButton && (
                  <Link className="btn dark d-desktop" to={`${campaignUrl}`}>
                    GET MY PERSONALIZED RATE
                  </Link>
                )}
              </div>
              {/* {showPersonalizeButton && (
                <Link className="btn dark d-mob" to={`${campaignUrl}`}>
                  GET MY PERSONALIZED RATE
                </Link>
              )} */}
              <div
                className={`refinance__image ${
                  differenceNum <= 0 ? '' : 'active'
                }`}
              >
                <img
                  src="/images/Chi-MezCalculatorDoor.png"
                  alt="door"
                  class="imgNormal"
                />
                <img src={gif_src} alt="door" class="imgAnimated" />
              </div>
              {showPersonalizeButton && (
                <Link className="btn dark d-mob" to={`${campaignUrl}`}>
                  GET MY PERSONALIZED RATE
                </Link>
              )}
              {/* <a
                href="http://apply.cakehome.com/"
                target="_blank"
                className="btn dark hid-dsktp"
              >
                APPLY TODAY
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckYourSavings

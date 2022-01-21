import React, { useEffect, useState } from 'react'
import * as styles from './PersonalizeRateBlock.module.scss'
import { Range, getTrackBackground } from 'react-range'
import sectionModel from 'models/Section'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import api from 'utils/api'

const PersonalizeRateBlock = (data) => {
  let bannerDetails = data?.sectionData
  let modeledData = []
  let filterData = []
  let dataContent = []
  let image
  let url = ''

  if (data) {
    filterData = bannerDetails?.filter((item) => {
      if (item?.handle === '1-rates') {
        return item
      } else if (item?.handle === '0' && data?.handle !== 'homepage') {
        return item
      } else if (item?.handle === 'homepage-modal') {
        return item
      }
    })

    modeledData = sectionModel(filterData[0])
    dataContent = modeledData?.sectionReference
      ? modeledData?.sectionReference[0]
      : modeledData?.bannerReference[0]

    image = getImage(dataContent?.image?.gatsbyImageData)
  }
  const [creditRating, setCreditRating] = useState('780')
  const [propertyType, setPropertyType] = useState('SingleFamilyHome')
  const [propertyUse, setPropertyUse] = useState('PrimaryResidence')
  const [propertyValue, setPropertyValue] = useState([0])
  const [newNum, setNewNum] = useState(0)
  const [newCurrentLoanBal, setCurrentLoanBalance] = useState(0)
  const [newCurrentCashout, setNewCurrentCashout] = useState(0)
  const [currentLoanBal, setCurrentLoanBal] = useState([0])
  const [cashOut, setCashOut] = useState([0])
  const [zipCode, setZipCode] = useState('')
  const [urlValue, setUrlValue] = useState('')
  const [showValidationMessage, setShowValidationMessage] = useState(false)
  // const [validationMessage, setValidationMessage] = useState('')

  const closeModal = (e) => {
    data.closeModal()
    resetFormValues()
  }

  const resetFormValues = () => {
    setUrlValue('')
    setZipCode('')
    setCashOut([0])
    setCurrentLoanBal([0])
    setPropertyValue([0])
    setPropertyUse('PrimaryResidence')
    setPropertyType('SingleFamilyHome')
    setCreditRating('780')
    setNewNum(0)
    setCurrentLoanBalance(0)
    setNewCurrentCashout(0)
    setShowValidationMessage(false)
  }

  const setUrl = () => {
    url =
      'http://apply.cakehome.com/partner/4NAXDC5C/search?type=' +
      data?.classname +
      '&zipcode=' +
      zipCode +
      '&purchasePrice=' +
      propertyValue +
      '&downPayment=' +
      currentLoanBal +
      '&cashOut=' +
      cashOut +
      '&creditRange=' +
      creditRating +
      '&propertyUse=' +
      propertyUse +
      '&propertyType=' +
      propertyType
    + '&isAutoClick=1&target=_blank'
    setUrlValue(url)
  }

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
      setNewNum(test)
      setPropertyValue([numConv])
    } else {
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(value)
      setNewNum(test)
      setPropertyValue(value)
    }
    setUrl()
    // }
  }
  const validateZipcode = (data) => {
    if (data.length === 5) {
      fetchValidZipcode(data)
    } else {
      setShowValidationMessage(false)
    }
    setZipCode(data)
  }

  const fetchValidZipcode = (data) => {
    api({
      url: 'zipcodes/search',
      method: 'GET',
      params: {
        zip: data,
      },
    })
      .then((response) => {
        setShowValidationMessage(false)
        // setValidationMessage('')
      })
      .catch(function (error) {
        setShowValidationMessage(true)
        // setValidationMessage(error.message)
      })
  }

  const cashOutValueChange = (value, isInputValueChange, event) => {
    onlyNumberKey(event)
    let numConv
    var testVal = value[0] || value
    if (isInputValueChange && value !== 0 && value[0] !== '' && value !== []) {
      numConv = testVal.replace(/\,/g, '')
      numConv = parseInt(numConv, 10)
      if (numConv > 1000000) {
        event.preventDefault()
        return
      }
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(numConv)
      setNewCurrentCashout(test)
      setCashOut([numConv])
    } else {
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(value)
      setNewCurrentCashout(test)
      setCashOut(value)
    }
    setUrl()
  }
  const currentLoanValueChange = (value, isInputValueChange, event) => {
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
      setCurrentLoanBalance(test)
      setCurrentLoanBal([numConv])
    } else {
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(value)
      setCurrentLoanBalance(test)
      setCurrentLoanBal(value)
    }
    // setCurrentLoanBal(value)
    setUrl()
  }
  useEffect(() => {
    setUrl()
  }, [
    creditRating,
    propertyType,
    propertyUse,
    cashOut,
    currentLoanBal,
    propertyValue,
    zipCode,
    urlValue,
  ])

  const handleChange = (data) => {
    let propertyType = data.replaceAll(' ', '')
    setPropertyType(propertyType)
    setUrl()
  }
  const handleChangeCreditRating = (event) => {
    event.preventDefault()
    setCreditRating(event.target.value)
    setUrl()
  }
  const handleChangePropertyUse = (data) => {
    let propertyUse = data.replaceAll(' ', '')
    setPropertyUse(propertyUse)
    setUrl()
  }

  return (
    // for purchase block add class - "purchase"
    <div className={`${styles.PersonalizeRateBlock} ${data.classname}`}>
      <button className="PersonalizeRateBlock__close" onClick={closeModal}>
        <img src="/images/menu-close.svg" alt="menu-close" />
      </button>
      <div className="container">
        <form>
          <div className="PersonalizeRateBlock__wrap">
            <div className="PersonalizeRateBlock__left-side">
              <img
                className="PersonalizeRateBlock__logo"
                src="/images/cake-logo-big.png"
                alt="cake"
              />

              <h1>{dataContent?.title}</h1>
              <h2>{dataContent?.subTitle}</h2>
              <p>{dataContent?.titleLongDescription?.titleLongDescription}</p>
              <p>{dataContent?.ctaText}</p>
              <p>{dataContent?.footerText}</p>
              {/* <img
                className="PersonalizeRateBlock__foot-image"
                src="/images/door.png"
                alt="cake"
              /> */}
              <GatsbyImage
                className="PersonalizeRateBlock__foot-image"
                image={image}
                alt={modeledData?.image?.title}
              />
            </div>
            <div className="PersonalizeRateBlock__right-side">
              <h5>
                Tell us a bit about your{' '}
                {data.classname === 'refinance' ? 'refinance' : 'home mortgage'}{' '}
                needs
              </h5>
              <div className="CakeFormWrap">
                <div className="CakeFieldWrap">
                  <label htmlFor="">Your credit rating</label>
                  <select
                    defaultValue="740+(Excellent)"
                    value={creditRating}
                    onChange={(e) => handleChangeCreditRating(e)}
                  >
                    {/* <option>Choose Credit rating</option> */}
                    <option value="780" name="740+(Excellent)">
                      740+(Excellent)
                    </option>
                    <option value="730" name="720-730(Very Good)">
                      720-730(Very Good)
                    </option>
                    <option value="710" name="700-719(Good)">
                      700-719(Good)
                    </option>
                    <option value="690" name="680-699(Above Average)">
                      680-699(Above Average)
                    </option>
                    <option value="670" name="660-679(Average)">
                      660-679(Average)
                    </option>
                    <option value="650" name="640-659(Below Average)">
                      640-659(Below Average)
                    </option>
                    <option value="0630" name="620-639(Fair)">
                      620-639(Fair)
                    </option>
                    <option value="610" name="580-619(Poor)">
                      580-619(Poor)
                    </option>
                  </select>
                </div>
                <div className="CakeFieldWrap">
                  <label htmlFor="">Property ZIP code</label>
                  <input
                    type="text"
                    maxlength="5"
                    value={zipCode}
                    onChange={(e) =>
                      validateZipcode(e.target.value.replace(/[^\d.]/gi, ''))
                    }
                  />

                  {showValidationMessage && (
                    <label htmlFor="">
                      Sorry, we're not licensed in this state, yet!
                    </label>
                  )}
                </div>
                <div className="CakeFieldWrap">
                  <label htmlFor="">Property Type</label>
                  <select
                    defaultValue="Single Family Home"
                    value={propertyType}
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    {/* <option>Choose Property Type</option> */}
                    <option
                      name="Single Family Home"
                      value="Single Family Home"
                    >
                      Single Family Home
                    </option>
                    <option name="Condominium" value="Condominium">
                      Condominium
                    </option>
                    <option
                      name="Detached Condominium"
                      value="DetachedCondominium"
                    >
                      Detached Condominium
                    </option>
                    <option name="Duplex" value="Duplex">
                      Duplex
                    </option>
                    <option name="Triplex" value="Triplex">
                      Triplex
                    </option>
                    <option name="Quadplex" value="Quadplex">
                      Quadplex
                    </option>
                  </select>
                </div>
                <div className="CakeFieldWrap">
                  <label htmlFor="">Property Use</label>
                  <select
                    defaultValue="PrimaryResidence"
                    value={propertyUse}
                    onChange={(e) => handleChangePropertyUse(e.target.value)}
                  >
                    {/* <option>Choose Property Use</option> */}
                    <option value="PrimaryResidence" name="Primary Residence">
                      Primary Residence
                    </option>
                    <option value="SecondHome" name="Secondary Vacation Home">
                      Secondary Vacation Home
                    </option>
                    <option value="Investor" name="InvestmentRental">
                      Investment Rental
                    </option>
                  </select>
                </div>
                <div className="CakeFieldWrap">
                  <label htmlFor="">
                    {data.classname === 'refinance'
                      ? 'Property Value'
                      : 'Purchase Price'}{' '}
                  </label>
                  <span className="input--dollar-wrap">
                    <input
                      type="text"
                      value={newNum}
                      onChange={(e) =>
                        rangeValueChange([e.target.value], true, e)
                      }
                    />
                  </span>
                  {/* <input type="range" /> */}
                  <div className="custom-range">
                    <Range
                      step={1000}
                      min={0}
                      max={2000000}
                      values={propertyValue}
                      onChange={(e) => rangeValueChange(e, false, e)}
                      renderTrack={({ props, children }) => (
                        <div
                          className="custom-range__track"
                          {...props}
                          style={{
                            ...props.style,
                            background: getTrackBackground({
                              values: propertyValue,
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
                            <span className="thumb-value">
                              ${propertyValue}
                            </span>
                          </div>
                        )
                      }}
                    />
                  </div>
                </div>
                <div className="CakeFieldWrap">
                  <label htmlFor="">
                    {' '}
                    {data.classname === 'refinance'
                      ? 'Current Loan Balance'
                      : 'Down Payment'}
                  </label>
                  <span className="input--dollar-wrap">
                    <input
                      type="text"
                      value={newCurrentLoanBal}
                      onChange={(e) =>
                        currentLoanValueChange([e.target.value], true, e)
                      }
                    />
                  </span>
                  {/* <input type="range" /> */}
                  <div className="custom-range">
                    <Range
                      step={1000}
                      min={0}
                      max={2000000}
                      values={currentLoanBal}
                      onChange={(e) => currentLoanValueChange(e, false, e)}
                      renderTrack={({ props, children }) => (
                        <div
                          className="custom-range__track"
                          {...props}
                          style={{
                            ...props.style,
                            background: getTrackBackground({
                              values: currentLoanBal,
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
                            <span className="thumb-value">
                              ${currentLoanBal}
                            </span>
                          </div>
                        )
                      }}
                    />
                  </div>
                  {propertyValue[0] <= currentLoanBal[0] &&
                  currentLoanBal[0] !== 0 ? (
                    <label>
                      {' '}
                      {data.classname === 'refinance'
                        ? '*Current loan balance'
                        : '*Down payment'}{' '}
                      cannot be greater than{' '}
                      {data.classname === 'refinance'
                        ? 'estimated property value'
                        : 'purchase price'}
                    </label>
                  ) : propertyValue[0] * (3 / 100) > currentLoanBal[0] ? (
                    <label>
                      {' '}
                      {data.classname !== 'refinance'
                        ? '*Down payment must be at least 3% of purchase price, i.e. minimum $' +
                          propertyValue[0] * (3 / 100)
                        : ''}{' '}
                    </label>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              {data.classname === 'refinance' && (
                <h6>And let us know if you’d like to use your equity.</h6>
              )}
              <div className="CakeFormWrap">
                {data.classname === 'refinance' && (
                  <div className="CakeFieldWrap">
                    <label htmlFor="">Cash Out Amount</label>
                    <span className="input--dollar-wrap">
                      <input
                        type="text"
                        value={newCurrentCashout}
                        onChange={(e) =>
                          cashOutValueChange([e.target.value], true, e)
                        }
                      />
                    </span>
                    {/* <input type="range" /> */}
                    <div className="custom-range">
                      <Range
                        step={1000}
                        min={0}
                        max={1000000}
                        values={cashOut}
                        onChange={(e) => cashOutValueChange(e, false, e)}
                        renderTrack={({ props, children }) => (
                          <div
                            className="custom-range__track"
                            {...props}
                            style={{
                              ...props.style,
                              background: getTrackBackground({
                                values: cashOut,
                                colors: ['white', 'rgba(0,0,0,0.45)'],
                                min: 0,
                                max: 1000000,
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
                              <span className="thumb-value">${cashOut}</span>
                            </div>
                          )
                        }}
                      />
                    </div>
                  </div>
                )}
                {propertyValue[0] < currentLoanBal[0] + cashOut[0] && (
                  <label>
                    {' '}
                    {data.classname === 'refinance'
                      ? '*Combined current loan balance AND cash out amount cannot be greater than estimated property value.'
                      : ''}
                  </label>
                )}
                {currentLoanBal[0] === 0 && cashOut[0] === 0 && (
                  <label>
                    {' '}
                    {data.classname === 'refinance'
                      ? '*If you have no current loan balance, you must have a cash out amount.'
                      : ''}
                  </label>
                )}

                <a
                  className={`btn dark ${
                    zipCode !== '' &&
                    zipCode.length === 5 &&
                    propertyValue > [0] &&
                    propertyValue[0] > currentLoanBal[0] &&
                    creditRating !== '' &&
                    creditRating !== 'Choose Credit rating' &&
                    propertyType !== '' &&
                    propertyType !== 'ChoosePropertyType' &&
                    propertyUse !== '' &&
                    propertyUse !== 'ChoosePropertyUse' &&
                    showValidationMessage === false
                      ? ''
                      : 'dis-btn'
                  }
                  ${
                    data.classname === 'refinance'
                      ? propertyValue[0] < currentLoanBal[0] + cashOut[0] ||
                        (currentLoanBal[0] === 0 && cashOut[0] === 0)
                        ? 'dis-btn'
                        : ''
                      : propertyValue[0] * (3 / 100) > currentLoanBal[0]
                      ? 'dis-btn'
                      : ''
                  }
                  `}
                  href={urlValue}
                  target="_blank"
                >
                  GET MY RATES
                </a>
                <button className="btn light" onClick={closeModal}>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PersonalizeRateBlock

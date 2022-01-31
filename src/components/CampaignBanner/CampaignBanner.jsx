import React, { useEffect, useState } from 'react'
import * as styles from './CampaignBanner.module.scss'
import { Link } from 'gatsby'
import api from 'utils/api'
import { useForm } from 'react-hook-form'

const isBrowser = typeof window !== 'undefined'

const CampaignBanner = (data) => {
  let sessionStorage
  if (isBrowser) {
    sessionStorage = window.sessionStorage
  }
  let slugOrder = []
  let currentPageData
  let nextPageData = []
  let filterData = []
  let currentPage = []
  let nextPage = []
  let url = ''
  let propertyUseValues = [
    { name: 'Primary Residence', value: 'PrimaryResidence' },
    { name: 'Secondary Vacation Home', value: 'SecondaryVacationHome' },
    { name: 'Investment Rental', value: 'InvestmentRental' },
  ]
  let propertyTypeValues = [
    { name: 'Single Family Home', value: 'SingleFamilyHome' },
    { name: 'Condominium', value: 'Condominium' },
    { name: 'Detached Condominium', value: 'DetachedCondominium' },
    { name: 'Duplex', value: 'Duplex' },
    { name: 'Triplex', value: 'Triplex' },
    { name: 'Quadplex', value: 'Quadplex' },
  ]
  let creditRangeValues = [
    { name: '740+(Excellent)', value: '780' },
    { name: '720-730(Very Good)', value: '730' },
    { name: '700-719(Good)', value: '710' },
    { name: '680-699(Above Average)', value: '690' },
    { name: '660-679(Average)', value: '670' },
    { name: '640-659(Below Average)', value: '650' },
    { name: '620-639(Fair)', value: '630' },
    { name: '580-619(Poor)', value: '610' },
  ]
  let defaultValuePropertyUse = {}
  let defaultValuePropertyType = {}
  let defaultValueCreditRange = {}
  const [creditRating, setCreditRating] = useState('780')
  const [propertyType, setPropertyType] = useState('SingleFamilyHome')
  const [propertyUse, setPropertyUse] = useState('PrimaryResidence')
  const [zipCode, setZipCode] = useState('')
  const [showValidationMessage, setShowValidationMessage] = useState(false)
  const [showPhoneValidationMessage, setPhoneShowValidationMessage] =
    useState(false)
  const [propertyValue, setPropertyValue] = useState(0)
  const [currentLoanBal, setCurrentLoanBal] = useState(0)
  const [cashOut, setCashOut] = useState(0)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [urlValue, setUrlValue] = useState('')
  const [isFirstNameValid, setFirstNameValid] = useState(false)
  const [isLastNameValid, setLastNameValid] = useState(false)
  const [isValidEmail, setValidEmail] = useState(false)

  const [propValue, setPropValue] = useState(0)
  const [curLoanBalValue, setCurLoanBalValue] = useState(0)
  const [cashOutValue, setCashOutValue] = useState(0)
  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  if (data) {
    filterData = data?.edges?.map((item) => {
      return { slug: item?.node?.slug, pageNo: item.node?.handle }
    })
    slugOrder = filterData?.sort(function (a, b) {
      return a.pageNo - b.pageNo
    })

    currentPageData = slugOrder?.filter((item) => {
      if (data?.slug === item?.slug) {
        return item
      }
    })
    currentPage = currentPageData?.shift()

    nextPageData = slugOrder?.filter((item, index) => {
      if (currentPage?.pageNo + 1 === index + 1 && currentPage?.pageNo !== 5) {
        return item
      } else if (currentPage?.pageNo === 5 && index + 1 === 4) {
        return item
      }
    })
    nextPage = nextPageData?.shift()
  }

  const handleChangeCreditRating = (event) => {
    event.preventDefault()
    setCreditRating(event.target.value)
    setValuesStorage('creditRating', event.target.value)
  }

  const setValuesStorage = (name, value) => {
    sessionStorage.setItem(name, value)
  }

  const handleChange = (data) => {
    let propertyType = data.replaceAll(' ', '')
    setPropertyType(propertyType)
    setValuesStorage('propertyType', propertyType)
  }
  const handleChangePropertyUse = (data) => {
    let propertyUse = data.replaceAll(' ', '')
    setPropertyUse(propertyUse)
    setValuesStorage('propertyUse', propertyUse)
  }

  const setFirstUsername = (data) => {
    setFirstName(data)
    setValuesStorage('firstName', data)
    setFirstNameValid(/^[A-Za-z]+$/.test(data))
  }
  const setLastUsername = (data) => {
    setLastName(data)
    setValuesStorage('lastName', data)
    setLastNameValid(/^[A-Za-z]+$/.test(data))
  }

  const rangeValueChange = (value, isInputValueChange, event) => {
    onlyNumberKey(event)
    let numConv
    var testVal = value
    if (
      isInputValueChange &&
      value !== 0 &&
      value[0] !== '' &&
      value !== [] &&
      value !== ''
    ) {
      numConv = testVal.replace(/\,/g, '')
      numConv = parseInt(numConv, 10)
      if (numConv > 2000000) {
        event.preventDefault()
        return
      }
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(numConv)
      setPropertyValue(value)
      setPropValue(test)
      setValuesStorage('purchasePriceValue', test)
    } else {
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(value)
      setPropertyValue(value)
      setPropValue(test)
      setValuesStorage('purchasePriceValue', test)
    }
    setValuesStorage('purchasePrice', value)
  }

  const currentLoanValueChange = (value, isInputValueChange, event) => {
    onlyNumberKey(event)
    let numConv
    var testVal = value
    if (
      isInputValueChange &&
      value !== 0 &&
      value[0] !== '' &&
      value !== [] &&
      value !== ''
    ) {
      numConv = testVal.replace(/\,/g, '')
      numConv = parseInt(numConv, 10)
      if (numConv > 2000000) {
        event.preventDefault()
        return
      }
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(numConv)
      setCurrentLoanBal(value)
      setValuesStorage('currentBalValue', test)
      setCurLoanBalValue(test)
    } else {
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(value)
      setCurrentLoanBal(value)
      setValuesStorage('currentBalValue', test)
      setCurLoanBalValue(test)
    }
    setValuesStorage('downPayment', value)
  }

  const sendUserData = () => {
    api({
      url: 'contacts',
      method: 'POST',
      data: {
        first_name: firstName,
        email: email,
        last_name: lastName,
        phone: phone,
        get_my_personalized_rate: 'From Get My Personalized Rate',
      },
    })
      .then((response) => {
        // console.log(response, 'success')
      })
      .catch(function (error) {
        // console.log(error, 'error')
      })
  }

  const cashOutValueChange = (value, isInputValueChange, event) => {
    onlyNumberKey(event)
    let numConv
    var testVal = value
    if (
      isInputValueChange &&
      value !== 0 &&
      value[0] !== '' &&
      value !== [] &&
      value !== ''
    ) {
      numConv = testVal.replace(/\,/g, '')
      numConv = parseInt(numConv, 10)
      if (numConv > 1000000) {
        event.preventDefault()
        return
      }
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(numConv)
      setCashOut(value)
      setCashOutValue(test)
      setValuesStorage('cashoutValue', test)
    } else {
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(value)
      setCashOut(value)
      setCashOutValue(test)
      setValuesStorage('cashoutValue', test)
    }
    setValuesStorage('cashOut', value)
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

  const validateZipcode = (data) => {
    if (data.length === 5) {
      fetchValidZipcode(data)
    } else {
      setShowValidationMessage(false)
    }
    setZipCode(data)
    setValuesStorage('zipCode', data)
  }

  const setPhoneNumber = (data) => {
    if (data.length < 10) {
      setPhoneShowValidationMessage(true)
    } else {
      setPhoneShowValidationMessage(false)
    }
    let valueFormat
    if (data) {
      valueFormat = data.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    }
    setValuesStorage('phone', valueFormat)
    setPhone(valueFormat)
  }

  const setUserEmail = (data) => {
    setValuesStorage('email', data)
    setEmail(data)
    setValidEmail(/\S+@\S+\.\S+/.test(data))
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
      })
      .catch(function (error) {
        setShowValidationMessage(true)
      })
  }

  useEffect(() => {
    // setValuesStorage('propertyUse', 'Condominium')
    // setValuesStorage('propertyType', propertyType)
    // setValuesStorage('creditRating', creditRating)
  }, [])

  useEffect(() => {
    let cashOut = sessionStorage.getItem('cashOut')
    let cashOutValue = sessionStorage.getItem('cashoutValue')
    let downPayment = sessionStorage.getItem('downPayment')
    let currentBalValue = sessionStorage.getItem('currentBalValue')
    let lastName = sessionStorage.getItem('lastName')
    let firstName = sessionStorage.getItem('firstName')
    let purchasePrice = sessionStorage.getItem('purchasePrice')
    let purchasePriceValue = sessionStorage.getItem('purchasePriceValue')
    let zipCode = sessionStorage.getItem('zipCode')
    let phone = sessionStorage.getItem('phone')
    let email = sessionStorage.getItem('email')
    let propertyUseStorage = sessionStorage.getItem('propertyUse')
    let propertyTypeStorage = sessionStorage.getItem('propertyType')
    let creditRatingStorage = sessionStorage.getItem('creditRating')
    validateZipcode(zipCode || '')
    setPropertyValue(parseInt(purchasePrice) || 0)
    setFirstUsername(firstName || '')
    setLastUsername(lastName || '')
    setCashOut(parseInt(cashOut) || 0)
    setCurrentLoanBal(parseInt(downPayment) || 0)
    setUserEmail(email || '')
    setPhone(phone || '')
    setPropertyType(propertyTypeStorage || propertyType)
    setPropertyUse(propertyUseStorage || propertyUse)
    setCreditRating(creditRatingStorage || creditRating)
    setPropValue(purchasePriceValue || 0)
    setCurLoanBalValue(currentBalValue || 0)
    setCashOutValue(cashOutValue || 0)
    if (currentPage?.pageNo === 5) {
      setUrl()
    }
    defaultValuePropertyUse = propertyUseValues.filter((item) => {
      if (item.value === propertyUse) {
        return item
      }
    })
    defaultValuePropertyType = propertyTypeValues.filter((item) => {
      if (item.value === propertyType) {
        return item
      }
    })
    defaultValueCreditRange = creditRangeValues.filter((item) => {
      if (item.value === creditRating) {
        return item
      }
    })
  }, [
    creditRating,
    propertyType,
    propertyUse,
    cashOut,
    currentLoanBal,
    propertyValue,
    firstName,
    lastName,
    email,
  ])

  const setUrl = () => {
    url =
      'https://apply.cakehome.com/partner/4NAXDC5C/search?type=refinance' +
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
      propertyType +
      '&isAutoClick=1&target=_blank'
    setUrlValue(url)
  }

  return (
    <div>
      <section className={styles.CampaginBanner}>
        {currentPage?.pageNo === 1 && (
          <>
            <div className="slide-1">
              <div className="container">
                <div className="banner__hero">
                  <h1>{data?.mainTitle}</h1>
                </div>
                <div className="banner__content">
                  <h2>{data?.title}</h2>
                </div>
                <div className="banner__form">
                  <div className="banner__form-head">
                    <h3>{data?.description?.description}</h3>
                  </div>
                  <div className="banner__form-fields">
                    <div className="banner__inputs">
                      <label className="d-mob" htmlFor="field">
                        My Legal Name Is
                      </label>
                      <input
                        placeholder="First Name"
                        value={firstName}
                        type="text"
                        {...register('firstName', {
                          required: 'This is a required field',
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: 'Please enter a valid name',
                          },
                        })}
                        onChange={(e) => setFirstUsername(e.target.value)}
                      />
                      <label htmlFor="">{errors.firstName?.message}</label>
                    </div>
                    <div className="banner__inputs">
                      <input
                        placeholder="Last Name"
                        value={lastName}
                        type="text"
                        {...register('lastName', {
                          required: 'This is a required field',
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: 'Please enter a valid name',
                          },
                        })}
                        type="text"
                        onChange={(e) => setLastUsername(e.target.value)}
                      />
                      <label htmlFor="">{errors.lastName?.message}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {currentPage?.pageNo === 2 && (
          <>
            <div className="slide-2">
              <div className="container">
                <div className="banner__hero">
                  <h1>
                    {data?.title}
                    {firstName}
                  </h1>
                  <h1 className="d-mob">
                    {data?.mobDescription?.mobDescription}
                  </h1>
                  <h2 className="d-desktop"> Your credit rating...</h2>
                </div>
                <div className="banner__form">
                  <div className="banner__form-fields">
                    <label className="d-mob" htmlFor="banner">
                      Please select your credit range
                    </label>
                    <select
                      defaultValue={defaultValueCreditRange[0]?.value}
                      value={creditRating}
                      onChange={(e) => handleChangeCreditRating(e)}
                    >
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
                      <option value="630" name="620-639(Fair)">
                        620-639(Fair)
                      </option>
                      <option value="610" name="580-619(Poor)">
                        580-619(Poor)
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {currentPage?.pageNo === 3 && (
          <>
            <div className="slide-3">
              <div className="container">
                <div className="banner__hero">
                  <h1 className="d-mob">
                    {data?.mobTitle}
                    {firstName}
                    {data?.body}
                  </h1>
                  <h1 className="d-desktop">{data?.title}</h1>
                  <h2 className="d-mob">
                    {data?.mobDescription?.mobDescription}
                  </h2>
                </div>
                <div className="banner__form">
                  <div className="banner__form-fields">
                    <div className="banner__select">
                      <label htmlFor="banner">
                        Property ZIP code<sup>*</sup>
                      </label>
                      <input
                        placeholder="90035"
                        type="text"
                        maxlength="5"
                        value={zipCode}
                        onChange={(e) =>
                          validateZipcode(
                            e.target.value.replace(/[^\d.]/gi, '')
                          )
                        }
                      />
                      {showValidationMessage && (
                        <label htmlFor="">
                          Sorry, we're not licensed in this state, yet!
                        </label>
                      )}
                    </div>
                    <div className="banner__select">
                      <label htmlFor="banner">
                        Property Type<sup>*</sup>
                      </label>
                      <select
                        defaultValue={defaultValuePropertyType[0]?.value}
                        value={propertyType}
                        onChange={(e) => handleChange(e.target.value)}
                      >
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
                    <div className="banner__select">
                      <label htmlFor="banner">
                        Property Use<sup>*</sup>
                      </label>
                      <select
                        defaultValue={defaultValuePropertyUse[0]?.value}
                        value={propertyUse}
                        onChange={(e) =>
                          handleChangePropertyUse(e.target.value)
                        }
                      >
                        <option
                          value="PrimaryResidence"
                          name="Primary Residence"
                        >
                          Primary Residence
                        </option>
                        <option
                          value="SecondHome"
                          name="Secondary Vacation Home"
                        >
                          Secondary Vacation Home
                        </option>
                        <option value="Investor" name="InvestmentRental">
                          Investment Rental
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {currentPage?.pageNo === 4 && (
          <>
            <div className="slide-4">
              <div className="container">
                <div className="banner__hero">
                  <h1 className="d-mob">
                    {data?.mobTitle}
                    {firstName}
                    {data?.body}
                  </h1>
                  <h1 className="d-desktop">{data?.title}</h1>
                  <h2 className="d-mob">
                    {data?.mobDescription?.mobDescription}
                  </h2>
                </div>
                <div className="banner__form">
                  <div className="banner__form-fields">
                    <div className="banner__select">
                      <label htmlFor="banner">
                        Property Value Estimate<sup>*</sup>
                      </label>
                      <span className="form__dollar-wrap">
                        <input
                          placeholder="$100,000"
                          type="text"
                          value={propValue}
                          onChange={(e) =>
                            rangeValueChange(
                              e.target.value.replace(/\,/g, ''),
                              true,
                              e
                            )
                          }
                        />
                      </span>
                    </div>
                    <div className="banner__select">
                      <label htmlFor="banner">
                        Current Loan Balance<sup>*</sup>
                      </label>
                      <span className="form__dollar-wrap">
                        <input
                          placeholder="$100,000"
                          type="text"
                          value={curLoanBalValue}
                          onChange={(e) =>
                            currentLoanValueChange(e.target.value, true, e)
                          }
                        />
                      </span>
                      {propertyValue <= currentLoanBal &&
                      currentLoanBal !== 0 &&
                      propertyValue !== 0 ? (
                        <label>
                          *Current loan balance cannot be greater than estimated
                          property value
                        </label>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="banner__select">
                      <label htmlFor="banner">Cash Out Amount
                      <a className='tool-ask d-mob' href="#" title='If you have no current loan balance, you must have
                            a cash out amount.'>
                        <img src="/images/campaign-question.png" alt="image" />
                        </a></label>
                      <span className="form__dollar-wrap">
                        <input
                          placeholder="$0"
                          type="text"
                          value={cashOutValue}
                          onChange={(e) =>
                            cashOutValueChange(e.target.value, true, e)
                          }
                        />
                        <a className='tool-ask d-desktop' href="#" title='If you have no current loan balance, you must have
                            a cash out amount.'>
                        <img src="/images/campaign-question.png" alt="image" />
                        </a>
                      </span>
                      {propertyValue < currentLoanBal + cashOut &&
                        propertyValue !== 0 && (
                          <label>
                            *Combined current loan balance AND cash out amount
                            cannot be greater than estimated property value.
                          </label>
                        )}
                      {currentLoanBal === 0 &&
                        cashOut === 0 &&
                        propertyValue !== 0 && (
                          <label>
                            *If you have no current loan balance, you must have
                            a cash out amount.
                          </label>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {currentPage?.pageNo === 5 && (
          <>
            {' '}
            <div className="slide-5">
              <div className="container">
                <div className="banner__hero">
                  <h1 className="d-desktop">{data?.title}</h1>
                  <h1 className="d-mob">
                    {data?.mobTitle}
                    {firstName}
                    {data?.body}
                  </h1>
                  <h2 className="d-mob">
                    {data?.mobDescription?.mobDescription}
                  </h2>
                </div>
                <div className="banner__form">
                  <div className="banner__form-fields">
                    <div className="banner__inputs">
                      <input
                        placeholder="Phone"
                        type="text"
                        maxlength="12"
                        value={phone}
                        onChange={(e) =>
                          setPhoneNumber(e.target.value.replace(/[^\d.]/gi, ''))
                        }
                      />
                      {showPhoneValidationMessage && (
                        <label htmlFor="">Please enter 10 digits</label>
                      )}
                    </div>
                    <div className="banner__inputs">
                      <input
                        placeholder="Email"
                        {...register('email', {
                          required: 'This is a required field',
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message:
                              'Entered value does not match email format',
                          },
                        })}
                        type="text"
                        value={email}
                        onChange={(e) => setUserEmail(e.target.value)}
                      />
                      <label htmlFor="">{errors.email?.message}</label>
                    </div>
                  </div>
                  <a
                    href={urlValue}
                    target="_blank"
                    className={`btn ${
                      zipCode !== '' &&
                      zipCode.length === 5 &&
                      propertyValue > 0 &&
                      currentLoanBal > 0 &&
                      currentLoanBal !== 0 &&
                      propertyValue > currentLoanBal &&
                      creditRating !== '' &&
                      propertyType !== '' &&
                      propertyUse !== '' &&
                      phone !== '' &&
                      email !== '' &&
                      firstName !== '' &&
                      lastName !== '' &&
                      phone !== null &&
                      phone.length === 12 &&
                      email !== null &&
                      isValidEmail === true &&
                      isFirstNameValid === true &&
                      isLastNameValid === true &&
                      firstName !== null &&
                      lastName !== null &&
                      showValidationMessage === false
                        ? ''
                        : 'dis-btn'
                    }`}
                    onClick={sendUserData}
                  >
                    {/*  (cashOut === 0 ||*/}
                    <span className="d-mob">GET MY RATE</span>
                    <span className="d-desktop">GET MY PERSONALIZED RATE</span>
                  </a>
                </div>
                <div className="banner__slider-control">
                  <div className="banner__prev">
                    <Link to={'/campaign/' + nextPage?.slug}>
                      <img
                        src="/images/campaign-slide-white.svg"
                        alt="slider"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div
          className={`banner__slider-control ${
            currentPage?.pageNo === 5 ? 'page-5' : ''
          }`}
        >
          <div className="banner__next">
            <Link to={'/campaign/' + nextPage?.slug}>
              <img src="/images/campaign-slider-grey.svg" alt="slider" />
            </Link>
          </div>
          <div className="banner__slider-dots">
            {slugOrder?.map((item, index) => {
              return (
                <>
                  <Link
                    className={`slider-dots ${
                      data?.slug === item?.slug ? 'active' : ''
                    } `}
                    to={'/campaign/' + item?.slug}
                    key={index}
                  ></Link>
                </>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CampaignBanner

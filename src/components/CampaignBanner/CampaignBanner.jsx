import React, { useEffect, useState } from 'react'
import * as styles from './CampaignBanner.module.scss'
import { Link } from 'gatsby'
import api from 'utils/api'
import { useForm } from 'react-hook-form'
import ReactTooltip from 'react-tooltip'

const isBrowser = typeof window !== 'undefined'

const CampaignBanner = (data) => {
  let sessionStorage
  if (isBrowser) {
    sessionStorage = window.sessionStorage
  }
  const { parentSlug } = data
  const { campaignType } = data
  const { campaignId } = data
  const { statusId } = data
  const type = campaignType.includes('refinance') ? 'refinance' : 'purchase'
  let slugOrder = []
  let pageOrder = []
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
  // let pageDetails
  const [creditRating, setCreditRating] = useState('780')
  const [propertyType, setPropertyType] = useState('SingleFamilyHome')
  const [propertyUse, setPropertyUse] = useState('PrimaryResidence')
  const [zipCode, setZipCode] = useState('')
  const [zipcodeValidationMessage, setShowZipcodeValidationMessage] =
    useState('')
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
  const [showMessage, setShowMessage] = useState('')
  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  if (data) {
    filterData = data?.edges?.map((item) => {
      return { childSlug: item?.node?.childSlug, pageNo: item.node?.handle }
    })

    const pageDetails = (filterData, pagesTotal) => {
      let res = []
      res = filterData.filter((item) => {
        return pagesTotal.find((slug) => {
          return item.childSlug === slug.childSlug
        })
      })
      return res
    }

    const pageOrderData = pageDetails(filterData, data?.pagesTotal)
    pageOrder = pageOrderData?.sort(function (a, b) {
      return a.pageNo - b.pageNo
    })
    const reorderPageData = pageOrderData
    pageOrderData.map((item) => {
      if (
        item.pageNo === 4 &&
        type === 'refinance' &&
        pageOrderData.length === 6
      ) {
        pageOrderData.splice(5, 1)
        //pop()
        return item
      } else if (
        item.pageNo === 6 &&
        type === 'purchase' &&
        pageOrderData.length === 6
      ) {
        pageOrderData.splice(3, 1)
      } else {
        return item
      }
    })

    if (type === 'purchase') {
      let testValue = pageOrderData.pop()
      pageOrderData.splice(3, 0, testValue)
    }

    slugOrder = pageOrderData
    currentPageData = slugOrder?.filter((item) => {
      if (data?.childSlug === item?.childSlug) {
        return item
      }
    })
    currentPage = currentPageData?.shift()
    nextPageData = slugOrder?.filter((item, index) => {
      if (currentPage?.pageNo + 1 === index + 1 && currentPage?.pageNo !== 5) {
        return item
      } else if (
        currentPage?.pageNo !== 5 &&
        currentPage?.pageNo === 6 &&
        index + 1 === 5
      ) {
        return item
      } else if (
        currentPage?.pageNo !== 5 &&
        currentPage?.pageNo === 6 &&
        index + 1 === 5
      ) {
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

  const removeValuesStorage = (name) => {
    if (Array.isArray(name)) {
      name.forEach((sessionName) => {
        sessionStorage.removeItem(sessionName)
      })
    } else {
      sessionStorage.removeItem(name)
    }
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
    setFirstName(data || '')
    setValuesStorage('firstName', data)
    let setValue = /^\b(?!.*?\s{2})[A-Za-z ]{1,50}$/.test(data)
    setFirstNameValid(setValue)
    setValuesStorage('firstNameValidation', setValue)
  }
  const setLastUsername = (data) => {
    setLastName(data)
    setValuesStorage('lastName', data)
    let setValue = /^\b(?!.*?\s{2})[A-Za-z ]{1,50}$/.test(data)
    setLastNameValid(setValue)
    setValuesStorage('lastNameValidation', setValue)
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
      setCurrentLoanBal(numConv)
      setValuesStorage('downPayment', numConv)
      setValuesStorage('currentBalValue', test)
      setCurLoanBalValue(test)
      setValuesStorage('downPayment', numConv)
    } else {
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(value)
      setCurrentLoanBal(numConv || 0)
      setValuesStorage('downPayment', numConv || 0)
      setValuesStorage('currentBalValue', test)
      setCurLoanBalValue(test)
      setValuesStorage('downPayment', numConv)
    }
  }

  const sendUserData = () => {
    api({
      url: 'contacts',
      method: 'POST',
      data: {
        pricing_link: urlValue,
        first_name: firstName,
        email: email,
        last_name: lastName,
        phone: phone,
        get_my_personalized_rate: 'From Get My Personalized Rate',
        zip_code: zipCode,
        property_value: type !== 'purchase' ? propertyValue : 0,
        current_loan_balance: type !== 'purchase' ? currentLoanBal : 0,
        cash_out_amount: type !== 'purchase' ? cashOut : 0,
        purchase_price: type === 'purchase' ? propertyValue : 0,
        down_payment: type === 'purchase' ? currentLoanBal : 0,
        campaign_id: campaignId,
        status_id: statusId,
      },
    })
      .then((response) => {
        setShowMessage(
          'Thank You! Your personalized rates are being baked and we’ll deliver them to you via email and text.'
        )
        setValuesStorage('allDetailsSent', true)

      })
      .catch(function (error) {
        setShowMessage('Oops, something went wrong!')
        setValuesStorage('allDetailsSent', false)

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
      setCashOut(numConv)
      setCashOutValue(test)
      setValuesStorage('cashoutValue', test)
      setValuesStorage('cashOut', numConv)
    } else {
      let nf = new Intl.NumberFormat('en-US')
      let test = nf.format(value)
      setCashOut(numConv || 0)
      setCashOutValue(test)
      setValuesStorage('cashoutValue', test)
      setValuesStorage('cashOut', numConv || 0)
    }
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
    if (data?.length === 5) {
      fetchValidZipcode(data)
    } else {
      setShowValidationMessage(false)
      setValuesStorage('zipcodeValidation', false)
    }
    setZipCode(data)
    setValuesStorage('zipCode', data)
  }

  const setPhoneNumber = (data, event) => {
    onlyNumberKey(event)

    if (data?.length < 10) {
      setPhoneShowValidationMessage(true)
    } else {
      setPhoneShowValidationMessage(false)
    }
    let valueFormat
    if (data) {
      valueFormat = data.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    }
    setValuesStorage('phone', valueFormat || 0)
    setPhone(valueFormat)
  }

  const setUserEmail = (data) => {
    setValuesStorage('email', data)
    setEmail(data)
    setValidEmail(/^\b\S+@\S+\.\S+[\s]{0,1}$/.test(data))
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
        setValuesStorage('zipcodeValidation', false)
      })
      .catch(function (error) {
        setShowValidationMessage(true)
        setValuesStorage('zipcodeValidation', true)
      })
  }

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
    let zipcodeValidation = sessionStorage.getItem('zipcodeValidation')
    let lastNameValidation = sessionStorage.getItem('lastNameValidation')
    let firstNameValidation = sessionStorage.getItem('firstNameValidation')
    let allDetailsSent = sessionStorage.getItem('allDetailsSent')
    if(allDetailsSent === "true") {
      setShowMessage('Thank You! Your personalized rates are being baked and we’ll deliver them to you via email and text.')
    }
    setFirstNameValid(firstNameValidation)
    setLastNameValid(lastNameValidation)
    setShowZipcodeValidationMessage(zipcodeValidation || false)
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

  useEffect(() => {
    removeValuesStorage([
      'utm_campaign_source',
      'utm_campaign_medium',
      'utm_campaign_name',
      'utm_content',
    ])
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    })
    const { utm_source, utm_medium, utm_campaign, utm_content } = params
    if (utm_source && utm_medium) {
      setValuesStorage('utm_campaign_source', utm_source)
      setValuesStorage('utm_campaign_medium', utm_medium)
      setValuesStorage('utm_campaign_name', utm_campaign)
      setValuesStorage('utm_campaign_content', utm_content)
    }
  }, [])

  const setUrl = () => {
    url =
      'https://apply.cakehome.com/partner/4NAXDC5C/search?type=' +
      type +
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
        {currentPage?.pageNo !== 2 &&
          currentPage?.pageNo !== 3 &&
          currentPage?.pageNo !== 4 &&
          currentPage?.pageNo !== 5 &&
          currentPage?.pageNo !== 6 && (
            <>
              <div className="slide-1">
                <div className="container">
                  <div className="banner__hero">
                    <h1>{data?.mainTitle}</h1>
                  </div>
                  <div className="banner__content">
                    <h2>{data?.title}</h2>
                  </div>

                  {currentPage?.pageNo === 1 && (
                    <>
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
                                  value: /^\b(?!.*?\s{2})[A-Za-z ]{1,50}$/,
                                  message: 'Please enter a valid name',
                                },
                              })}
                              onChange={(e) => setFirstUsername(e.target.value)}
                            />
                            <label htmlFor="">
                              {errors.firstName?.message}
                            </label>
                          </div>
                          <div className="banner__inputs">
                            <input
                              placeholder="Last Name"
                              value={lastName}
                              type="text"
                              {...register('lastName', {
                                required: 'This is a required field',
                                pattern: {
                                  value: /^\b(?!.*?\s{2})[A-Za-z ]{1,50}$/,
                                  message: 'Please enter a valid name',
                                },
                              })}
                              onChange={(e) => setLastUsername(e.target.value)}
                            />
                            <label htmlFor="">{errors.lastName?.message}</label>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
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
                    {firstName ? ` ${firstName}` : ''}
                  </h1>
                  <h1 className="d-mob">
                    {data?.mobDescription?.mobDescription}
                  </h1>
                  <h2 className="d-desktop">
                    {' '}
                    {data?.description?.description ||
                      'Your credit rating...'}{' '}
                  </h2>
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
                    {firstName ? ` ${firstName}` : ''}
                    {data?.mobBody}
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
                        placeholder=""
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
        {((currentPage?.pageNo === 4 && type === 'refinance') ||
          (currentPage?.pageNo === 6 && type === 'purchase')) && (
          <>
            <div
              className={`slide-4 ${type === 'purchase' ? 'isPurchase' : ''}`}
            >
              <div className="container">
                <div className="banner__hero">
                  <h1 className="d-mob">
                    {data?.mobTitle}
                    {firstName ? ` ${firstName}` : ''}
                    {data?.mobBody}
                  </h1>
                  {type === 'refinance' && (
                    <h1 className="d-desktop">{data?.title}</h1>
                  )}

                  {type === 'purchase' && (
                    <h1 className="d-desktop">
                      {data?.title} {firstName ? ` ${firstName}` : ''}
                      {data?.body}
                    </h1>
                  )}

                  <h2 className="d-mob">
                    {data?.mobDescription?.mobDescription}
                  </h2>
                </div>
                {(type === 'purchase' && data?.description?.description) && (
                  <div className="banner__content d-desktop">
                    <h2>{data?.description?.description}</h2>
                  </div>
                )}

                <div className="banner__form">
                  <div className="banner__form-fields">
                    <div className="banner__select">
                      <label htmlFor="banner">
                        {type === 'refinance'
                          ? 'Property Value Estimate'
                          : 'Purchase Price'}
                        <sup>*</sup>
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
                        {type === 'refinance'
                          ? 'Current Loan Balance'
                          : 'Down Payment'}
                        <sup>*</sup>
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
                          {type === 'refinance'
                            ? '*Current loan balance'
                            : '*Down payment'}{' '}
                          cannot be greater than{' '}
                          {type === 'refinance'
                            ? 'estimated property value'
                            : 'purchase price'}
                        </label>
                      ) : propertyValue * (3 / 100) > currentLoanBal ? (
                        <label>
                          <>
                            {type !== 'refinance'
                              ? '*Down payment must be at least 3% of purchase price, i.e. minimum $' +
                                propertyValue * (3 / 100)
                              : ''}
                          </>
                        </label>
                      ) : (
                        ''
                      )}
                    </div>

                    {type !== 'purchase' && (
                      <>
                        <div className="banner__select">
                          <label htmlFor="banner">
                            Cash Out Amount
                            <p className="rate-details tool-ask d-mob small">
                              <span
                                data-tip="If you have no current loan balance, you must have
                            a cash out amount"
                              >
                                <img
                                  src="/images/campaign-question.png"
                                  alt="image"
                                />
                              </span>
                            </p>
                            <ReactTooltip
                              effect="solid"
                              place="top"
                              multiline={true}
                              className="customTooltip"
                            />
                          </label>
                          <span className="form__dollar-wrap">
                            <input
                              placeholder="$0"
                              type="text"
                              value={cashOutValue}
                              onChange={(e) =>
                                cashOutValueChange(e.target.value, true, e)
                              }
                            />
                            <p className="rate-details tool-ask d-desktop small">
                              <span
                                data-tip="If you have no current loan balance, you must have
                            a cash out amount"
                              >
                                <img
                                  src="/images/campaign-question.png"
                                  alt="image"
                                />
                              </span>
                            </p>
                            <ReactTooltip
                              effect="solid"
                              place="top"
                              multiline={true}
                              className="customTooltip"
                            />
                          </span>
                          {propertyValue < currentLoanBal + cashOut &&
                            propertyValue !== 0 && (
                              <label>
                                *Combined current loan balance AND cash out
                                amount cannot be greater than estimated property
                                value.
                              </label>
                            )}
                          {currentLoanBal === 0 &&
                            cashOut === 0 &&
                            propertyValue !== 0 && (
                              <label>
                                *If you have no current loan balance, you must
                                have a cash out amount.
                              </label>
                            )}
                        </div>
                      </>
                    )}
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
                    {firstName ? ` ${firstName}` : ''}
                    {data?.mobBody}
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
                          setPhoneNumber(
                            e.target.value.replace(/[^\d.]/gi, ''),
                            e
                          )
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
                            value: /^\b\S+@\S+\.\S+[\s]{0,1}$/,
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
                  {(firstName === '' ||
                    lastName === '' ||
                    isFirstNameValid !== true ||
                    isLastNameValid !== true) && (
                    <label className="text-center">
                      *Please check the First name and Last name fields in page
                      1
                    </label>
                  )}
                  {(zipCode === '' ||
                    zipCode?.length !== 5 ||
                    zipcodeValidationMessage === 'true') && (
                    <label className="text-center">
                      *Please check the zipcode field in page 3
                    </label>
                  )}
                  {propertyValue <= currentLoanBal ||
                  currentLoanBal === 0 ||
                  (propertyValue === 0 && type === 'refinance') ||
                  propertyValue < currentLoanBal + cashOut ||
                  (currentLoanBal === 0 && cashOut === 0) ? (
                    <label className="text-center">
                      *Please check the fields in page 4
                    </label>
                  ) : propertyValue * (3 / 100) > currentLoanBal &&
                    type !== 'refinance' ? (
                    <label className="text-center">
                      <>*Please check the fields in page 4</>
                    </label>
                  ) : (
                    ''
                  )}
                  {/*  href={urlValue} target="_blank"
                   */}
                  {showMessage === '' ? (
                    <a
                      className={`btn ${
                        zipCode !== '' &&
                        zipCode?.length === 5 &&
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
                        phone?.length === 12 &&
                        email !== null &&
                        isValidEmail === true &&
                        isFirstNameValid === true &&
                        isLastNameValid === true &&
                        firstName !== null &&
                        lastName !== null &&
                        showValidationMessage === false
                          ? ''
                          : 'dis-btn'
                      }
                     ${
                       type === 'refinance'
                         ? propertyValue < currentLoanBal + cashOut ||
                           (currentLoanBal === 0 && cashOut === 0)
                           ? 'dis-btn'
                           : ''
                         : propertyValue * (3 / 100) > currentLoanBal
                         ? 'dis-btn'
                         : ''
                     }
                     `}
                      onClick={sendUserData}
                    >
                      <span className="d-mob">GET MY RATE</span>
                      <span className="d-desktop">
                        GET MY PERSONALIZED RATE
                      </span>
                    </a>
                  ) : (
                    <>
                      <p className="message_test">{showMessage}</p>
                      <p className="message_test">
                        {' '}
                        <span className='condition_message'>
                          *If you don’t see it in the next 30 seconds please
                          check your spam folder.
                        </span>
                      </p>
                    </>
                  )}
                </div>
                <div className={`banner__slider-control`}>
                  <div className="banner__prev">
                    <Link to={`/campaign/${parentSlug}/${nextPage?.childSlug}`}>
                      <img
                        src="/images/campaign-slide-white.svg"
                        alt="slider"
                      />
                    </Link>
                    {/* Disclaimer text */}
                    <p className="disclaimer_text">
                      By entering your phone number you’re authorizing Cake
                      Mortgage Corp to use this number to call, text, and send
                      you messages by any method. We won’t charge you for any
                      contact but your service provider data rates could apply.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div
          className={`banner__slider-control ${
            type === 'purchase' ? 'isPurchase' : ''
          } ${currentPage?.pageNo === 5 ? 'page-5' : ''}`}
        >
          {nextPage !== undefined && (
            <div className="banner__next">
              <Link to={`/campaign/${parentSlug}/${nextPage?.childSlug}`}>
                <img src="/images/campaign-slider-grey.svg" alt="slider" />
              </Link>
            </div>
          )}
          <div className="banner__slider-dots">
            {slugOrder?.map((item, index) => {
              return (
                <>
                  <Link
                    className={`slider-dots ${
                      data?.childSlug === item?.childSlug ? 'active' : ''
                    } `}
                    to={`/campaign/${parentSlug}/${item?.childSlug}`}
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

import React, {useEffect, useState} from 'react'
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
  const [creditRating, setCreditRating] = useState('780')
  const [propertyType, setPropertyType] = useState('SingleFamilyHome')
  const [propertyUse, setPropertyUse] = useState('PrimaryResidence')
  const [zipCode, setZipCode] = useState('')
  const [showValidationMessage, setShowValidationMessage] = useState(false)
  const [showPhoneValidationMessage, setPhoneShowValidationMessage] = useState(false)
  const [propertyValue, setPropertyValue] = useState(0)
  const [currentLoanBal, setCurrentLoanBal] = useState(0)
  const [cashOut, setCashOut] = useState(0)
  const [phone, setPhone] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()



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
    setValuesStorage('creditRating', event.target.value);
  }

  const setValuesStorage = (name, value) => {
    sessionStorage.setItem(name, value);
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

  const rangeValueChange = (value, isInputValueChange, event) => {
    onlyNumberKey(event)
    let numConv
    var testVal = value

    if (isInputValueChange && value !== 0 && value[0] !== '' && value !== []) {
      numConv = testVal.replace(/\,/g, '')
      numConv = parseInt(numConv, 10)
      if (numConv > 2000000) {
        event.preventDefault()
        return
      }
      // let nf = new Intl.NumberFormat('en-US')
      // let test = nf.format(numConv)
      setPropertyValue(value)
    } else {
      // let nf = new Intl.NumberFormat('en-US')
      // let test = nf.format(value)
      setPropertyValue(value)
    }
    setValuesStorage('purchasePrice', value);
  }

  const currentLoanValueChange = (value, isInputValueChange, event) => {
    onlyNumberKey(event)
    let numConv
    var testVal = value
    if (isInputValueChange && value !== 0 && value[0] !== '' && value !== []) {
      numConv = testVal.replace(/\,/g, '')
      numConv = parseInt(numConv, 10)
      if (numConv > 2000000) {
        event.preventDefault()
        return
      }
      // let nf = new Intl.NumberFormat('en-US')
      // let test = nf.format(numConv)
      setCurrentLoanBal(value)
    } else {
      // let nf = new Intl.NumberFormat('en-US')
      // let test = nf.format(value)
      setCurrentLoanBal(value)
    }
    setValuesStorage('downPayment', value);

  }

  const cashOutValueChange = (value, isInputValueChange, event) => {
    onlyNumberKey(event)
    let numConv
    var testVal = value
    if (isInputValueChange && value !== 0 && value[0] !== '' && value !== []) {
      numConv = testVal.replace(/\,/g, '')
      numConv = parseInt(numConv, 10)
      if (numConv > 1000000) {
        event.preventDefault()
        return
      }
      // let nf = new Intl.NumberFormat('en-US')
      // let test = nf.format(numConv)
      setCashOut(value)
    } else {
      // let nf = new Intl.NumberFormat('en-US')
      // let test = nf.format(value)
      setCashOut(value)
    }
    setValuesStorage('cashOut', value);

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
  }
  
  const setPhoneNumber = (data) => {
    if (data.length < 10) {
      setPhoneShowValidationMessage(true)
    } else {
      setValuesStorage('phone', data);
    }
    setPhone(data)
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
        setValuesStorage('zipCode', zipCode);
      })
      .catch(function (error) {
        setShowValidationMessage(true)
      })
  }

  useEffect(() => {
    setValuesStorage('propertyUse', propertyUse)
    setValuesStorage('propertyType', propertyType)
    setValuesStorage('creditRating', creditRating);
  }, [])


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
                    <label className="d-mob" htmlFor="field">
                      My Legal Name Is
                    </label>
                    <input placeholder="First Name" type="text" />
                    <input placeholder="Last Name" type="text" />
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
                  <h1>{data?.title}</h1>
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
                    <select defaultValue="740+(Excellent)"
                    value={creditRating}
                    onChange={(e) => handleChangeCreditRating(e)}>
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
                  <h1 className="d-mob">{data?.mobTitle}</h1>
                  <h1 className="d-desktop">{data?.title}</h1>
                  <h2 className="d-mob">
                    {data?.mobDescription?.mobDescription}
                  </h2>
                </div>
                <div className="banner__form">
                  <div className="banner__form-fields">
                    <div className="banner__select">
                      <label htmlFor="banner">Property ZIP code</label>
                      <input placeholder="90035" type="text"
                    maxlength="5"
                    value={zipCode}
                    onChange={(e) =>
                      validateZipcode(e.target.value.replace(/[^\d.]/gi, ''))
                    } />
                    {showValidationMessage && (
                    <label htmlFor="">
                      Sorry, we're not licensed in this state, yet!
                    </label>
                  )}
                    </div>
                    <div className="banner__select">
                      <label htmlFor="banner">Property Type</label>
                      <select defaultValue="Single Family Home"
                    value={propertyType}
                    onChange={(e) => handleChange(e.target.value)}>
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
                      <label htmlFor="banner">Property Use</label>
                      <select  defaultValue="PrimaryResidence"
                    value={propertyUse}
                    onChange={(e) => handleChangePropertyUse(e.target.value)}>
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
                  <h1 className="d-mob">{data?.mobTitle}</h1>
                  <h1 className="d-desktop">{data?.title}</h1>
                  <h2 className="d-mob">
                    {data?.mobDescription?.mobDescription}
                  </h2>
                </div>
                <div className="banner__form">
                  <div className="banner__form-fields">
                    <div className="banner__select">
                      <label htmlFor="banner">Property Value Estimate</label>
                      <input placeholder="$100,000" type="text"
                      value={propertyValue}
                      onChange={(e) =>
                        rangeValueChange(e.target.value, true, e)
                      }/>
                    </div>
                    <div className="banner__select">
                      <label htmlFor="banner">Current Loan Balance</label>
                      <input placeholder="$100,000" type="text"
                      value={currentLoanBal}
                      onChange={(e) =>
                        currentLoanValueChange(e.target.value, true, e)
                      } />
                    </div>
                    <div className="banner__select">
                      <label htmlFor="banner">Cash Out Amount</label>
                      <input placeholder="$0" ttype="text"
                        value={cashOut}
                        onChange={(e) =>
                          cashOutValueChange(e.target.value, true, e)
                        } />
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
                  <h1 className="d-mob">{data?.mobTitle}</h1>
                  <h2 className="d-mob">
                    {data?.mobDescription?.mobDescription}
                  </h2>
                </div>
                <div className="banner__form">
                  <div className="banner__form-fields">
                    <div className="banner__inputs">
                      <input placeholder="Phone" type="text"
                    maxlength="10"
                    value={phone}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/[^\d.]/gi, ''))
                    } />
                    {showPhoneValidationMessage && (
                    <label htmlFor="">
                      Please enter 10 digits
                    </label>
                  )}
                    </div>
                    <div className="banner__inputs">
                      <input placeholder="Email" {...register('email', {
                          required: 'This is a required field',
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message:
                              'Entered value does not match email format',
                          },
                        })} />
                    <label htmlFor="">
                      {errors.email?.message}
                    </label>
                    </div>
                  </div>
                  <a className="btn" href="#">
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

import React, { useEffect, useState } from 'react'
import * as styles from './PersonalizeRateBlock.module.scss'
import { Range, getTrackBackground } from 'react-range'
import sectionModel from 'models/Section'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const PersonalizeRateBlock = (data) => {
  let bannerDetails = data?.sectionData
  let modeledData = []
  let filterData = []
  let dataContent = []
  let image;

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
  const [currentLoanBal, setCurrentLoanBal] = useState([0])
  const [cashOut, setCashOut] = useState([0])
  const [zipCode, setZipCode] = useState('')
  const [urlValue, setUrlValue] = useState('')
  let url = '';

  const closeModal = (e) => {
    data.closeModal()
    setUrlValue('')
    setZipCode('')
    setCashOut([0])
    setCurrentLoanBal([0])
    setPropertyValue([0])
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
      // + '&isAutoClick=1&target=_blank'
    setUrlValue(url);
  }

  const rangeValueChange = (value) => {
    setPropertyValue(value)
    setUrl()
  }
  const cashOutValueChange = (value) => {
    setCashOut(value)
    setUrl()
  }
  const currentLoanValueChange = (value) => {
    setCurrentLoanBal(value)
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
    urlValue
  ])

  // const handleSubmit = async (event) => {
  // let formData = {
  //   type: data?.classname,
  //   zipcode: zipCode,
  //   purchasePrice: propertyValue,
  //   downPayment: currentLoanBal,
  //   cashOut: cashOut,
  //   creditRange: creditRating,
  //   propertyType: propertyType,
  //   propertyUse: propertyUse,
  // }
  // event.preventDefault();
  // sendFormData()
  // }

  const handleChange = (data) => {
    let propertyType = data.replaceAll(' ', '')
    setPropertyType(propertyType)
    setUrl()
  }
  const handleChangeCreditRating = (data) => {
    setCreditRating(data)
    setUrl()
  }
  const handleChangePropertyUse = (data) => {
    let propertyUse = data.replaceAll(' ', '')
    setPropertyUse(propertyUse)
    setUrl()
  }

  function sendFormData() {
    fetch(url)
      .then((response) => {})
      .catch((error) => {
        console.error('There was an error!', error)
      })
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
                    onChange={(e) => handleChangeCreditRating(e.target.value)}
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
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
                <div className="CakeFieldWrap">
                  <label htmlFor="">Property Type</label>
                  <select
                    defaultValue="Single Family Home"
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
                      value="Detached Condominium"
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
                    defaultValue="Primary Residence"
                    onChange={(e) => handleChangePropertyUse(e.target.value)}
                  >
                    {/* <option>Choose Property Use</option> */}
                    <option value="Primary Residence" name="Primary Residence">
                      Primary Residence
                    </option>
                    <option
                      value="Secondary Vacation Home"
                      name="Secondary Vacation Home"
                    >
                      Secondary Vacation Home
                    </option>
                    <option value="InvestmentRental" name="InvestmentRental">
                      InvestmentRental
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
                      value={propertyValue}
                      onChange={(e) => rangeValueChange([e.target.value])}
                    />
                  </span>
                  {/* <input type="range" /> */}
                  <div className="custom-range">
                    <Range
                      step={1000}
                      min={0}
                      max={2000000}
                      values={propertyValue}
                      onChange={(e) => rangeValueChange(e)}
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
                      value={currentLoanBal}
                      onChange={(e) => currentLoanValueChange([e.target.value])}
                    />
                  </span>
                  {/* <input type="range" /> */}
                  <div className="custom-range">
                    <Range
                      step={1000}
                      min={0}
                      max={2000000}
                      values={currentLoanBal}
                      onChange={(e) => currentLoanValueChange(e)}
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
                        value={cashOut}
                        onChange={(e) => cashOutValueChange([e.target.value])}
                      />
                    </span>
                    {/* <input type="range" /> */}
                    <div className="custom-range">
                      <Range
                        step={1000}
                        min={0}
                        max={1000000}
                        values={cashOut}
                        onChange={(e) => cashOutValueChange(e)}
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
                { (propertyValue[0] < currentLoanBal[0]) && <label> *{data.classname === 'refinance'
                      ? 'Property Value'
                      : 'Purchase Price'} can not be lesser than {data.classname === 'refinance'
                      ? 'Current Loan Balance'
                      : 'Down Payment'}</label>}
                <a
                  className={`btn dark ${
                    zipCode !== '' &&
                    propertyValue > [0] &&
                    currentLoanBal > [0] &&
                    (propertyValue[0] > currentLoanBal[0]) &&
                    (creditRating !== '' &&  creditRating !== 'Choose Credit rating') &&
                    (propertyType !== '' && propertyType !== 'ChoosePropertyType') &&
                    (propertyUse !== '' && propertyUse !== 'ChoosePropertyUse')
                      ? ''
                      : 'dis-btn'
                  }`}
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

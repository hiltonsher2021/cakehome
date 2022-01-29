import React from 'react'
import * as styles from './CampaignBanner.module.scss'
import { Link } from 'gatsby'

const CampaignBanner = (data) => {
  let slugOrder = []
  let currentPageData
  let nextPageData = []
  let filterData = []
  let currentPage = []
  let nextPage = []

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
                    <select>
                      <option selected="" value="780" name="740+">
                        740+
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
                </div>
                {/* <div className="banner__slider-control">
              <div className="banner__next">
                <a href="#" title="next">
                  <img src="/images/campaign-slider-grey.svg" alt="slider" />
                </a>
              </div>
              <div className="banner__slider-dots">
                {slugOrder.map((item, index) => {
                  return (
                    <>
                      <AnchorLink
                        className={`slider-dots ${
                          data?.slug === item?.slug ? 'active' : ''
                        } `}
                        to={'/campaign/' + item?.slug}
                        key={index}
                      ></AnchorLink>
                    </>
                  )
                })}
              </div>
            </div> */}
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
                      <input placeholder="90035" type="text" />
                    </div>
                    <div className="banner__select">
                      <label htmlFor="banner">Property Type</label>
                      <select>
                        <option
                          selected=""
                          value="780"
                          name="Single Family Home"
                        >
                          Single Family Home
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
                    <div className="banner__select">
                      <label htmlFor="banner">Property Use</label>
                      <select>
                        <option selected="" value="780" name="740+">
                          Primary Residence
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
                  </div>
                </div>
                {/* <div className="banner__slider-control">
              <div className="banner__next">
                <a href="#" title="next">
                  <img src="/images/campaign-slider-grey.svg" alt="slider" />
                </a>
              </div>
              <div className="banner__slider-dots">
                {slugOrder.map((item, index) => {
                  return (
                    <>
                      <AnchorLink
                        className={`slider-dots ${
                          data?.slug === item?.slug ? 'active' : ''
                        } `}
                        to={'/campaign/' + item?.slug}
                        key={index}
                      ></AnchorLink>
                    </>
                  )
                })}
              </div>
            </div> */}
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
                      <input placeholder="$100,000" type="text" />
                    </div>
                    <div className="banner__select">
                      <label htmlFor="banner">Current Loan Balance</label>
                      <input placeholder="$100,000" type="text" />
                    </div>
                    <div className="banner__select">
                      <label htmlFor="banner">Cash Out Amount</label>
                      <input placeholder="$0" type="text" />
                    </div>
                  </div>
                </div>
                {/* <div className="banner__slider-control">
            <div className="banner__next">
              <a href="#" title="next">
                <img src="/images/campaign-slider-grey.svg" alt="slider" />
              </a>
            </div>
            <div className="banner__slider-dots">
              {slugOrder.map((item, index) => {
                return (
                  <>
                    <AnchorLink
                      className={`slider-dots ${
                        data?.slug === item?.slug ? 'active' : ''
                      } `}
                      to={'/campaign/' + item?.slug}
                      key={index}
                    ></AnchorLink>
                  </>
                )
              })}
            </div>
          </div> */}
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
                      <input placeholder="phone" type="text" />
                    </div>
                    <div className="banner__inputs">
                      <input placeholder="Email" type="text" />
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

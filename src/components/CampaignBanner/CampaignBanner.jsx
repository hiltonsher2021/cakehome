import React from 'react'
import * as styles from './CampaignBanner.module.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links'

const CampaignBanner = (data) => {
  let slugOrder

  if (data) {
    let filterData = data?.edges.map((item) => {
      return { slug: item.node.slug, pageNo: item.node.handle }
    })
    // console.log(filterData, 'filter data')
    slugOrder = filterData.sort(function (a, b) {
      return a.pageNo - b.pageNo
    })
    // console.log(slugOrder, 'testdata data')
  }

  return (
    <div>
      <section className={styles.CampaginBanner}>
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
            <div className="banner__slider-control">
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
            </div>
          </div>
        </div>
        <div className="slide-2">
          <div className="container">
            <div className="banner__hero">
              <h1>Great to meet you Name.</h1>
              <h1 className="d-mob">
                How about that FICO score (don't trip, no credit pulls here)
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
            <div className="banner__slider-control">
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
            </div>
          </div>
        </div>
        <div className="slide-3">
          <div className="container">
            <div className="banner__hero">
              <h1 className="d-mob">
                Thank you Name, and regarding the property
              </h1>
              <h1 className="d-desktop">Tell us about your property</h1>
              <h2 className="d-mob">What type of property is it?</h2>
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
                    <option selected="" value="780" name="Single Family Home">
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
            <div className="banner__slider-control">
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
            </div>
          </div>
        </div>
        <div className="slide-4">
          <div className="container">
            <div className="banner__hero">
              <h1 className="d-mob">Almost there Name, couple more steps</h1>
              <h1 className="d-desktop">Nice work! Just a couple more steps</h1>
              <h2 className="d-mob">
                Tell us a bit more about your property and current loan
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
            <div className="banner__slider-control">
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
            </div>
          </div>
        </div>
        <div className="slide-5">
          <div className="container">
            <div className="banner__hero">
              <h1 className="d-desktop">Where can we reach you?.</h1>
              <h1 className="d-mob">You made it Name, last step!</h1>
              <h2 className="d-mob">Where can we reach you?</h2>
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
                <a href="#" title="next">
                  <img src="/images/campaign-slide-white.svg" alt="slider" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CampaignBanner

import React from 'react'
import * as styles from './CampaignBanner.module.scss'
const CampaignBanner = (data) => {
  
  return (
    <div>
     <section className={styles.CampaginBanner}>
       <div className="slide-1">
          <div className="container">
            <div className="banner__hero">
              <h1>Your Rate, Your Way.</h1>
            </div>
            <div className="banner__content">
              <h2>You’re just seconds away from getting your amazingly delicious personalized rate!</h2>
            </div>
            <div className="banner__form">
              <div className="banner__form-head">
              <h3>Let’s get started then!</h3>
              </div>
              <div className="banner__form-fields">
                <input placeholder='First Name' type="text"/>
                <input placeholder='Last Name' type="text"/>
              </div>
            </div>
            <div className="banner__slider-control">
                    <div className="banner__next">
                      <a href="#" title='next'>
                        <img src="/images/play-icon.svg" alt="slider"/>
                      </a>
                    </div>
                    <div className="banner__slider-dots">
                      <a className='slider-dots active' href="#" title='dots'></a>
                      <a className='slider-dots' href="#" title='dots'></a>
                      <a className='slider-dots' href="#" title='dots'></a>
                      <a className='slider-dots' href="#" title='dots'></a>
                      <a className='slider-dots' href="#" title='dots'></a>
                    </div>
            </div>
          </div>
       </div>
       {/* <div className="slide-2">
          <div className="container">
            <div className="banner__hero">
              <h1>Great to meet you Name.</h1>
              <h1 className='d-mob'>How about that FICO score (don't trip, no credit pulls here)</h1>
              <h2>Your credit rating...</h2>
            </div>
            <div className="banner__form">
              <div className="banner__form-fields">
              <select name="" id=""></select>
              </div>
            </div>
            <div className="banner__slider-control">
                    <div className="banner__next">
                      <a href="#" title='next'>
                        <img src="/images/play-icon.svg" alt="slider"/>
                      </a>
                    </div>
                    <div className="banner__slider-dots">
                      <a className='slider-dots' href="#" title='dots'></a>
                      <a className='slider-dots active' href="#" title='dots'></a>
                      <a className='slider-dots' href="#" title='dots'></a>
                      <a className='slider-dots' href="#" title='dots'></a>
                      <a className='slider-dots' href="#" title='dots'></a>
                    </div>
            </div>
          </div>
       </div> */}
     </section>
    </div>
  )
}

export default CampaignBanner

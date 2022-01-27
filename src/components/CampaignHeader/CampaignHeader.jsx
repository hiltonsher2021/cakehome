import React from 'react'
import * as styles from './CampaignHeader.module.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links'

const CampaignHeader = (data) => {
  return (
    <div>
    <header className={styles.CampaignHeader}>
      <div className="container">
      <div className="header__wrapper">
        <div className="header__logo">
          {/* <a href="#" title='logo'> */}
          <AnchorLink to="/">
            <img src="/images/campaign-logo.svg" alt="logo"/>
           </AnchorLink>
          {/* </a> */}
        </div>
        <div className="header__wrap">
            <a className='header__call-btn' href="telto:" alt="call">
              <div className="header__call-thumb">
                <img src="/images/headphone-icon.svg" alt="headphone"/>
              </div>
              <div className="header__call-text">
                Call Us
                <span>
                833-818-CAKE
                </span>
              </div>
            </a>
          <a className="header__chat-btn" href='' title='chat'>
            <div className="header__chat-thumb">
              <img src="/images/chat-icon-big.svg" alt="chat-icon-big"/>
            </div>
            <div className="header__chat-text">
               Chat With Us
            </div>
          </a>
          </div>
        </div>
        </div>
    </header>
    </div>
  )
}

export default CampaignHeader
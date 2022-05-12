import React, { useEffect } from 'react'
import * as styles from './CampaignHeader.module.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { closeChatWidget, maximizeChatWidget } from '../../utils/utils'
import sectionModel from 'models/Section'

const isBrowser = typeof window !== 'undefined'
const CampaignHeader = (data) => {
  let modeledData
  const openChatWidget = (e) => {
    maximizeChatWidget()
    if (isBrowser) {
      var { url, gtag } = window
      var callback = function () {
        if (typeof url != 'undefined') {
          window.location = url
        }
      }
      gtag('event', 'conversion', {
        send_to: 'AW-793052739/5hALCJTuqYcDEMOMlPoC',
        event_callback: callback,
      })
      return false
    }
  }

  if (data) {
    let filterData = data?.references?.filter((item) => {
      if (item?.handle.includes('1')) return item
    })
    modeledData = sectionModel(filterData[0])
  }

  return (
    <div>
      <header className={styles.CampaignHeader}>
        <div className="container">
          <div className="header__wrapper">
            <div className="header__logo">
              {/* <a href="#" title='logo'> */}
              <AnchorLink to="/">
                <img src="/images/camapaign__logo.svg" alt="logo" />
              </AnchorLink>
              {/* </a> */}
            </div>
            <div className="header__wrap">
              {modeledData?.section?.map((menu, index) => {
                if (menu?.label === 'Call Us') {
                  return (
                    <>
                      {' '}
                      <a
                        className="header__call-btn"
                        href={'tel:+' + menu?.url}
                        alt="call"
                      >
                        <div className="header__call-thumb">
                          <img
                            src="/images/headphone-icon.svg"
                            alt="headphone"
                          />
                        </div>
                        <div className="header__call-text">
                          {menu?.label}
                          <span>{menu?.subLabel}</span>
                        </div>
                      </a>
                    </>
                  )
                }
              })}

              <a
                className="header__chat-btn"
                title="chat"
                onClick={(e) => openChatWidget(e)}
              >
                <div className="header__chat-thumb">
                  <img src="/images/chat-icon-big.svg" alt="chat-icon-big" />
                </div>
                <div className="header__chat-text">Chat With Us</div>
              </a>
            </div>
          </div>
        </div>
        <p className="child-campaign"></p>
      </header>
    </div>
  )
}

export default CampaignHeader

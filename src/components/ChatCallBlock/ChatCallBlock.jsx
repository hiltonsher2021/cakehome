import React from 'react'
import * as styles from './ChatCallBlock.module.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import CtaCallUs from 'components/CtaCallUs/CtaCallUs'
import sectionModel from 'models/Section'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { maximizeChatWidget } from '../../utils/utils'

const isBrowser = typeof window !== 'undefined'
const ChatCallBlock = (data) => {
  let modeledData = []
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
    let filterData = data?.sectionData.filter((item) => {
      if (item?.handle?.includes('1')) return item
    })
    modeledData = sectionModel(filterData[0])
  }
  return (
    <div className={`${styles.ChatCallBlock} ${data?.className}`}>
      <div className="ChatCallBlock">
        
        <div className="container">
          <h2 class="title">{ modeledData?.mainTitle }</h2>
          <p class="copy"  dangerouslySetInnerHTML={{ __html: modeledData?.description?.description }}></p>
          <div className="ChatCallBlock__wrapper">
            <div className="ChatCallBlock_col">
              {/* className - ChatCall */}
              <CtaCallUs data={modeledData?.section} className="ChatCall" />
            </div>
            <div
              className="ChatCallBlock_col"
              onClick={(e) => openChatWidget(e)}
            >
              <a className="ChatCallBlock__chatbtn">
                <figure>
                  <img src="/images/chat-icon-big.svg" alt="chat-icon" />
                </figure>
                <span className="text-wrap">Chat With Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatCallBlock

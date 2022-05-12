import React from 'react'
import * as styles from './ContactUsGlobal.module.scss'
import sectionModel from 'models/Section'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { maximizeChatWidget } from '../../utils/utils'

const ContactUsGlobal = (data) => {
  let image
  let modeledData
  let referencedData
  const isBrowser = typeof window !== 'undefined'
  const openChatWidget = (e) => {
    maximizeChatWidget();
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
  const googleTagEmail = () => {
    if (isBrowser) {
      var { url, gtag } = window
      var callback = function () {
        if (typeof url != 'undefined') {
          window.location = url
        }
      };
      gtag('event', 'conversion', {
        send_to: 'AW-793052739/rlWPCKOxrfkCEMOMlPoC',
        event_callback: callback
      })
      return false
    }
  }

  if (data) {
    let filterData = data.sectionData.filter((item) => {
      if (item.handle === '9') return item
    })
    modeledData = sectionModel(filterData[0])
    referencedData = modeledData?.sectionReference[0]
    image = getImage(modeledData?.image?.gatsbyImageData)
  }

  return (
    <div className={`${styles.ContactUsGlobal}`}>
      <div className="container">
        <div className="ContactUsGlobal__wrap">
          <div className="ContactUsGlobal__details">
            {' '}
            <img
              className="mob-cake-logo hid-dsktp"
              src="/images/cake-logo-white.png"
              alt="cake"
            />
            <h2>{modeledData?.mainTitle}</h2>
            <div className="ContactUsGlobal__info">
              {/* Removed as per requirement */}
              {/* <p>{modeledData?.subTitle?.subTitle}</p> */}
              <p>{modeledData?.description?.description}</p>
            </div>
            <p className="contact">
            <a href={'tel:+' + (referencedData?.number)}>{referencedData?.title}</a>
              </p>
            <p className="contact" onClick={googleTagEmail}>
              <a href={referencedData?.ctaUrl}>{referencedData?.subTitle}</a>
            </p>
            <div className="ContactUsGlobal__Chat hid-mob">
              <p>
                <strong>
                  {referencedData?.titleLongDescription?.titleLongDescription}
                </strong>
                {referencedData?.footerText}
              </p>
              <div className="Chat-box">
                <input type="text" placeholder="Message" />
                <button
                  className="btn dark"
                  type="submit"
                  onClick={(e) => openChatWidget(e)}
                >
                  Send
                </button>
              </div>
            </div>
            <div className="ContactUsGlobal__ChatMob hid-dsktp">
              <button className="btn dark" onClick={(e) => openChatWidget(e)}>
                {referencedData?.ctaText}
              </button>
              <p>{referencedData?.footerText}</p>
            </div>
          </div>
          <div className="ContactUsGlobal__figure">
            <figure className="cake-map">
              <GatsbyImage
                image={image}
                alt={modeledData?.image?.title}
                objectFit="contain"
              />
              {/* <img src="/images/cake-map.png" alt="Cake Map" /> */}
            </figure>
            <figure className="door-map">
              <img src="/images/Door01_Color.gif" alt="Cake Door" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUsGlobal

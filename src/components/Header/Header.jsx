import React, { useState, useEffect, useRef, Fragment } from 'react'
import * as PropTypes from 'prop-types'
import * as styles from './Header.module.scss'
import CtaCallUs from '../CtaCallUs/CtaCallUs'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import sectionModel from 'models/Section'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { closeChatWidget, maximizeChatWidget } from '../../utils/utils'
// import { Location } from '@reach/router';
import { Link } from 'gatsby'

const isBrowser = typeof window !== 'undefined'

const propTypes = {
  location: PropTypes.object.isRequired,
}

const Header = ({ data }) => {
  let pathnameUrl = ''
  let pathValue = ''
  const closeWidget = () => {
    closeChatWidget()
  }
  if (isBrowser) {
    var { url, gtag, location } = window
    pathnameUrl = location?.pathname
    var element = document.getElementById('campaign-header')

    const isCampaignPage = pathnameUrl.includes('campaign')
    if (isCampaignPage === true) {
      element.classList.add('child-campaign')
    } else {
      if (element) {
        element.classList.remove('child-campaign')
      }
    }
  }
  const layoutData = data
  let modeledData
  let image
  const [navbarOpen, toggleNavbar] = useState(false)

  const handleNavbarToggle = (e) => {
    toggleNavbar(!navbarOpen)
  }

  const handleNavClose = (e) => {
    handleNavbarToggle(false)
  }

  useEffect(() => {
    closeWidget()
    var element = document.getElementById('navbar')
    var elementOverlay = document.getElementById('navbar-overlay')
    var body = document.getElementsByTagName('BODY')[0]
    if (navbarOpen) {
      element.classList.add('navbar-open')
      elementOverlay.classList.add('navbar-open')
      body.classList.add('navbar-open')
    }

    if (!navbarOpen) {
      element.classList.remove('navbar-open')
      elementOverlay.classList.remove('navbar-open')
      body.classList.remove('navbar-open')
    }
  }, [navbarOpen])

  if (layoutData) {
    let filterData = layoutData.contentfulLayout.layout.filter((item) => {
      if (item.mainTitle === 'MainNav') return item
    })
    modeledData = sectionModel(filterData[0])
    image = getImage(modeledData?.image?.gatsbyImageData)
  }

  const openChatWidget = (e) => {
    maximizeChatWidget()
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

  return (
    <header className={`${styles.header} ${pathValue} header-main`}>
      <div className="header-wrapper">
        <div className="header-top-mob">
          {modeledData?.section?.map((menu, index) => {
            if (menu?.label === 'Call Us') {
              return (
                <Fragment key={index}>
                  <a href={'tel:+' + menu?.url} className="icon-btn">
                    <img src="/images/support-icon.svg" alt="support-icon" />
                    Call Us
                  </a>
                </Fragment>
              )
            }
          })}

          <a className="icon-btn">
            <div onClick={(e) => openChatWidget(e)}>
              <img
                src="/images/chat-with-us-icon.svg"
                alt="chat-with-us-icon"
              />
              Chat with Us
            </div>
          </a>
          <a href="http://apply.cakehome.com/" className="icon-btn">
            <img src="/images/user-account-icon.svg" alt="user-account-icon" />
          </a>
        </div>
        <div className="brand-logo">
          <AnchorLink to={window.location.origin+"/"}>
            <figure>
              <GatsbyImage
                image={image}
                alt={modeledData?.image?.title}
                objectFit="contain"
                backgroundColor="transparent"
              />
            </figure>
          </AnchorLink>
        </div>
        <div className="right-menu">
          <div className="menu-links">
            <button className="menu-hamburger" onClick={handleNavbarToggle}>
              <img src="/images/hamburger-menu.svg" alt="hamburger-menu" />
            </button>
            <div className="mobile-menu-overlay" id="navbar-overlay"></div>
            <nav id="navbar">
              <button
                className="menu-close jsMenuClose"
                onClick={handleNavClose}
              >
                <img src="/images/menu-close.svg" alt="menu-close" />
              </button>
              <ul>
                {modeledData?.section.map((menu, index) => {
                  if (menu?.type[0] === 'Link') {
                    if (menu?.handle[0] === 'sub-menu') {
                      return (
                        <li
                          className={`has-sub-menu ${
                            pathnameUrl?.includes(menu?.url) ? 'active' : ''
                          }`}
                          key={index}
                        >
                          <Link
                            title={`${menu?.label}`}
                            to={`${menu?.url}`}
                            className="menu-item"
                          >
                            {menu?.label}
                          </Link>
                          <ul className="sub-menu">
                            {menu?.menuReference[0]?.items.map(
                              (item, itemIndex) => {
                                return (
                                  <li key={itemIndex}>
                                    <Link
                                      title={`${item.label}`}
                                      to={`${window.location.origin}${item.url}`}
                                      className="menu-item"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                )
                              }
                            )}
                          </ul>
                        </li>
                      )
                    } else {
                      return (
                        <li
                          key={index}
                          className={`${
                            pathnameUrl?.includes(menu?.url) ? 'active' : ''
                          }`}
                        >
                          <AnchorLink
                            className={`menu-item`}
                            title={`${menu?.label}`}
                            to={`${window.location.origin}${menu?.url}`}
                          >
                            {menu?.label}
                          </AnchorLink>
                        </li>
                      )
                    }
                  }
                })}
              </ul>
            </nav>
          </div>
          <div className="button-wrapper">
            <CtaCallUs data={modeledData?.section} />
            {modeledData?.section.map((menu, index) => {
              if (menu?.type[0] === 'Chat with us') {
                let chatImage = getImage(menu?.image?.gatsbyImageData)
                return (
                  <AnchorLink
                    className="btn green green--border small chat-with-us-dektp"
                    key={index}
                  >
                    <div
                      className="icon-wrapper"
                      onClick={(e) => openChatWidget(e)}
                    >
                      <figure>
                        <img src="/images/chat-icon-big.svg" alt="icon" />
                      </figure>
                    </div>
                    <div
                      className="text-wrapper"
                      onClick={(e) => openChatWidget(e)}
                    >
                      {menu?.label}
                    </div>
                  </AnchorLink>
                )
              }
              if (menu?.type[0] === 'Get started') {
                return (
                  <AnchorLink
                    className="btn green green--fill small get-started"
                    title={`${menu?.label}`}
                    to={`${menu?.url}`}
                    key={index}
                  >
                    {menu?.label}
                  </AnchorLink>
                )
              }
            })}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

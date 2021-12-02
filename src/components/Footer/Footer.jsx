import React from 'react'
import * as styles from './Footer.module.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import sectionModel from 'models/Section'
import { closeChatWidget, maximizeChatWidget } from '../../utils/utils';
import { Link } from 'gatsby'

const Footer = ({ data }) => {
  const layoutData = data
  let modeledData
  let image
  let socialImage
  let filterData

  if (layoutData) {
    filterData = layoutData.contentfulLayout.layout.filter((item) => {
      if (item.mainTitle === 'Footer')  return item
    })
    modeledData = sectionModel(filterData[0])

    image = getImage(modeledData?.image?.gatsbyImageData)
  }

  const openChatWidget = (e) => {
    maximizeChatWidget()
  }

  return (
    <footer className={styles.footer}>
      <div className="footer-wrapper">
        <div className="brand-logo">
          <AnchorLink to="/">
            <figure>
              <GatsbyImage image={image} alt={modeledData?.image?.title} />
            </figure>
          </AnchorLink>
        </div>
        <div className="right-menu-columns">
          {modeledData?.section.map((menu, menuIndex) => {
            if (menu?.name === 'Social') {
              return (
                <div className="column single social" key={menuIndex}>
                  <h6>{menu?.name}</h6>
                  <ul>
                    {menu?.items.map((menuItem, index) => {
                      socialImage = getImage(menuItem?.image?.gatsbyImageData);
                      return (
                        <li key={index}>
                          <a href={menuItem?.url} target="_blank">
                            <figure>
                              <GatsbyImage image={socialImage} alt={menuItem?.image?.title} />
                            </figure>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            } else {
              return (
                <div className="column single" key={menuIndex}>
                  <h6>{menu?.name}</h6>
                  <ul>
                    {menu?.items.map((menuItem, index) => {
                      if((menuItem?.label !== 'Chat with Us') && (menuItem?.subLabel !== 'phonenumber') && (menuItem?.subLabel !== 'email') && (menuItem?.subLabel !== 'notLink')) {
                        return (
                          <li key={index}>
                            <Link
                              to={menuItem?.url}
                              title={menuItem?.label}
                            >{menuItem?.label}</Link>
                          </li>
                        )
                      } else if(menuItem?.subLabel === 'phonenumber') {
                        return (
                          <li key={index}>
                            <a className="dskt-res"
                              title={menuItem?.label}
                              href="tel:+8778182253"
                            >{menuItem?.label}</a>
                          </li>
                        )
                      }else if(menuItem?.subLabel === 'email') {
                        return (
                          <li key={index}>
                          <a
                            title={menuItem?.label}
                            href={menuItem?.url}
                            target="_blank"
                          >{menuItem?.label}</a>
                        </li>
                        )
                      }else if(menuItem?.subLabel === 'notLink') {
                        return (
                          <li key={index}>
                            <span>
                              {menuItem?.label}
                            </span>
                        </li>
                        )
                      } else {
                        return (
                          <li onClick={(e) => openChatWidget(e)} key={index}>
                            <AnchorLink
                              title={menuItem?.label}
                            ></AnchorLink>
                          </li>
                        )
                      }
                    })}
                  </ul>
                </div>
              )
            }
          })}
        </div>
      </div>
      <div className="footer-bottom-strip">
        <p>{filterData[0]?.subTitle?.subTitle}</p>
      </div>
    </footer>
  )
}

export default Footer

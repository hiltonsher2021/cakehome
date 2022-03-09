import React, { useEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Header from 'components/Header'
import Footer from 'components/Footer'
import * as PropTypes from 'prop-types'

if (typeof window !== 'undefined') {
  require('smooth-scroll')('a[href*="#"]')
}

const Layout = (props) => {
  const init = () => {}

  return (
    <StaticQuery
      query={graphql`
        {
          contentfulLayout {
            title
            layout: layoutReference {
              mainTitle
              subTitle {
                subTitle
              }
              section: sectionReference {
                ... on ContentfulList {
                  name
                  id
                  items {
                    ... on ContentfulMenuItem {
                      id
                      label
                      url
                      handle
                      subLabel
                      description {
                        description
                      }
                      image {
                        gatsbyImageData(
                          placeholder: BLURRED
                          formats: [AUTO, WEBP]
                        )
                        title
                      }
                    }
                  }
                }
                ... on ContentfulMenuItem {
                  id
                  url
                  handle
                  subLabel
                  label
                  type
                  id
                  menuReference {
                    id
                    items {
                      ... on ContentfulMenuItem {
                        id
                        subLabel
                        label
                        url
                      }
                    }
                  }
                  image {
                    gatsbyImageData(
                      placeholder: BLURRED
                      formats: [AUTO, WEBP]
                    )
                    title
                  }
                }
              }
              image {
                title
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                )
              }
            }
          }
        }
      `}
      render={(data) => (
        <div>
          <Header data={data} {...props} />
          <div className="main-wrapper">{props.children}</div>
          <Footer data={data} {...props} />
        </div>
      )}
    ></StaticQuery>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout

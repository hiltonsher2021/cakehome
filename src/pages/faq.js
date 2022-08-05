import React, { useState, useEffect } from 'react'
import * as PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/layout/Main/MainLayout'
import Banner from 'components/Banner/Banner'
import FaqBlock from 'components/FaqBlock/FaqBlock'
import { initCalculators, unloadCalculators } from 'helpers/calculator'
import SEO from 'components/seo'

const isBrowser = typeof window !== 'undefined'

const propTypes = {
  data: PropTypes.object,
}

const HomeFinance = ({ data }) => {
  let dataSplit = data?.contentfulPage?.sections
  let campaignUrl = ''
  let type = ''


  const [showModalSection, changeModalValue] = useState(false)
  const [tabSelection, changeTabSelection] = useState('')


  const showModal = (value) => {
    changeTabSelection(value)
    changeModalValue(true)
  }
  const closeModal = (e) => {
    changeModalValue(false)
  }


  useEffect(() => {
    if (isBrowser) {
      initCalculators()
    }
    return () => {
      if (isBrowser) {
        unloadCalculators()
      }
    }
  }, [])

  return (
    <Layout>
      {/* <!-- Conversion Pixel for [registration]- DO NOT MODIFY --> */}
      <img
        src="https://data.adxcel-ec2.com/pixel/?ad_log=referer&action=registration&pixid=8c0b3505-a7ff-4f6a-b874-6a1e048ce68d"
        width="1"
        height="1"
        border="0"
      >
        {/* <!-- End of Conversion Pixel --> */}
      </img>
      <SEO
        title={data?.contentfulPage?.name}
        description={data?.contentfulPage?.description?.description}
        image={'https:' + data?.contentfulPage?.metaImage?.file?.url}
      />
      <section className="">
        {/* classNames - Home Purchase */}
        <Banner
          bannerData={dataSplit}
          handle={data?.contentfulPage?.handle}
          className="home"
          showModal={showModal}
        />
      </section>
      <section className="posRelative">
          <span id="faq-section"></span>
          <FaqBlock sectionData={dataSplit} />
      </section>

    </Layout>
  )
}

HomeFinance.propTypes = propTypes

export default HomeFinance

export const query = graphql`
{
  contentfulPage(handle: { eq: "faq" }) {
    handle
    title
    name
    description {
      description
    }
    metaImage {
      file {
        url
      }
    }
    sections {
      ... on ContentfulBanner {
        id
        backgroundColour
        ctaText
        description {
          description
        }
        handle
        mainTitle
        subTitle {
          subTitle
        }
        headerText
        image {
          gatsbyImageData(placeholder: NONE, formats: [AUTO, WEBP])
          title
        }
      }
      ... on ContentfulSection {
        id
        backgroundColour
        ctaText
        ctaLink
        description {
          description
        }
        footerText
        handle
        image {
          gatsbyImageData
          title
        }
        mainTitle
        subTitle {
          subTitle
        }
        section: sectionReference {
          ... on ContentfulTab {
            id
            title
            items {
              ... on ContentfulTabItems {
                id
                ctaText
                footerText
                tabTitle
                title
                tabReference {
                  ... on ContentfulCard {
                    id
                    ctaText
                    footerText
                    subTitle
                    title
                    iconType
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

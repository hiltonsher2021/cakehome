import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'
import Layout from 'components/layout/Main/MainLayout'
import RateBanner from 'components/RateBanner/RateBanner'
import PersonalizeRateBlock from 'components/PersonalizeRateBlock/PersonalizeRateBlock'
import ExpertKnowledge from 'components/ExpertKnowledge/ExpertKnowledge'
import PlainCopyBlock from 'components/PlainCopyBlock/PlainCopyBlock'
import ContactUsGlobal from 'components/ContactUsGlobal/ContactUsGlobal'
import SEO from 'components/seo'

const propTypes = {
  data: PropTypes.object,
}

const Rates = ({ data }) => {
  const [showModalSection, changeModalValue] = useState(false)
  const [tabSelection, changeTabSelection] = useState('')
  const dataSplit = data?.contentfulPage?.sections
  let campaignPurchaseUrl = ''
  let campaignRefinanceUrl = ''
  let type = ''

  const showModal = (value) => {
    changeTabSelection(value)
    changeModalValue(true)
  }
  const closeModal = (e) => {
    changeModalValue(false)
  }
  const campaignPageUrl = () => {
    let urlData = dataSplit.filter((item) => {
      if (item?.parentSlug) {
        return item
      }
    })
    urlData.map((item) => {
      let parentSlug = item?.parentSlug
      // type = urlData[0].type;
      let childSlug = item?.reference.filter((item) => {
        if (item?.handle === 1) {
          return item.childSlug
        }
      })

      if (item?.type === 'Refinance') {
        campaignRefinanceUrl =
          '/campaign/' + parentSlug + '/' + childSlug[0]?.childSlug
      } else {
        campaignPurchaseUrl =
          '/campaign/' + parentSlug + '/' + childSlug[0]?.childSlug
      }
    })
  }

  campaignPageUrl()
  useEffect(() => {}, [showModalSection])

  return (
    <Layout>
      {/* <!-- Conversion Pixel for [misc]- DO NOT MODIFY --> */}
      <img
        src="https://data.adxcel-ec2.com/pixel/?ad_log=referer&action=misc&pixid=8c0b3505-a7ff-4f6a-b874-6a1e048ce68d"
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
      <section>
        <RateBanner
          bannerData={dataSplit}
          campaignRefinanceUrl={campaignRefinanceUrl}
          campaignPurchaseUrl={campaignPurchaseUrl}
        />
        <div
          className="PersonalizeModal"
          style={{ display: showModalSection ? 'block' : 'none' }}
        >
          <PersonalizeRateBlock
            closeModal={closeModal}
            sectionData={dataSplit}
            classname={tabSelection}
          />
        </div>
        <ExpertKnowledge
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          showModal={showModal}
        />

        {/* className -  green refi rates*/}
        <PlainCopyBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          className="refi rates"
          showModal={showModal}
        />

        <ContactUsGlobal sectionData={dataSplit} />
      </section>
    </Layout>
  )
}

Rates.propTypes = propTypes

export default Rates

export const query = graphql`
  {
    contentfulPage(handle: { eq: "rates" }) {
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
        ... on ContentfulSection {
          handle
          mainTitle
          ctaText
          ctaLink
          subTitle {
            subTitle
          }
          backgroundColour
          description {
            description
          }
          image {
            gatsbyImageData
            title
          }
          sectionReference {
            ... on ContentfulList {
              id
              name
              items {
                ... on ContentfulCard {
                  id
                  subTitle
                  title
                  image {
                    gatsbyImageData
                    title
                  }
                }
              }
            }
            ... on ContentfulCard {
              id
              ctaText
              ctaUrl
              number
              subTitle
              title
              footerText
              titleLongDescription {
                titleLongDescription
              }
              description {
                raw
              }
              image {
                gatsbyImageData
                title
              }
            }
          }
        }
        ... on ContentfulCampaignMainPage {
          id
          campaignId
          parentSlug
          title
          type
          statusId
          spaceId
          reference {
            childSlug
            handle
          }
        }
      }
    }
  }
`

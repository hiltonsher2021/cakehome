import React, { useState, useEffect } from 'react'
import * as PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/layout/Main/MainLayout'
import Banner from 'components/Banner/Banner'
import RefiRateBlock from 'components/RefiRateBlock/RefiRateBlock'
import PurchaseProcessBlock from 'components/PurchaseProcessBlock/PurchaseProcessBlock'
import RefiBenefits from 'components/RefiBenefits/RefiBenefits'
import MonthlyPaymentCalculator from 'components/MonthlyPaymentCalculator/MonthlyPaymentCalculator'
import FluidGraphics from 'components/FluidGraphics/FluidGraphics'
import RefiTestimonials from 'components/RefiTestimonials/RefiTestimonials'
import PlainCopyBlock from 'components/PlainCopyBlock/PlainCopyBlock'
import InfoContentBlock from 'components/InfoContentBlock/InfoContentBlock'
import { initCalculators, unloadCalculators } from 'helpers/calculator'
import SEO from 'components/seo'
import PersonalizeRateBlock from 'components/PersonalizeRateBlock/PersonalizeRateBlock'

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
  const campaignPageUrl = () => {
    let urlData = dataSplit.filter((item) => {
      if(item?.parentSlug) {
        return item

      }
    })
    let parentSlug = urlData[0]?.parentSlug;
    type = urlData[0].type;
    let childSlug = urlData[0]?.reference.filter((item) => {
      if (item?.handle === 1) {
        return item.childSlug
      }
    })
    campaignUrl = '/campaign/' + parentSlug + '/' + childSlug[0]?.childSlug
  }

  campaignPageUrl()

  const showModal = (value) => {
    changeTabSelection(value)
    changeModalValue(true)
  }
  const closeModal = (e) => {
    changeModalValue(false)
  }


  useEffect(() => {
    campaignPageUrl()
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
          campaignUrl={campaignUrl}
        />

        <div
          className="PersonalizeModal"
          style={{ display: showModalSection ? 'block' : 'none' }}
        >
          <PersonalizeRateBlock
            closeModal={closeModal}
            sectionData={dataSplit}
            classname={tabSelection}
            handle={data?.contentfulPage?.handle}
          />
        </div>

        <RefiRateBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
        />

        <PurchaseProcessBlock sectionData={dataSplit} showModal={showModal}           campaignUrl={campaignUrl}
/>

        {/* className - orange */}
        <RefiBenefits
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          showModal={showModal}
          campaignUrl={campaignUrl}
          type={type}
        />

        {/* className - green small-copy-sec refi purchase */}
        <MonthlyPaymentCalculator
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
        />

        <FluidGraphics sectionData={dataSplit} />

        <RefiTestimonials
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          className="purchase"
        />

        {/* className -  green refi*/}
        <PlainCopyBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          className="refi"
          showModal={showModal}
          campaignUrl={campaignUrl}
          type={type}
        />
        {/* Removed as per requirement */}
        {/* <InfoContentBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
        /> */}
      </section>
    </Layout>
  )
}

HomeFinance.propTypes = propTypes

export default HomeFinance

export const query = graphql`
  {
    contentfulPage(handle: { eq: "homepurchase" }) {
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
          ctaUrl
          ctaMobText
          description {
            description
          }
          subTitle {
            subTitle
          }
          image {
            gatsbyImageData
            title
            description
          }
          mainTitle
          handle
          bannerReference {
            handle
            footerText
            title
            titleLongDescription {
              titleLongDescription
            }
            image {
              gatsbyImageData
            }
            ctaText
          }
        }
        ... on ContentfulSection {
          id
          backgroundColour
          ctaText
          ctaMobText
          ctaLink
          description {
            description
          }

          footerText
          handle
          mainTitle

          image {
            gatsbyImageData
            title
          }
          sectionReference {
            ... on ContentfulCard {
              id
              backgroundColour
              ctaText
              ctaUrl
              footerText
              subTitle
              title
              titleLongDescription {
                titleLongDescription
              }
              image {
                gatsbyImageData
                title
                file {
                  contentType
                  fileName
                  url
                }
              }
              cardItems {
                ... on ContentfulCard {
                  id
                  footerText
                  iconType
                  ctaText
                  subTitle
                  title
                  titleLongDescription {
                    titleLongDescription
                  }
                  image {
                    gatsbyImageData
                    title
                  }
                }
              }
            }
            ... on ContentfulList {
              id
              name
              image {
                gatsbyImageData
                title
              }
              items {
                ... on ContentfulTabItems {
                  ctaText
                  footerText
                  title
                  tabTitle
                  image {
                    gatsbyImageData
                    title
                  }
                }
                ... on ContentfulCard {
                  id
                  ctaText
                  description {
                    raw
                  }
                  footerText
                  subTitle
                  title
                  titleLongDescription {
                    titleLongDescription
                  }
                }
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

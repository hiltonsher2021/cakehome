import React, { useState, useEffect } from 'react'
import * as PropTypes from 'prop-types'
import Banner from 'components/Banner/Banner'
import SingleColoredSection from 'components/SingleColoredSection/SingleColoredSection';
import CheckYourSavingsFrontPage from 'components/CheckYourSavingsFrontPage/CheckYourSavingsFrontPage'
import ImageAnimation from 'components/ImageAnimation/ImageAnimation'
import CalculatorScript from 'components/CalculatorScript/CalculatorScript'
import PlainCopyBlock from 'components/PlainCopyBlock/PlainCopyBlock'
import TabContentAsPlainBlock from 'components/TabContentAsPlainBlock'
import Testimonials from 'components/Testimonials/Testimonials'
import ContactUsGlobal from 'components/ContactUsGlobal/ContactUsGlobal'
import { graphql } from 'gatsby'
import Layout from 'components/layout/Main/MainLayout'
import SEO from 'components/seo'
import { initCalculators, unloadCalculators } from 'helpers/calculator'
import { Helmet } from 'react-helmet'
const isBrowser = typeof window !== 'undefined'

const propTypes = {
  data: PropTypes.object,
}
const IndexPage = ({ data }) => {
  let campaignPurchaseUrl = ''
  let campaignRefinanceUrl = ''
  let type = ''
  const [showModalSection, changeModalValue] = useState(false)
  const [tabSelection, changeTabSelection] = useState('')
  const dataSplit = data?.contentfulPage?.sections;
  const purchaseAdviceSection = data?.contentfulPage?.sections[3]?.sectionReference[0]?.items[1] //data?.allContentfulTabItems?.nodes[1]
  const refinanceAdviceSection = data?.contentfulPage?.sections[3]?.sectionReference[0]?.items[0]
  const campaignPageUrl = () => {
    let urlData = dataSplit?.filter((item) => {
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
  const showModal = (value) => {
    changeTabSelection(value)
    changeModalValue(true)
  }
  const closeModal = (e) => {
    changeModalValue(false)
  }

  useEffect(() => {}, [showModalSection])

  useEffect(() => {
    if (isBrowser) {
      initCalculators()
    }
    return () => {
      if (isBrowser) {
        unloadCalculators()
      }
    }
  }, [showModalSection])

  return (
    <Layout>
      <Helmet>
      <script type="application/ld+json">
        {`{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Cake Mortgage Company Inc",
          "category": "Mortgage lender",
          "description": "Mortgages made easy. At Cake, we offer a simple, transparent approval process for home loans and refinances, specializing in low FICO, non-QM, veterans, and manufactured homes. Our flexible loans and fast closing times keep your purchase on track. Our mission is to be a partner for life. Instead of a one-and-done transaction, we strive for lasting relationships with our customers to help them realize the maximum value from their investment at every stage of homeownership. Led by excellent customer service, we approve many borrowers that other lenders will not. Life’s better with Cake.",
          "url": "https://cakehome.com/",
          "logo": "https://images.ctfassets.net/ptoa5hrem9k5/40ZaQVgPwuxGryQ9OYmhzI/60cf2a359c8f43e748d257c8010dd6c3/cake-logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "833-818-2253",
            "contactType": "customer service",
            "areaServed": "US"
          },
          "sameAs": [
            "https://business.facebook.com/Cake-Mortgage-107587851690285/",
            "https://www.linkedin.com/company/cake-mortgage/"
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "9200 Oakdale Ave STE 501",
            "addressLocality": "Chatsworth",
            "addressRegion": "CA",
            "postalCode": "91311",
            "addressCountry": "United States"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 34.23923950953099,
            "longitude": -118.5659251539757
          },
          "hasMap": "https://www.google.com/maps/place/Cake+Mortgage/@34.2386896,-118.5660539,15z/data=!4m5!3m4!1s0x0:0x6fbc86eb37600b1b!8m2!3d34.2385006!4d-118.5660221"
        }`}
      </script>

      </Helmet>
      {/* <!-- Conversion Pixel for [content]- DO NOT MODIFY --> */}
      <img
        src="https://data.adxcel-ec2.com/pixel/?ad_log=referer&action=content&pixid=8c0b3505-a7ff-4f6a-b874-6a1e048ce68d"
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
      <div className="home-page">
        <Banner
          bannerData={dataSplit}
          className="home"
          handle={data?.contentfulPage?.handle}
        />
        <PlainCopyBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          sectionValue="2"
          className="medium-padding"
          bodyHeading={true}
        />
        <SingleColoredSection
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          bgColor="orange"
          tabIndex={0}
          noTopPadding={true}
          noInnerTopMargin={true}
        />

        <TabContentAsPlainBlock
          sectionData={purchaseAdviceSection}
          medPadding={true}
        />

        <CalculatorScript
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          showModal={showModal}
          campaignUrl={campaignPurchaseUrl}
        />

        <Testimonials sectionData={dataSplit} />

        <CheckYourSavingsFrontPage
          sectionData={dataSplit}
          campaignUrl={campaignRefinanceUrl}
          fullWidthHeading={true}
          isPurpleBg={true}
          noPadding={true}
          noBg={true}
        />

        <SingleColoredSection
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          bgColor="orange"
          tabIndex={1}
          noTopPadding={true}
          noCssPos={true}
        />

        <ImageAnimation
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          showModal={showModal}
          campaignUrl={campaignRefinanceUrl}
          textNotFooter={true}
        />

        <TabContentAsPlainBlock
          sectionData={refinanceAdviceSection}
          medPadding={true}
        />

        <ContactUsGlobal sectionData={dataSplit} />
      </div>
    </Layout>
  )
}

IndexPage.propTypes = propTypes

export default IndexPage

export const pageQuery = graphql`
  {
    contentfulPage(handle: { eq: "frontpage" }) {
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
          ctaText
          ctaUrl
          ctaMobText
          subTitle {
            subTitle
          }
          mainTitle
          description {
            id
          }
          image {
            gatsbyImageData(placeholder: NONE, formats: [AUTO, WEBP])
            title
          }
          handle
        }
        ... on ContentfulSection {
          id
          mainTitle
          subTitle {
            subTitle
          }
          handle
          backgroundColour
          footerText
          image {
            gatsbyImageData
            title
          }
          description {
            description
          }
          backgroundColour
          sectionReference {
            ... on ContentfulTab {
              id
              title
              items {
                ... on ContentfulTabItems {
                  id
                  tabTitle
                  title
                  ctaText
                  image {
                    gatsbyImageData
                    title
                  }
                  tabReference {
                    ... on ContentfulCard {
                      title
                      footerText
                      iconType
                      subTitle
                      titleLongDescription {
                        titleLongDescription
                      }
                      cardItems {
                        ... on ContentfulCard {
                          id
                          ctaText
                          footerText
                          iconType
                          title
                          subTitle
                          titleLongDescription {
                            titleLongDescription
                          }
                          cardItems {
                            ... on ContentfulParagraph {
                              id
                              title {
                                title
                              }
                            }
                          }
                        }
                      }
                    }
                    ... on ContentfulMenuItem {
                      id
                      label
                      subLabel
                      url
                    }
                  }
                }
                ... on ContentfulCard {
                  id
                  ctaText
                  footerText
                  image {
                    gatsbyImageData
                    title
                    description
                  }
                  subTitle
                  title
                  description {
                    raw
                  }
                  backgroundImage {
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
              backgroundColour
              footerText
              title
              subTitle
              image {
                gatsbyImageData
                title
                description
              }
              subTitle
              title
              description {
                raw
              }
              handle
              titleLongDescription {
                titleLongDescription
              }
              cardItems {
                ... on ContentfulCard {
                  id
                  title
                  subTitle
                  iconType
                  ctaText
                  footerText
                  titleLongDescription {
                    titleLongDescription
                  }
                }
              }
            }
            ... on ContentfulTabItems {
              id
              tabTitle
              title
              ctaText
              ctaUrl
              tabReference {
                ... on ContentfulCard {
                  id
                  title
                  subTitle
                  description {
                    raw
                  }
                  footerText
                }
              }
            }
            ... on ContentfulCta {
              id
              title
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
    allContentfulTabItems(filter: {title: {regex: "/Home New/"}}) {
      nodes {
        title
        tabTitle
        tabReference {
          ... on ContentfulCard {
            id
            title
            subTitle
          }
        }
      }
    }
  }
`

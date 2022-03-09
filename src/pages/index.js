import React, { useState, useEffect } from 'react'
import * as PropTypes from 'prop-types'
import Banner from 'components/Banner/Banner'
import CheckOutRates from 'components/CheckOutRates/CheckOutRates'
import HowItWorks from 'components/HowItWorks/HowItWorks'
import CheckYourSavings from 'components/CheckYourSavings/CheckYourSavings'
// import CopyFigure2Column from 'components/CopyFigure2Column/CopyFigure2Column'
import ImageAnimation from 'components/ImageAnimation/ImageAnimation'
import CalculatorScript from 'components/CalculatorScript/CalculatorScript'
import PlainCopyBlock from 'components/PlainCopyBlock/PlainCopyBlock'
import Testimonials from 'components/Testimonials/Testimonials'
import QABlock from 'components/QABlock/QABlock'
import ContactUsGlobal from 'components/ContactUsGlobal/ContactUsGlobal'
import { graphql } from 'gatsby'
import Layout from 'components/layout/Main/MainLayout'
import SEO from 'components/seo'
import { initCalculators, unloadCalculators } from 'helpers/calculator'
import PersonalizeRateBlock from 'components/PersonalizeRateBlock/PersonalizeRateBlock'

const isBrowser = typeof window !== 'undefined'

const propTypes = {
  data: PropTypes.object,
}
const IndexPage = ({ data }) => {
  const [showModalSection, changeModalValue] = useState(false)
  const [tabSelection, changeTabSelection] = useState('')
  const dataSplit = data?.contentfulPage?.sections

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
        {/* Removed as requested by client, might have to be shown in future */}
        {/* <CheckOutRates
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          showModal={showModal}
        /> */}
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
        <PlainCopyBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          sectionValue="2"
        />

        <CheckYourSavings sectionData={dataSplit} />

        <HowItWorks
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
        />
        <ImageAnimation
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          showModal={showModal}
        />
        <CalculatorScript
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          showModal={showModal}
        />
        <PlainCopyBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          sectionValue="6"
        />

        <Testimonials sectionData={dataSplit} showModal={showModal} />
        <QABlock sectionData={dataSplit} />
        <ContactUsGlobal sectionData={dataSplit} />
      </div>
    </Layout>
  )
}

IndexPage.propTypes = propTypes

export default IndexPage

export const pageQuery = graphql`
  {
    contentfulPage(handle: { eq: "homepage" }) {
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
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
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
                ... on ContentfulTab {
                  id
                  title
                  items {
                    ... on ContentfulCard {
                      id
                      title
                      subTitle
                      description {
                        raw
                      }
                      footerText
                    }
                    ... on ContentfulCta {
                      id
                      title
                    }
                  }
                }
              }
            }
            ... on ContentfulCta {
              id
              title
            }
          }
        }
      }
    }
  }
`

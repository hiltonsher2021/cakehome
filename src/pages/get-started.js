import React, { useState, useEffect }  from 'react'
import * as PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/layout/Main/MainLayout'
import CheckOutRates from 'components/CheckOutRates/CheckOutRates'
import HowItWorks from 'components/HowItWorks/HowItWorks'
import ContactUsGlobal from 'components/ContactUsGlobal/ContactUsGlobal'
import SEO from 'components/seo';
import PersonalizeRateBlock from 'components/PersonalizeRateBlock/PersonalizeRateBlock'
import PlainCopyBlock from 'components/PlainCopyBlock/PlainCopyBlock'

const propTypes = {
  data: PropTypes.object,
}

const GetStarted = ({ data }) => {
  const dataSplit = data?.contentfulPage?.sections
  const [showModalSection, changeModalValue] = useState(false)
  const [tabSelection, changeTabSelection] = useState('')

  const showModal = (value) => {
    changeTabSelection(value)
    changeModalValue(true)
  }
  const closeModal = (e) => {
    changeModalValue(false)
  }

  useEffect(() => {}, [showModalSection])

  return (
    <Layout>
      <SEO title="Cake Get Started" />
      <section>
        <CheckOutRates
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          showModal={showModal}
        />
        <PlainCopyBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          sectionValue="2"
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
        <HowItWorks sectionData={dataSplit} handle={data?.contentfulPage?.handle} />
        <ContactUsGlobal sectionData={dataSplit} />
      </section>
    </Layout>
  )
}

GetStarted.propTypes = propTypes

export default GetStarted

export const query = graphql`
  {
    contentfulPage(handle: { eq: "getstarted" }) {
      handle
      title
      sections {
        ... on ContentfulSection {
          handle
          ctaText
          mainTitle
          backgroundColour
          footerText
          image {
            gatsbyImageData
            title
          }
          description {
            description
          }
          subTitle {
            subTitle
          }
          sectionReference {
            ... on ContentfulTabItems {
              id
              ctaText
              footerText
              backgroundColour
              tabTitle
              title
              tabReference {
                ... on ContentfulTab {
                  id
                  title
                  items {
                    ... on ContentfulCard {
                      id
                      backgroundColour
                      ctaText
                      number
                      footerText
                      titleLongDescription {
                        titleLongDescription
                      }
                      title
                    }
                  }
                }
              }
            }
            ... on ContentfulTab {
              id
              title
              items {
                ... on ContentfulTabItems {
                  id
                  title
                  ctaText
                  footerText
                  image {
                    gatsbyImageData
                    title
                  }
                  tabTitle
                  title
                  tabReference {
                    ... on ContentfulMenuItem {
                      id
                      label
                      subLabel
                      url
                    }
                  }
                }
              }
            }
            ... on ContentfulCard {
              id
              ctaText
              ctaUrl
              number
              footerText
              title
              subTitle
              backgroundColour
              image {
                gatsbyImageData
                title
                description
              }
              description {
                raw
              }
              titleLongDescription {
                titleLongDescription
              }
            }
          }
        }
      }
    }
  }
`

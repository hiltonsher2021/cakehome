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
      <SEO title="Rates Page" />
      <section>
        <RateBanner bannerData={dataSplit} showModal={showModal} />
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
        <ExpertKnowledge sectionData={dataSplit} handle={data?.contentfulPage?.handle} showModal={showModal}/>

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
      }
    }
  }
`

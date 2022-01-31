import React, {useState, useEffect} from 'react'
import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'
import Layout from 'components/layout/Main/MainLayout'
import SEO from 'components/seo'
import CampaignBanner from 'components/CampaignBanner/CampaignBanner'
import CampaignHeader from 'components/CampaignHeader/CampaignHeader'
import CampaignForm from 'components/CampaignForm/CampaignForm'
import CampaignCard from 'components/CampaignCard/CampaignCard'
import CheckYourSavingsCampaign from 'components/CheckYourSavingsCampaign/CheckYourSavingsCampaign'
import PersonalizeRateBlock from 'components/PersonalizeRateBlock/PersonalizeRateBlock'

export const query = graphql`
  query ($slug: String) {
   allContentfulCampaign {
    edges {
      node {
        title
        slug
        handle
      }
    }
  }
    contentfulCampaign(slug: { eq: $slug }) {
      title
      slug
      handle
      campaignPageIdentification
      mainTitle
      mobDescription {
        mobDescription
      }
      body
      mobTitle
      description {
        description
      }
      references {
        ... on ContentfulSection {
          id
          mainTitle
          subTitle {
            subTitle
          }
          handle
          description {
            description
          }
          section: sectionReference {
            ... on ContentfulCard {
              id
              cardItems {
                ... on ContentfulCard {
                  id
                  title
                  subTitle
                  titleLongDescription {
                    titleLongDescription
                  }
                  footerText
                  image {
                    gatsbyImageData
                  }
                  ctaUrl
                }
              }
            }
            ... on ContentfulMenuItem {
              id
              type
              subLabel
              label
              handle
              image {
                gatsbyImageData
              }
              url
            }
          }
        }
      }
    }
  }
`

const Campaign = (props) => {
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
      <SEO title="Campaign" />
      <section className="generic-section">
        <CampaignHeader {...props.data.contentfulCampaign} />
        <CampaignBanner {...props.data.contentfulCampaign} {...props?.data?.allContentfulCampaign}/>
        <CheckYourSavingsCampaign {...props.data.contentfulCampaign} showModal={showModal}/>
        <div
          className="PersonalizeModal"
          style={{ display: showModalSection ? 'block' : 'none' }}
        >
          <PersonalizeRateBlock
            closeModal={closeModal}
            sectionData={props.data.contentfulCampaign}
            classname={tabSelection}
          />
        </div>
        <CampaignCard {...props.data.contentfulCampaign} />
        <CampaignForm {...props.data.contentfulCampaign} />
      </section>
    </Layout>
  )
}

export default Campaign

import React from 'react'
import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'
import Layout from 'components/layout/Main/MainLayout'
import SEO from 'components/seo'
import CampaignBanner from 'components/CampaignBanner/CampaignBanner'
import CampaignHeader from 'components/CampaignHeader/CampaignHeader'
import CampaignForm from 'components/CampaignForm/CampaignForm'
import CampaignCard from 'components/CampaignCard/CampaignCard'
import CheckYourSavingsCampaign from 'components/CheckYourSavingsCampaign/CheckYourSavingsCampaign'

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
      mainTitle
      mobDescription {
        mobDescription
      }
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
  return (
    <Layout>
      <SEO title="Campaign" />
      <section className="generic-section">
        <CampaignHeader />
        <CampaignBanner {...props.data.contentfulCampaign} {...props?.data?.allContentfulCampaign}/>
        <CheckYourSavingsCampaign {...props.data.contentfulCampaign} />
        <CampaignCard {...props.data.contentfulCampaign} />
        <CampaignForm {...props.data.contentfulCampaign} />
      </section>
    </Layout>
  )
}

export default Campaign

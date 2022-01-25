import React from 'react'
import * as PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/layout/Main/MainLayout'
import SEO from 'components/seo'
import CampaignBanner from 'components/CampaignBanner/CampaignBanner'
import CampaignHeader from 'components/CampaignHeader/CampaignHeader'
import CampaignForm from 'components/CampaignForm/CampaignForm'
import CampaignCard from 'components/CampaignCard/CampaignCard'
import CheckYourSavingsCampaign from 'components/CheckYourSavingsCampaign/CheckYourSavingsCampaign'

const propTypes = {
  data: PropTypes.object,
}

const CampaignPage = ({data}) => {
  const dataSplit = data?.contentfulPage?.sections;

  return (
    <Layout>
      <SEO title="Campaign" />
      <section className="generic-section">
        <CampaignHeader />
        <CampaignBanner />
        <CheckYourSavingsCampaign />
        <CampaignCard />
        <CampaignForm  sectionData={dataSplit}/>
      </section>
    </Layout>
  )
}
CampaignPage.propTypes = propTypes

export default CampaignPage

export const query = graphql`
  {
    contentfulPage(handle: { eq: "toolsadvice" }) {
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
            gatsbyImageData
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
            ... on ContentfulMenuItem {
              id
              backgroundColour
              handle
              image {
                gatsbyImageData
                title
              }
              url
              subLabel
              label
            }
          }
        }
      }
    }
  }
`

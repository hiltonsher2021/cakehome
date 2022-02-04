import React, { useState, useEffect } from 'react'
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
          childSlug
          handle
        }
      }
    }
    contentfulCampaignMainPage(parentSlug: { eq: $slug }) {
      title
      id
      parentSlug
      type
      reference {
        id
        title
        childSlug
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
                      file {
                        url
                      }
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
  }
`

const Campaign = (props) => {

  const [showModalSection, changeModalValue] = useState(false)
  const [tabSelection, changeTabSelection] = useState('')
  const { childSlug, slug } = props?.pageContext
  const pageData = props?.data?.contentfulCampaignMainPage.reference.find(
    (ref) => ref.childSlug === childSlug
  )
  const campaignType = props?.data?.contentfulCampaignMainPage?.type;
  const pagesTotal = props?.data?.contentfulCampaignMainPage.reference;
const typeValue = campaignType.toLowerCase()

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
        <CampaignHeader {...pageData} />
        <CampaignBanner
          {...pageData}
          {...props?.data?.allContentfulCampaign}
          {...props?.location}
          pagesTotal={pagesTotal}
          parentSlug={slug}
          campaignType={typeValue}
        />
        {typeValue.includes('refinance') &&  <CheckYourSavingsCampaign
          {...pageData}
          showModal={showModal}
          campaignType={typeValue}
        />}



        <div
          className="PersonalizeModal"
          style={{ display: showModalSection ? 'block' : 'none' }}
        >
          <PersonalizeRateBlock
            closeModal={closeModal}
            sectionData={pageData}
            classname={tabSelection}
          />
        </div>
        <CampaignCard {...pageData} />
        <CampaignForm {...pageData} />
      </section>
    </Layout>
  )
}

export default Campaign

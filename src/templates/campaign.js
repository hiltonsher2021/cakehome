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
    contentfulCampaign(slug: { eq: $slug }) {
      title
      slug
      mainTitle
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
          sectionReference {
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
        <CampaignBanner {...props.data.contentfulCampaign} />
        <CheckYourSavingsCampaign />
        <CampaignCard {...props.data.contentfulCampaign} />
        {/* <CampaignForm  {...props.data.contentfulCampaign}/> */}
      </section>
    </Layout>
  )
}

export default Campaign

// const propTypes = {
//   data: PropTypes.object,
// }
// CampaignPage.propTypes = propTypes

// export const query = graphql`
//   {
//     contentfulPage(handle: { eq: "toolsadvice" }) {
//       handle
//       title
//       name
//       description {
//         description
//       }
//       metaImage {
//         file {
//           url
//         }
//       }
//       sections {
//         ... on ContentfulBanner {
//           id
//           backgroundColour
//           ctaText
//           description {
//             description
//           }
//           handle
//           mainTitle
//           subTitle {
//             subTitle
//           }
//           headerText
//           image {
//             gatsbyImageData
//             title
//           }
//         }
//         ... on ContentfulSection {
//           id
//           backgroundColour
//           ctaText
//           ctaLink
//           description {
//             description
//           }
//           footerText
//           handle
//           image {
//             gatsbyImageData
//             title
//           }
//           mainTitle
//           subTitle {
//             subTitle
//           }
//           section: sectionReference {
//             ... on ContentfulMenuItem {
//               id
//               backgroundColour
//               handle
//               image {
//                 gatsbyImageData
//                 title
//               }
//               url
//               subLabel
//               label
//             }
//           }
//         }
//       }
//     }
//   }
// `

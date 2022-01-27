import React from "react"
import { graphql } from "gatsby"
import * as PropTypes from 'prop-types'
import Layout from 'components/layout/Main/MainLayout'
import SEO from 'components/seo'
import CampaignBanner from 'components/CampaignBanner/CampaignBanner'
import CampaignHeader from 'components/CampaignHeader/CampaignHeader'
import CampaignForm from 'components/CampaignForm/CampaignForm'
import CampaignCard from 'components/CampaignCard/CampaignCard'
import CheckYourSavingsCampaign from 'components/CheckYourSavingsCampaign/CheckYourSavingsCampaign'

export const query = graphql`
  query($slug: String) {
    contentfulCampaign(slug: { eq: $slug }) {
      title
      slug
    }
  }
`

const Campaign = props => {

  return (
    <Layout>
    <SEO title="Campaign" />
    <section className="generic-section">
      <CampaignHeader />
      <CampaignBanner />
      <CheckYourSavingsCampaign />
      <CampaignCard />
      {/* <CampaignForm  sectionData={dataSplit}/> */}
    </section>
  </Layout>
    // <div>
    //   <div className="campaign-post-container">
    //     <article className="post">
    //       <div className="post-thumbnail" >
    //         <h1 className="post-title">{props.data.contentfulCampaign.title}</h1>
    //         <div className="post-meta">{props.data.contentfulCampaign.slug}</div>
    //       </div>
    //     </article>
    //   </div>
    // </div>
  )
}

export default Campaign












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

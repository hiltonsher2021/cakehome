const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const campaignPost = path.resolve('./src/templates/campaign.js')
    resolve(
      graphql(
        `
          {
            allContentfulCampaignMainPage {
              edges {
                node {
                  id
                  parentSlug
                  title
                  reference {
                    id
                    childSlug
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }

        const posts = result?.data?.allContentfulCampaignMainPage?.edges
        posts.forEach((post) => {
          post?.node?.reference.forEach((ref)=>{
            createPage({
              path: `/campaign/${post?.node?.parentSlug}/${ref?.childSlug}`,
              component: campaignPost,
              context: {
                slug: post.node.parentSlug,
                childSlug: ref.childSlug
              },
            })
          })
        })
      })
    )

    const blogPostTemplate = path.resolve('./src/templates/article.js')
    resolve(
      graphql(
        `
          {
            contentfulPage(handle: { eq: "articleDetails" }) {
              handle
              title
              sections {
                ... on ContentfulSection {
                  id
                  mainTitle
                  sectionReference {
                    ... on ContentfulSeo {
                      titleTag
                      metaDescription
                      urlSlug
                    }
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }
        const articles = result?.data?.contentfulPage?.sections
        articles.forEach((article) => {
          const articleSectionReference = article.sectionReference
          const articleSEODetails =
            articleSectionReference[articleSectionReference.length - 1]
          createPage({
            path: `/blog/${articleSEODetails.urlSlug}/`,
            component: blogPostTemplate,
            context: {
              slug: articleSEODetails.urlSlug,
              id: article?.id,
            },
          })
        })
      })
    )
  })
}

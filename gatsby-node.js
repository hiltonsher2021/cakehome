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
          // console.log(result.errors)
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
  })
}

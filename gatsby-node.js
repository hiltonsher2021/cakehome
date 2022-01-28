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
            allContentfulCampaign {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          // console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulCampaign.edges
        posts.forEach(post => {
          createPage({
            path: `/campaign/${post.node.slug}/`,
            component: campaignPost,
            context: {
              slug: post.node.slug,
            },
          })
        })
      })
    )
  })
}

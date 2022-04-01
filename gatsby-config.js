require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.cakehome.com/',
    title: 'Cake',
    description: 'Cake',
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `ptoa5hrem9k5`,
        accessToken: process.env.CONTENTFUL_API_KEY,
        environment: 'develop',
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('node-sass'),
        sassOptions: {
          precision: 6,
        },
      },
    },
    {
      resolve: `gatsby-plugin-anchor-links`,
      options: {
        offset: -100,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
        }
      `,
        resolveSiteUrl: () => 'https://www.cakehome.com/',
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map((page) => ({ ...page }))
        },
        serialize: ({ path }) => {
          const theDate = new Date()
          const month = theDate.getMonth() + 1
          const day = theDate.getDate()
          const year = theDate.getFullYear()
          return {
            url: path,
            lastmod: `${month}-${day}-${year}`, //This needs to change
          }
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-root-import`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}

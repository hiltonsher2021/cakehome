
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    siteUrl: "https://www.cakehome.com/",
    title: "Cake",
    description: "Cake"
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `ptoa5hrem9k5`,
        accessToken: process.env.CONTENTFUL_API_KEY,
        environment: 'develop'
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("node-sass"),
        sassOptions: {
          precision: 6,
        },
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://cakehome.com/`,
        stripQueryString: true,
      },
    },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -100
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-root-import`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      exclude: [/^\/campaign(?!\/refinance\/apply_today11|\/home_purchase\/apply_today1)(\/.*)?$/]
    },
  ],
};

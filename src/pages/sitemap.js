import React from 'react'
import Layout from 'components/layout/Main/MainLayout'
import SEO from 'components/seo'
import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'
import { Link } from 'gatsby'

const propTypes = {
  data: PropTypes.object,
}

const Sitemap = ({ data }) => {

  return (
    <Layout>
      <SEO title="Sitemap" />
      <div class="sitemap_container">
      <h1 class="sitemap_h1">Sitemap</h1>
      <ul class="sitemap_list_">
      {
          data.pages.nodes.map(node => {

            if(node.path.split('/')[1] != 'campaign'){
              console.log(node.path.split('/')[1])
              if((!node.path.includes('404') )){
                return <li><a href={'https://cakehome.com'+node.path}>{node.path.replace(/\//g, "")}</a></li>;
              }
            }

          })
      }
      </ul>
      <ul  class="sitemap_list">
        <li><a href="https://cakehome.com/">Home</a></li>
        <li><a href="https://cakehome.com/refinance">Refinance</a></li>
        <li><a href="https://cakehome.com/home-purchase">Home Purchase</a></li>
        <li><a href="https://cakehome.com/rates">Rates</a></li>
        <li><a href="https://cakehome.com/tools-advice">Tools and Advice</a></li>
        <li><a href="https://cakehome.com/about-cake">About Cake</a></li>
      </ul>
      </div>
    </Layout>
  )
}

export default Sitemap

export const query = graphql`
  {
    pages: allSitePage {
        nodes {
          path
        }
      }
  }
`

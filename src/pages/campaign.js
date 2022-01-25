import React from 'react'
import Layout from 'components/layout/Main/MainLayout'
import SEO from 'components/seo'
import CampaignBanner from 'components/CampaignBanner/CampaignBanner'
import CampaignHeader from 'components/CampaignHeader/CampaignHeader'
import CampaignForm from 'components/CampaignForm/CampaignForm'

const CampaignPage = ({}) => {
  return (
    <Layout>
      <SEO title="Campaign" />
      <section className="generic-section">
        <CampaignHeader />
        <CampaignBanner />
        <CampaignForm />
      </section>
    </Layout>
  )
}

export default CampaignPage

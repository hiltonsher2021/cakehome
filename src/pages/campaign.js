import React from 'react'
import Layout from 'components/layout/Main/MainLayout'
import SEO from 'components/seo'
import CampaignBanner from 'components/CampaignBanner/CampaignBanner';
import CampaignHeader from 'components/CampaignHeader/CampaignHeader';

const CampaignPage = ({}) => {
  return (
    <Layout>
      <SEO title="Cake Privacy Policy" />
      <section className="generic-section">
        Campaign page
        <CampaignHeader />
        <CampaignBanner />
      </section>
    </Layout>
  )
}

export default CampaignPage

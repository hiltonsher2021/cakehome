import React, { useEffect } from 'react'
import * as PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/layout/Main/MainLayout'
import Banner from 'components/Banner/Banner'
import ChatCallBlock from 'components/ChatCallBlock/ChatCallBlock'
// import SmartToolsBlock from 'components/SmartToolsBlock/SmartToolsBlock'
import AdviceBlock from 'components/AdviceBlock/AdviceBlock'
import PlainCopyBlock from 'components/PlainCopyBlock/PlainCopyBlock'
import FaqBlock from 'components/FaqBlock/FaqBlock'
import GlossaryBlock from 'components/GlossaryBlock/GlossaryBlock'
import CheckYourSavings from 'components/CheckYourSavings/CheckYourSavings'
import SEO from 'components/seo'
import { initCalculators, unloadCalculators } from 'helpers/calculator'
import { Helmet } from 'react-helmet'
const isBrowser = typeof window !== 'undefined'

const propTypes = { data: PropTypes.object }

const ToolsAdvice = ({ data }) => {
  const dataSplit = data?.contentfulPage?.sections
  let campaignUrl = ''
  // let type = ''

  useEffect(() => {
    if (isBrowser) {
      initCalculators()
    }
    return () => {
      if (isBrowser) {
        unloadCalculators()
      }
    }
  }, [])

  const campaignPageUrl = () => {
    let urlData = dataSplit.filter((item) => {
      if (item?.parentSlug) {
        return item
      }
    })
    let parentSlug = urlData[0]?.parentSlug
    // type = urlData[0].type
    let childSlug = urlData[0]?.reference.filter((item) => {
      if (item?.handle === 1) {
        return item.childSlug
      }
    })
    campaignUrl = '/campaign/' + parentSlug + '/' + childSlug[0]?.childSlug
  }

  campaignPageUrl()

  return (
    <Layout>
      <Helmet>
      <script type="application/ld+json">
        {`{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [{
            "@type": "Question",
            "name": "What sort of documents are required to refinance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "W2, 30 Day Paystubs, Mortgage Statement, and Home-Owners Insurance"
            }
          },{
            "@type": "Question",
            "name": "What out of pocket costs are associated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "None!"
            }
          },{
            "@type": "Question",
            "name": "Will my property taxes increase due to an appraisal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NO! Your appraisal is strictly to help determine the estimate value of your home for the lender, that value does NOT get sent to your city or county"
            }
          },{
            "@type": "Question",
            "name": "If I apply, am I committed to refinancing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NO! There is no application or appraisal fee so if anything changes, you don’t pay any fees!"
            }
          },{
            "@type": "Question",
            "name": "Am I going to be taxed on my cash-out?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NO! Cash out from your equity is your money and does not get taxed!"
            }
          },{
            "@type": "Question",
            "name": "What does the process look like?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Three step process, quick application, then approval, and closing."
            }
          },{
            "@type": "Question",
            "name": "What is an APR?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "APR is an accurate calculation on how much a loan costs. The higher the APR the higher the fees, the lower the APR the lower the fees. Make sure you are getting an APR tailored to how long you plan on keeping your home"
            }
          },{
            "@type": "Question",
            "name": "Does it cost me anything to get a loan estimate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NO! Getting a loan Estimate is totally free, and takes only moments to generate it!"
            }
          },{
            "@type": "Question",
            "name": "How do I know which interest rate to pick?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "How long you plan on being in the home helps determine which rate is best for you, you should always consult with a Cake councilor to see what your “Break Even” period is with every rate."
            }
          },{
            "@type": "Question",
            "name": "What is an official loan estimate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An official Loan Estimate gives you an itemized breakdown that allows you to simply see your rate, payment, APR, and fees associated with your mortgage based on your qualifications."
            }
          },{
            "@type": "Question",
            "name": "Does it cost me anything to get a loan estimate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NO! Getting a loan Estimate is totally free, and takes only moments to generate it!"
            }
          },{
            "@type": "Question",
            "name": "Why is my payoff higher than my principal balance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your payoff will include the remaining interest left over on your loan where your principal balance shows what you owed based on your last payment"
            }
          },{
            "@type": "Question",
            "name": "How do I know which interest rate to pick?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pre Paid items are taxes or insurance due ahead of time prior to your loan closing. Your escrow account is where the money is held to pay your upcoming taxes and insurance"
            }
          },{
            "@type": "Question",
            "name": "Will I have a personal point of contact throughout the process?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Your CAKE Concierge will be giving you updates throughout the process and you can easily check online to see the status of your loan"
            }
          },{
            "@type": "Question",
            "name": "Can I buy a car or finance new purchases during the process?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Its good practice to not acquire any new debt during a refinance process, given it can jeopardize your loan approval, however you can always check with your CAKE Councilor to confirm."
            }
          },{
            "@type": "Question",
            "name": "Why is my payoff higher than my principal balance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your payoff will include the remaining interest left over on your loan where your principal balance shows what you owed based on your last payment"
            }
          },{
            "@type": "Question",
            "name": "What are pre-paid items?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pre Paid items are taxes or insurance due ahead of time prior to your loan closing. Your escrow account is where the money is held to pay your upcoming taxes and insurance"
            }
          },{
            "@type": "Question",
            "name": "Are my closing costs tax-deductible?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fees can be Tax Deductible such as “points” Make sure you check if your Tax preparer to verify which costs are tax deductible"
            }
          }]
        }`}
      </script>

      </Helmet>
      <SEO
        title={data?.contentfulPage?.name}
        description={data?.contentfulPage?.description?.description}
        image={'https:' + data?.contentfulPage?.metaImage?.file?.url}
      />
      <section>
        {/* ClassName - Tools */}
        <Banner bannerData={dataSplit} className="toolsadvice" />
      </section>
      <section>
        <ChatCallBlock sectionData={dataSplit} />
      </section>
      <section>
        <PlainCopyBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          sectionValue="2"
        />
      </section>
      <section>
        <CheckYourSavings sectionData={dataSplit} campaignUrl={campaignUrl} />
      </section>

      <section className="posRelative">
        <span id="calculator-section"></span>
        {/* /* Commented as Signal intent is not working */}
        {/* <SmartToolsBlock sectionData={dataSplit} /> */}
      </section>

      {/* Removed advice section from contentful */}
      <section className="posRelative">
        <span id="refi-advice-section"></span>
        <AdviceBlock sectionData={dataSplit} />
      </section>
      <section>
        <PlainCopyBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          className="tools-advise"
          sectionValue="6"
        />
      </section>
      <section className="posRelative">
        <span id="faq-section"></span>
        <FaqBlock sectionData={dataSplit} />
      </section>
      <section className="posRelative">
        <span id="glossary-section"></span>
        <GlossaryBlock sectionData={dataSplit} />
      </section>
    </Layout>
  )
}
ToolsAdvice.propTypes = propTypes

export default ToolsAdvice

export const query = graphql`
  {
    contentfulPage(handle: { eq: "toolsadvice" }) {
      handle
      title
      name
      description {
        description
      }
      metaImage {
        file {
          url
        }
      }
      sections {
        ... on ContentfulBanner {
          id
          backgroundColour
          ctaText
          description {
            description
          }
          handle
          mainTitle
          subTitle {
            subTitle
          }
          headerText
          image {
            gatsbyImageData(placeholder: NONE, formats: [AUTO, WEBP])
            title
          }
        }
        ... on ContentfulSection {
          id
          backgroundColour
          ctaText
          ctaLink
          description {
            description
          }
          footerText
          handle
          image {
            gatsbyImageData
            title
          }
          mainTitle
          subTitle {
            subTitle
          }
          section: sectionReference {
            ... on ContentfulMenuItem {
              id
              backgroundColour
              handle
              image {
                gatsbyImageData
                title
              }
              url
              subLabel
              label
            }
            ... on ContentfulCard {
              id
              backgroundColour
              ctaText
              ctaUrl
              description {
                raw
              }
              footerText
              iconType
              image {
                gatsbyImageData
                title
              }
              subTitle
              title
            }
            ... on ContentfulList {
              id
              name
              items {
                ... on ContentfulCard {
                  id
                  ctaText
                  backgroundColour
                  image {
                    gatsbyImageData
                  }
                  backgroundImage {
                    gatsbyImageData
                  }
                  footerText
                  iconType
                  subTitle
                  title
                  titleLongDescription {
                    titleLongDescription
                  }
                  url
                  handle
                }
              }
            }
            ... on ContentfulTab {
              id
              title
              items {
                ... on ContentfulTabItems {
                  id
                  ctaText
                  footerText
                  tabTitle
                  title
                  tabReference {
                    ... on ContentfulCard {
                      id
                      ctaText
                      footerText
                      subTitle
                      title
                      iconType
                    }
                  }
                }
              }
            }
          }
        }
        ... on ContentfulCampaignMainPage {
          id
          campaignId
          parentSlug
          title
          type
          statusId
          spaceId
          reference {
            childSlug
            handle
          }
        }
      }
    }
  }
`

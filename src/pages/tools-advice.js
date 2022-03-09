import React, { useEffect } from 'react'
import * as PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/layout/Main/MainLayout'
import Banner from 'components/Banner/Banner'
import ChatCallBlock from 'components/ChatCallBlock/ChatCallBlock'
import SmartToolsBlock from 'components/SmartToolsBlock/SmartToolsBlock'
import AdviceBlock from 'components/AdviceBlock/AdviceBlock'
import PlainCopyBlock from 'components/PlainCopyBlock/PlainCopyBlock'
import FaqBlock from 'components/FaqBlock/FaqBlock'
import GlossaryBlock from 'components/GlossaryBlock/GlossaryBlock'
import CheckYourSavings from 'components/CheckYourSavings/CheckYourSavings'
import SEO from 'components/seo'
import { initCalculators, unloadCalculators } from 'helpers/calculator'

const isBrowser = typeof window !== 'undefined'

const propTypes = {
  data: PropTypes.object,
}

const ToolsAdvice = ({ data }) => {
  const dataSplit = data?.contentfulPage?.sections

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

  return (
    <Layout>
      <SEO title={data?.contentfulPage?.name}
        description={data?.contentfulPage?.description?.description}
        image={'https:' + data?.contentfulPage?.metaImage?.file?.url} />
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
        <CheckYourSavings sectionData={dataSplit} />
      </section>

      <section className="posRelative">
        <span id="calculator-section"></span>
        {/* /* Commented as Signal intent is not working */}
        {/* <SmartToolsBlock sectionData={dataSplit} /> */}
      </section>

      {/* Removed advice section from contentful */}
      {/* <section className="posRelative">
        <span id="refi-advice-section"></span>
        <AdviceBlock sectionData={dataSplit} />
      </section> */}
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
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
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
      }
    }
  }
`

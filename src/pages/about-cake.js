import React from 'react'
import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'
import SEO from 'components/seo'
import Layout from 'components/layout/Main/MainLayout'
import Banner from 'components/Banner/Banner'
import LoanNumberBlock from 'components/LoanNumberBlock/LoanNumberBlock'
import AboutBeliefsBlock from 'components/AboutBeliefsBlock/AboutBeliefsBlock'
import TeamStoryBlock from 'components/TeamStoryBlock/TeamStoryBlock'
// import NewsBlock from 'components/NewsBlock/NewsBlock'
import CopyFigure2Column from 'components/CopyFigure2Column/CopyFigure2Column'
import PlainCopyBlock from 'components/PlainCopyBlock/PlainCopyBlock'
import ContactUsGlobal from 'components/ContactUsGlobal/ContactUsGlobal'

const propTypes = {
  data: PropTypes.object,
}

const AboutCake = ({ data }) => {
  const dataSplit = data?.contentfulPage?.sections;
  return (
    <Layout>
      <SEO title={data?.contentfulPage?.name}
        description={data?.contentfulPage?.description?.description}
        image={'https:' + data?.contentfulPage?.metaImage?.file?.url} />
      <section className="posRelative">
        {/* ClassName - Tools About */}
        <span id="our-mission"></span>

        <Banner
          bannerData={dataSplit}
          handle={data?.contentfulPage?.handle}
          className="toolsadvice"
        />
      </section>
      <section>
        {' '}
        <LoanNumberBlock sectionData={dataSplit} />
      </section>
      <section>
        {' '}
        <AboutBeliefsBlock sectionData={dataSplit} />
      </section>

      <section>
        {' '}
        <TeamStoryBlock sectionData={dataSplit} />
      </section>

      {/* Removed from contentful as well */}
      {/* <NewsBlock sectionData={dataSplit} /> */}

      <section>
        {/* ClassName -  green tools-advise about hid-mob */}
        <PlainCopyBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          className="tools-advise about hid-mob"
        />
      </section>

      <section>
        {/* ClassName - green refi about */}
        <CopyFigure2Column
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          className="refi about"
        />
      </section>

      <section>
        {/* ClassName -  green tools-advise about hid-dsktp */}
        <PlainCopyBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          className="tools-advise about hid-dsktp"
        />
      </section>
      <section>
        {' '}
        <ContactUsGlobal sectionData={dataSplit} />
      </section>
    </Layout>
  )
}

AboutCake.propTypes = propTypes

export default AboutCake

export const query = graphql`
  {
    contentfulPage(handle: { eq: "aboutcake" }) {
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
          subTitle {
            subTitle
          }
          backgroundColour
          ctaText
          description {
            description
          }
          handle
          headerText
          mainTitle

          image {
            gatsbyImageData
          }
        }
        ... on ContentfulSection {
          handle
          ctaText

          mainTitle
          backgroundColour
          subTitle {
            subTitle
          }
          sectionReference {
            ... on ContentfulCard {
              id
              ctaText
              ctaUrl
              number
              footerText
              image {
                gatsbyImageData
                title
              }
              backgroundImage {
                gatsbyImageData
                title
              }
              subTitle
              title
              titleLongDescription {
                titleLongDescription
              }
              iconType
            }
            ... on ContentfulCta {
              id
              link
              linkPath
              title
            }
          }
          footerText
          image {
            gatsbyImageData
            title
          }
          description {
            description
          }
        }
      }
    }
  }
`

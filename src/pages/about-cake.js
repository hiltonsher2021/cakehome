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
import { Helmet } from 'react-helmet'
const propTypes = {
  data: PropTypes.object,
}

const AboutCake = ({ data }) => {
  const dataSplit = data?.contentfulPage?.sections;
  return (
    <Layout>
          <Helmet>
      <script type="application/ld+json">
       {` {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Cake Mortgage Company Inc",
          "category": "Mortgage lender",
          "description": "Mortgages made easy. At Cake, we offer a simple, transparent approval process for home loans and refinances, specializing in low FICO, non-QM, veterans, and manufactured homes. Our flexible loans and fast closing times keep your purchase on track. Our mission is to be a partner for life. Instead of a one-and-done transaction, we strive for lasting relationships with our customers to help them realize the maximum value from their investment at every stage of homeownership. Led by excellent customer service, we approve many borrowers that other lenders will not. Life’s better with Cake.",
          "url": "https://cakehome.com/",
          "logo": "https://images.ctfassets.net/ptoa5hrem9k5/40ZaQVgPwuxGryQ9OYmhzI/60cf2a359c8f43e748d257c8010dd6c3/cake-logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "833-818-2253",
            "contactType": "customer service",
            "areaServed": "US"
          },
          "sameAs": [
            "https://business.facebook.com/Cake-Mortgage-107587851690285/",
            "https://www.linkedin.com/company/cake-mortgage/"
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "9200 Oakdale Ave STE 501",
            "addressLocality": "Chatsworth",
            "addressRegion": "CA",
            "postalCode": "91311",
            "addressCountry": "United States"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 34.23923950953099,
            "longitude": -118.5659251539757
          },
          "hasMap": "https://www.google.com/maps/place/Cake+Mortgage/@34.2386896,-118.5660539,15z/data=!4m5!3m4!1s0x0:0x6fbc86eb37600b1b!8m2!3d34.2385006!4d-118.5660221"
        }`}

        </script>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Cake Mortgage Company Inc",
            "image": "https://images.ctfassets.net/ptoa5hrem9k5/40ZaQVgPwuxGryQ9OYmhzI/60cf2a359c8f43e748d257c8010dd6c3/cake-logo.png",
              "url": "https://cakehome.com/about-cake",
            "telephone": "833-818-2253",
            "priceRange": "$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "9200 Oakdale Ave STE 501",
              "addressLocality": "Chatsworth",
              "addressRegion": "CA",
              "postalCode": "91311",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 34.23923950953099,
              "longitude": -118.5659251539757
            },
            "hasMap": "https://www.google.com/maps/place/Cake+Mortgage/@34.2386896,-118.5660539,15z/data=!4m5!3m4!1s0x0:0x6fbc86eb37600b1b!8m2!3d34.2385006!4d-118.5660221",
            "openingHoursSpecification": [{
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "08:00",
              "closes": "17:00"
            }]
          }`}
          </script>


    </Helmet>
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
            title
            gatsbyImageData(
              placeholder: NONE
              formats: [AUTO, WEBP]
            )
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

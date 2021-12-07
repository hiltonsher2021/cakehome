import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'
import SEO from 'components/seo'
import Layout from 'components/layout/Main/MainLayout'
import Banner from 'components/Banner/Banner'
import RefiRateBlock from 'components/RefiRateBlock/RefiRateBlock'
import RefiBenefits from 'components/RefiBenefits/RefiBenefits'
import CopyFigure2Column from 'components/CopyFigure2Column/CopyFigure2Column'
import RefiTestimonials from 'components/RefiTestimonials/RefiTestimonials'
import PlainCopyBlock from 'components/PlainCopyBlock/PlainCopyBlock'
// import InfoContentBlock from 'components/InfoContentBlock/InfoContentBlock'
import CalculatorScript from 'components/CalculatorScript/CalculatorScript'
import { initCalculators, unloadCalculators } from 'helpers/calculator'
import PersonalizeRateBlock from 'components/PersonalizeRateBlock/PersonalizeRateBlock'

const isBrowser = typeof window !== "undefined"

const propTypes = {
  data: PropTypes.object,
}

const Refinance = ({ data }) => {
  let dataSplit = data?.contentfulPage?.sections;
  const [showModalSection, changeModalValue] = useState(false)
  const [tabSelection, changeTabSelection] = useState('')

  const showModal = (value) => {
    changeTabSelection(value)
    changeModalValue(true)
  }
  const closeModal = (e) => {
    changeModalValue(false)
  }

  useEffect(() => {
    if(isBrowser) {
      initCalculators()
    }
    return () => {
      if(isBrowser) {
        unloadCalculators()
      }
    }
  }, [showModalSection])

  return (
    <Layout>
      <SEO title={data?.contentfulPage?.name}
        description={data?.contentfulPage?.description?.description}
        image={'https:' + data?.contentfulPage?.metaImage?.file?.url} />
      <section>
        {/* classNames - Refinance */}
        <Banner bannerData={dataSplit} handle={data?.contentfulPage?.handle} showModal={showModal}/>

        <div
          className="PersonalizeModal"
          style={{ display: showModalSection ? 'block' : 'none' }}
        >
          <PersonalizeRateBlock
            closeModal={closeModal}
            sectionData={dataSplit}
            classname={tabSelection}
            handle={data?.contentfulPage?.handle}
          />
        </div>

        <RefiRateBlock sectionData={dataSplit} handle={data?.contentfulPage?.handle} />
        <RefiBenefits
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          showModal={showModal}
        />

        {/* classNames - green refi */}
        <CopyFigure2Column
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          className="refi"
        />

        {/* classNames - refi light small-copy-sec */}
        <CalculatorScript
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          className="refi light small-copy-sec"
          showModal={showModal}
        />

        <RefiTestimonials
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
        />

        {/* className -  green refi*/}
        <PlainCopyBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
          className="refi"
          showModal={showModal}
        />
{/* Removed as per requirement */}

        {/* <InfoContentBlock
          sectionData={dataSplit}
          handle={data?.contentfulPage?.handle}
        /> */}
      </section>
    </Layout>
  )
}

Refinance.propTypes = propTypes

export default Refinance

export const pageQuery = graphql`
  {
    contentfulPage(handle: { eq: "refinance" }) {
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
        ... on ContentfulSection {
          id
          handle
          mainTitle
          ctaText
          ctaLink
          ctaMobText
          description {
            description
          }
          footerText
          image {
            gatsbyImageData
            title
          }
          backgroundColour
          sectionReference {
            ... on ContentfulCard {
              id
              footerText
              iconType
              subTitle
              title
              ctaText
              titleLongDescription {
                titleLongDescription
              }
              image {
                gatsbyImageData
                title
                file {
                  contentType
                  fileName
                  url
                }
              }
              cardItems {
                ... on ContentfulCard {
                  id
                  title
                  subTitle
                  titleLongDescription {
                    titleLongDescription
                  }
                  image {
                    gatsbyImageData
                    title
                  }
                  ctaText
                  footerText
                }
              }
            }
            ... on ContentfulList {
              name
              items {
                ... on ContentfulTabItems {
                  id
                  title
                  ctaText
                  image {
                    gatsbyImageData
                    title
                  }
                }
              }
            }
            ... on ContentfulCta {
              id
              title
              link
            }
          }
        }
        ... on ContentfulBanner {
          id
          ctaText
          ctaUrl
          ctaMobText
          backgroundColour
          image {
            gatsbyImageData
            title
          }
          subTitle {
            subTitle
          }
          description {
            description
          }
          mainTitle
          handle
          bannerReference {
            handle
            footerText
            title
            titleLongDescription {
              titleLongDescription
            }
            image {
              gatsbyImageData
            }
            ctaText
          }
        }
      }
    }
  }
`

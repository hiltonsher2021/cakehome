import * as React from 'react'
import * as PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/layout/Main/MainLayout'
import PlainCopyBlock from 'components/PlainCopyBlock/PlainCopyBlock'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const propTypes = {
  data: PropTypes.object,
}

const ArticleDetailsPage = (props) => {
  let image
  let modeledData = props?.data?.contentfulPage?.sections
  console.log(modeledData)
  const dataSplit = modeledData.filter((item) => {
    if (item?.handle.includes(props?.location?.state?.articleNo)) {
      return item
    }
  })

  image = getImage(dataSplit[0]?.image);

  let mainSection = []
  let secondSection = []
  let thirdSection = []
  let fourthSection = []
  let fifthSection = []
  let extraClass = dataSplit[0]?.class ? dataSplit[0]?.class : "";



  // console.log(dataSplit)

  {
    dataSplit[0]?.sectionReference.map((item, index) => {
      if (index === 0) {
        mainSection = item
      } else if (index === 1) {
        secondSection = item
      } else if (index === 2) {
        thirdSection = item
      } else if (index === 3) {
        fourthSection = item
      } else {
        fifthSection = item
      }
    })
  }

  // console.log("mainSection", mainSection)
  // console.log("secondSection", secondSection)
  // console.log("thirdSection", thirdSection)
  // console.log("fourthSection", fourthSection)
  // console.log("fifthSection", fifthSection)

  return (
    <Layout>
      <section className={`Article__wrapper ${extraClass}`}>
        <div className="container">
          <div className="Article-banner">
            <div className="Article-banner__top">
              <h1
                className="Article-banner__title"
                dangerouslySetInnerHTML={{
                  __html: dataSplit[0]?.mainTitle,
                }}
              ></h1>
              <span className="Article-banner__read-time">5 min read</span>

              <figure className="Article-banner__image">
                {/* <img src="/images/article-banner-1.png" alt="Article Banner" /> */}
                <GatsbyImage image={image} alt="Article Banner" />
              </figure>
            </div>
            <div className="Article-banner__bottom">
              <h2
                className="Article-banner__subtitle"
                dangerouslySetInnerHTML={{
                  __html: dataSplit[0]?.subTitle.subTitle,
                }}>
                {/* {dataSplit[0]?.subTitle.subTitle} */}
              </h2>
              {mainSection?.cardItems?.map((item, index) => {
                return (
                  <p
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: item?.title?.title,
                    }}
                  ></p>
                )
              })}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="Article-contents">
            {secondSection?.cardItems?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <h2>{item?.subTitle}</h2>
                  {item?.cardItems?.map((itemData, indexData) => {
                    if (itemData?.cardItems) {
                      return (
                        <React.Fragment key={indexData}>
                          <h3>{itemData?.subTitle}</h3>
                          {itemData?.cardItems?.map((itemDataInner, indexData) => {
                              return (
                                <>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: itemDataInner?.title?.title,
                                    }}
                                  ></p>
                                  <ul>
                                    {itemDataInner?.list?.map(
                                      (listItem, listIndex) => (
                                        <li key={listIndex}>
                                          {listItem?.title?.title}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </>
                              )
                            }
                          )}
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: itemData?.title?.title,
                            }}
                            key={indexData}
                          ></p>
                          <ul>
                            {itemData?.list?.map((listItem, listIndex) => {
                              return (
                                <li key={listIndex}>{listItem?.title?.title}</li>
                              )
                            })}
                          </ul>
                        </>
                      )
                    }
                  })}
                </React.Fragment>
              )
            })}
          </div>
        </div>

        {/* plane copy block */}
        <PlainCopyBlock
          handle={props?.data?.contentfulPage?.handle}
          className="green forArticle"
          dataSection={thirdSection}
        />

        {thirdSection?.cardItems && thirdSection?.cardItems?.length > 1 ? (
          <div className="container">
            <div className="Article-contents">
              <h2>{thirdSection?.subTitle}</h2>
              {thirdSection?.cardItems?.map((item, index) => {
                return (
                  <>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.title?.title,
                      }}
                      key={index}
                    ></p>
                    <ul>
                      {item?.list?.map((listItem, listIndex) => (
                        <li key={listIndex}>{listItem?.title?.title}</li>
                      ))}
                    </ul>
                  </>
                )
              })}
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="container">
          <div className="Article-contents">
            {fourthSection?.cardItems?.map((item, index) => {
              return (
                <>
                  <h2>{item?.subTitle}</h2>
                  {item?.cardItems?.map((itemData, indexItem) => {
                    return (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: itemData?.title?.title
                        }}
                        key={indexItem}
                      ></p>
                    )
                  })}
                </>
              )
            })}
          </div>
          <div className="Article__sources">
            <h2>{fifthSection?.title}</h2>
            {fifthSection?.cardItems?.map((item, index) => {
              return (
                <p key={index}
                  dangerouslySetInnerHTML={{
                    __html: item?.title?.title,
                  }}
                ></p>
              )
            })}
          </div>
        </div>
      </section>
    </Layout>
  )
}
ArticleDetailsPage.propTypes = propTypes

export default ArticleDetailsPage

export const query = graphql`
  {
    contentfulPage(handle: { eq: "articleDetails" }) {
      handle
      title
      sections {
        ... on ContentfulSection {
          id
          mainTitle
          subTitle {
            subTitle
          }
          class
          handle
          backgroundColour
          footerText
          image {
            gatsbyImageData
            title
          }
          description {
            description
          }
          backgroundColour
          sectionReference {
            ... on ContentfulCard {
              id
              subTitle
              title
              cardItems {
                ... on ContentfulCard {
                  id
                  subTitle
                  cardItems {
                    ... on ContentfulParagraph {
                      id
                      title {
                        title
                      }
                      list {
                        ... on ContentfulList {
                          id
                          name
                        }
                      }
                    }
                    ... on ContentfulCard {
                      id
                      cardItems {
                        ... on ContentfulParagraph {
                          title {
                            title
                          }
                          list {
                            ... on ContentfulList {
                              id
                              name
                            }
                          }
                        }
                      }
                      ctaUrl
                      ctaText
                      subTitle
                    }
                  }
                  handle
                  footerText
                  ctaText
                  ctaUrl
                  url
                }
                ... on ContentfulParagraph {
                  id
                  title {
                    title
                  }
                  list {
                    ... on ContentfulList {
                      id
                      name
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

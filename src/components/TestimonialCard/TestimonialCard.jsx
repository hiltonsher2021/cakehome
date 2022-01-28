import React from 'react'
import * as styles from './TestimonialCard.module.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'

const TestimonialCard = (data) => {
  let image
  image = getImage(data?.item?.image.gatsbyImageData)

  return (
    <div className={`${styles.TestimonialCard}`}>
      <div>
        <div className="TestimonialCard__top">
          <div className="TestimonialCard__rating-wrap">
            {/* {data?.starList?.items.map((item, index) => {
              let starImage = getImage(item?.image?.gatsbyImageData)
              return (
                <GatsbyImage key={index} image={starImage} alt={item?.image?.title} objectFit="contain" />
              )
            })} */}
            <img src="/images/star-green.png" alt="google-icon" />

            <img src="/images/star-green.png" alt="google-icon" />

            <img src="/images/star-green.png" alt="google-icon" />

            <img src="/images/star-green.png" alt="google-icon" />

            <img src="/images/star-green.png" alt="google-icon" />
          </div>
          <h3>{data?.item?.title}</h3>
        </div>
        <div className="TestimonialCard__middle">
          <p>
          {data?.item?.titleLongDescription?.titleLongDescription}
          </p>
        </div>
      </div>
      <div className="TestimonialCard__bottom">
        <div className="TestimonialCard__footer">
          <div className="left-side">
            <h4>{data?.item?.subTitle}</h4>
            <p>{data?.item?.footerText}</p>
          </div>
          <div className="right-side">
            {/* <a title='social-media'><img src="/images/google.png" alt="google-icon" /></a> */}

            <AnchorLink>
              <GatsbyImage image={image} alt={data?.item?.image?.title} />
            </AnchorLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard

import React from 'react'
import * as styles from './RefiTestimonialCard.module.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'

const RefiTestimonialCard = (data) => {
  let image;
  image = getImage(data?.cardData?.image.gatsbyImageData);

  return (
    <div className={`${styles.RefiTestimonialCard}`}>
      <div>
        <div className="RefiTestimonialCard__top">
          <div className="RefiTestimonialCard__rating-wrap">
            {data?.starList?.items.map((item, index) => {
              let starImage = getImage(item?.image?.gatsbyImageData)
              return (
                <GatsbyImage key={index} image={starImage} alt={item?.image?.title} objectFit="contain" />
              )
            })}
          </div>
          <h3>{data?.cardData?.title}Title</h3>
        </div>
        <div className="RefiTestimonialCard__middle">
          <p>{data?.cardData?.titleLongDescription?.titleLongDescription}Description</p>
        </div>
      </div>
      <div className="RefiTestimonialCard__bottom">
        <div className="RefiTestimonialCard__footer">
          <div className="left-side">
            <h4>
              {data?.cardData?.subTitle}Sub title
            </h4>
            <p>{data?.cardData?.footerText}Footer text</p>
          </div>
          <div className="right-side">
            <AnchorLink href="#">Icon
              <GatsbyImage image={image} alt={data?.cardData?.image?.title} />
            </AnchorLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefiTestimonialCard

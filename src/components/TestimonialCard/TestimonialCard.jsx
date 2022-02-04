import React from 'react'
import * as styles from './TestimonialCard.module.scss'

const TestimonialCard = (data) => {
  let image
  image = data?.item?.image?.file?.url;

  return (
    <div className={`${styles.TestimonialCard} ${data?.className}`}>
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
          <p>{data?.item?.titleLongDescription?.titleLongDescription}</p>
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
            <a href={data?.item?.ctaUrl} target="_blank">
              <img src={'https:' + image} alt="Social media icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard

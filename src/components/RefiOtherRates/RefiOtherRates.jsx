import React from 'react'
import * as styles from './RefiOtherRates.module.scss';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';


const RefiOtherRates = (data) => {

  let image;
  image = getImage(data?.itemData?.image?.gatsbyImageData);

    return (
      <div className={`${styles.RefiOtherRates}`}>
        <div className="RefiOtherRates__logo">
          <figure>
            <GatsbyImage image={image} alt={data?.itemData?.image?.title} />
          </figure>
        </div>
        {/* <div className="RefiOtherRates__details">
          <p>{data?.itemData?.title}</p>
        </div> */}
        <div className="RefiOtherRates__rate">
          <div className="rate-wrapper"> <span className="rate">{data?.itemData?.subTitle}</span>
            <span className="right-side"> <em>%</em><span>{data?.itemData?.footerText}</span></span>
          </div>
        </div>
      </div>
    )
}

export default RefiOtherRates

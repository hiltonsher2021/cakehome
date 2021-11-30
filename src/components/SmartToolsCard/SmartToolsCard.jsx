import React from 'react'
import * as styles from './SmartToolsCard.module.scss';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
// import { AnchorLink } from 'gatsby-plugin-anchor-links'

const SmartToolsCard = (data) => {
  let image;
  image = getImage(data?.cardData?.image?.gatsbyImageData);

    return (
      <div className={`${styles.SmartToolsCard}`}>
        {/* <AnchorLink to={data?.cardData?.ctaUrl} className="SmartToolsCard__link"></AnchorLink> */}
        <figure>
          <GatsbyImage
                className="SmartToolsCard__icon"
                image={image}
                alt={data?.cardData?.title}
                objectFit="contain"
              />
        </figure>
        <h4>{data?.cardData?.title}</h4>
        <p>{data?.cardData?.subTitle}</p>
      </div>
    )
}

export default SmartToolsCard

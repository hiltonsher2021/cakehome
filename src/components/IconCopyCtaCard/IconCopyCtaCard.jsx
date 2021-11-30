import React from 'react'
import * as styles from './IconCopyCtaCard.module.scss';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import CtaBig from 'components/CtaBig/CtaBig'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';

const IconCopyCtaCard = (data) => {
  let image;
  image = getImage(data?.cardData?.image?.gatsbyImageData);

    return (
      <div className={`${styles.IconCopyCtaCard}`}>
        <div className="IconCopyCtaCard__top">
          <figure className="IconCopyCtaCard__icon">
          <GatsbyImage image={image} alt={data?.cardData?.image?.title} />
          </figure>
          <h4 className="IconCopyCtaCardTitle">
            {data?.cardData?.title}
          </h4>
        </div>
        <p className="IconCopyCtaCardCopy">
        {data?.cardData?.subTitle}
        </p>
        <div className="IconCopyCtaCard__bottom" >
          {/* ClassName - IconCopyCtaCard */}
          <CtaBig className="IconCopyCtaCard" ctaText={data?.cardData?.ctaText} ctaUrl={data?.cardData?.ctaUrl} indexValue={data?.indexValue} />
        </div>
      </div>
    )
}

export default IconCopyCtaCard

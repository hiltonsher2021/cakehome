import React from 'react'
import * as styles from './AdviceCard.module.scss';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Link } from 'gatsby'

const AdviceCard = (data) => {
    return (
      <div className={`${styles.AdviceCard}`}>
        <h6>{data?.cardData?.title}</h6>
        <p className="AdviceCardCopy">Ex corporis consequatur sed. Blanditiis repudiandae qui. Eveniet et quis fugiat rerum.</p>
        <Link state={{articleNo: data?.cardData?.handle}} className="AdviceCard__readmore" to={data?.cardData?.url}>{data?.cardData?.ctaText}</Link>
      </div>
    )
}

export default AdviceCard

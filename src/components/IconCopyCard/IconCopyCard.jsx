import React from 'react'
import * as styles from './IconCopyCard.module.scss'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const IconCopyCard = (data) => {
  let cardData = data?.cardData
  let image = getImage(cardData?.image?.gatsbyImageData)

  return (
    <div
      className={`${styles.IconCopyCard} ${data?.fontColour} ${data?.className}`}
    >
      <img
        src={cardData?.image?.file?.url}
        alt={cardData?.image?.file?.url}
        className="IconCopyCard__icon"
      />
      <h4>{cardData?.title}</h4>
      {cardData?.subTitle && <p dangerouslySetInnerHTML={{ __html: cardData?.subTitle }}></p>}
      {cardData?.titleLongDescription && (
        <p>{cardData?.titleLongDescription.titleLongDescription}</p>
      )}
    </div>
  )
}

export default IconCopyCard

import React from 'react'
import * as styles from './AdviceCard.module.scss';
import { Link } from 'gatsby'

const AdviceCard = (data) => {
  const articleImageUrl =
    data?.cardData?.backgroundImage?.gatsbyImageData?.images?.fallback?.src
  const imageStyle = {
    height: '150px',
    backgroundImage: `url(${articleImageUrl})`,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: '30px',
  }
  return (
    <div className={`${styles.AdviceCard}`}>
      <figure style={imageStyle} className="article-featured-image"></figure>
      <h6>{data?.cardData?.title}</h6>
      {/* <p className="AdviceCardCopy">Ex corporis consequatur sed. Blanditiis repudiandae qui. Eveniet et quis fugiat rerum.</p> */}
      <Link
        state={{ articleNo: data?.cardData?.handle }}
        className="AdviceCard__readmore"
        to={data?.cardData?.url}
      >
        {data?.cardData?.ctaText}
      </Link>
    </div>
  )
}

export default AdviceCard

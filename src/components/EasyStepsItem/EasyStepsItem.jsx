import React from 'react'
import * as styles from './EasyStepsItem.module.scss'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const EasyStepsItem = (data) => {
  let image
  const tabData = data?.tabItem
  image = getImage(tabData?.image?.gatsbyImageData)

  return (
    // add Class light for variant
    <div
      className={`${styles.EasyStepsItem} ${
        data?.indexValue === 0 ? 'dark' : 'light'
      } isGetstarted-item`}
    >
      <figure className="EasyStepsItem__figure">
        <GatsbyImage
          image={image}
          alt={tabData?.image?.title || ""}
          objectFit="contain"
        />
      </figure>
      <h2>{tabData?.title}</h2>
      <ul>
        {tabData?.tabReference?.map((item, index) => {
          return <li key={index}>{item?.label}</li>
        })}
      </ul>
    </div>
  )
}

export default EasyStepsItem

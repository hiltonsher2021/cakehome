import React from 'react'
import * as styles from './LoanNumberBlock.module.scss'
import sectionModel from 'models/Section'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const LoanNumberBlock = (data) => {
  let modeledData = []

  if (data) {
    let filterData = data?.sectionData.filter((item) => {
      if (item?.handle?.includes('1')) return item
    })
    modeledData = sectionModel(filterData[0])
  }
  return (
    <div className={`${styles.LoanNumberBlock}`}>
      <div className="container">
        <div className="LoanNumberBlock__wrapper">
          {modeledData?.sectionReference.map((item, index) => {
            let image = getImage(item?.image?.gatsbyImageData)

            return (
              <div className="LoanNumberBlock__item" key={index}>
                <figure>
                  <GatsbyImage
                    className="LoanNumberBlock__img"
                    image={image}
                    alt="home"
                  />
                </figure>
                <div className="item_contents">
                  <h2>{item?.title}</h2>
                  <p>{item?.subTitle}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LoanNumberBlock

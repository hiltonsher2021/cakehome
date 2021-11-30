import React from 'react'
import * as styles from './QABlock.module.scss';
import QATab from "components/QATab/QATab"
import sectionModel from 'models/Section';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'


const QABlock = (data) => {
  let modeledData;
  let image;
  let sectionReference;

  if (data) {
    let filterData = data.sectionData.filter((item) => {
      if (item.handle === '8') return item
    })
    modeledData = sectionModel(filterData[0]);
    sectionReference = modeledData?.sectionReference[0]
    image = getImage(modeledData?.image?.gatsbyImageData)
  }
    return (
      <div className={`${styles.QABlock}`}>
        <div className="container">
          <div className="QABlock__wrap">
            <div className="QABlock__top-banner">
              <div className="top-banner__copy"><span className="eyebrow">{modeledData?.subTitle}</span>
                <h2>{modeledData?.mainTitle}</h2>
                <div className="figure-holder">
                  <GatsbyImage
                    image={image}
                    alt={modeledData?.image?.title}
                    objectFit="contain"
                  />
                </div>
                <p>{modeledData?.description?.description}</p>
              </div>
              <div className="top-banner__figure">
                <div className="figure-holder">
                  <GatsbyImage
                    image={image}
                    alt={modeledData?.image?.title}
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
            <div className="QABlock__tab-wrap">
              <QATab tabData={sectionReference} />
            </div>
          </div>
        </div>
      </div>
    )
}

export default QABlock

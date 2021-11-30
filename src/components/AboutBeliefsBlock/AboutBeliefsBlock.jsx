import React from 'react'
import * as styles from './AboutBeliefsBlock.module.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import IconCopyCard from 'components/IconCopyCard/IconCopyCard'
import sectionModel from 'models/Section'

const AboutBeliefsBlock = (data) => {
  let modeledData = []

  if (data) {
    let filterData = data?.sectionData.filter((item) => {
      if (item?.handle?.includes('2')) return item
    })
    modeledData = sectionModel(filterData[0]);
  }
  return (
    <div className={`${styles.AboutBeliefsBlock} posRelative`}>
      <span id="our-beliefs"></span>
      <div className="AboutBeliefsBlock">
        <div className="container">
          <div className="AboutBeliefsBlock__wrapper">
            <div className="AboutBeliefsBlock__left-side">
              <span className="eyebrow">{modeledData?.mainTitle}</span>
              <h4>{modeledData?.description?.description}</h4>
            </div>
            <div className="AboutBeliefsBlock__right-side">
              {modeledData?.sectionReference.map((item, index) => {
                return (
                  <div className="AboutBeliefsBlock__card" key={index}>
                    {/* classname - about */}
                    <IconCopyCard cardData={item} className="about" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutBeliefsBlock

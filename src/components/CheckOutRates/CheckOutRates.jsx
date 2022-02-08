import React, { useState, useEffect } from 'react'
import * as styles from './CheckOutRates.module.scss'
import RateCard from 'components/RateCard/RateCard'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import sectionModel from 'models/Section'
import ImageTransform from 'components/ImageTransform/ImageTransform'

const CheckOutRates = (data) => {
  let modeledData = []
  let filterData = []

  const setCounter = (value) => {
    data.showModal(value.toLowerCase())
  }

  if (data) {
    switch (data?.handle) {
      case 'homepage':
        filterData = data.sectionData.filter((item) => {
          if (item.handle === '1') return item
        })
        break
      case 'getstarted':
        filterData = data.sectionData.filter((item) => {
          if (item.handle.includes('1')) return item
        })
        break
    }

    modeledData = sectionModel(filterData[0])
  }

  const ImageTransformoptions = {
    max: 5,
    perspective: 500,
    scale: 1.05,
  }

  return (
    <div className={`${styles.CheckOutRates}`}>
      <div className="container">
        {data?.handle !== 'getstarted' && (
          <>
            <h2 className="title">{modeledData?.mainTitle}</h2>
            <h3 className="sub-title">{modeledData?.subTitle?.subTitle}</h3>
          </>
        )}

        <div className="rate-card-wrapper">
          {modeledData?.sectionReference?.map((item, index) => {
            return (
              <div className="rate-card-hold" key={index}>
                <ImageTransform options={ImageTransformoptions}>
                  <RateCard value={item} setCounter={setCounter} handle={data?.handle} />
                </ImageTransform>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CheckOutRates

import React from 'react'
import Plx from 'react-plx'
import * as styles from './Testimonials.module.scss'
import Carousel from 'components/Carousel'
import sectionModel from 'models/Section'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { Link } from 'gatsby'

const Testimonials = (data) => {
  let modeledData
  let referencedData
  let carouselData

  //console.log("datadtadtadata", data)
  if (data) {
    let filterData = data.sectionData.filter((item) => {
      if (item.handle === '7' || item.handle === '37') return item
    })
    //console.log("filterData", filterData)
    modeledData = sectionModel(filterData[0])
    console.log("modeledDataDataDatra", modeledData)
    referencedData = modeledData?.sectionReference[0]
    carouselData = modeledData?.sectionReference[1]
  }

  const parallaxData = [
    {
      start: 'self',
      duration: 1000,
      properties: [
        {
          startValue: 100,
          endValue: 0,
          property: 'translateY',
        },
      ],
    },
  ]

  return (
    <div className={`${styles.Testimonials}`}>
      <div className="container">
        <div className="Testimonials__wrap">
          <div className="Testimonials__left-side">
            {/* <span className="eyebrow">{modeledData?.mainTitle}</span> */}
            <h2>{referencedData.title}</h2>
            <p className="">
              <strong>{referencedData.subTitle}</strong>
            </p>
            <p className="">
              {referencedData?.titleLongDescription?.titleLongDescription}
            </p>
            {/* <figure className="hid-mob">
              <img src="/images/testimonial-figure.png" alt="testimonial" />
            </figure> */}
          </div>
          <div className="Testimonials__right-side">
            {/* <Plx
              parallaxData={ parallaxData }
            > */}
            <Carousel carouselData={carouselData} />
            {/* </Plx> */}
          </div>
        </div>
        <div className="Testimonials__btn-wrap">
          <Link className="btn dark" to={referencedData?.ctaUrl}>
            {referencedData?.ctaText}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Testimonials

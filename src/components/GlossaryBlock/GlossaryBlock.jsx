import React, { useEffect, useState, useRef } from 'react'
import Slider from 'react-slick'
import * as styles from './GlossaryBlock.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import { AnchorLink } from 'gatsby-plugin-anchor-links'
import sectionModel from 'models/Section'

const GlossaryBlock = (data) => {
  let modeledData = []
  let sectionData = []
  let ref = useRef(null)
  let refMobile = useRef(null)
  let currentIndex = []
  let currentIndexValue = 0
  let currentIndexValueForMobile = 0

  let uniqueChars = []
  let alphabet = [
    { alpha: 'A' },
    { alpha: 'B' },
    { alpha: 'C' },
    { alpha: 'D' },
    { alpha: 'E' },
    { alpha: 'F' },
    { alpha: 'G' },
    { alpha: 'H' },
    { alpha: 'I' },
    { alpha: 'J' },
    { alpha: 'K' },
    { alpha: 'L' },
    { alpha: 'M' },
    { alpha: 'N' },
    { alpha: 'O' },
    { alpha: 'P' },
    { alpha: 'Q' },
    { alpha: 'R' },
    { alpha: 'S' },
    { alpha: 'T' },
    { alpha: 'U' },
    { alpha: 'V' },
    { alpha: 'W' },
    { alpha: 'X' },
    { alpha: 'Y' },
    { alpha: 'Z' },
  ]

  const [searchedAlphabet, setSearchedAlphabet] = useState('A')
  const [carouselData, setCarouselData] = useState([])
  const [carouselDataFiltered, setCarouselDataFiltered] = useState([])
  const [carouselDataMobFiltered, setCarouselDataMobFiltered] = useState([])


  function groupArray(data, n) {
    var group = []
    for (var i = 0, j = 0; i < data.length; i++) {
      if (i >= n && i % n === 0) j++
      group[j] = group[j] || []
      group[j].push(data[i])
    }
    return group
  }

  React.useEffect(() => {
    if (carouselData.length === 0 || carouselDataFiltered.length === 0) {

      setCarouselData((sectionData?.items).sort())
      let desktopData = groupArray(sectionData?.items, 3)
      setCarouselDataFiltered(desktopData)
      let mobData = groupArray(sectionData?.items, 2)
      setCarouselDataMobFiltered(mobData)
    }
  }, [searchedAlphabet, carouselData, carouselDataFiltered])

  if (data) {
    let filterData = data?.sectionData.filter((item) => {
      if (item.handle.includes('7')) return item
    })
    modeledData = sectionModel(filterData[0])
    sectionData = modeledData?.section[0]
    disableButtons();

  }

  let settingsDsktp = {
    dots: false,
    infinite: false,
    vertical: true,
    rows: 2,
    responsive: [
      {
        breakpoint: 9999,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
      },
      // {
      //   breakpoint: 767,
      //   settings: 'unslick',
      // },
    ],
  }
  const searchData = (value) => {
    let tempData = sectionData?.items;
    currentIndex = []
    currentIndexValue = 0
    currentIndexValueForMobile = 0
    setSearchedAlphabet(value)
    tempData.map((item, index) => {

      if (item?.title.startsWith(value)) {
        currentIndex.push(index)
        currentIndex.sort()
        currentIndexValue = Math.round(currentIndex[0] / 6)
        currentIndexValueForMobile = Math.round(currentIndex[0] / 4)

        if (ref?.current) ref?.current.slickGoTo(currentIndexValue)
        if (refMobile?.current) refMobile?.current.slickGoTo(currentIndexValueForMobile)
      }
    })
  }

  function disableButtons () {
    let firstLetter  = [];
    sectionData?.items.map((item) => {
      firstLetter.push(item?.title.charAt(0));
    })
    uniqueChars = [...new Set(firstLetter)];
  }

  var settingsMob = {
    dots: true,
    arrows: false,
    infinite: true,
    rows: 2,
    responsive: [
      // {
      //   breakpoint: 9999,
      //   settings: 'unslick',
      // },
      {
        breakpoint: 767,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    ],
  }
  return (
    <div className={`${styles.GlossaryBlock}`} >
      <div className="container">
        <div className="GlossaryBlock__wrapper">
          <h2>Glossary</h2>
          <p className="GlossaryBlock__copy">
          We get it, the mortgage industry can be really confusing with all its verbiage. That’s why we put together a simple explanation of all the big scary words our competitors use to confuse you. Just one more way cake is demystifying the mortgage process.
          </p>

          <div className="GlossaryBlock__filter">
            {alphabet.map((item, index) => {
              return (
                <button
              className={`GlossaryBlock__item ${
                searchedAlphabet === item.alpha ? 'active' : ''
              }
              ${uniqueChars.includes(item.alpha) ? '' : 'dis-btn'
              }`}
              value={item.alpha}
              key={index}
              onClick={() => searchData(item.alpha)}
            >
              {item.alpha}
            </button>
              )
            })}


          </div>
          {/* Desktop slider - 3 column */}
          <Slider
            {...settingsDsktp}
            className="GlossaryBlock__slider-block dsktp"
            ref={ref}
          >
            {carouselDataFiltered.map((itemData, itemIndex) => {
              return (
                <>
                  <div className="GlossaryBlock__slider-wrap" key={itemIndex}>
                    {itemData.map((item, index) => {
                      let firstLetter = item?.title.charAt(0)
                      return (
                        <div
                          className="GlossaryBlock__slider-item"
                          data-active={firstLetter}
                          key={index}
                        >
                          <h5>{item?.title} </h5>
                          <p>{item?.subTitle}</p>
                          <p>
                            {item?.titleLongDescription?.titleLongDescription}
                          </p>
                          {/* add long description */}
                        </div>
                      )
                    })}
                  </div>
                </>
              )
            })}
          </Slider>

          {/* Mobile slider - 2 column */}
          <Slider
            {...settingsMob}
            ref={refMobile}
            className="GlossaryBlock__slider-block mob"
          >
            {carouselDataMobFiltered.map((itemData, itemIndex) => {
              return (
                <div className="GlossaryBlock__slider-wrap" key={itemIndex}>
                  {itemData.map((item, index) => {
                    return (
                      <div className="GlossaryBlock__slider-item" key={index}>
                        <h5>{item.title}</h5>
                        {item?.subTitle && <p>{item?.subTitle}</p>}
                        {item?.titleLongDescription && (
                          <p>
                            {item?.titleLongDescription.titleLongDescription}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default GlossaryBlock


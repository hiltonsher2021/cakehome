import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import * as styles from './FaqBlock.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import sectionModel from 'models/Section';

const FaqBlock = (data) => {
  let modeledData = []
  let tabItems
  let filterData = []
  let sectionReference
  const [indexValue, setIndex] = useState(0)
  const [searchText, setTextValue] = useState('')
  const [tabDetails, setTabDetails] = useState([])
  const [tempTabDetails, setTempTabDetails] = useState([])
  const [tabItemSearch, setTabItemSearch] = useState([])
  const [tabItem, setTabItem] = useState([])
  const [tabItemSearchTemp, setTabItemSearchTemp] = useState([])

  if (data) {
    filterData = data?.sectionData.filter((item) => {
      if (item?.handle?.includes('6')) return item
    })
    modeledData = sectionModel(filterData[0])
    tabItems = modeledData?.section[0]?.items;
  }
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    rows: 2,
    responsive: [
      {
        breakpoint: 9999,
        settings: 'unslick',
      },
      {
        breakpoint: 767,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    ],
  }

  React.useEffect(() => {
    if (tabDetails?.length === 0) {
      chooseTabSection(0)
    }
    if (tabDetails) {
    }
  }, [
    tabDetails,
    tempTabDetails,
    tabItemSearch,
    tabItem,
    tabItemSearchTemp,
    indexValue,
    searchText
  ])

  const chooseTabSection = (e) => {
    setIndex(e)
    if (searchText !== '') {
      setTabItemSearch(tabItemSearchTemp[e])
      setTabDetails(tabItemSearchTemp[e])

      setTabItem(tabItemSearch)
      setTempTabDetails(tabItemSearch)
    } else {
      setTabItem(tabItems[e]?.tabReference)
      setTabDetails(tabItems[e]?.tabReference)
      setTempTabDetails(tabItems[e]?.tabReference)
    }
  }

  const searchContent = () => {
    let tabItem = tabItems?.map((value) => {
      return value.tabReference
    })

    if (searchText !== '') {
        for (let i = 0; i <= 2; i++) {
          tabItemSearchTemp[i] = tabItem[i]?.filter((value) => {
            if (value?.title.includes(searchText.toLocaleLowerCase())) {
              return value
            }
          })
        }
      setTabItemSearch(tabItemSearchTemp[indexValue])
      setTabDetails(tabItemSearchTemp[indexValue])
    } else {
      chooseTabSection(indexValue)
    }
  }

  return (
    <div className={`${styles.FaqBlock}`}>
      <div className="container">
        <div className="FaqBlock__title-wrap">
          <h2>
            <span className="copy-desktop" dangerouslySetInnerHTML={{ __html: modeledData?.mainTitle }}></span>
            <span className="copy-mobile">FAQ</span>
          </h2>
          <p className="FaqBlock__copy" dangerouslySetInnerHTML={{ __html: modeledData?.subTitle?.subTitle }}>
          </p>
          <div className="FaqBlock__search-block">
            <input
              type="text"
              placeholder="Search FAQ"
              value={searchText}
              onChange={(e) => setTextValue(e.target.value)}
            />
            <button className="btn dark" onClick={searchContent}>
              Search
            </button>
          </div>
        </div>

        <div className="FaqBlock__tab-block">
          <div className="FaqBlock__tab-wrapper">
            {tabItems.map((item, index) => {
              return (
                <button
                  className={`FaqBlock__tab-btn ${
                    indexValue === index ? 'active' : ''
                  }`}
                  key={index}
                  onClick={(e) => chooseTabSection(index)}
                >
                  {item?.tabTitle}
                </button>
              )
            })}
          </div>

          <Slider {...settings} className="FaqBlock__tab-pane-block">
            <div className="FaqBlock__tab-pane-wrapper">
              {tabDetails?.map((item, index) => {
                if (index % 2 === 0) {
                  return (
                    <div className="FaqBlock__tab-item" key={index}>
                      <h6 dangerouslySetInnerHTML={{ __html: item?.title }}></h6>
                      <p dangerouslySetInnerHTML={{ __html: item?.subTitle }}></p>
                    </div>
                  )
                } else {
                  return (
                    <div className="FaqBlock__tab-item" key={index}>
                      <h6 dangerouslySetInnerHTML={{ __html: item?.title }}></h6>
                      <p dangerouslySetInnerHTML={{ __html: item?.subTitle }}></p>
                    </div>
                  )
                }
              })}
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default FaqBlock

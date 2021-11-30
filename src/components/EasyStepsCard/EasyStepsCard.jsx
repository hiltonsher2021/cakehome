import React from 'react'
import Plx from 'react-plx';
import * as styles from './EasyStepsCard.module.scss'
import EasyStepsItem from 'components/EasyStepsItem/EasyStepsItem'
import { AnchorLink } from 'gatsby-plugin-anchor-links'

const EasyStepsCard = (data) => {
  let filterData

  const parallaxData1 = [
    {
      start: 'self',
      duration: 600,
      properties: [
        {
          startValue: 80,
          endValue: 0,
          property: 'translateY',
        },
      ],
    },
  ];

  const parallaxData2 = [
    {
      start: 'self',
      duration: 800,
      properties: [
        {
          startValue: 80,
          endValue: 0,
          property: 'translateY',
        },
      ],
    },
  ];

  const parallaxData3 = [
    {
      start: 'self',
      duration: 1000,
      properties: [
        {
          startValue: 80,
          endValue: 0,
          property: 'translateY',
        },
      ],
    },
  ];

  if (data?.tabData) {
    filterData = data.tabData.map((item) => {
      return item
    })
  }

  return (
    <div>
      {filterData?.map((item, index) => {
        return (
          <div key={index}>
            <div
              id="EasyStepsCard"
              className={`${styles.EasyStepsCard} ${
                index === 0 ? 'purple' : 'orange'
              }`}
            >
              <div className="EasyStepsCard__wrap">
                <Plx
                  parallaxData={ parallaxData1 }
                >
                  <h2 className="EasyStepsCard__title">{item.title}</h2>
                </Plx>
                <div className="EasyStepsCard__holder">
                  {item.items.map((tabItem, tabIndex) => {
                    var selector = ''
                    tabIndex == 0 ? selector = parallaxData1
                    : tabIndex == 1 ? selector = parallaxData2
                    : selector = parallaxData3
                    return (
                        <div className="EasyStepsCard__item" key={tabIndex}>
                          <Plx
                            parallaxData={ selector }
                          >
                            <EasyStepsItem tabItem={tabItem} indexValue={index}/>
                          </Plx>
                        </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <p className="copy mob"   style={{display: index!== 0 ? 'none' : ''}}>
              {data?.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default EasyStepsCard

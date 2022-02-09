import React from 'react'
import * as styles from './PlainCopyBlock.module.scss'
import sectionModel from 'models/Section'
import CtaBig from 'components/CtaBig/CtaBig'

const PlainCopyBlock = (data) => {
  let modeledData
  let filterData
  const showCalculator = (e) => {
    data.showModal(data?.handle === 'refinance' ? 'refinance' : 'purchase')
  }

  if (data && data?.handle !== 'articleDetails') {
    switch (data?.handle) {
      case 'refinance':
        filterData = data.sectionData.filter((item) => {
          if (item?.handle.includes('6')) return item
        })
        break
      case 'homepage':
        filterData = data.sectionData.filter((item) => {
          if (item.handle === '6' && data?.sectionValue === '6') {
            return item
          } else if (item.handle === '10' && data?.sectionValue === '2') {
            return item
          }
        })
        break
      case 'homepurchase':
        filterData = data.sectionData.filter((item) => {
          if (item.handle.includes('5')) return item
        })
        break
      case 'rates':
        filterData = data.sectionData.filter((item) => {
          if (item.handle.includes('3')) return item
        })
        break
      case 'toolsadvice':
        filterData = data.sectionData.filter((item) => {
          if (item.handle.includes('5') && data?.sectionValue === '6') {
            return item
          } else if (item.handle.includes('9') && data?.sectionValue === '2') {
            return item
          }
        })
        break
      case 'aboutcake':
        filterData = data.sectionData.filter((item) => {
          if (item.handle.includes('5')) return item
        })
        break
      case 'getstarted':
        filterData = data.sectionData.filter((item) => {
          // 2-getstarted
          if (item.handle.includes('2-getstarted')) return item
        })
        break
    }
    modeledData = sectionModel(filterData[0])
  }

  return (
    <div
      className={`${styles.PlainCopyBlock} ${
        modeledData?.backgroundColour === 'green' ? 'green' : ''
      } ${data?.className}`}
    >
      <div className="container">
        <div className="PlainCopyBlock__wrap">
          {modeledData?.mainTitle && data?.handle !== 'toolsadvice' && (
            <h2>{modeledData?.mainTitle}</h2>
          )}
          {data?.dataSection?.title && <h2>{data?.dataSection?.title}</h2>}

{/* add style to h3 - section below */}
          {data?.handle === 'getstarted' && (
            <h3>{modeledData?.description?.description}</h3>
          )}


          {(data?.handle === 'homepage' ||
            data?.handle === 'aboutcake' ||
            data?.handle === 'getstarted') && (
            <p className="copy">{modeledData?.subTitle?.subTitle}</p>
          )}
          {data?.handle === 'toolsadvice' && (
            <>
              <h2>
                <a className="dskt-res" href={modeledData?.ctaLink}>
                  {modeledData?.mainTitle}
                </a>
              </h2>
              <h5 className="copy">{modeledData?.subTitle?.subTitle}</h5>
            </>
          )}
        </div>
        {modeledData?.ctaText && (
          <div className="PlainCopyBlock__cta-wrapper" onClick={showCalculator}>
            <CtaBig
              ctaText={modeledData?.ctaText}
              ctaMobText={modeledData?.ctaMobText}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default PlainCopyBlock

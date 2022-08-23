import React from 'react'
import * as styles from './PlainCopyBlock.module.scss'
import sectionModel from 'models/Section'
import CtaBig from 'components/CtaBig/CtaBig'

const PlainCopyBlock = (data) => {
  let { campaignUrl } = data
  let { type } = data
  let modeledData
  let filterData
  console.log("indexdatadata", data);
  // const showCalculator = (e) => {
  //   data.showModal(data?.handle === 'refinance' ? 'refinance' : 'purchase')
  // }

  if (data && data?.handle !== 'articleDetails') {
    switch (data?.handle) {
      case 'refinance':
        filterData = data.sectionData.filter((item) => {
          if (item?.handle?.includes('6')) return item
        })
        break
      case 'homepage':
      case 'frontpage':
        filterData = data?.sectionData.filter((item) => {
          if (item?.handle === '6' && data?.sectionValue === '6') {
            return item
          } else if (item?.handle === '30' && data?.sectionValue === '2') {
            return item
          }
        })
        break
      case 'homepurchase':
        filterData = data?.sectionData.filter((item) => {
          if (item?.handle?.includes('5')) return item
        })
        break
      case 'rates':
        filterData = data?.sectionData.filter((item) => {
          if (item?.handle?.includes('3')) return item
        })
        break
      case 'toolsadvice':
        filterData = data.sectionData.filter((item) => {
          if (item?.handle?.includes('5') && data?.sectionValue === '6') {
            return item
          } else if (
            item?.handle?.includes('9') &&
            data?.sectionValue === '2'
          ) {
            return item
          }
        })
        break
      case 'aboutcake':
        filterData = data?.sectionData.filter((item) => {
          if (item?.handle?.includes('5')) return item
        })
        break
      case 'getstarted':
        filterData = data?.sectionData.filter((item) => {
          // 2-getstarted
          if (item?.handle?.includes('2-getstarted')) return item
        })
        break
    }
    modeledData = sectionModel(filterData[0])
  }

  return (
    <div
      className={`${styles.PlainCopyBlock} ${
        modeledData?.backgroundColour === 'green' ? 'green' : ''
      } ${data?.className ? data?.className : ''} ${
        data?.handle === 'getstarted' ? 'isGetstarted-plain' : ''
      }`}
    >
      <div className="container">
        <div className="PlainCopyBlock__wrap">
          {modeledData?.mainTitle && data?.handle !== 'toolsadvice' && (
            <h2 dangerouslySetInnerHTML={{ __html: modeledData?.mainTitle }}></h2>
          )}
          {!data?.dataSection?.title &&
          data?.dataSection?.cardItems?.length === 1 ? (
            <h3
              style={{
                fontSize: '1.8em',
                lineHeight: '1.3',
                color: '#414042',
                textAlign: 'center',
              }}
              dangerouslySetInnerHTML={{
                __html: data?.dataSection?.cardItems[0]?.title?.title
              }}
            ></h3>
          ) : (
            data?.dataSection?.title && <h2>{data?.dataSection?.title}</h2>
          )}
          {data?.handle === 'getstarted' && (
            <h3>{modeledData?.description?.description}</h3>
          )}

          {(data?.handle === 'homepage' ||
            data?.handle === 'aboutcake' ||
            data?.handle === 'getstarted') && (
            <p
              dangerouslySetInnerHTML={{
                __html: modeledData?.subTitle?.subTitle,
              }}
              className={`${
                data?.handle === 'frontpage' ? 'copy frontpage-copy' : 'copy'
              } `}
            ></p>
          )}
          {data?.handle === 'frontpage' && (
            <div
              dangerouslySetInnerHTML={{
                __html: modeledData?.subTitle?.subTitle,
              }}
              className={'copy frontpage-copy'}
            ></div>
          )}
          {data?.handle === 'toolsadvice' && (
            <>
              <h2 dangerouslySetInnerHTML={{ __html: modeledData?.mainTitle }}></h2>
              <h5 className="copy" dangerouslySetInnerHTML={{ __html: modeledData?.subTitle?.subTitle }}></h5>
            </>
          )}
        </div>
        {modeledData?.ctaText && (
          <div className="PlainCopyBlock__cta-wrapper">
            <CtaBig
              ctaText={modeledData?.ctaText}
              ctaMobText={modeledData?.ctaMobText}
              ctaUrl={campaignUrl || modeledData?.ctaLink}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default PlainCopyBlock

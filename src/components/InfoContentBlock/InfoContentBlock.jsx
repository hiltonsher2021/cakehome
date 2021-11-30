import React from 'react'
import * as styles from './InfoContentBlock.module.scss';
import InfoContent3Column from 'components/InfoContent3Column/InfoContent3Column';
import InfoContent2Column from 'components/InfoContent2Column/InfoContent2Column';
import sectionModel from 'models/Section';

const InfoContentBlock = (data) => {
  let modeledData = [];
  let filterData = [];
  let splitFirstThreeData = [];
  let infoData = [];

  if (data) {
    switch(data?.handle) {
      case 'refinance':
        filterData = data.sectionData.filter((item) => {
          if (item?.handle.includes('7')) return item
        })
        break;
      case 'homepurchase':
        filterData = data.sectionData.filter((item) => {
          if (item.handle.includes('6')) return item
        })
        break;
    }
    modeledData = sectionModel(filterData[0])

    modeledData?.sectionReference.map((item, index) => {
      if (index <= 2) {splitFirstThreeData.push(item)}
      else {
        infoData.push(item);
      }
    })
  }
    return (
      <div className={`${styles.InfoContentBlock}`}>
        <div className="container">
          <InfoContent3Column cardData={splitFirstThreeData} handle={data?.handle}/>
          <InfoContent2Column cardData={infoData} handle={data?.handle}/>
        </div>
      </div>
    )
}

export default InfoContentBlock

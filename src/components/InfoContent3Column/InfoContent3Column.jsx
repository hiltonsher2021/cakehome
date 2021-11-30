import React from 'react'
import * as styles from './InfoContent3Column.module.scss';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import HeaderCopyCtaSmall from 'components/HeaderCopyCtaSmall/HeaderCopyCtaSmall'

const InfoContent3Column = (data) => {
  let cardData = data?.cardData;
    return (
      <div className={`${styles.InfoContent3Column}`}>
        <div className="InfoContent3Column__wrapper">
        {cardData.map((item, index) => {
            return(
          <div className="InfoContent3Column__item" key={index}>
            {/* add Class - info */}
            <HeaderCopyCtaSmall value={item} handle={data?.handle}  />
          </div>
)
})}
          {/* <div className="InfoContent3Column__item">
            <HeaderCopyCtaSmall />
          </div>

          <div className="InfoContent3Column__item">
            <HeaderCopyCtaSmall />
          </div> */}
        </div>
      </div>
    )
}

export default InfoContent3Column

import React from 'react'
import * as styles from './InfoContent2Column.module.scss';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import HeaderCopyCtaSmall from 'components/HeaderCopyCtaSmall/HeaderCopyCtaSmall'

const InfoContent2Column = (data) => {
  let cardData = data?.cardData;
    return (
      <div className={`${styles.InfoContent2Column}`}>
        <div className="InfoContent2Column__wrapper">
          {cardData.map((item, index) => {
            return(
              <div className="InfoContent2Column__item info" key={index}>
            {/* add Class - info */}
            <HeaderCopyCtaSmall value={item} handle={data?.handle} />
          </div>
            )
          })}
        </div>
      </div>
    )
}

export default InfoContent2Column

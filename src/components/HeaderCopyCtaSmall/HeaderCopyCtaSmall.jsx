import React from 'react'
import * as styles from './HeaderCopyCtaSmall.module.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links'

const HeaderCopyCtaSmall = (data) => {
  return (
    <div
      className={`${styles.HeaderCopyCtaSmall} ${
        data?.handle === 'refinance' || data?.handle === 'homepurchase'
          ? 'info'
          : ''
      }`}
    >
      <>
        <h5>{data?.value?.title}</h5>

        {(data?.multipleItems) ? (
          <>
          {data?.value?.cardItems.map((item, index) => {
            return (<p className="decrptn" key={index} dangerouslySetInnerHTML={{
              __html: item.title?.title }}>
            </p>)
          })}
          </>
        ) : (<p className="decrptn">
          {data?.value?.titleLongDescription?.titleLongDescription ||
            data?.value?.subTitle}
        </p>) }

        {data?.value?.footerText ||
          (data?.value?.ctaText && (
            <AnchorLink href="#">
              {data?.value?.footerText || data?.value?.ctaText}
            </AnchorLink>
          ))}
      </>
    </div>
  )
}

export default HeaderCopyCtaSmall

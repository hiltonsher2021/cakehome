import React from 'react'
import * as styles from './CtaBig.module.scss'
import { Link } from 'gatsby'

const CtaBig = (data) => {
  let { campaignUrl } = data

  return (
    <a
      className={`${styles.CtaBig} btn dark ${data?.className}`}
      href={data?.ctaUrl || data?.ctaLink || campaignUrl}
      target={data?.indexValue === 0 ? '_blank' : ''}
    >
      <span className="hid-mob">{data?.ctaText}</span>
      <span className="hid-dsktp">{data?.ctaMobText || data?.ctaText}</span>
    </a>
  )
}

export default CtaBig

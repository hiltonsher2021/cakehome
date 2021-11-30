import React from 'react'
import * as styles from './CtaBig.module.scss'

const CtaBig = (data) => {
  return (
    <a className={`${styles.CtaBig} btn dark ${data?.className}`} href={data?.ctaUrl || data?.ctaLink} target={(data?.indexValue === 0 || data?.indexValue === 2) ? '' : '_blank'}>
      <span className="hid-mob">{data?.ctaText}</span>
      <span className="hid-dsktp">{data?.ctaMobText || data?.ctaText}</span>
    </a>
  )
}

export default CtaBig

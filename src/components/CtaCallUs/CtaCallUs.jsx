import React from 'react'
import * as styles from './CtaCallUs.module.scss'

const CtaCallUs = (modelData) => {

  return (
    <div className={`${styles.CtaCallUs} ${modelData?.className}`}>
      {modelData?.data?.map((menu, index) => {
        if (menu?.label === 'Call Us') {
          return (
            <>
              <a href={'tel:+' + menu?.url} className="btn call-us">
                <div className="icon-wrapper" key={index}>
                  <figure>
                    <img src="/images/headphone-icon.svg" alt="Call Us" />
                  </figure>
                </div>
                <div className="text-wrapper">
                  {menu?.label}
                  <span>{menu?.subLabel}</span>
                </div>
              </a>
            </>
          )
        }
      })}
    </div>
  )
}

export default CtaCallUs

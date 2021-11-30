import React from 'react'
import * as styles from './RateDetailCard.module.scss';
import { AnchorLink } from "gatsby-plugin-anchor-links";

const RateDetailCard = () => {
    return (
      <div className={`${styles.RateDetailCard}`}>
        <div className="RateDetailCard">
          <div className="RateDetailCard__header">
            <div className="rate-wrap"><span className="rate">2.350</span><span className="right-side-rate"><em>%</em><span>Apr</span></span></div>
          </div>
          <div className="RateDetailCard__footer">
            <h2>30-year fixed</h2>
            <p>Quod eos eius aspernatur qui molestiae est est labore. Soluta aperiam delectus sit ipsam modi. </p>
            <ul>
              <li>Tempora aut temporibus excepturi </li>
              <li>ut quia quibusdam necessitatibus earum</li>
              <li>Deserunt rerum iusto in quo aut fugiat cupiditate officia.</li>
            </ul>
          </div>
        </div>
      </div>
    )
}

export default RateDetailCard

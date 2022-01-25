import React from 'react'
import * as styles from './CampaignForm.module.scss'
import ChatCallBlock from 'components/ChatCallBlock/ChatCallBlock'

const CampaignForm = (data) => {
  return (
    <div>
      <section className={styles.CampaignForm}>
        <div className="container">
          <div className="form__head">
            <h1>You have questions, we have answers</h1>
          </div>
          <ChatCallBlock sectionData={data?.sectionData} />

          <div className="form__area">
            <div className="form__area-head">
              <h2>We’d love to hear from you!</h2>
              <div className="form__wrap">
                <input placeholder="Name" type="text" />
                <input placeholder="Email" type="text" />
                <textarea
                  placeholder="How can we help?"
                  name="help"
                  id="help"
                  cols="30"
                  rows="10"
                ></textarea>
                <div className="form__submit">
                  <a className="btn" href="#" title="btn">
                    SEND
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CampaignForm

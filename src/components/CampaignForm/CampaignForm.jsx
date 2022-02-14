import React, { useState, useEffect } from 'react'
import * as styles from './CampaignForm.module.scss'
import ChatCallBlock from 'components/ChatCallBlock/ChatCallBlock'
import { useForm } from 'react-hook-form'
import api from 'utils/api'
import sectionModel from 'models/Section'

const isBrowser = typeof window !== 'undefined'


const CampaignForm = (data) => {
  let sessionStorage
  if (isBrowser) {
    sessionStorage = window.sessionStorage
  }
  let isQuestionSent
  const [successMessage, setSuccessMessage] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showFailureMessage, setShowFailureMessage] = useState(false)
  let modeledData
  let titledData
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  if (data) {
    let filterData = data?.references.filter((item) => {
      if (item?.handle?.includes('1-toolsadvice')) return item
    })
    let titleData = data?.references.filter((item) => {
      if (item?.handle?.includes('formTitle-campaign')) return item
    })
    modeledData = sectionModel(filterData[0])
    titledData = sectionModel(titleData[0])
  }

  useEffect(() => {
    if (isBrowser) {

    isQuestionSent = sessionStorage.getItem('QuestionSent');
    }
    if(isQuestionSent === "true") {
      setShowSuccessMessage(true)
      setSuccessMessage("Great question! We'll be in touch ASAP with answers")
    }
  }, [successMessage, showSuccessMessage])



  const sendQuery = (data) => {
    api({
      url: 'contacts',
      method: 'POST',
      data: {
        name: data?.name,
        email: data?.email,
        message: data?.query,
      },
    })
      .then((response) => {
        setShowSuccessMessage(
          response.data?.status === 'success' ? true : false
        )
        setSuccessMessage("Great question! We'll be in touch ASAP with answers")
        sessionStorage.setItem('QuestionSent', true);
        setShowFailureMessage(false)

      })
      .catch(function (error) {
        setSuccessMessage('Hmmmm, something went wrong, please fill out each field')
        setShowFailureMessage(error.status !== 'success' ? true : false)
        setShowSuccessMessage(false)
      })
  }

  return (
    <div>
      <section className={styles.CampaignForm}>
        <div className="container">
          <div className="form__head">
            <h1 className="d-desktop">{titledData?.mainTitle}</h1>
            <h1 className="d-mob">{titledData?.description?.description}</h1>
            {/* // markup chnaged  */}
          </div>
          <ChatCallBlock sectionData={data?.references} className="font-edit" />

          <div className="form__area">
            <div className="form__area-head">
              <h2>{titledData?.subTitle?.subTitle}</h2>
              {!showSuccessMessage && (
                <form
                  onSubmit={handleSubmit((data) => {
                    sendQuery(data)
                  })}
                >
                  <div className="form__wrap">
                    {/* markup changed */}
                    <div className="form-field">
                      <input
                        placeholder="Name"
                        type="text"
                        {...register('name', {
                          required: 'This is a required field',
                          pattern: {
                            value: /^\b(?!.*?\s{2})[A-Za-z ]{1,50}$/,
                            message:
                              'Please enter a valid name',
                          },
                        })}
                      />
                      <p className="error-message">{errors.name?.message}</p>
                    </div>
                    {/* markup changed */}
                    <div className="form-field">
                      <input
                        placeholder="Email"
                        {...register('email', {
                          required: 'This is a required field',
                          pattern: {
                            value: /^\b\S+@\S+\.\S+[\s]{0,1}$/,
                            message:
                              'Entered value does not match email format',
                          },
                        })}
                        type="text"
                      />
                      <p className="error-message">{errors.email?.message}</p>
                    </div>
                    {/* markup changed */}
                    <div className="form-field textarea">
                      <textarea
                        placeholder="How can we help?"
                        {...register('query', {
                          required: 'This is a required field',
                          pattern: {
                            value: /^\b[A-Za-z ]{1,250}(?:$|.)[\s]{0,1}$/,
                            message:
                              'Please enter a valid question',
                          },
                        })}
                        id="help" // markup chnaged
                      ></textarea>
                      <p className="error-message">{errors.query?.message}</p>
                    </div>
                    <div className="form__submit">
                      <button className="btn" type="submit" title="SEND">
                        SEND
                      </button>
                    </div>
                  </div>
                </form>
              )}
              {showSuccessMessage && (
                <div className="success__message">
                  <p>{successMessage}</p>
                </div>
              )}
              {showFailureMessage && (
                <div >
                  <p>{successMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CampaignForm

import React, {useState} from 'react'
import * as styles from './CampaignForm.module.scss'
import ChatCallBlock from 'components/ChatCallBlock/ChatCallBlock'
import { useForm } from 'react-hook-form'
import api from 'utils/api'

const CampaignForm = (data) => {
  const [successMessage, setSuccessMessage] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const sendQuery = (data) => {
    api({
      url: 'contacts',
      method: 'POST',
      data: {
        name: "data",
        email: "test",
        message: "jdhfe"
      },
    })
      .then((response) => {
        setShowSuccessMessage(response.data?.status === 'success' ? true : false)
        setSuccessMessage(response?.data?.message)
      })
      .catch(function (error) {

        setSuccessMessage(error.message)
        setShowSuccessMessage(error.status !== 'success' ? true : false)

      })
  }


  return (
    <div>
      <section className={styles.CampaignForm}>
        <div className="container">
          <div className="form__head">
            <h1>You have questions, we have answers</h1>
          </div>
          <ChatCallBlock
            sectionData={data?.sectionData}
            className="font-edit"
          />

          <div className="form__area">
            <div className="form__area-head">
              <h2>We’d love to hear from you!</h2>
              {!showSuccessMessage &&
              <form
              onSubmit={handleSubmit((data) => {
                sendQuery(data)
              })}
            >
              <div className="form__wrap">
                <input
                  placeholder="Name"
                  type="text"
                  {...register('name', {
                    required: 'This is a required field',
                  })}
                />
                {/* <p>{errors.name?.message}</p> */}
                <input
                  placeholder="Email"
                  {...register('email', {
                    required: 'This is a required field',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Entered value does not match email format',
                    },
                  })}
                  type="text"
                />
                {/* <p>{errors.email?.message}</p> */}

                <textarea
                  placeholder="How can we help?"
                  {...register('query', {
                    required: 'This is a required field',
                  })}
                  id="help"
                  cols="30"
                  rows="10"
                ></textarea>
                {/* <p>{errors.query?.message}</p> */}

                <div className="form__submit">
                  <button className="btn" type="submit" title="btn">
                    SEND
                  </button>
                </div>
              </div>
            </form>}

            {showSuccessMessage &&
            <div>
              <p>{successMessage}</p>
            </div>
              }

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CampaignForm

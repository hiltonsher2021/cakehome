import React from 'react'
import * as styles from './TeamStoryBlock.module.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import sectionModel from 'models/Section'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const TeamStoryBlock = (data) => {
  let modeledData = []
  let teamData = []
  let quoteData = []
  let image
  let ourStoryImage
  let logo

  if (data) {
    let filterData = data?.sectionData.filter((item) => {
      if (item?.handle?.includes('3')) return item
    })
    modeledData = sectionModel(filterData[0])
    image = getImage(modeledData?.image?.gatsbyImageData)
    {
      modeledData?.sectionReference.map((item, index) => {
        if (index === 0) {
          quoteData = item
        } else {
          teamData = item
          logo = getImage(item?.image?.gatsbyImageData)
          ourStoryImage = getImage(item?.backgroundImage?.gatsbyImageData)
        }
      })
    }
  }
    return (
      <div className={`${styles.TeamStoryBlock} posRelative`}>
        <span id="meet-team"></span>
        <div className="container">
          <div className="Team__title-wrapper">
            <span className="eyebrow">{modeledData?.footerText}</span>
            <h2>{modeledData?.mainTitle}</h2>
            <p>{modeledData?.subTitle?.subTitle}</p>
          </div>
{/* Removed as per requirement */}
          {/* <div className="Team__graphic-wrapper">
            <figure>
               <GatsbyImage image={image} alt={modeledData?.image?.title} className="Team__graphic" objectFit="contain" />
               </figure>
          </div> */}

        <div className="Story__title-wrapper posRelative">
        <span id="our-story"></span>
          <span className="eyebrow">{teamData?.footerText}</span>
          <figure>
            <GatsbyImage
              image={logo}
              className="Story__logo"
              alt={teamData?.image?.title}
            />
          </figure>

          <div className="Story__bottom-copy-wrapper mob">
            <blockquote>
              <p>{teamData?.title}</p>

              <p
                dangerouslySetInnerHTML={{
                  __html: teamData?.titleLongDescription?.titleLongDescription,
                }}
              />
              <p>{teamData?.subTitle}</p>

              <cite>{teamData?.ctaText}</cite>
            </blockquote>
          </div>
        </div>

        <div className="Story__graphic-wrapper">
          <div className="Story__timeline-wrapper">
            <div className="timeline__holder">
              <div className="timeline__flag">
                <div className="timeline__year">
                  <span>2007</span>
                </div>
                <div className="timeline__content-wrap">
                  <div className="timeline__content-item">
                    <h6>June 2007</h6>
                    <p>
                      At 15, David Abelyan’s cousin drags him to work at a local
                      mortgage broker. David sells his first loan that day.
                    </p>
                  </div>
                </div>
              </div>

              <div className="timeline__flag">
                <div className="timeline__year two-line">
                  <span>2008 - 2016</span>
                </div>
                <div className="timeline__content-wrap">
                  <div className="timeline__content-item">
                    <p>
                      David spends the next 8 years becoming a mortgage expert.
                    </p>
                  </div>
                </div>
              </div>

              <div className="timeline__flag">
                <div className="timeline__year two-line">
                  <span>2016 - 2018</span>
                </div>
                <div className="timeline__content-wrap">
                  <div className="timeline__content-item">
                    <p>
                      David becomes a top producing Loan Officer at PennyMac.
                    </p>
                  </div>
                </div>
              </div>

              <div className="timeline__flag">
                <div className="timeline__year">
                  <span>2018</span>
                </div>
                <div className="timeline__content-wrap">
                  <div className="timeline__content-item">
                    <h6>February 2018</h6>
                    <p>
                      David leaves PennyMac over the absurd fee’s they were
                      charging a veteran. That day he vows to start his own
                      mortgage company.
                    </p>
                  </div>
                  <div className="timeline__content-item hid-mob">
                    <h6>September 2018</h6>
                    <p>
                      Millenial Home Lending goes live with just 2 people. David
                      on sales and 1 person cold calling.
                    </p>
                  </div>
                </div>
              </div>

              <div className="timeline__flag show-mob">
                <div className="timeline__year">
                  <span>2018</span>
                </div>
                <div className="timeline__content-wrap">
                  <div className="timeline__content-item">
                    <h6>September 2018</h6>
                    <p>
                      Millenial Home Lending goes live with just 2 people. David
                      on sales and 1 person cold calling.
                    </p>
                  </div>
                </div>
              </div>

              <div className="timeline__flag">
                <div className="timeline__year">
                  <span>2021</span>
                </div>
                <div className="timeline__content-wrap">
                  <div className="timeline__content-item">
                    <h6>October 2021</h6>
                    <p>
                      To date MHL has funded <strong>11,304 mortgages</strong>{' '}
                      for <strong>$3.5 billion in volume</strong> and has{' '}
                      <strong>over 150 team members.</strong>
                    </p>
                  </div>
                  <div className="timeline__content-item hid-mob">
                    <h6>November 2021</h6>
                    <p>
                      MHL becomes <strong>Cake.</strong> Same people and vision,
                      new technology.
                    </p>
                  </div>
                </div>
              </div>

              <div className="timeline__flag show-mob">
                <div className="timeline__year">
                  <span>2021</span>
                </div>
                <div className="timeline__content-wrap">
                  <div className="timeline__content-item">
                    <h6>November 2021</h6>
                    <p>
                      MHL becomes <strong>Cake.</strong> Same people and vision,
                      new technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="timeline__road">
              <figure className="road">
                <img src="/images/time-line-road.svg" alt="Cake Timeline" />
              </figure>
              <figure className="launch">
                <img src="/images/time-line-launch.svg" alt="Cake Timeline" />
              </figure>
            </div>
          </div>

          <div className="Story__bottom-copy-wrapper dsktp">
            <blockquote>
              <p>{teamData?.title}</p>
              <p
                dangerouslySetInnerHTML={{
                  __html: teamData?.titleLongDescription?.titleLongDescription,
                }}
              />
              <p>{teamData?.subTitle} </p>
              <cite>{teamData?.ctaText}</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamStoryBlock

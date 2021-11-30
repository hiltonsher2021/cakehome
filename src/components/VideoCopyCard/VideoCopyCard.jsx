import React,{useState} from 'react'
import * as styles from './VideoCopyCard.module.scss';
import './modal-video.scss';
import ModalVideo from 'react-modal-video'

const isBrowser = typeof window !== "undefined";

const VideoCopyCard = (data) => {
    const [isOpen, setOpen] = useState(false)
    return (
      // for video cards add class - "has-video"
      <div className={`${styles.VideoCopyCard} has-video`}>
        {isBrowser &&
        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="L61p2uyiMSo" onClose={() => setOpen(false)} />
        }
        <div className="VideoCopyCard__top">
          <button className="VideoCopyCardPlay" > </button>
          {/* Add click to button --> onClick={()=> setOpen(true)} */}
        </div>
        <div className="VideoCopyCard__details">
          <h3>{data?.videoDetails?.title}</h3>
          <p>{data?.videoDetails?.subTitle}</p>
        </div>
      </div>
    )
}

export default VideoCopyCard

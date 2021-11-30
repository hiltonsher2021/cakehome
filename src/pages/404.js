import * as React from "react"
import { Link } from "gatsby"
import SEO from 'components/seo';

// markup
const NotFoundPage = () => {
  return (
    <div className="cake404">
      <div className="container">
        <div className="cake404__wrapper">
          <figure className="cake404__figure">
            <img src="/images/OK_404.png" alt="404"/>
          </figure>
          <div className="cake404__contents">
            <div className="contents__top">
              <h1>Oops!</h1>
              <h2>Error 404 - Page not found</h2>
              <figure className="cake404__figure">
                <img src="/images/OK_404.png" alt="404"/>
              </figure>
              <p>The page you are looking for was moved, removed, renamed or might never existed.</p>
              <Link className="btn dark" to="/">Let’s take you back home</Link>
            </div>
            <div className="contents__bottom">
              <figure className="footIcon">
                <img src="/images/cake-logo-white.png" alt="cake" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage

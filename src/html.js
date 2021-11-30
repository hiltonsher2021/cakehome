import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
         <link rel="preload"
            as="font"
            href="/fonts/Aeonik-AirItalic.woff2"
            type="font/woff2"
            crossOrigin="anonymous" />
            <link rel="preload"
            as="font"
            href="/fonts/Aeonik-Air.woff2"
            type="font/woff2"
            crossOrigin="anonymous" />
            <link rel="preload"
            as="font"
            href="/fonts/Aeonik-Black.woff2"
            type="font/woff2"
            crossOrigin="anonymous" />
            <link rel="preload"
            as="font"
            href="/fonts/Aeonik-BlackItalic.woff2"
            type="font/woff2"
            crossOrigin="anonymous" />
            <link rel="preload"
            as="font"
            href="/fonts/Aeonik-Bold.woff2"
            type="font/woff2"
            crossOrigin="anonymous" />
            <link rel="preload"
            as="font"
            href="/fonts/Aeonik-Light.woff2"
            type="font/woff2"
            crossOrigin="anonymous" />
            <link rel="preload"
            as="font"
            href="/fonts/Degular_Display-Black.woff2"
            type="font/woff2"
            crossOrigin="anonymous" />
            <link rel="preload"
            as="font"
            href="/fonts/Degular_Display-Bold.woff2"
            type="font/woff2"
            crossOrigin="anonymous" />
            <link rel="preload"
            as="font"
            href="/fonts/FiraSans-Black.woff2"
            type="font/woff2"
            crossOrigin="anonymous" />
        <link rel="icon" href="/images/Cake_Favicon_mint.svg" type="image/svg+xml"/>
        {props.headComponents}

        {/* <!-- Google Tag Manager --> */}

        <script async
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NRNNFGN');</script>`,
          }}
        />

        {/* <!-- End Google Tag Manager --> */}

        <script async
          id="chat-widget-container"
          dangerouslySetInnerHTML={{
            __html: `
              window.__lc = window.__lc || {};
              window.__lc.license = 13176645;
              ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))

          `,
          }}
        />
        {/* CookiePro Cookies Consent Notice start for cakemillennialhomedevelop.gtsb.io */}

        <script async
          src="https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js"
          data-language="en"
          type="text/javascript"
          charSet="UTF-8"
          data-domain-script="2dd02ff0-5ba4-437c-b1b6-697f4b9fab92-test"
        ></script>
        <script async
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `function OptanonWrapper() { }`,
          }}
        ></script>
        {/* <!-- CookiePro Cookies Consent Notice end for cakemillennialhomedevelop.gtsb.io --> */}

        <script async
          async
          src="https://embed.signalintent.com/js/embedded.js?org-guid=2041f4e9-22f8-4175-b760-483ec13b2f6c"
        />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}

        {/* <!-- Google Tag Manager (noscript) --> */}

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NRNNFGN" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />

        {/* <!-- End Google Tag Manager (noscript) --> */}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}

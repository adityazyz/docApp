// added bootstrap
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        {/* <!-- Fontawesome CSS --> */}
		  <link rel="stylesheet" href="assets/plugins/fontawesome/css/fontawesome.min.css"/>
		  <link rel="stylesheet" href="assets/plugins/fontawesome/css/all.min.css"></link>
      
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
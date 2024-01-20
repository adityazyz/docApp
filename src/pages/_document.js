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


        {/* <!-- Fontawesome CSS --> (for footer icons )*/}
    
        <script
          src="https://kit.fontawesome.com/15a0299d55.js"
          crossOrigin="anonymous"
        ></script>


      
        {/* select 2 css 
		<link rel="stylesheet" href="assets/plugins/select2/css/select2.min.css"></link>

    {/* <!-- Bootstrap CSS --> */}
        {/* <link rel="stylesheet" href="assets/css/bootstrap.min.css"></link> */}

        {/* <!-- Bootstrap CSS --> */}
        {/* <link rel="stylesheet" href="assets/plugins/bootstrap-tagsinput/css/bootstrap-tagsinput.css"/> */}

        {/* <link rel="stylesheet" href="assets/plugins/dropzone/dropzone.min.css"></link> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

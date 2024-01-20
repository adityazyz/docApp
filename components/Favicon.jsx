import Head from 'next/head';
import { useSelector } from 'react-redux';

function Favicon() {
  const faviconLink = useSelector(state => state.website.websiteFavicon);

  return (
    <Head>
      <link rel="icon" href={faviconLink} />
    </Head>
  );
}

export default Favicon;
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html>
    <Head>
      <link rel="manifest" href="/manifest/manifest.json" />
      <meta name="theme-color" content="#000000" />
      {/* Other meta tags or links */}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;

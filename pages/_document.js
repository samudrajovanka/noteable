import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="Create your notes and projects easily with Noteable" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="text-na-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

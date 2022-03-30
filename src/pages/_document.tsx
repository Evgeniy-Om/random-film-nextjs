import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    // static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    //     const initialProps = await Document.getInitialProps(ctx);
    //     // console.log(initialProps)
    //     return { ...initialProps };
    // }

    render(): JSX.Element {
        const url = this.props.__NEXT_DATA__.page

        let htmlClass = ''
        if (url === '/favorites' || url === '/blacklist') htmlClass += 'show-scroll'
        return (
            <Html lang="ru">
                <Head/>
                <body className={htmlClass}>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
import Head from "next/head";
// components
import HomePage from "components/views";
import axios from "axios";

Home.layout = "main";
export default function Home(props) {
    return (
        <div>
            <Head>
                <title>E-commerce</title>
                <meta name="description" content="E-commerce Site" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomePage list={props?.list} />
        </div>
    );
}

export async function getServerSideProps(context) {
    let list = [];

    console.log("context.locale");
    console.log(context.locale);

    const { data: res } = await axios.post(
        "https://dashcommerce.click68.com/api/ListProduct",
        {},
        {
            headers: {
                lang: context.locale,
            },
        }
    );

    if (res?.status === true) {
        list = res?.description;
    }
    return {
        props: {
            list,
        },
    };
}

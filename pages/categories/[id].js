import Head from "next/head";
import { useRouter } from "next/router";
// components
import CategoriesPageContent from "components/views/categories";
import CategoriesLayout from "layouts/categories/categories-layout";
// modules
import axios from "axios";
import { getCookie } from "cookies-next";

function OneCategoryPage(props) {
    const router = useRouter();
    const { id } = router.query;

    console.log("props");
    console.log(props);

    console.log("test", router.locale);

    return (
        <>
            <Head>
                <title>One Categories</title>
            </Head>
            <CategoriesLayout sideList={props.categories}>
                <CategoriesPageContent
                    id={id}
                    productList={props.products}
                    locale={router.locale}
                />
            </CategoriesLayout>
        </>
    );
}
OneCategoryPage.layout = "main";

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { id } = context.params;

    let categories = [];
    let products = [];

    let cookies = getCookie("user", { req, res });
    if (cookies) {
        cookies = JSON.parse(cookies);
    }
    // get all categories and brands ... etc
    try {
        const [
            {
                value: { data: categoryData },
            },
            {
                value: { data: productData },
            },
        ] = await Promise.allSettled([
            axios.post(
                "https://dashcommerce.click68.com/api/ListCategoryByCategory",
                {
                    id: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookies?.token}`,
                        lang: context.locale,
                    },
                }
            ),
            axios.post(
                "https://dashcommerce.click68.com/api/ListProductByCategory",
                { id: id },
                {
                    headers: {
                        Authorization: `Bearer ${cookies?.token}`,
                        lang: context.locale,
                    },
                }
            ),
        ]);

        console.log("categoryData");
        console.log(categoryData);

        if (categoryData?.status === true) {
            categories = categoryData?.description;
        }
        if (productData?.status === true) {
            products = productData?.description;
        }
    } catch (err) {
        console.error("err");
        console.error(err.toString());
    }
    return {
        props: {
            categories,
            products,
        },
    };
}

export default OneCategoryPage;

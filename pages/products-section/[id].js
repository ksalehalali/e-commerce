import Head from "next/head";
import { useRouter } from "next/router";
// components
import CategoriesPageContent from "components/views/categories";
import CategoriesLayout from "layouts/categories/categories-layout";
// modules
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { searchResultNumber } from "redux/modal/action";
import { useDispatch } from "react-redux";

function ProductsSection(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    let section = router.query.id.split(" ")[0];
    const [chosienSection, setChosienSection] = useState([]);
    const { data: user } = useSession();

    console.log("products section", section);

    useEffect(() => {
        switch (section) {
            case "Suggested":
                getProducts("ListProductByLastOrder");
                break;
            case "Last":
                getProducts("ListProductOffer");
                break;
            case "Latest":
                getProducts("ListProductByFavorite");
                break;
            default:
                return "";
        }
    }, [router.query.id]);

    const getProducts = async (endpoint) => {
        await axios
            .post(
                `https://dashcommerce.click68.com/api/${endpoint}`,
                {
                    PageSize: 20,
                    PageNumber: 1,
                },
                {}
            )
            .then((res) => {
                console.log(res.data);
                if (res?.data.status) {
                    setChosienSection(res?.data.description);
                    dispatch(searchResultNumber(res?.data.total));
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <Head>
                <title>E-commerce - Categories</title>
                <meta name="description" content="e-commerce description" />
            </Head>
            <CategoriesLayout sideList={props?.categories}>
                <CategoriesPageContent
                    locale={router.locale}
                    productList={chosienSection}
                />
            </CategoriesLayout>
        </>
    );
}
ProductsSection.layout = "main";

export async function getServerSideProps(context) {
    const { req, res } = context;
    let categories = [];

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
        ] = await Promise.allSettled([
            axios.get("https://dashcommerce.click68.com/api/ListCategory", {
                headers: {
                    Authorization: `Bearer ${cookies?.token}`,
                    lang: context.locale,
                },
            }),
        ]);

        if (categoryData?.status === true) {
            categories = categoryData?.description;
        }
    } catch (err) {
        console.error("err");
        console.error(err.toString());
    }

    return {
        props: {
            categories,
        },
    };
}

export default ProductsSection;

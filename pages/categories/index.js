import Head from "next/head";
import { useRouter } from "next/router";
// components
import CategoriesPageContent from "components/views/categories";
import CategoriesLayout from "layouts/categories/categories-layout";
// modules
import axios from "axios";
import { getCookie } from "cookies-next";

function CategoriesPage(props) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>E-commerce - Categories</title>
        <meta name="description" content="e-commerce description" />
      </Head>
      <CategoriesLayout sideList={props?.categories}>
        <CategoriesPageContent
          locale={router.locale}
          productList={props.products}
        />
      </CategoriesLayout>
    </>
  );
}
CategoriesPage.layout = "main";
// CategoriesPage.nested = "category";

export async function getServerSideProps(context) {
  const { req, res } = context;
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
      axios.get("https://dashcommerce.click68.com/api/ListCategory", {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
          lang: context.locale,
        },
      }),
      axios.post(
        "https://dashcommerce.click68.com/api/ListProduct",
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
            lang: context.locale,
          },
        }
      ),
    ]);

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

export default CategoriesPage;

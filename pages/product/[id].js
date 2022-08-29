import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
// components
import ProductPageContent from "components/views/product/[id]";
import ErrorHandler from "components/error-handler";
import { getCookie } from "cookies-next";

function ProductDetailPage(props) {
  const router = useRouter();
  const { id } = router.query;

  if (props?.status === false)
    return (
      <ErrorHandler
        failCode={props?.failCode}
        title={props?.description}
        extraType={"reload"}
      />
    );

  return (
    <>
      <Head>
        <title>E-commerce - product</title>
        <meta name="description" content="E-commerce Site - product view" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductPageContent id={id} data={props?.data} />
    </>
  );
}
ProductDetailPage.layout = "main";

export async function getServerSideProps(context) {
  const {
    params: { id },
    req,
    res,
    locale,
  } = context;

  let props = null;
  let cookies = getCookie("user", { req, res });
  if (cookies) {
    cookies = JSON.parse(cookies);
  }
  try {
    const { data } = await axios.post(
      "https://dashcommerce.click68.com/api/GetProduct",
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
          lang: locale,
        },
      }
    );
    if (data?.status === true) {
      props = {
        status: true,
        data: data?.description,
      };
    } else {
      props = {
        status: false,
        data: data?.description,
        failCode: 400,
      };
    }
  } catch (e) {
    console.log("ERROR CATCHED !!");
    console.error(e);
    if (e?.response?.status === 400) {
      props = {
        failCode: 400,
        status: false,
        description: "Something went wrong ! Please try again later.",
      };
    }
  }

  return {
    props: {
      ...props,
    },
  };
}

export default ProductDetailPage;

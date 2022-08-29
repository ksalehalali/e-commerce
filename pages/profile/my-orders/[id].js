import Head from "next/head";
import { useRouter } from "next/router";
// components
import OneOrderPageContent from "components/views/profile/one-order-page";

export default function OneOrderPage() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <>
      <Head>
        <title>One Order Page</title>
      </Head>
      <OneOrderPageContent id={id} />
    </>
  );
}

OneOrderPage.layout = "main";
OneOrderPage.guard = true;
OneOrderPage.noRedirect = true;

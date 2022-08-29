import Head from "next/head";
import { useRouter } from "next/router";
// components
import MyOrdersPageContent from "components/views/profile/my-order";

function MyOrdersPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>E-commerce - My Orders</title>
      </Head>
      <MyOrdersPageContent locale={router.locale} router={router} />
    </>
  );
}

MyOrdersPage.layout = "main";
MyOrdersPage.nested = "profile";
MyOrdersPage.guard = true;
MyOrdersPage.noRedirect = true;

export default MyOrdersPage;

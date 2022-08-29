import Head from "next/head";
//component
import CartPageContent from "components/views/cart";
import AccessDenied from "components/results/access-denied";
// redux
import { useSelector } from "react-redux";

Cart.layout = "main";
Cart.guard = true;
Cart.noRedirect = true;
function Cart(props) {
  return (
    <>
      <Head>
        <title>E-commerce - cart</title>
        <meta name="description" content="E-commerce Site - user cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartPageContent />
    </>
  );
}

export default Cart;

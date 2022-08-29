import { useEffect } from "react";
// components
import FlexDiv from "components/utils/flex-div";
import ShoppingCart from "components/shopping-cart/cart";
import Order from "components/shopping-cart/order";
import Container from "components/utils/container";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setGettedShoopingCart } from "redux/cart/action";
// hooks
import useFetch from "hooks/useFetch";
import { Col, Row } from "antd";
import useTranslation from "next-translate/useTranslation";

function CartPageContent() {
  const { t } = useTranslation("cart");
  const dispatch = useDispatch();

  // get data
  const {
    data: getData,
    error: getError,
    loading: getLoading,
    executeFetch: getCartItems,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_LIST_CART,
    "post",
    {},
    true
  );

  // get cart
  useEffect(() => {
    if (getData?.status === true && getLoading === false) {
      dispatch(setGettedShoopingCart(getData?.description));
    } else if (getData?.status === false) {
      alert("Error");
    }
  }, [getData, getError, getLoading]);

  return (
    <Container>
      <Row gutter={24}>
        <Col sm={24} md={14} lg={16}>
          <ShoppingCart
            getData={getData}
            getLoading={getLoading}
            getError={getError}
            t={t}
          />
        </Col>
        <Col sm={24} md={10} lg={8}>
          <Order getData={getData} />
        </Col>
      </Row>
    </Container>
  );
}

export default CartPageContent;

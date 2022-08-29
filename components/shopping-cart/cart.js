import { useEffect, useCallback } from "react";
import styled from "styled-components";
// components
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { Button, Tag } from "antd";
import CartItem from "./cart-item";
// hookse
import useFetch from "hooks/useFetch";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setGettedShoopingCart } from "redux/cart/action";
// styles
import { COLORS } from "styles/variables";
import CartItemLoading from "components/loadings/cart-item-loading";
import Link from "next/link";

const ShoppingCartDiv = styled.div`
  width: 100%;
`;

function ShoppingCart({ getLoading, getData, getError, t }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // delete cart
  const {
    data: deleteData,
    error: deleteError,
    loading: deleteLoading,
    executeFetch: deleteCartItem,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_REMOVE_CART,
    "post",
    {},
    false
  );

  // delete item
  const handleDeleteItem = useCallback((id) => {
    deleteCartItem({ id: id });
  }, []);

  // remove cart
  useEffect(() => {
    if (deleteData?.status === true && deleteLoading === false) {
      // can update data now ..
      dispatch(setGettedShoopingCart(deleteData?.description));
    } else if (deleteData?.status === false) {
      alert("Delete Error");
    }
  }, [deleteData, deleteError, deleteLoading]);

  return (
    <ShoppingCartDiv>
      <Text as={"h1"} bold fontSize={"2em"} color={COLORS.TITLE}>
        {t("title")}
      </Text>

      <FlexDiv column gap={20}>
        {getLoading === true && <CartItemLoading />}
        {getLoading === false && cartItems?.length > 0 && (
          <>
            {cartItems?.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                prodID={item.prodID}
                color={item.color}
                colorID={item.colorID}
                size={item.size}
                sizeID={item.sizeID}
                seller={item.userName}
                image={item.image}
                number={item.number}
                offer={parseFloat(item.offer)}
                price={parseFloat(item.price)}
                product={item.product}
                handleDeleteItem={handleDeleteItem}
              />
            ))}
          </>
        )}
        {getLoading === false && cartItems?.length === 0 && (
          <h4>{t("emptyMessage")}</h4>
        )}
        <div>
          <Link href="/">
            <Button size="large" type="primary">
              {t("continueShopping")}
            </Button>
          </Link>
        </div>
      </FlexDiv>
    </ShoppingCartDiv>
  );
}
export default ShoppingCart;

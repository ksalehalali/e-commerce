// components
import FlexDiv from "components/utils/flex-div";
import CartItem from "components/shopping-cart/cart-item";
// redux
import { useSelector } from "react-redux";

function Orders({ list = [] }) {
  const { cartItems } = useSelector((state) => state.cart);
  // make current list
  const currentList = list && list?.length > 0 ? list : cartItems;

  return (
    <FlexDiv column gap={5}>
      {currentList?.map((item) => (
        <CartItem
          key={item?.id}
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
          deletable={false}
          sumable={false}
        />
      ))}
    </FlexDiv>
  );
}

export default Orders;

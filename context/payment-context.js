import { createContext, useCallback, useEffect, useState } from "react";
// redux
import { useSelector } from "react-redux";

export const PaymentContext = createContext();

function PaymentContextProvider(props) {
  const [started, setStarted] = useState(false);
  const [address, setAddress] = useState(null);
  const [paymentType, setPaymentType] = useState(0);
  const [total, setTotal] = useState(0);

  // get cart Items
  const { cartItems } = useSelector((state) => state.cart);

  // start payment
  const startPaytment = useCallback(() => {
    setStarted(true);
  }, []);
  const endPayment = useCallback(() => {
    setStarted(false);
  }, []);

  // choose address
  const chooseAddress = useCallback((chosenAddress) => {
    setAddress(chosenAddress);
  }, []);

  const startPayment = useCallback(() => {
    console.log("start payment !!");
  }, []);

  const calcTotal = useCallback(() => {
    // calculate total
    let sum = 0;
    for (let i = 0; i < cartItems?.length; i++) {
      sum +=
        cartItems[i]?.offer && cartItems[i]?.offer !== 0
          ? (cartItems[i]?.price -
              (cartItems[i]?.price * cartItems[i]?.offer) / 100) *
            cartItems[i]?.number
          : cartItems[i]?.price;
    }

    setTotal(sum);
  }, [cartItems]);

  // when cartItems changed -> calculate total
  useEffect(() => {
    if (cartItems?.length > 0) {
      calcTotal();
    }
  }, [cartItems]);

  return (
    <PaymentContext.Provider
      value={{
        chooseAddress,
        startPaytment,
        started,
        address,
        startPayment,
        endPayment,
        paymentType,
        setPaymentType,
        total,
      }}
    >
      {props.children}
    </PaymentContext.Provider>
  );
}

export default PaymentContextProvider;

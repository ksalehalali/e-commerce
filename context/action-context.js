import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useRouter } from "next/router";
// modules
import useFetch from "hooks/useFetch";
import { getCookie } from "cookies-next";
// context
import { AddressesContext } from "context/address-context";
// redux
import { useDispatch } from "react-redux";
import { setGettedShoopingCart } from "redux/cart/action";
import { useSession } from "next-auth/react";

export const ActionRequiredContext = createContext();

function ActionContext(props) {
  const [action, setAction] = useState({ type: null, value: false });
  const dispatch = useDispatch();

  const router = useRouter();

  const { setAddressList } = useContext(AddressesContext);

  const { data: cookies, status } = useSession();

  const {
    data: getCartData,
    error: getCartError,
    loading: getCartLoading,
    executeFetch: getCartItems,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_LIST_CART,
    "post",
    {},
    true
  );

  const {
    data: getAddressData,
    error: getAddressError,
    loading: getAddressLoading,
    executeFetch: getAddress,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_LIST_USER_ADRESS,
    "post",
    { UserID: cookies?.user?.id },
    true
  );

  const getStartLoginData = useCallback(async () => {
    if (status === "authenticated") {
      if (!router.pathname.includes("/cart")) getCartItems();
      if (!router.pathname.includes("/delivery-address")) getAddress();
    }
  }, [router.pathname, status]);

  useEffect(() => {
    if (action.type === "startLogin" && action.value === true) {
      getStartLoginData();
      setAction({ type: null, value: false });
    }
  }, [action]);

  // get cart
  useEffect(() => {
    if (getCartData?.status === true && getCartLoading === false) {
      dispatch(setGettedShoopingCart(getCartData?.description));
    } else if (getCartData?.status === false) {
      // alert("Error");
    }
  }, [getCartData, getCartError, getCartLoading]);

  useEffect(() => {
    if (getAddressData?.status === true && !getAddressLoading) {
      setAddressList(getAddressData?.description);
    }
  }, [getAddressData, getAddressLoading, getAddressError]);

  return (
    <ActionRequiredContext.Provider
      value={{
        action,
        setAction,
      }}
    >
      {props.children}
    </ActionRequiredContext.Provider>
  );
}

export default ActionContext;

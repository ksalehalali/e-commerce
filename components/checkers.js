import { useRouter } from "next/router";
import { useCallback, useContext, useEffect } from "react";
// redux
import { useDispatch } from "react-redux";
import { setGettedShoopingCart } from "redux/cart/action";
// cart actions
import { loadingShoopingCart } from "redux/cart/action";
// services
import axios from "axios";
import { AddressesContext } from "context/address-context";
import { useSession } from "next-auth/react";

function Checkers({}) {
    const dispatch = useDispatch();

    const { data: cookies, status } = useSession();

    const router = useRouter();

    // context
    const { setAddressList } = useContext(AddressesContext);

    console.log(process.env.NEXT_PUBLIC_HOST_API);
    // get cart content
    const getShoopingCart = useCallback(async () => {
        try {
            const { data } = await axios.post(
                process.env.NEXT_PUBLIC_HOST_API +
                    process.env.NEXT_PUBLIC_LIST_CART,
                {
                    id: cookies?.user?.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookies?.user?.token}`,
                        lang: router.locale,
                    },
                }
            );
            if (data?.status === true) {
                dispatch(
                    setGettedShoopingCart(
                        data?.description.length === 0 ? [] : data?.description
                    )
                );
            } else {
                alert("Error");
            }
        } catch (e) {
            console.error("ERRORRRRR ____");
            console.error(e.toString());
        }
    }, [cookies]);

    const getUserAddresses = useCallback(async () => {
        try {
            const { data: res } = await axios.post(
                process.env.NEXT_PUBLIC_HOST_API +
                    process.env.NEXT_PUBLIC_LIST_USER_ADRESS,
                {
                    UserID: cookies?.user?.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookies?.user?.token}`,
                    },
                }
            );
            console.log("response addresses");
            console.log(res);

            if (res?.status === true) {
                setAddressList(res?.description);
            } else {
                alert("Failed to get addressses list");
            }
        } catch (e) {
            console.error("Error");
            console.error(e.toString());
        }
    }, [cookies]);

    useEffect(() => {
        if (router.pathname !== "/cart") {
            // get shopping cart items
            if (status !== "loading" && cookies?.user) {
                dispatch(loadingShoopingCart());
                console.log("Last Check not invalid ...");
                getShoopingCart();
                getUserAddresses();
            }
        }
    }, [status, cookies]);

    return <></>;
}

export default Checkers;

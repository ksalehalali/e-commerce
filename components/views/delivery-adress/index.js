import {
    useContext,
    useEffect,
    useCallback,
    useState,
    useReducer,
} from "react";
import Link from "next/link";
import styled from "styled-components";
// components
import Container from "components/utils/container";
import FlexDiv from "components/utils/flex-div";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Text from "components/utils/text";
import MainAdress from "components/delivery-adress/address-item";
import NewAdress from "components/delivery-adress/new-adress";
import { Button, Empty } from "antd";
// hooks
import useFetch from "hooks/useFetch";
import { COLORS } from "styles/variables";
// cookies
import { getCookie } from "cookies-next";
// context
import { AddressesContext } from "context/address-context";
// redux
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "redux/loading/actions";
import { PaymentContext } from "context/payment-context";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import GoogleMapComp from "pages/GoogleMapComp";
import axios from "axios";
import { useSession } from "next-auth/react";

// styles
const TurnBackIcon = styled.span`
    bottom: 10px;
`;

function DeliveryPageContent() {
    const { t } = useTranslation();
    // address context
    const { selected, setSelected, setAddressList } =
        useContext(AddressesContext);
    // payment context
    const { started, address, chooseAddress } = useContext(PaymentContext);
    const [addressData, setAddressData] = useState([]);

    const router = useRouter();
    const { payment } = router.query;
    const state = useSelector((state) => state.modal);
    let cookies = getCookie("user");
    if (cookies) cookies = JSON.parse(cookies);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const { data: userData } = useSession();

    useEffect(async () => {
        getData();
    }, [router]);
    const dispatch = useDispatch();

    // Handle Delete
    const handleDelete = async (item) => {
        dispatch(startLoading());
        await axios
            .post(
                process.env.NEXT_PUBLIC_HOST_API +
                    process.env.NEXT_PUBLIC_DELETE_ADRESS,
                {
                    id: item.id,
                },
                {
                    headers: {
                        UserID: userData?.user.id,
                        Authorization: `Bearer ${userData?.user.token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                getData();
                forceUpdate();
                dispatch(stopLoading());
                setSelected(null);
            })
            .catch((err) => console.log(err));
    };

    // Fetching Data
    const getData = async () => {
        await axios
            .post(
                process.env.NEXT_PUBLIC_HOST_API +
                    process.env.NEXT_PUBLIC_LIST_USER_ADRESS,
                {},
                {
                    headers: {
                        UserID: userData?.user.id,
                        Authorization: `Bearer ${userData?.user.token}`,
                    },
                }
            )
            .then((res) => {
                console.log("res", res.data);
                setAddressData(res?.data.description);
            })
            .catch((err) => console.log(err));
    };

    const { data, error, loading, executeFetch } = useFetch(
        process.env.NEXT_PUBLIC_HOST_API +
            process.env.NEXT_PUBLIC_LIST_USER_ADRESS,
        "post",
        { UserID: cookies?.id },
        true
    );

    // get list
    useEffect(() => {
        if (data?.status === true && !loading) {
            setAddressList(data?.description);
        }
    }, [data, loading, error]);

    return (
        <Container>
            {loading && <h2>Loading ....</h2>}
            {true ? (
                <FlexDiv column gap={15} padding={20} margin={10}>
                    <FlexDiv>
                        <TurnBackIcon href="#">
                            <Text icon>
                                <ArrowLeftOutlined
                                    style={{
                                        color: COLORS.TEXT_PRIMARY,
                                        marginBottom: "10px",
                                    }}
                                />
                            </Text>
                        </TurnBackIcon>
                        <Text bold color={COLORS.TEXT_PRIMARY}>
                            {t("delivery-address:backCart")}
                        </Text>
                    </FlexDiv>
                    <FlexDiv gap={10}>
                        <Text bold fontSize={20} color={COLORS.TITLE}>
                            {router.locale === "ar"
                                ? "عنوان ألتوصيل"
                                : "Delivery address"}
                        </Text>
                        {payment && (
                            <Text bold fontSize={20} color={COLORS.PRIMARY}>
                                {t("delivery-address:chooseToOrder")}
                            </Text>
                        )}
                    </FlexDiv>
                    <FlexDiv gap={20} responsive wrap="true">
                        {addressData?.map((item) => (
                            <MainAdress
                                key={item.id}
                                data={item}
                                isSelected={
                                    selected?.id === item.id ? true : false
                                }
                                setSelected={setSelected}
                                deleteItem={handleDelete}
                                getData={executeFetch}
                                payment={payment ? true : false}
                                t={t}
                            />
                        ))}
                        <NewAdress modalSuccessAction={executeFetch} />
                    </FlexDiv>
                    {!payment && (
                        <FlexDiv end="true">
                            <Link href="/payment">
                                <Button size="large" type="primary">
                                    {t("common:continueTxt")}
                                </Button>
                            </Link>
                        </FlexDiv>
                    )}
                </FlexDiv>
            ) : (
                <>
                    <NewAdress modalSuccessAction={executeFetch} />
                    <Empty />
                </>
            )}
        </Container>
    );
}

export default DeliveryPageContent;

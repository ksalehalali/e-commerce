import { useCallback, useContext, useEffect } from "react";
// components
import FlexDiv from "components/utils/flex-div";
import Container from "components/utils/container";
import PaymentInfo from "components/payment/payment-info";
import Orders from "components/payment/orders";
import styled from "styled-components";
import Text from "components/utils/text";
import { COLORS } from "styles/variables";
import { ArrowLeftOutlined, CreditCardFilled } from "@ant-design/icons";
import DeliveryInfo from "components/payment/delivery-info";
import { Row, Col, Button, message } from "antd";
import Order from "components/shopping-cart/order";
// modules
import useFetch from "hooks/useFetch";
// redux
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "redux/loading/actions";
import { PaymentContext } from "context/payment-context";
import { useRouter } from "next/router";
import { ActionRequiredContext } from "context/action-context";
import useTranslation from "next-translate/useTranslation";

const TurnBackIcon = styled.span`
  bottom: 10px;
`;
function PaymentPage() {
  const { t } = useTranslation();

  const router = useRouter();

  const dispatch = useDispatch();
  const { address, total, endPayment, paymentType, setPaymentType } =
    useContext(PaymentContext);
  const { action, setAction } = useContext(ActionRequiredContext);
  // const {} = use;

  // order
  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
    executeFetch: makeOrder,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_PLACE_ORDER,
    "post",
    {},
    false
  );

  // add payment
  const {
    data: addPaymentData,
    loading: addPaymentLoading,
    error: addPaymentError,
    executeFetch: addPayment,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_ADD_PAYMENT,
    "post",
    {},
    false
  );

  // functions
  //* order status  0 => cash - 1 => credit card - 2 => wallet
  const handleplaceOrder = useCallback(() => {
    let data = {
      // api_key: process.env.NEXT_PUBLIC_PKEY,
      // api_secret: process.env.NEXT_PUBLIC_SECRET,
      // invoiceValue: total,
      // invoiceId: "0",
      AddressID: address?.id,
      // paymentGateway: "cash",
      Payment: paymentType, // cash
    };
    if (paymentType === 0) {
      makeOrder(data);
    } else if (paymentType === 1) {
      makeOrder(data);
    } else if (paymentType === 2) {
      alert("Pay from wallet");
    }
    return;
  }, [paymentType, orderData]);

  // useEffect for order
  useEffect(() => {
    if (!orderLoading && orderData?.status === true) {
      if (paymentType === 0) {
        router.push(`/profile/my-orders/${orderData?.description?.message}`);
      } else if (paymentType === 1) {
        console.log("orderData");
        console.log(orderData);
        addPayment({
          invoiceValue: total,
          OrderID: orderData?.description?.message,
        });
      }
    } else if (!orderLoading && orderError) {
      message.error(orderError || "Error !! 97 payment/index.js");
    }
  }, [orderData, orderError, orderLoading]);
  // useEffect for add payment
  useEffect(() => {
    if (!addPaymentLoading && addPaymentData?.status === true) {
      console.log("addPaymentData");
      console.log(addPaymentData);
    } else if (!addPaymentLoading && addPaymentError) {
      message.error(addPaymentError || "Error !! 106 payment/index.js");
    }

    if (addPaymentLoading) dispatch(startLoading());
    else dispatch(stopLoading());

    if (!addPaymentLoading && addPaymentData?.status === true) {
      console.log(addPaymentData);
      window?.open(addPaymentData?.description?.url);

      setAction({
        type: "payment",
        value: {
          orderID: addPaymentData?.description?.orderID,
          invoiceId: addPaymentData?.description?.id,
        },
      });
    } else if (!addPaymentLoading && addPaymentError) {
      message.error(addPaymentError || t("common:messages.error500"));
    }
  }, [addPaymentData, addPaymentLoading, addPaymentError]);

  // useEffect for both complete and place order loading
  useEffect(() => {
    if (orderLoading === true) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [orderLoading]);

  return (
    <Container>
      <FlexDiv column margin={10} padding={10}>
        <FlexDiv>
          <TurnBackIcon href="#">
            <Text icon>
              <ArrowLeftOutlined
                style={{ color: COLORS.TEXT_PRIMARY, marginBottom: "10px" }}
              />
            </Text>
          </TurnBackIcon>
          <Text bold color={COLORS.TEXT_PRIMARY}>
            {t("payment:backCart")}
          </Text>
        </FlexDiv>
        <FlexDiv>
          <Text bold fontSize={20} color={COLORS.TITLE}>
            {t("payment:payment")}
          </Text>
        </FlexDiv>
        <Row gutter={[24, 24]}>
          <Col sm={24} md={14} lg={16}>
            <PaymentInfo t={t} />
            <Orders t={t} />
          </Col>
          <Col sm={24} md={10} lg={8}>
            <Button
              type="primary"
              icon={<CreditCardFilled />}
              block
              style={{ marginBottom: 10 }}
              onClick={handleplaceOrder}
            >
              {t("payment:placeOrder")}
            </Button>
            <Order payment={true} />
            <DeliveryInfo />
          </Col>
        </Row>
      </FlexDiv>
    </Container>
  );
}

export default PaymentPage;

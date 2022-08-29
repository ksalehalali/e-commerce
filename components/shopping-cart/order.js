import { useCallback, useContext, useEffect, useState } from "react";
//component
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { Input, Button, Divider, message } from "antd";
// redux
import { useSelector } from "react-redux";
// context
import { PaymentContext } from "context/payment-context";
// styles
import { COLORS } from "styles/variables";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

export function OrderLineItem({ text, value, offer, number }) {
  if (!text && !value) return null;
  return (
    <FlexDiv spaceBetween>
      <FlexDiv block>
        <Text
          color={COLORS.TEXT_PRIMARY}
          maxWidth="100%"
          fontSize={17}
          line={2}
        >
          {text}
          {number !== 1 && number > 1 && (
            <Text color="primary" bold>
              X {number}
            </Text>
          )}
        </Text>
      </FlexDiv>
      <FlexDiv
        gap={5}
        column
        width={100}
        alignFlexEnd
        cStyle={`
        
      `}
      >
        {offer && offer !== 0 && (
          <Text priceOffer bold>
            {value * number} $
          </Text>
        )}
        <Text
          price={value !== "Free" && value !== 0}
          bold={value !== "Free" && value !== 0}
          color={value === "Free" || value === 0 ? COLORS.PRIMARY : null}
        >
          {offer && offer !== 0
            ? (value - (value * offer) / 100) * number
            : value * number}{" "}
          {value !== "Free" && "$"}
          {/* {value} {value !== "Free" && value !== 0 && "$"} */}
        </Text>
      </FlexDiv>
    </FlexDiv>
  );
}

function Order({
  getLoading,
  getData,
  getError,
  payment = false,
  prevOrder = false,
  list = [],
}) {
  const { t } = useTranslation();

  const router = useRouter();

  const [total, setTotal] = useState(0);

  const { startPaytment } = useContext(PaymentContext);

  const { cartItems } = useSelector((state) => state.cart);
  // create current list
  const currentList = list && list?.length > 0 ? list : cartItems;

  const startPayment = useCallback(() => {
    startPaytment();
    router.push("/delivery-address?payment=cart");
  }, []);

  useEffect(() => {
    let sum = 0;
    let arr = [];
    if (list && list?.length > 0) arr = list;
    else arr = cartItems;
    arr?.map((item) => {
      sum +=
        item?.offer && item?.offer !== 0
          ? (item?.price - (item?.price * item?.offer) / 100) * item?.number
          : item?.price;
    });
    setTotal(sum);
  }, [cartItems]);
  return (
    <div style={{ width: "100%" }}>
      <FlexDiv
        cStyle={`border: 2px dashed ${COLORS.GRAY}; border-radius: 5px;`}
        padding={15}
        width="100%"
        column
        gap={10}
      >
        <Text bold fontSize={18} color={COLORS.TITLE}>
          {t("cart:orderSummary")}
        </Text>
        {prevOrder === true && (
          <FlexDiv
            cStyle={`box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;`}
            padding={5}
            margin={4}
          >
            <Input
              placeholder="Please enter the offer code"
              style={{ border: "1px solid #fff" }}
            />
            <Divider
              type="vertical"
              style={{ backgroundColor: `${COLORS.GRAY}`, margin: 10 }}
            />
            <Button style={{ border: "1px solid #fff" }}>
              <Text color={COLORS.PRIMARY}>{t("common:applyTxt")}</Text>
            </Button>
          </FlexDiv>
        )}
        {currentList?.map((item, i) => (
          <>
            <OrderLineItem
              key={item.id}
              text={item?.product}
              value={item?.price}
              offer={item?.offer}
              number={item?.number}
            />
            {i + 1 !== currentList?.length && (
              <Divider style={{ marginTop: 0, marginBottom: 0 }} />
            )}
          </>
        ))}
        {/* {orderLines?.map((item, i) => (
          <OrderLineItem key={i} text={item.title} value={item.price} />
        ))} */}
        <Divider
          style={{ backgroundColor: `${COLORS.BG_COLOR_GRAY}`, margin: 5 }}
        />
        <FlexDiv spaceBetween>
          <Text color={COLORS.TEXT_PRIMARY} fontSize={17}>
            {t("common:totalTxt")}
          </Text>
          <Text price bold={800}>
            {total} $
          </Text>
        </FlexDiv>

        {payment !== true && prevOrder !== true && (
          <Button
            size="large"
            onClick={startPayment}
            disabled={cartItems?.length === 0}
          >
            {t("cart:complete")}
          </Button>
        )}
      </FlexDiv>
    </div>
  );
}
export default Order;

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// components
import { Col, Row, Skeleton } from "antd";
import Container from "components/utils/container";
import Text from "components/utils/text";
import FlexDiv from "components/utils/flex-div";
// modules
import useFetch from "hooks/useFetch";
import { LottiePlayer } from "lottie-web";
// styles
import { COLORS } from "styles/variables";
import Orders from "components/payment/orders";
import Order from "components/shopping-cart/order";
import DeliveryInfo from "components/payment/delivery-info";
import useTranslation from "next-translate/useTranslation";

// Order Steps styles
const StyledOrderSteps = styled.div`
  padding: 20px 0;
`;

const StatusLineContainer = styled.div`
  height: 10px;
  width: 100%;
  background-color: ${COLORS.BG_COLOR_GRAY};
  border-radius: 1em;
`;

const Processing = styled.div`
  height: inherit;
  ${(props) => `width: calc(25% * ${props?.status + 1});`}
  border-radius: inherit;
  background: linear-gradient(to right, ${COLORS.PRIMARY}, #9198e5);
`;

const TruckContainer = styled.div`
  position: relative;
  width: 25%;
  ${(props) => `left: calc(25% * ${props?.status});`}

  height: 100px;
`;
const TruckAnimation = styled.div`
  width: 100px;
  height: 100px;
  transition: all 0.3 ease;
  position: absolute;
  left: calc(50%);
  transform: translateX(-50%);
`;

function OrderSteps({ status, t }) {
  const lottieRef = useRef(null);
  const [lottie, setLottie] = useState(null);

  useEffect(() => {
    import("lottie-web").then((lottie) => setLottie(lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && lottieRef?.current) {
      const animation = lottie.loadAnimation({
        container: lottieRef?.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/animations/65844-delivery-truck.json",
      });
      return () => animation.destroy();
    }
  }, [lottie]);
  return (
    <StyledOrderSteps>
      <FlexDiv column gap={10}>
        <TruckContainer status={status}>
          <TruckAnimation ref={lottieRef} />
        </TruckContainer>
        <StatusLineContainer>
          <Processing status={status} />
        </StatusLineContainer>
        <FlexDiv spaceAround>
          <b>{t("common:deliverStatus.pending")}</b>
          <b>{t("common:deliverStatus.process")}</b>
          <b>{t("common:deliverStatus.delivering")}</b>
          <b>{t("common:deliverStatus.success")}</b>
        </FlexDiv>
      </FlexDiv>
    </StyledOrderSteps>
  );
}

export default function OneOrderPageContent({ id }) {
  const { t } = useTranslation();

  const { data, error, loading, executeFetch } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_GET_ORDER_BY_ID,
    "post",
    { id },
    true
  );

  console.log("data");
  console.log(data);

  return (
    <div>
      <Container>
        {loading && <Skeleton />}
        {!loading && data?.status === true && (
          <div>
            <FlexDiv column>
              <Text
                color={COLORS.TEXT_PRIMARY}
                as="h1"
                bold
                fontSize={32}
                style={{ margin: 0 }}
              >
                {t("my-order:orderStatus")}
              </Text>
              <Text>
                {t("my-order:order")}{" "}
                <a>
                  <Text bold color={COLORS.PRIMARY}>
                    # {data?.description?.orderNumber}
                  </Text>
                </a>
              </Text>
            </FlexDiv>
            <OrderSteps status={data?.description?.status} t={t} />
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={24} md={14}>
                <Text title color={COLORS.TEXT_PRIMARY}>
                  {t("products:products")}
                </Text>
                <Orders list={data?.description?.listProduct} />
              </Col>
              <Col xs={24} sm={24} md={10}>
                <Text title color={COLORS.TEXT_PRIMARY}>
                  {t("payment:invoiceInfo")}
                </Text>
                <Order
                  prevOrder={false}
                  payment={true}
                  list={data?.description?.listProduct}
                />
                <DeliveryInfo
                  data={{
                    nameAddress: data?.description?.address,
                    address: "address must be here (api)",
                    phone: "phone must be here (api)",
                  }}
                />
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}

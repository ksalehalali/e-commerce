import { useContext } from "react";
//component
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { Divider, Row, Col } from "antd";
// styles
import { COLORS } from "styles/variables";
import { PaymentContext } from "context/payment-context";
import useTranslation from "next-translate/useTranslation";

function DeliveryInfo({ data }) {
    const { t } = useTranslation();
    // payment context
    const { address } = useContext(PaymentContext);

    return (
        <FlexDiv
            cStyle={`border: 2px dashed ${COLORS.GRAY}; border-radius: 5px; margin-top: 10px;`}
            padding={15}
            width="100%"
            column
            gap={20}
        >
            <Text bold fontSize={18} color={COLORS.TITLE}>
                {t("payment:deliveryTo")}
            </Text>

            <Divider
                style={{
                    backgroundColor: `${COLORS.BG_COLOR_GRAY}`,
                    margin: 0,
                }}
            />

            <Row gutter={[0, 6]}>
                <Col span={6}>
                    <Text bold color={COLORS.PRIMARY}>
                        {t("payment:addressName")}:
                    </Text>
                </Col>
                <Col span={18}>
                    <Text bold color={COLORS.TEXT_PRIMARY} fontSize={15}>
                        {data ? data?.nameAddress : address?.nameAddress}
                    </Text>
                </Col>
                <Col span={6}>
                    <Text bold color={COLORS.PRIMARY}>
                        {t("payment:address")}:
                    </Text>
                </Col>
                <Col span={18}>
                    <Text bold color={COLORS.TEXT_PRIMARY} fontSize={15}>
                        {data ? data?.address : address?.address}
                    </Text>
                </Col>
                <Col span={6}>
                    <Text bold color={COLORS.PRIMARY}>
                        {t("payment:phone")}:
                    </Text>
                </Col>
                <Col span={18}>
                    <Text bold color={COLORS.TEXT_PRIMARY} fontSize={15}>
                        {data ? data?.phone : address?.phone}
                    </Text>
                </Col>
            </Row>
        </FlexDiv>
    );
}
export default DeliveryInfo;

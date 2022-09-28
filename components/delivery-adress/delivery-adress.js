// components
import FlexDiv from "components/utils/flex-div";
import styled from "styled-components";
import Text from "components/utils/text";
import { Button, Row, Col, Tag, Breadcrumb } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MainAdress from "./address-item";
import NewAdress from "./new-adress";
import Link from "next/link";
// styles

import { COLORS } from "styles/variables";
const TurnBackIcon = styled.span`
    bottom: 10px;
`;
function DeliveryAdress() {
    console.log("test");
    return (
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
                    Shopping Cart
                </Text>
            </FlexDiv>
            <FlexDiv>
                <Text bold fontSize={20} color={COLORS.TITLE}>
                    Delivery Adress
                </Text>
            </FlexDiv>
            <FlexDiv gap={20} responsive>
                <MainAdress />
                <NewAdress />
            </FlexDiv>
            <FlexDiv end>
                <Link href="/payment">
                    <Button size="large" type="primary">
                        Continue
                    </Button>
                </Link>
            </FlexDiv>
        </FlexDiv>
    );
}
export default DeliveryAdress;

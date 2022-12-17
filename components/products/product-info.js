import styled from "styled-components";
import { Tabs } from "antd";
// components
import FlexDiv from "components/utils/flex-div";
import { COLORS } from "styles/variables";
const StyledFlexDiv = styled(FlexDiv)`
    border: 2px solid ${COLORS.BG_COLOR_GRAY};
    padding: 10px;
    @media (max-width: 578px) {
        align-items: center;
    }
`;

const { TabPane } = Tabs;
function ProductInfo({ t, desc }) {
    return (
        <StyledFlexDiv margin={0}>
            <Tabs defaultActiveKey="1" style={{ width: "100%" }}>
                <TabPane tab={t("products:overview")} key="1">
                    <FlexDiv column gap={10}>
                        <div dangerouslySetInnerHTML={{ __html: desc }} />
                    </FlexDiv>
                </TabPane>
            </Tabs>
        </StyledFlexDiv>
    );
}
export default ProductInfo;

//components
import FlexDiv from "components/utils/flex-div";
import styled from "styled-components";
import { Row, Col } from "antd";
import { FiPhoneCall } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import Text from "components/utils/text";
//variables
import { StyledLink } from "components/utils/icon-title-item";
import { COLORS, STANDARD_SCREENS } from "styles/variables";
import Container from "components/utils/container";
const Footerheader = styled.div`
  background: ${COLORS.BG_COLOR_GRAY};
  padding: 20px 30px;
`;

function FooterHeader({ t }) {
  return (
    <Footerheader>
      <Container>
        <Row gutter={24}>
          <Col span={12}>
            <FlexDiv column gap={3}>
              <Text fontSize={22} color={COLORS.TITLE} bold="600">
                {t("footer.readyTxt")}
              </Text>
              <Text fontSize={20} color={COLORS.TEXT_PRIMARY} bold="600">
                {t("footer.readyTxt2")}
              </Text>
            </FlexDiv>
          </Col>
          <Col span={4}>
            <FlexDiv justifyCenter alignCenter gap={10}>
              <Text
                icon
                fontSize={18}
                rounded
                size={32}
                color={COLORS.TEXT_PRIMARY}
              >
                <FiPhoneCall style={{ color: COLORS.TEXT_PRIMARY }} />
              </Text>
              <FlexDiv column gap={3}>
                <Text color={COLORS.TEXT_PRIMARY} bold>
                  {t("footer.callUs")}
                </Text>
                <Text color={COLORS.TITLE} fontSize={22} bold="600">
                  55454354565
                </Text>
              </FlexDiv>
            </FlexDiv>
          </Col>
          <Col span={8}>
            <FlexDiv justifyCenter alignCenter gap={10}>
              <Text
                icon
                fontSize={18}
                rounded
                size={32}
                color={COLORS.TEXT_PRIMARY}
              >
                <IoMailOutline style={{ color: COLORS.TEXT_PRIMARY }} />
              </Text>
              <FlexDiv column gap={3}>
                <Text color={COLORS.TEXT_PRIMARY} bold>
                  {t("footer.email")}
                </Text>
                <Text color={COLORS.TITLE} fontSize={22} bold="600">
                  info@company.com
                </Text>
              </FlexDiv>
            </FlexDiv>
          </Col>
        </Row>
      </Container>
    </Footerheader>
  );
}
export default FooterHeader;

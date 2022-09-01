//components
import styled from "styled-components";

import { Row, Col } from "antd";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import Container from "components/utils/container";
import { COLORS } from "styles/variables";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = styled(Container)`
  padding: 20px 0;
`;

function FooterContent({ t }) {
  return (
    <Footer>
      <FlexDiv justifyCenter alignCenter column  gap={15} >
      <Text color={COLORS.TITLE} fontSize={19} bold>
                  {t("footer.intersAddress")}
                </Text>
              
              {" "}
              <FlexDiv gap={20}>
              <Text fontSize={17} color={COLORS.TEXT_PRIMARY}>
                      {t("footer.privacy")}
                    </Text>
                    <Text fontSize={17} color={COLORS.TEXT_PRIMARY}>
                      {t("footer.userRight")}
                    </Text>
            
              <Text fontSize={17} color={COLORS.TEXT_PRIMARY}>
              {t("footer.sellWithsUs")}
                    </Text>
                    <Text fontSize={17} color={COLORS.TEXT_PRIMARY}>
                    {t("footer.terms")}
                    </Text>
            
            
                    <Text fontSize={17} color={COLORS.TEXT_PRIMARY}>
                      {t("footer.termsSale")}
                    </Text>
                  </FlexDiv>
                  <FlexDiv spaceBetween column gap={10}>
            <FlexDiv gap={10}>
              <a href="#">
                <Text icon rounded bg={COLORS.PRIMARY} color="#fff">
                  <FaFacebookF />
                </Text>
              </a>
              <a href="#">
                <Text icon rounded bg={COLORS.PRIMARY} color="#fff">
                  <FaTwitter />
                </Text>
              </a>
              <a href="#">
                <Text icon rounded bg={COLORS.PRIMARY} color="#fff">
                  <FaInstagram />
                </Text>
              </a>
              <a href="#">
                <Text icon rounded bg={COLORS.PRIMARY} color="#fff">
                  <FaLinkedinIn />
                </Text>
              </a>
            </FlexDiv>
            <Text>
              {t("footer.rights", {
                content: "© 2022-" + new Date().getFullYear(),
              })}
            </Text>
          </FlexDiv>
      {/* <Row>
        <Col span={6}>
          <Row gutter={24}>
            <Col span={24}>
              {" "}
              <FlexDiv column>
                <Text color={COLORS.TITLE} fontSize={19} bold>
                  {t("footer.intersAddress")}
                </Text>
              </FlexDiv>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <FlexDiv column>
                    <Text fontSize={17} color={COLORS.TEXT_PRIMARY}>
                      {t("footer.privacy")}
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={12}>
                  <FlexDiv column>
                    <Text fontSize={17} color={COLORS.TEXT_PRIMARY}>
                      {t("footer.userRight")}
                    </Text>
                  </FlexDiv>
                </Col>

                <Col span={12}>
                  <FlexDiv column>
                    <Text fontSize={17} color={COLORS.TEXT_PRIMARY}>
                      {t("footer.sellWithsUs")}
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={12}>
                  <FlexDiv column>
                    <Text fontSize={17} color={COLORS.TEXT_PRIMARY}>
                      {t("footer.terms")}
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={12}>
                  <FlexDiv column>
                    <Text fontSize={17} color={COLORS.TEXT_PRIMARY}>
                      {t("footer.termsSale")}
                    </Text>
                  </FlexDiv>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      <Col span={6}>
          <Row gutter={24}>
            <Col span={24}>
              {" "}
              <FlexDiv column>
                <Text color={COLORS.TITLE} fontSize={19} bold>
                  Best Brands
                </Text>
              </FlexDiv>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={8}>
                  <FlexDiv column>
                    <Text fontSize={16} color={COLORS.TEXT_PRIMARY}>
                      {" "}
                      MotheCare{" "}
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={8}>
                  <FlexDiv column>
                    <Text fontSize={16} color={COLORS.TEXT_PRIMARY}>
                      {" "}
                      Apple{" "}
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={8}>
                  <FlexDiv column>
                    <Text fontSize={16} color={COLORS.TEXT_PRIMARY}>
                      {" "}
                      NIKE{" "}
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={8}>
                  <FlexDiv column>
                    <Text fontSize={16} color={COLORS.TEXT_PRIMARY}>
                      {" "}
                      SAMSUNG
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={8}>
                  <FlexDiv column>
                    <Text fontSize={16} color={COLORS.TEXT_PRIMARY}>
                      {" "}
                      TEFFAL
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={8}>
                  <FlexDiv column>
                    <Text fontSize={16} color={COLORS.TEXT_PRIMARY}>
                      {" "}
                      LORYAL
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={8}>
                  <FlexDiv column>
                    <Text fontSize={16} color={COLORS.TEXT_PRIMARY}>
                      {" "}
                      ADIDAS
                    </Text>
                  </FlexDiv>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <FlexDiv column gap={10}>
                <Text color={COLORS.TITLE} fontSize={19} bold>
                  Categories
                </Text>
              </FlexDiv>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={8}>
                  <FlexDiv column>
                    <Text fontSize={16} color={COLORS.TEXT_PRIMARY}>
                      Women Clothes
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={8}>
                  <FlexDiv column>
                    <Text fontSize={16} color={COLORS.TEXT_PRIMARY}>
                      {" "}
                      Men Clothes
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={8}>
                  <FlexDiv column>
                    <Text fontSize={16} color={COLORS.TEXT_PRIMARY}>
                      Children Clothes{" "}
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={8}>
                  <FlexDiv column>
                    <Text fontSize={16} color={COLORS.TEXT_PRIMARY}>
                      Electronic{" "}
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={8}>
                  <FlexDiv column>
                    <Text fontSize={16} color={COLORS.TEXT_PRIMARY}>
                      Computers{" "}
                    </Text>
                  </FlexDiv>
                </Col>
                <Col span={8}>
                  <FlexDiv column>
                    <Text fontSize={16} color={COLORS.TEXT_PRIMARY}>
                      {" "}
                      New Mobiles
                    </Text>
                  </FlexDiv>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col> 
        <Col span={24}>
          {" "}
          <FlexDiv spaceBetween>
            <FlexDiv gap={10}>
              <a href="#">
                <Text icon rounded bg={COLORS.PRIMARY} color="#fff">
                  <FaFacebookF />
                </Text>
              </a>
              <a href="#">
                <Text icon rounded bg={COLORS.PRIMARY} color="#fff">
                  <FaTwitter />
                </Text>
              </a>
              <a href="#">
                <Text icon rounded bg={COLORS.PRIMARY} color="#fff">
                  <FaInstagram />
                </Text>
              </a>
              <a href="#">
                <Text icon rounded bg={COLORS.PRIMARY} color="#fff">
                  <FaLinkedinIn />
                </Text>
              </a>
            </FlexDiv>
            <Text>
              {t("footer.rights", {
                content: "© 2022-" + new Date().getFullYear(),
              })}
            </Text>
          </FlexDiv>
        </Col>
      </Row> */}
      </FlexDiv>
    </Footer>
  );
}
export default FooterContent;

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
//components
import FlexDiv from "components/utils/flex-div";
import Container from "components/utils/container";
import Text from "components/utils/text";
// svg
import svgFile from "public/access_denied.svg";
import useTranslation from "next-translate/useTranslation";

// styles
const ImageContainer = styled.div`
  width: 80%;
  height: auto;
`;

function AccessDenied() {
  const { t } = useTranslation("common");
  return (
    <Container>
      <FlexDiv width="100%" column alignCenter gap={20}>
        <ImageContainer>
          <Image
            layout="responsive"
            alt="401 authentication"
            src={"/access_denied.svg"}
            width={"100%"}
            height={20}
          />
        </ImageContainer>
        <FlexDiv column alignCenter>
          <Text as="h1" color="primary" bold fontSize={24}>
            {t("accessDenied")}
          </Text>
          <Text as="p">{t("plsLogin")}</Text>
        </FlexDiv>
      </FlexDiv>
    </Container>
  );
}

export default AccessDenied;

import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
// components
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { StarFilled, HeartFilled } from "@ant-design/icons";
import { Tag } from "antd";
// styles
import { COLORS } from "styles/variables";
import ImageContainer from "components/utils/image-container";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const StyledTag = styled(Tag)`
  border-radius: 10px;
  margin: 0;
  font-size: 0.8em;
`;

const FavoriteIcon = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  opacity: 0;
  transition: opacity ease 0.3s;
  cursor: pointer;
`;

const StyledProdcutItem = styled(FlexDiv)`
  position: relative;
  border: 1px solid ${COLORS.BG_COLOR_GRAY};
  ${(props) => props.lang === "ar" && "direction: rtl;"}

  &:hover > ${FavoriteIcon} {
    opacity: 1;
  }
  @media (max-width: 1441px) {
    width: 220px;
  }
  @media (max-width: 1000px) {
    width: 200px;
  }
`;

const ProductImage = styled(Image)`
  @media (max-width: 1000px) {
    height: 80px;
  }
`;

function ProdcutItem({ src, alt, title, offer, price, modelID, model, id }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <Link href={`/product/${id}`}>
      <a>
        <StyledProdcutItem
          column
          padding={10}
          margin={5}
          width={240}
          gap={5}
          lang={router.locale}
        >
          <FavoriteIcon href="#">
            <Text icon rounded>
              <HeartFilled style={{ color: COLORS.GRAY }} />
            </Text>
          </FavoriteIcon>
          <ImageContainer>
            <ProductImage
              src={src}
              alt={alt}
              layout="responsive"
              width="100%"
              height={100}
            />
          </ImageContainer>
          <FlexDiv spaceBetween>
            <Text color="#000">SENSE</Text>
            <StyledTag color="#FFCE0A">
              4.2 <StarFilled style={{ color: "#fff" }} />
            </StyledTag>
          </FlexDiv>
          <FlexDiv column>
            <Text bold line={1} color="#000">
              {title}
            </Text>
            <Text bold color="#000">
              50ml
            </Text>
          </FlexDiv>
          {!offer ||
            (offer === 0 && (
              <Text bold price color={COLORS.TEXT_PRIMARY}>
                {price} $
              </Text>
            ))}
          {offer && offer !== 0 && (
            <>
              <Text bold price color={COLORS.TEXT_PRIMARY}>
                {price - (price * offer) / 100} $
              </Text>

              <FlexDiv gap={10}>
                <Text bold priceOffer price>
                  {price} $
                </Text>
                <Text bold="600" price color={COLORS.GREEN}>
                  {t("offerTxt")} {offer}%
                </Text>
              </FlexDiv>
            </>
          )}
        </StyledProdcutItem>
      </a>
    </Link>
  );
}

export default ProdcutItem;

import ProductSlide from "components/sliders/product-slide";
import Text from "components/utils/text";
import styled from "styled-components";
import { COLORS } from "styles/variables";

const ProductSection = styled.div`
  padding: 10px 0;
  position: relative;
`;

const ProductSectionHeader = styled.div`
  padding: 10px 0;
  margin-bottom: 10px;
  display: flex;
  border-bottom: 1px solid ${COLORS.GRAY};
`;

function ProductSectionPart({ title, list }) {
  return (
    <ProductSection>
      <ProductSectionHeader>
        <Text as={"h1"} title={"true"}>
          {title ? title : "Title Required !"}
        </Text>
      </ProductSectionHeader>
      <ProductSlide list={list} />
    </ProductSection>
  );
}

export default ProductSectionPart;

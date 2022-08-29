//component
import FlexDiv from "components/utils/flex-div";
import Container from "components/utils/container";
import ProductView from "components/products/product-view";
import AdsSlide from "components/sliders/ads-slide";
import ProductSlide from "components/sliders/product-slide";
import ProductInfo from "components/products/product-info";

import { Row, Col } from "antd";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

function ProductDetailContent({ id, data }) {
  const { t } = useTranslation();
  const router = useRouter();
  console.log("data");
  console.log(data);

  return (
    <Container>
      <FlexDiv column padding={10} gap={20}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <ProductView t={t} id={id} data={data} router={router} />
          </Col>
          {/* <Col span={6}>
            <AdsSlide />
          </Col> */}
        </Row>
        <ProductInfo
          t={t}
          desc={data[`desc_${router.locale.toLocaleUpperCase()}`]}
        />
        <ProductSlide />
      </FlexDiv>
    </Container>
  );
}

export default ProductDetailContent;

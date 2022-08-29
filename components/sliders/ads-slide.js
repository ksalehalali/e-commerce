import Slider from "react-slick";
import styled from "styled-components";
import FlexDiv from "components/utils/flex-div";

//static
import Image from "next/image";
import { NextArrow, PrevArrow } from "components/utils/slide-arrows";

import ads from "public/images/ads.jpg";
function AdsSlide() {
  return (
    <FlexDiv column gap={20}>
      <Image src={ads} width="400px" height="120px" />
      <Image src={ads} width="400px" height="120px" />
      <Image src={ads} width="400px" height="120px" />
    </FlexDiv>
  );
}
export default AdsSlide;

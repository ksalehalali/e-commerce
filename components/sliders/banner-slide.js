import Image from "next/image";

import Slider from "react-slick";
//static
import { NextArrow, PrevArrow } from "components/utils/slide-arrows";

function BannerSlide() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings}>
      <Image
        layout="responsive"
        width="100%"
        height={40}
        src={"/banner.jpeg"}
        alt="Image 1"
      />
      <Image
        layout="responsive"
        width="100%"
        height={40}
        src={"/banner.jpeg"}
        alt="Image 2"
      />
      <Image
        layout="responsive"
        width="100%"
        height={40}
        src={"/banner.jpeg"}
        alt="Image 3"
      />
      <Image
        layout="responsive"
        width="100%"
        height={40}
        src={"/banner.jpeg"}
        alt="Image 4"
      />
      <Image
        layout="responsive"
        width="100%"
        height={40}
        src={"/banner.jpeg"}
        alt="Image 5"
      />
      <Image
        layout="responsive"
        width="100%"
        height={40}
        src={"/banner.jpeg"}
        alt="Image 6"
      />
    </Slider>
  );
}
export default BannerSlide;

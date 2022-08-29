//components
import Slider from "react-slick";
import ProdcutItem from "components/products/product-item";
import { NextArrow, PrevArrow } from "components/utils/slide-arrows";

import styled from "styled-components";

const StyledSlider = styled(Slider)`
  .slick-slide {
    display: flex;
    justify-content: center;
  }
`;

function ProductSlide({ list }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: list?.length < 6 ? list?.length : 6,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: "10px",
    nextArrow: <NextArrow type="product" />,
    prevArrow: <PrevArrow type="product" />,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: list?.length < 5 ? list?.length : 5,
        },
      },
      {
        breakpoint: 1218,
        settings: {
          slidesToShow: list?.length < 4 ? list?.length : 4,
        },
      },
      {
        breakpoint: 885,
        settings: {
          slidesToShow: list?.length < 3 ? list?.length : 3,
        },
      },
      {
        breakpoint: 605,
        settings: {
          slidesToShow: list?.length < 2 ? list?.length : 2,
        },
      },
    ],
  };

  return (
    <>
      {list?.length > 0 && (
        <>
          <StyledSlider {...settings}>
            {list.map((item) => (
              <ProdcutItem
                src={process.env.NEXT_PUBLIC_HOST_API + item.image}
                alt={`${item?.modelName} ${item?.name_EN}`}
                key={item.id}
                title={item?.name_EN?.trim()}
                offer={item?.offer}
                price={item?.price}
                modelID={item?.modelID}
                model={item?.modelName}
                id={item?.id}
              />
            ))}
          </StyledSlider>
        </>
      )}
    </>
  );
}
export default ProductSlide;

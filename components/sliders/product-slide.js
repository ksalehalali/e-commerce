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
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        centerPadding: "10px",
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1270,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <>
            {list?.length > 0 && (
                <>
                    <Slider {...settings}>
                        {list.map((item) => (
                            <ProdcutItem
                                src={
                                    process.env.NEXT_PUBLIC_HOST_API +
                                    item.image
                                }
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
                    </Slider>
                </>
            )}
        </>
    );
}
export default ProductSlide;

import Image from "next/image";

import Slider from "react-slick";
//static
import { NextArrow, PrevArrow } from "components/utils/slide-arrows";
import { useEffect, useState } from "react";
import axios from "axios";

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
    const [bannerPath, setBannetPath] = useState();

    useEffect(async () => {
        await axios
            .get(process.env.NEXT_PUBLIC_HOST_API + "api/ListBanner1", {})
            .then((response) => {
                if (response.data.description.length > 0) {
                    setBannetPath(response.data.description[0].banner);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <Slider {...settings}>
            <Image
                layout="responsive"
                width="100%"
                height={30}
                src={"/banner.jpeg"}
                alt="Image 1"
            />
            <Image
                layout="responsive"
                width="100%"
                height={30}
                src={"/banner.jpeg"}
                alt="Image 2"
            />
            <Image
                layout="responsive"
                width="100%"
                height={30}
                src={"/banner.jpeg"}
                alt="Image 3"
            />
            <Image
                layout="responsive"
                width="100%"
                height={30}
                src={`https://dashcommerce.click68.com/${bannerPath}`}
                alt="Image 4"
            />
            <Image
                layout="responsive"
                width="100%"
                height={30}
                src={"/banner.jpeg"}
                alt="Image 5"
            />
            <Image
                layout="responsive"
                width="100%"
                height={30}
                src={"/banner.jpeg"}
                alt="Image 6"
            />
        </Slider>
    );
}
export default BannerSlide;

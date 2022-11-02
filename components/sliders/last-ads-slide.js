import Image from "next/image";
import adsImg from "/public/images/shutterstock_456779230.jpg";

import Slider from "react-slick";
//static
import { NextArrow, PrevArrow } from "components/utils/slide-arrows";
import { useEffect, useState } from "react";
import axios from "axios";

function LastAdsSlide() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    const [bannerPath, setBannetPath] = useState();

    useEffect(async () => {
        await axios
            .get(process.env.NEXT_PUBLIC_HOST_API + "api/ListBanner3", {})
            .then((response) => {
                if (response.data.description.length > 0) {
                    setBannetPath(response.data.description);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <Slider {...settings}>
            <Image
                layout="responsive"
                width="100%"
                height={20}
                src={adsImg}
                alt="Image 1"
            />
            <Image
                layout="responsive"
                width="100%"
                height={20}
                src={adsImg}
                alt="Image 2"
            />
            <Image
                layout="responsive"
                width="100%"
                height={20}
                src={adsImg}
                alt="Image 3"
            />
            <Image
                layout="responsive"
                width="100%"
                height={20}
                src={adsImg}
                alt="Image 4"
            />
            <Image
                layout="responsive"
                width="100%"
                height={20}
                src={adsImg}
                alt="Image 5"
            />
            <Image
                layout="responsive"
                width="100%"
                height={20}
                src={adsImg}
                alt="Image 6"
            />
        </Slider>
    );
}
export default LastAdsSlide;

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
    const [bannerPath, setBannetPath] = useState([]);

    useEffect(async () => {
        await axios
            .get(process.env.NEXT_PUBLIC_HOST_API + "api/ListBanner1", {})
            .then((response) => {
                if (response.data.description.length > 0) {
                    console.log("bann", response.data.description);
                    setBannetPath(response.data.description);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <Slider {...settings}>
                {" "}
                {bannerPath?.map((ban, index) => {
                    return (
                        <Image
                            layout="responsive"
                            width="100%"
                            height={30}
                            src={`https://dashcommerce.click68.com/${ban.banner}`}
                            alt="Image 1"
                            key={index}
                        />
                    );
                })}
            </Slider>
        </>
    );
}
export default BannerSlide;

import Image from "next/image";
// components
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "components/utils/slide-arrows";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
// styled components
import styled from "styled-components";
import babyshoes from "public/images/babyshoes.jpg";
import jeans from "public/images/jeans.jpg";
import shoes from "public/images/shoes.jpg";
import womenshoes from "public/images/womenshoes.jpg";
import kids from "public/images/kids.jpg";
import gifts from "public/images/gifts.jpg";
import toys from "public/images/toys.jpg";
import girls from "public/images/girls.jpg";
import beauty from "public/images/beauty.jpeg";
import menstuff from "public/images/menstuff.jpeg";
import mobils from "public/images/mobils.jpeg";
import bages from "public/images/bages.jpeg";
import home from "public/images/home.jpeg";
import brands from "public/images/brands.jpeg";
import Link from "next/link";
import { useRouter } from "next/router";
const data = [
    {
        id: "4774bfdb-5dca-47e7-a43b-0a8acb659305",
        src: brands,
        title: "Brands",
        title_ar: "ماركات  ",
    },

    {
        id: "d115a1f7-2407-4446-9caa-dc9744e5bfa8",
        src: gifts,
        title: "Accessories & gifts",
        title_ar: "اكسسوارات وهدايا",
    },
    {
        id: "f6222596-f422-4891-9a55-664e5e3017aa",
        src: jeans,
        title: "Men's Fashion",
        title_ar: "ازياء رجالية",
    },
    {
        id: "818ce955-2ce3-4486-ba6e-45784c5cce99",
        src: toys,
        title: "Baby & Toys",
        title_ar: "اطفال العاب",
    },
    {
        id: "31afd7d2-5f4d-406d-ae5d-b46e5055b80c",
        src: girls,
        title: "Women's Fashion",
        title_ar: " ازياء نسائية",
    },
    {
        id: "33739903-d8c5-4604-9f27-4e52273110e8",
        src: babyshoes,
        title: "Kids shoes",
        title_ar: " أحذية أطفال",
    },
    {
        id: "7ff2c840-1f34-4f76-9fe9-07c123265c1e",
        src: shoes,
        title: "Men's shoes",
        title_ar: " أحذية رجالية",
    },
    {
        id: "3ca11af3-e200-4898-8eb9-30f1bf3b8347",
        src: womenshoes,
        title: "Women's shoes",
        title_ar: " أحذية نسائية",
    },
    {
        id: "7309f628-b98b-49cf-a67f-f01403baa31a",
        src: beauty,
        title: "beauty & supplies",
        title_ar: " مستحضرات تجميل",
    },
    {
        id: "bdd1e12a-ffa7-4b9c-93a5-b4180fb33675",
        src: menstuff,
        title: "Men's stuff",
        title_ar: " مستلزمات رجالية",
    },
    {
        id: "e38f580e-b705-4055-ba59-6bc5714d7616",
        src: mobils,
        title: "Mobiles & Accessories",
        title_ar: " هواتف نقالة واكسسوارات",
    },
    {
        id: "60fc2a32-8489-4981-872e-9d53f611647b",
        src: bages,
        title: "Watches & Bags",
        title_ar: " حقائب ساعات",
    },
    {
        id: "d2a67fba-9070-4687-ae75-fb74f25e7924",
        src: home,
        title: "Home & Kitchen",
        title_ar: " منزل مطبخ",
    },
];

const StyledImage = styled(Image)`
    border-radius: 50%;
    width: 100%;
    height: 100%;
`;

const ImgContainer = styled.div`
    width: 95px;
    height: 95px;

    span {
        width: 100% !important;
        height: 100% !important;
    }
`;

const TextContainer = styled.div`
    max-width: 98%;
    font
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    font-size: inherit;
`;

const Cont = styled.a`
    max-width: 120px;
    width: 120px !important;
    display: block;
`;

function CategorySlideItem({ src, alt, title, title_ar, id, locale }) {
    const titleWords = title.split(" ");
    const arTitleWords = title_ar.split(" ");
    // const titleWords_ar = title.split(" ");
    return (
        <Link href={`/categories/${id}`}>
            <Cont>
                <FlexDiv column style={{ marginRight: 20 }} alignCenter>
                    <ImgContainer>
                        <StyledImage
                            src={src}
                            alt={alt}
                            width={80}
                            height={80}
                        />
                    </ImgContainer>
                    {locale === "ar"
                        ? title_ar && (
                              <Text align="center" fontSize={16} line={2} bold>
                                  <TextContainer>{title_ar}</TextContainer>
                              </Text>
                          )
                        : title && (
                              <Text align="center" fontSize={16} line={2} bold>
                                  {titleWords[0]} {titleWords[1]}
                                  <br />
                                  {titleWords[2]}
                              </Text>
                          )}
                </FlexDiv>
            </Cont>
        </Link>
    );
}

function CategorySlide({ router }) {
    const locale = router.locale;
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: data.length < 10 ? data.length : 10,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: data.length < 9 ? data.length : 9,
                    variableWidth: true,
                },
            },
            {
                breakpoint: 1218,
                settings: {
                    slidesToShow: data.length < 8 ? data.length : 8,
                    variableWidth: true,
                },
            },
            {
                breakpoint: 885,
                settings: {
                    slidesToShow: data.length < 7 ? data.length : 7,
                    variableWidth: true,
                },
            },
            {
                breakpoint: 605,
                settings: {
                    slidesToShow: data.length < 4 ? data.length : 4,
                    variableWidth: true,
                },
            },
        ],
    };

    return (
        <>
            {data?.length > 0 && (
                <>
                    <Slider {...settings}>
                        {data.map((item) => (
                            <CategorySlideItem
                                src={item.src}
                                alt={item.alt}
                                title={item.title}
                                title_ar={item.title_ar}
                                id={item.id}
                                key={item.id}
                                locale={locale}
                            />
                        ))}
                    </Slider>
                </>
            )}
        </>
    );
}

export default CategorySlide;

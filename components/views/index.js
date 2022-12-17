import BannerSlide from "components/sliders/banner-slide";
import CategorySlide from "components/sliders/category-slides";
import ProductSectionPart from "components/products";
import Container from "components/utils/container";
import LastAdsSlide from "../sliders/last-ads-slide";
// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import AdsArea from "components/ads-area";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import useFetch from "hooks/useFetch";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function HomePage({ list }) {
    const { t } = useTranslation("common");
    const router = useRouter();

    const {
        data: offerProductsData,
        loading: OfferL,
        error: OfferEr,
        executeFetch: OfferExecute,
    } = useFetch(
        `${process.env.NEXT_PUBLIC_HOST_API}api/ListProductOffer`,
        "post",
        {},
        false
    );

    const {
        data: lastOrderData,
        loading: lastOrderL,
        error: lastOrderEr,
        executeFetch: lastOrderExecute,
    } = useFetch(
        `${process.env.NEXT_PUBLIC_HOST_API}api/ListProductByLastOrder`,
        "post",
        {},
        false
    );

    const {
        data: byFavoriteData,
        loading,
        error,
        executeFetch,
    } = useFetch(
        `${process.env.NEXT_PUBLIC_HOST_API}api/ListProductByFavorite`,
        "post",
        {},
        false
    );

    useEffect(() => {
        executeFetch({
            PageSize: 20,
            PageNumber: 1,
        });
        OfferExecute({
            PageSize: 20,
            PageNumber: 1,
        });
        lastOrderExecute({
            PageSize: 20,
            PageNumber: 1,
        });
    }, []);

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 54,
                color: "black",
            }}
            spin
        />
    );
    return (
        <>
            {lastOrderL && (
                <div className="home-page-layout">
                    <Spin indicator={antIcon} />
                </div>
            )}
            <Container>
                <BannerSlide />
                <CategorySlide router={router} />
                <ProductSectionPart
                    list={lastOrderData?.description}
                    title={t("latestTxt", {
                        name: t("commonWords.products"),
                    })}
                />

                <ProductSectionPart
                    list={byFavoriteData?.description}
                    title={t("suggestedTxt", {
                        name: t("commonWords.products"),
                    })}
                />
            </Container>
            <Container>
                <AdsArea />
            </Container>

            {/* <Temporary /> */}
            <Container>
                <ProductSectionPart
                    list={offerProductsData?.description}
                    title={t("offersTxt")}
                />
            </Container>

            {/* Adds Slider */}
            <Container>
                <LastAdsSlide />
            </Container>
        </>
    );
}

export default HomePage;

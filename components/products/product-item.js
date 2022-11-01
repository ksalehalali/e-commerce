import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
// components
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { StarFilled, HeartFilled } from "@ant-design/icons";
import { Tag } from "antd";
// styles
import { COLORS } from "styles/variables";
import ImageContainer from "components/utils/image-container";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "redux/modal/action";

const StyledTag = styled(Tag)`
    border-radius: 10px;
    margin: 0;
    font-size: 0.8em;
`;

export const FavoriteIcon = styled.span`
    position: absolute;
    width: 30px;
    height: 30px;
    top: 20px;
    left: 20px;
    z-index: 1000;
    opacity: 1;
    transition: opacity ease 0.3s;
    cursor: pointer;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #ff3939b5;
    }
    &:hover span {
        transform: scale(1.5);
        color: #fff !important;
    }
    span {
        transition: all ease 0.3s;
        background-color: transparent !important;
        transform: scale(1.2);
    }
`;

const StyledProdcutItem = styled(FlexDiv)`
    position: relative;
    border: 1px solid ${COLORS.BG_COLOR_GRAY};
    ${(props) => props.lang === "ar" && "direction: rtl;"}
    border-right: none;
    padding: 8px;
    &:hover > ${FavoriteIcon} {
    }
    @media (max-width: 1441px) {
        width: 220px;
    }
    @media (max-width: 1000px) {
        width: 200px;
    }
`;

const ProductImage = styled(Image)`
    @media (max-width: 1000px) {
        height: 80px;
    }
`;

function ProdcutItem({ src, alt, title, offer, price, modelID, model, id }) {
    const { t } = useTranslation("common");
    const router = useRouter();
    const dispatch = useDispatch();
    const { favoriteProducts } = useSelector((state) => state.modal); // I import favorite products from inital state in reducer

    const { data, status } = useSession();
    const locale = router.locale;

    // Handle like click
    const handleLike = async (e) => {
        const likedItem = e.target;

        likedItem.classList.toggle("liked");
        const userToken = data.user.token;
        const productId = id;

        dispatch(addProduct(productId));
        const uniqeItems = favoriteProducts.filter((item, index) => {
            return favoriteProducts.indexOf(item) == index;
        });

        try {
            const { data } = await axios.post(
                `https://dashcommerce.click68.com/api/AddFavourite`,
                {
                    ProdID: productId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        lang: locale,
                    },
                }
            );
        } catch (e) {
            console.error("ERRORRRRR ____23");
            console.error(e.toString());
        }
    };

    return (
        <StyledProdcutItem
            column
            padding={10}
            margin={5}
            width={240}
            gap={5}
            lang={router.locale}
        >
            <FavoriteIcon href="#" lang={router.locale}>
                <HeartFilled
                    onClick={(e) => handleLike(e)}
                    style={{ color: COLORS.GRAY }}
                />
            </FavoriteIcon>
            <Link href={`/product/${id}`}>
                <a>
                    <ImageContainer>
                        <ProductImage
                            src={src}
                            alt={alt}
                            layout="responsive"
                            width="100%"
                            height={100}
                        />
                    </ImageContainer>
                </a>
            </Link>
            <FlexDiv spaceBetween>
                <Text color="#000">SENSE</Text>
                <StyledTag color="#FFCE0A">
                    4.2 <StarFilled style={{ color: "#fff" }} />
                </StyledTag>
            </FlexDiv>
            <FlexDiv column>
                <Text bold line={1} color="#000">
                    {title}
                </Text>
                <Text bold color="#000">
                    50ml
                </Text>
            </FlexDiv>
            {!offer ||
                (offer === 0 && (
                    <Text bold price color={COLORS.TEXT_PRIMARY}>
                        {price} $
                    </Text>
                ))}
            {offer && offer !== 0 && (
                <>
                    <Text bold price color={COLORS.TEXT_PRIMARY}>
                        {price - (price * offer) / 100} $
                    </Text>

                    <FlexDiv gap={10}>
                        <Text bold priceOffer price>
                            {price} $
                        </Text>
                        <Text bold="600" price color={COLORS.GREEN}>
                            {t("offerTxt")} {offer}%
                        </Text>
                    </FlexDiv>
                </>
            )}
        </StyledProdcutItem>
    );
}

export default ProdcutItem;

import Image from "next/image";
import { useCallback, useState, useEffect, memo, useRef } from "react";
import styled from "styled-components";
// components
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { ShoppingCartOutlined, StopOutlined } from "@ant-design/icons";
import { GrDeliver } from "react-icons/gr";
import { Button, Tag, Breadcrumb, message, Alert } from "antd";
import ProductItemSum from "./product-item-sum";
import { StarFilled, HeartFilled } from "@ant-design/icons";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
    addItemToShoopingCart,
    setGettedShoopingCart,
    loadingShoopingCart,
} from "redux/cart/action";
// hooks
import useFetch from "hooks/useFetch";
// styles
import { COLORS } from "styles/variables";
import { checkCookies } from "cookies-next";
import { useSession } from "next-auth/react";
import { FavoriteIcon } from "./product-item";
import { addProduct } from "redux/modal/action";
import { useRouter } from "next/router";
import axios from "axios";
const StyledTag = styled(FlexDiv)`
    border-radius: 5px;
    font-size: 0.9em;
    width: 80px;
    height: 30px;
    color: ${COLORS.TITLE};
    border: 2px solid ${COLORS.GRAY};
    padding: 0 5px;
`;

const StyledDateSquare = styled.span`
    border: 1px solid ${COLORS.GRAY};
    padding: 3px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    width: 300px;
    @media (max-width: 632px) {
        width: 200px;
        padding: 2px;
        font-size: 0.9em;
    }
`;

const SlideImage = styled(Image)`
    border: 1px solid transparent !important;
    ${(props) => {
        if (props.active === true)
            return `border-color:${COLORS.PRIMARY} !important;`;
    }}
`;

function ProductView({ data, id, t, router }) {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const { data: cookies, status } = useSession();
    const locale = router.locale;

    const isThereChanges = useRef();

    const [activeImage, setActiveImage] = useState(data?.primaryImage);
    const [activeImagesList, setActiveImagesList] = useState(data?.image[0]);
    const [color, setColor] = useState(data?.size[0]?.color[0]?.colorID);
    const [colorList, setColorList] = useState(data?.size[0]?.color);
    const [size, setSize] = useState(data?.size[0]?.sizeID);
    const [number, setNumber] = useState(1);
    const [isInCart, setIsInCart] = useState(false);

    // add item use fetch
    const {
        data: addData,
        error: addError,
        loading: addLoading,
        executeFetch: addItemToCart,
    } = useFetch(
        process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_ADD_CART,
        "post",
        {
            Number: number,
            ProdID: id,
            ColorID: color,
            SizeID: size,
        },
        false
    );

    const changeActiveImageHandler = useCallback((e, image) => {
        e.preventDefault();
        setActiveImage(image);
    }, []);
    const changeProductSize = useCallback((e, size) => {
        e.preventDefault();
        setSize(size);
        let newColorsList = data?.size?.find((i) => i.sizeID === size);
        setColorList(newColorsList?.color);
    }, []);
    const changeProductColor = useCallback((e, color) => {
        e.preventDefault();
        // set size
        setColor(color);
        // get choosed color images from list which incomed from backend
        const newList = data?.image?.find((list) => list.colorID === color);
        setActiveImage(newList?.image1);
        setActiveImagesList(newList);
    }, []);

    const handleAddItemToCard = useCallback(() => {
        if (data?.size?.length === 0) {
            message.warning(t("common:messages.noItemStock"));
            return;
        }
        if (!cookies?.user) {
            message.warning(t("common:messages.loginRequiredAction"));
            return;
        }
        if (isInCart === false) {
            addItemToCart({
                Number: number,
                ProdID: id,
                ColorID: color,
                SizeID: size,
            });
            // dispatch(addItemToShoopingCart());
        } else {
            alert("Remove From Cart");
        }
    }, [size, color, number, isInCart, cookies]);

    useEffect(() => {
        if (addData?.status === true && addLoading === false) {
            // add to cart
            message.success(t("common:messages.cartAdd200"));
            dispatch(setGettedShoopingCart(addData?.description));
        } else if (addError) {
            alert("Something went wrong !");
        }
    }, [addData, addLoading, addError]);

    useEffect(() => {
        let isIn = false;

        for (let i = 0; i < cartItems?.length; i++) {
            if (cartItems[i]?.prodID === id) {
                isIn = true;
                break;
            }
        }

        setIsInCart(isIn);
    }, [cartItems]);

    // to check first color in color list
    useEffect(() => {
        if (colorList?.length > 0) {
            setColor(colorList[0]?.colorID);
            // get choosed color images from list which incomed from backend
            const newList = data?.image?.find(
                (list) => list.colorID === colorList[0]?.colorID
            );
            setActiveImage(newList?.image1);
            setActiveImagesList(newList);
        }
    }, [colorList]);

    // Handle like click
    const handleLike = async (e) => {
        const likedItem = e.target;

        likedItem.classList.toggle("liked");
        const userToken = cookies?.user.token;
        const productId = id;

        dispatch(addProduct(productId));

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
            console.log(data);
        } catch (e) {
            console.error("ERRORRRRR ____24");
            console.error(e.toString());
        }
    };

    console.log("router.locale");
    console.log(router.locale);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const d = new Date();
    let month = months[d.getMonth()];

    const TextContainer = styled.div`
        display: flex;
        align-items: center;
    `;
    const LikeContainer = styled.div`
        position: relative;
        width: 100%;
    `;
    return (
        <FlexDiv column>
            <FlexDiv padding={10}>
                <Text>
                    {" "}
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>{data?.categoryName}</Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            {data[`name_${router.locale.toLocaleUpperCase()}`]}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Text>
            </FlexDiv>
            <FlexDiv gap={10} padding={10}>
                <FlexDiv column gap={10} justifyCenter>
                    {activeImagesList?.image1 && (
                        <a
                            href="#"
                            onClick={(e) =>
                                changeActiveImageHandler(
                                    e,
                                    activeImagesList?.image1
                                )
                            }
                        >
                            <SlideImage
                                src={
                                    process.env.NEXT_PUBLIC_HOST_API +
                                    activeImagesList?.image1
                                }
                                alt={`${
                                    data[
                                        `name_${router.locale.toLocaleUpperCase()}`
                                    ]
                                } ${activeImagesList?.color}`}
                                width={80}
                                height={80}
                                active={
                                    activeImage === activeImagesList?.image1
                                }
                            />
                        </a>
                    )}
                    {activeImagesList?.image2 && (
                        <a
                            href="#"
                            onClick={(e) =>
                                changeActiveImageHandler(
                                    e,
                                    activeImagesList?.image2
                                )
                            }
                        >
                            <SlideImage
                                src={
                                    process.env.NEXT_PUBLIC_HOST_API +
                                    activeImagesList?.image2
                                }
                                alt={`${
                                    data[
                                        `name_${router.locale.toLocaleUpperCase()}`
                                    ]
                                } ${activeImagesList?.color}`}
                                width={80}
                                height={80}
                                active={
                                    activeImage === activeImagesList?.image2
                                }
                            />
                        </a>
                    )}
                    {activeImagesList?.image3 && (
                        <a
                            href="#"
                            onClick={(e) =>
                                changeActiveImageHandler(
                                    e,
                                    activeImagesList?.image3
                                )
                            }
                        >
                            <SlideImage
                                src={
                                    process.env.NEXT_PUBLIC_HOST_API +
                                    activeImagesList?.image3
                                }
                                alt={`${
                                    data[
                                        `name_${router.locale.toLocaleUpperCase()}`
                                    ]
                                } ${activeImagesList?.color}`}
                                width={80}
                                height={80}
                                active={
                                    activeImage === activeImagesList?.image3
                                }
                            />
                        </a>
                    )}
                    {activeImagesList?.image4 && (
                        <a
                            href="#"
                            onClick={(e) =>
                                changeActiveImageHandler(
                                    e,
                                    activeImagesList?.image4
                                )
                            }
                        >
                            <SlideImage
                                src={
                                    process.env.NEXT_PUBLIC_HOST_API +
                                    activeImagesList?.image4
                                }
                                alt={`${
                                    data[
                                        `name_${router.locale.toLocaleUpperCase()}`
                                    ]
                                } ${activeImagesList?.color}`}
                                width={80}
                                height={80}
                                active={
                                    activeImage === activeImagesList?.image4
                                }
                            />
                        </a>
                    )}
                </FlexDiv>
                {/* this is main product img */}
                <FlexDiv style={{ position: "relative" }}>
                    <FavoriteIcon href="#" lang={locale}>
                        <HeartFilled
                            onClick={handleLike}
                            style={{ color: COLORS.GRAY }}
                        />
                    </FavoriteIcon>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_HOST_API}${
                            activeImage ? activeImage : data?.primaryImage
                        }`}
                        alt={`${
                            data[`name_${router.locale.toLocaleUpperCase()}`]
                        }`}
                        objectFit="contain"
                        width={400}
                        height={100}
                    />
                </FlexDiv>
                <FlexDiv gap={90} spaceBetween>
                    <FlexDiv column gap={5} padding={4}>
                        <Text bold color={COLORS.TITLE} as="h1" margin={0}>
                            {data[`name_${router.locale.toLocaleUpperCase()}`]}
                        </Text>
                        <Text bold={700} color={COLORS.TEXT_PRIMARY} as="h2">
                            {data?.brandName}
                        </Text>

                        <FlexDiv spaceBetween gap={10}>
                            <Text color={COLORS.TEXT_PRIMARY} line={1}>
                                {t("products:modelNum")} {data?.modelName}
                            </Text>
                            {/* <FlexDiv gap={5}>
                <StyledTagg color="	#32CD32">
                  4.2 <StarFilled style={{ color: "#fff" }} />
                </StyledTagg>
                <Text line={1}>71 Evaluate</Text>
              </FlexDiv> */}
                        </FlexDiv>
                        {data?.offer && data?.offer !== 0 && (
                            <Text priceOffer>{data?.price} $</Text>
                        )}
                        <Text bold={800} price color={COLORS.TEXT_PRIMARY}>
                            {data?.offer && data?.offer !== 0
                                ? data?.price -
                                  (data?.price * data?.offer) / 100
                                : data?.price}{" "}
                            $
                        </Text>
                        <FlexDiv gap={10}>
                            <Text color={COLORS.TEXT_PRIMARY}>
                                {t("products:seller")}
                            </Text>
                            <Text bold color={COLORS.TEXT_PRIMARY}>
                                {data?.merchentName}
                            </Text>
                        </FlexDiv>
                        <FlexDiv gap={10}>
                            <Text color={COLORS.TEXT_PRIMARY}>
                                {t("products:size")}
                            </Text>
                            <FlexDiv gap={5}>
                                {data?.size?.map((item) => (
                                    <Button
                                        key={item.id}
                                        type={
                                            item.sizeID === size
                                                ? "primary"
                                                : ""
                                        }
                                        onClick={(e) =>
                                            changeProductSize(e, item.sizeID)
                                        }
                                    >
                                        {item.size}
                                    </Button>
                                ))}
                            </FlexDiv>
                        </FlexDiv>
                        <FlexDiv gap={10}>
                            <Text color={COLORS.TEXT_PRIMARY}>
                                {t("products:colors")}
                            </Text>
                            <FlexDiv gap={5}>
                                {colorList?.map((item) => (
                                    <Button
                                        key={item.id}
                                        type={
                                            item.colorID === color
                                                ? "primary"
                                                : ""
                                        }
                                        onClick={(e) =>
                                            changeProductColor(e, item.colorID)
                                        }
                                    >
                                        {item.color}
                                    </Button>
                                ))}
                            </FlexDiv>
                        </FlexDiv>

                        <FlexDiv gap={10}>
                            <ProductItemSum
                                number={number}
                                setNumber={setNumber}
                                height={false}
                                isThereChangesRef={isThereChanges}
                            />

                            <StyledDateSquare style={{ padding: "5px 10px" }}>
                                <Text
                                    bold
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                    }}
                                >
                                    <GrDeliver /> {t("products:deliverDate")}
                                </Text>
                                <TextContainer>
                                    <Text
                                        bold
                                        fontSize={12}
                                        style={{ margin: "0px" }}
                                    >
                                        {`${month} ${new Date().getDate()} - ${month} ${
                                            new Date().getDate() + 1
                                        } `}
                                    </Text>
                                </TextContainer>
                            </StyledDateSquare>
                        </FlexDiv>

                        <Button
                            size="large"
                            type={"primary"}
                            icon={
                                data?.size?.length === 0 ? (
                                    <StopOutlined />
                                ) : (
                                    <ShoppingCartOutlined />
                                )
                            }
                            onClick={handleAddItemToCard}
                            loading={addLoading}
                            disabled={
                                isInCart || data?.size?.length === 0
                                    ? true
                                    : false
                            }
                        >
                            {data?.size?.length === 0
                                ? t("products:noIteminStock")
                                : isInCart
                                ? t("products:inCart")
                                : t("products:addCart")}
                        </Button>
                    </FlexDiv>
                </FlexDiv>
            </FlexDiv>
        </FlexDiv>
    );
}
export default memo(ProductView);

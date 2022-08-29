import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useState, useEffect, useRef } from "react";
import styled from "styled-components";
// components
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import {
  DeleteOutlined,
  PlusCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons/lib/icons";
import { Typography } from "antd";
import { GrDeliver } from "react-icons/gr";
import ProductItemSum from "components/products/product-item-sum";
import GlobalLoading from "components/loadings/global-loading";
// hooks
import useFetch from "hooks/useFetch";
// redux
import { useDispatch } from "react-redux";
import { changeItemNumber } from "redux/cart/action";
// styles
import { COLORS } from "styles/variables";
import { startLoading, stopLoading } from "redux/loading/actions";
import useTranslation from "next-translate/useTranslation";

const { Link: AntdLink } = Typography;

const StyledDateSquare = styled.span`
  border: 1px solid ${COLORS.GRAY};
  padding: 5px;
  display: flex;
  justify-content: space-between;
  width: 300px;
  @media (max-width: 892px) {
    width: 250px;
  }
  @media (max-width: 632px) {
    width: 220px;
    padding: 2px;
    font-size: 0.9em;
  }
`;

const StyledFlexDiv = styled(FlexDiv)`
  transition: box-shadow 0.4s ease-in;
  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  @media (max-width: 578px) {
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
`;

const StyledAntdLink = styled(AntdLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

let timer;

function CartItem({
  image,
  id,
  number: cartItemNumber,
  offer,
  price,
  prodID,
  product,
  size,
  sizeID,
  color,
  colorID,
  seller,
  handleDeleteItem,
  deletable = true,
  sumable = true,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [number, setNumber] = useState(cartItemNumber);
  const isThereChanges = useRef();
  // edit cart item
  const {
    data: editData,
    error: editError,
    loading: editLoading,
    executeFetch: editCartItem,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_EDIT_CART,
    "post",
    {},
    false
  );

  const startTimer = (number) => {
    stopTimer();
    timer = setTimeout(function () {
      console.log("New Number is " + number);
      editCartItem({
        id: id,
        ProdID: prodID,
        SizeID: sizeID,
        ColorID: colorID,
        Number: number,
      });
    }, 2000);
  };

  const stopTimer = () => clearTimeout(timer);

  useEffect(() => {
    if (editLoading === true) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
    if (editData?.status === true && editLoading === false) {
      // can edit now ..
      dispatch(changeItemNumber(id, number));
    } else if (editData?.status === false) {
      alert("Edit Error");
    }
  }, [editData, editError, editLoading]);

  useEffect(() => {
    if (!isThereChanges.current || isThereChanges.current === false) {
      return;
    }
    // alert("Start api");
    startTimer(number);
  }, [number]);

  return (
    <Link href={`/product/${prodID}`}>
      <a>
        <StyledFlexDiv
          style={{
            border: `2px solid ${COLORS.BG_COLOR_GRAY}`,
          }}
          columnWhen={578}
        >
          <ImageContainer>
            <Image
              alt={`cart item image`}
              src={process.env.NEXT_PUBLIC_HOST_API + image}
              width={"100%"}
              height={100}
              layout="responsive"
            />
          </ImageContainer>
          <FlexDiv column flex={1} padding={20} gapWhen={[578, 10]}>
            <FlexDiv spaceBetween>
              <Text bold color={COLORS.TEXT_PRIMARY}>
                CHANEL
              </Text>
              <Text bold={800} price>
                {offer && offer !== 0 ? price - (price * offer) / 100 : price} $
              </Text>
            </FlexDiv>
            <FlexDiv spaceBetween>
              <Text bold color={COLORS.TITLE}>
                {product}
              </Text>
            </FlexDiv>
            {offer && offer !== 0 && (
              <FlexDiv spaceBetween>
                <Text priceOffer>{price} $</Text>
              </FlexDiv>
            )}
            <FlexDiv spaceBetween>
              <FlexDiv gap={10}>
                <Text color={COLORS.TEXT_PRIMARY}>{t("products:seller")}</Text>
                <Text bold color={COLORS.TEXT_PRIMARY}>
                  {seller}
                </Text>
              </FlexDiv>
              {sumable && (
                <ProductItemSum
                  number={number}
                  setNumber={setNumber}
                  isThereChangesRef={isThereChanges}
                  // handleChangeNumber={handleChangeNumber}
                />
              )}
            </FlexDiv>
            <FlexDiv spaceBetween columnWhen={635}>
              <StyledDateSquare>
                <Text
                  bold
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <GrDeliver /> {t("products:deliverDate")}
                </Text>
                <div>
                  <Text bold>18</Text> <Text>july -</Text> <Text bold>20</Text>{" "}
                  <Text>july</Text>
                </div>
              </StyledDateSquare>
              {deletable && (
                <StyledAntdLink
                  type="danger"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteItem(id);
                  }}
                >
                  <DeleteOutlined /> {t("common:deleteTxt")}
                </StyledAntdLink>
              )}
            </FlexDiv>
          </FlexDiv>
        </StyledFlexDiv>
      </a>
    </Link>
  );
}

export default memo(CartItem);

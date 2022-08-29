import { useCallback } from "react";
import styled from "styled-components";
// components
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { PlusCircleTwoTone } from "@ant-design/icons/lib/icons";
// redux
import { useDispatch } from "react-redux";
import { openModal } from "redux/modal/action";
import * as constants from "redux/modal/constants";
// styles
import { COLORS } from "styles/variables";
import useTranslation from "next-translate/useTranslation";

function NewAdress({ modalSuccessAction }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleNewItemClick = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        openModal(constants.modalType_delivery_address, modalSuccessAction)
      );
    },
    [modalSuccessAction, dispatch]
  );

  return (
    <a href="#" onClick={handleNewItemClick}>
      <FlexDiv
        padding={70}
        style={{ border: `1px solid ${COLORS.GRAY}` }}
        width={350}
        gap={5}
        column
      >
        <FlexDiv justifyCenter>
          <Text icon fontSize={30} bold textAlign="center">
            <PlusCircleTwoTone twoToneColor={COLORS.PRIMARY} />
          </Text>
        </FlexDiv>
        <FlexDiv justifyCenter>
          <Text bold fontSize={15} color={COLORS.PRIMARY}>
            {t("delivery-address:newAddress")}
          </Text>
        </FlexDiv>
      </FlexDiv>
    </a>
  );
}
export default NewAdress;

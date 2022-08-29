import styled from "styled-components";
// components
import FlexDiv from "components/utils/flex-div";
import { DownOutlined } from "@ant-design/icons/lib/icons";
import { GrDeliver } from "react-icons/gr";
import Text from "components/utils/text";
import { StyledLink } from "components/utils/icon-title-item";
import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { modalType_delivery_address } from "redux/modal/constants";
import { openModal } from "redux/modal/action";
import { AddressesContext } from "context/address-context";
import Link from "next/link";

const StyledDeliveryTo = styled(FlexDiv)`
  width: fit-content;
  max-width: 300px;
`;

function DeliveryTo({ t }) {
  let title = "Qatar some address will be here and some long address";

  const { selected } = useContext(AddressesContext);

  const dispatch = useDispatch();

  const handleDeliveryAddressClick = useCallback((e) => {
    e.preventDefault();
    dispatch(openModal(modalType_delivery_address));
  }, []);

  return (
    <Link href={`/delivery-address`} passHref>
      <StyledLink
        hoverColor="#585858"
        // onClick={handleDeliveryAddressClick}
      >
        <StyledDeliveryTo column={true}>
          <FlexDiv alignCenter gap={3}>
            <GrDeliver />
            <span>{t("navbar.address")}</span>
          </FlexDiv>
          <FlexDiv alignCenter gap={3} style={{ fontWeight: "normal" }}>
            <Text line={1} maxWidth={300}>
              {selected ? <>{selected.address}</> : <>{title}</>}
            </Text>
            <DownOutlined />
          </FlexDiv>
        </StyledDeliveryTo>
      </StyledLink>
    </Link>
  );
}

export default DeliveryTo;

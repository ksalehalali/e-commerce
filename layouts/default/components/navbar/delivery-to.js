import styled from "styled-components";
// components
import FlexDiv from "components/utils/flex-div";
import { DownOutlined } from "@ant-design/icons/lib/icons";
import { GrDeliver } from "react-icons/gr";
import Text from "components/utils/text";
import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { modalType_delivery_address } from "redux/modal/constants";
import { openModal } from "redux/modal/action";
import { AddressesContext } from "context/address-context";
import Link from "next/link";
import { COLORS } from "styles/variables";

const StyledDeliveryTo = styled(FlexDiv)`
    width: fit-content;
    max-width: 300px;
`;
export const StyledLink = styled.a`
    padding: 0 8px;
    display: flex;
    color: ${(props) => (props.color ? `${props.color} !important` : "")};
    white-space: nowrap;
    transition: all 0.3s ease;
    ${(props) =>
        props.block
            ? `
        height: 100%;
        width: 100%;
      `
            : ""};
    font-weight: ${(props) => (props.bold ? props.bold : "")};
    padding: ${(props) =>
        Number.isInteger(props.padding) ? `${props.padding}px` : ""};

    &:hover {
        color: black;
        opacity: 0.5;
    }
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
            // onClick={handleDeliveryAddressClick}
            >
                <StyledDeliveryTo column={true}>
                    <FlexDiv alignCenter gap={3}>
                        <Text color={COLORS.TITLE} fontSize={14} bold="600">
                            {t("navbar.address")}
                        </Text>
                        <GrDeliver />
                    </FlexDiv>
                    <FlexDiv
                        alignCenter
                        justifyCenter
                        gap={3}
                        style={{ fontWeight: "normal" }}
                    >
                        <Text line={1} bold="400" fontSize={12} maxWidth={300}>
                            {selected ? <>{selected.address}</> : <></>}
                        </Text>
                        <DownOutlined />
                    </FlexDiv>
                </StyledDeliveryTo>
            </StyledLink>
        </Link>
    );
}

export default DeliveryTo;

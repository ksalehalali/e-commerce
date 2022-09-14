import { useContext } from "react";
import Link from "next/link";
import { useCallback } from "react";
import styled from "styled-components";
// components
import FlexDiv from "components/utils/flex-div";
import { Divider, Dropdown, message, Menu } from "antd";
import {
    ShoppingCartOutlined,
    UserOutlined,
    LoadingOutlined,
    LogoutOutlined,
    WalletOutlined,
    OrderedListOutlined,
} from "@ant-design/icons/lib/icons";
import { StyledLink } from "./delivery-to";
import IconTitleItem, {
    IconItem,
    IconSpan,
} from "components/utils/icon-title-item";
import Text from "components/utils/text";
// modules
import { removeCookies } from "cookies-next";
// redux
import { useDispatch, useSelector } from "react-redux";
// actions
import { openModal } from "redux/modal/action";
import { resetShoopingCart } from "redux/cart/action";
import * as constants from "redux/modal/constants";
// context
import { AddressesContext } from "context/address-context";
// styles
import { STANDARD_SCREENS, COLORS } from "styles/variables";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const StyledNavs = styled(FlexDiv)`
    @media (max-width: ${STANDARD_SCREENS.tablets.width}px) {
        display: none;
    }
`;

const StyledMenu = styled(Menu)`
    border: 2px solid ${COLORS.GRAY};
    min-width: 140px;
`;

const CartContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;

    h3 {
        font-weight: 600;
        color: ${COLORS.TITLE};
    }
    .cart-icon {
        font-size: 23px;
        margin-left: 5px;
    }
    &:hover {
        opacity: 0.5;
    }
`;

function NavbarNavs({ t }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const { data, status } = useSession();

    const { sum } = useSelector((state) => state.cart);

    const { resetAddresses } = useContext(AddressesContext);

    const handleLogout = useCallback(
        (e) => {
            e.preventDefault();
            // if (user) {

            dispatch(resetShoopingCart());
            resetAddresses();
            signOut({ callbackUrl: "/" });
        },
        [data]
    );
    const handleOpenLogin = useCallback(
        (e) => {
            e.preventDefault();
            if (!data?.user) {
                dispatch(openModal(constants.modalType_Login));
            } else return false;
        },
        [data]
    );

    const logedInMenu = (
        <StyledMenu
            items={[
                {
                    label: (
                        <Link href="/profile/wallet">
                            <FlexDiv padding={[5]} alignCenter gap={5}>
                                <WalletOutlined />
                                <Text>{t("navbar.wallet")}</Text>
                            </FlexDiv>
                        </Link>
                    ),
                    key: "0",
                },
                {
                    label: (
                        <Link href="/profile/my-orders">
                            <FlexDiv padding={[5]} alignCenter gap={5}>
                                <OrderedListOutlined />
                                <Text>{t("navbar.myOrders")}</Text>
                            </FlexDiv>
                        </Link>
                    ),
                    key: "1",
                },
                {
                    type: "divider",
                },
                {
                    label: (
                        <a href="#" onClick={handleLogout}>
                            <FlexDiv padding={[5]} alignCenter gap={5}>
                                <LogoutOutlined />
                                <Text>{t("navbar.logout")}</Text>
                            </FlexDiv>
                        </a>
                    ),
                    key: "3",
                },
            ]}
        />
    );

    const DropdownState = (props) =>
        data?.user?.userName ? (
            <Dropdown
                overlay={logedInMenu}
                placement="bottomRight"
                trigger={["click"]}
            >
                {props.children}
            </Dropdown>
        ) : (
            <>{props.children}</>
        );

    return (
        <StyledNavs alignCenter gap={10}>
            {/* <IconTitleItem
        title={router.locale === "ar" ? "English" : "العربية"}
        href={router.asPath}
        locale={router.locale === "ar" ? "en" : "ar"}
        hoverColor="#585858"
        bold="600"
        onClick={() => console.log("clicked")}
      /> */}
            <StyledLink
                href={`/${router.locale === "ar" ? "en" : "ar"}${router.asPath
                    }`}
            >
                <IconItem>
                    {router.locale === "ar" ? <Text>
                        English    </Text> : <Text>
                        العربية  </Text>}

                </IconItem>
            </StyledLink>
            <Divider
                type="vertical"
                style={{ backgroundColor: "black", margin: 0, height: 20 }}
            />

            <DropdownState>
                <StyledLink
                    href="#"
                    onClick={handleOpenLogin}
                    hoverColor={"#585858"}
                    bold="600"
                >
                    <IconItem>
                        <IconSpan>
                            {status === "loading" ? (
                                <LoadingOutlined />
                            ) : (
                                <UserOutlined />
                            )}
                        </IconSpan>
                        <Text>
                            {data?.user?.userName || t("navbar.signin")}
                        </Text>
                    </IconItem>
                </StyledLink>
            </DropdownState>

            <Divider
                type="vertical"
                style={{ backgroundColor: "black", margin: 0, height: 20 }}
            />

            <Link href="/cart">
                <CartContainer>
                {router.locale === "ar" ? <Text>
                           السلة </Text> : <Text>
                        Cart  </Text>}
                   
                    <ShoppingCartOutlined className="cart-icon" />
                </CartContainer>
            </Link>
        </StyledNavs>
    );
}

export default NavbarNavs;

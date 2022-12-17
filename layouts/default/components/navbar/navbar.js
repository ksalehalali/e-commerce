import Link from "next/link";
import styled from "styled-components";

// components
import NavbarNavs from "./navbar-navs";
import FlexDiv from "components/utils/flex-div";
import NavSearch from "./nav-search";
import DeliveryTo from "./delivery-to";
import NavbarCategories from "./navbar-categories";
// variables
import { COLORS, PADDINGS, STANDARD_SCREENS } from "styles/variables";
import { useRouter } from "next/router";

const Header = styled.header`
    position: fixed;
    width: 100%;
    z-index: 8;
`;

const Nav = styled.div`
    background: ${COLORS.PRIMARY};
    padding: ${PADDINGS.navbar_y}px 40px;
`;

const StyledFlexDiv = styled(FlexDiv)`
    @media (max-width: ${STANDARD_SCREENS.tablets.width}px) {
        flex-direction: column;
    }
    font-size: 15px;
`;

const HomeText = styled.h3`
    font-weight: 600;
    cursor: pointer;
    color: ${COLORS.TITLE};
    transition: all 0.3s ease;
    &:hover {
        opacity: 0.5;
    }
`;

function DefaultLayoutNavbar(props) {
    const router = useRouter();

    return (
        <Header>
            <FlexDiv column>
                <Nav>
                    <StyledFlexDiv spaceBetween gap={20} alignCenter>
                        <Link href="/">
                            {router.pathname === "/" ? (
                                ""
                            ) : router.locale === "ar" ? (
                                <HomeText>الصفحة الرئيسية</HomeText>
                            ) : (
                                <HomeText>Home</HomeText>
                            )}
                        </Link>
                        <DeliveryTo t={props.t} />
                        <NavSearch t={props.t} />
                        <NavbarNavs cookies={props.cookies} t={props.t} />
                    </StyledFlexDiv>
                </Nav>
                <NavbarCategories t={props.t} />
            </FlexDiv>
        </Header>
    );
}

export default DefaultLayoutNavbar;

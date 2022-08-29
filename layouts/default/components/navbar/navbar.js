import Link from "next/link";
import styled from "styled-components";

// components
import Container from "components/utils/container";
import NavbarNavs from "./navbar-navs";
import FlexDiv from "components/utils/flex-div";
import NavSearch from "./nav-search";
import DeliveryTo from "./delivery-to";
import NavbarCategories from "./navbar-categories";
// variables
import {
  COLORS,
  PADDINGS,
  STACKS_INDEX,
  STANDARD_SCREENS,
} from "styles/variables";

const Header = styled.header`
  position: fixed;
  width: 100%;
  z-index: ${STACKS_INDEX.NAVBAR};
`;

const Nav = styled.div`
  background: ${COLORS.PRIMARY};
  padding: ${PADDINGS.navbar_y}px 40px;
`;

const StyledFlexDiv = styled(FlexDiv)`
  @media (max-width: ${STANDARD_SCREENS.tablets.width}px) {
    flex-direction: column;
  }
`;

function DefaultLayoutNavbar(props) {
  return (
    <Header>
      <FlexDiv column>
        <Nav>
          <StyledFlexDiv spaceBetween gap={20} alignCenter>
            <Link href="/">{props.t("navbar.home")}</Link>
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

import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
// components
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
// icons
import { RiHome6Fill, RiShoppingCartFill } from "react-icons/ri";
import { MdCategory, MdLocalOffer } from "react-icons/md";

import { STANDARD_SCREENS, COLORS } from "styles/variables";
import { FaUser } from "react-icons/fa";

const StyledMobileFooter = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 2000;
  @media (max-width: ${STANDARD_SCREENS.phones.width}px) {
  }
  @media (max-width: ${STANDARD_SCREENS.tablets.width}px) {
    display: block;
  }
`;

const FooterLink = styled.a`
  color: ${(props) =>
    props.active === true
      ? `
        ${COLORS.PRIMARY} !important
    `
      : ""};
`;
// &:hover > * {
//   color: ${COLORS.PRIMARY} !important;
// }

function MobileFooter({ t }) {
  const router = useRouter();
  let path = router.pathname;

  return (
    <StyledMobileFooter>
      <FlexDiv spaceAround>
        <Link href={"/"}>
          <FooterLink active={path === "/"}>
            <FlexDiv column alignCenter justifyCenter gap={5} padding={10}>
              <RiHome6Fill style={{ fontSize: 18 }} />
              <Text fontSize={14} color="unset">
                {t("navbar.home")}
              </Text>
            </FlexDiv>
          </FooterLink>
        </Link>
        <Link href={"/"}>
          <FooterLink active={path === "/categories"}>
            <FlexDiv column alignCenter justifyCenter gap={5} padding={10}>
              <MdCategory style={{ fontSize: 18 }} />
              <Text fontSize={14} color="unset">
                {t("footer.categories")}
              </Text>
            </FlexDiv>
          </FooterLink>
        </Link>
        <Link href={"/"}>
          <FooterLink active={path === "/offers"}>
            <FlexDiv column alignCenter justifyCenter gap={5} padding={10}>
              <MdLocalOffer style={{ fontSize: 18 }} />
              <Text fontSize={14} color="unset">
                {t("offersTxt")}
              </Text>
            </FlexDiv>
          </FooterLink>
        </Link>
        <Link href={"/cart"}>
          <FooterLink active={path === "/card"}>
            <FlexDiv column alignCenter justifyCenter gap={5} padding={10}>
              <RiShoppingCartFill style={{ fontSize: 18 }} />
              <Text fontSize={14} color="unset">
                {t("navbar.cart")}
              </Text>
            </FlexDiv>
          </FooterLink>
        </Link>
        <Link href={"/"}>
          <FooterLink active={path === "/account"}>
            <FlexDiv column alignCenter justifyCenter gap={5} padding={10}>
              <FaUser style={{ fontSize: 18 }} />
              <Text fontSize={14} color="unset">
                {t("accountTxt")}
              </Text>
            </FlexDiv>
          </FooterLink>
        </Link>
      </FlexDiv>
    </StyledMobileFooter>
  );
}

export default MobileFooter;

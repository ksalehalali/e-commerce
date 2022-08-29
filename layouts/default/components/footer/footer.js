//componentes
import FooterContent from "./content";
import FooterHeader from "./header";
import styled from "styled-components";
import MobileFooter from "./mobile-footer";
import { STANDARD_SCREENS } from "styles/variables";
import useTranslation from "next-translate/useTranslation";
const FooterLayout = styled.footer`
  position: relative;
  padding-top: 40px;

  @media (max-width: ${STANDARD_SCREENS.tablets.width}px) {
    display: none;
  }
`;

function DefaultLayoutFooter() {
  const { t } = useTranslation("common");
  return (
    <>
      <FooterLayout>
        <FooterHeader t={t} />
        <FooterContent t={t} />
      </FooterLayout>
      <MobileFooter t={t} />
    </>
  );
}
export default DefaultLayoutFooter;

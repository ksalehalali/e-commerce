import { useRouter } from "next/router";
import styled from "styled-components";
// components
import DefaultLayoutNavbar from "./components/navbar/navbar";
import DefaultLayoutFooter from "./components/footer/footer";
import GlobalLoading from "components/loadings/global-loading";
import CategoriesLayout from "layouts/categories/categories-layout";
import ProfileLayout from "layouts/profile/profile-layout";
// variables
import { POSITIONS, STACKS_INDEX, STANDARD_SCREENS } from "styles/variables";
import PaymentAlert from "components/payment-alert";
import { useContext } from "react";
import { ActionRequiredContext } from "context/action-context";
import useTranslation from "next-translate/useTranslation";
import GoogleMapComp from "pages/GoogleMapComp";
import { useSelector } from "react-redux";

const Main = styled.div`
    position: relative;
    width: 100%;
    top: ${(props) =>
        props.plusTop
            ? ` ${parseInt(POSITIONS.MAIN_TOP) + 20}px`
            : POSITIONS.MAIN_TOP};
    z-index: 7;
    min-height: 70vh;
    padding-bottom: ${(props) =>
        props.plusTop
            ? ` ${parseInt(POSITIONS.MAIN_TOP) + 20}px`
            : POSITIONS.MAIN_TOP};
    @media (max-width: ${STANDARD_SCREENS.tablets.width}px) {
        top: ${(props) =>
            props.plusTop
                ? ` ${parseInt(POSITIONS.MOBILE_MAIN_TOP) + 20}px`
                : POSITIONS.MOBILE_MAIN_TOP};
    }
`;

const layout = styled.div`
    position: apsolute;
`;
const nestedLayouts = {
    category: CategoriesLayout,
    profile: ProfileLayout,
    none: (props) => <>{props.children}</>,
};

function DefaultLayout(props) {
    const router = useRouter();
    const { visible } = useSelector((state) => state.modal);
    const { t } = useTranslation("common");
    const { action } = useContext(ActionRequiredContext);

    const NestedLayout =
        nestedLayouts[props.nested || "none"] ||
        ((children) => <>{children}</>);

    return (
        <div className="default-layout">
            {visible && <div className="layout"></div>}
            {action?.type === "payment" && <PaymentAlert />}
            <DefaultLayoutNavbar
                cookies={props.cookies}
                t={t}
                locale={router.locale}
            />
            <Main plusTop={router.pathname !== "/"}>
                <NestedLayout>{props.children}</NestedLayout>
            </Main>
            <DefaultLayoutFooter />
            <GlobalLoading />
            {false && <GoogleMapComp />}
        </div>
    );
}

export default DefaultLayout;

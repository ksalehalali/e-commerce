import App from "next/app";
import Router, { useRouter } from "next/router";
import NProgress from "../config/nprogress-config";
import "../styles/style.scss";
// layouts
import DefaultLayout from "layouts/default/default-layout";

// i18next for multiple languages
import { appWithTranslation } from "next-i18next";
import Head from "next/head";

// redux
import { Provider } from "react-redux";
import { useStore } from "../redux/index";
import ModalContainer from "components/modal/modal-container";

// redux persist
// import PersistWrapper from "next-persist/lib/NextPersistWrapper";

import GlobalStyles from "../styles/global-styles";
import { getCookie } from "cookies-next";

import Checkers from "components/checkers";
// contexts
// import { AddressesContext } from "context/address-context";
import AddressContext from "context/address-context";
import ActionContext from "context/action-context";
import PaymentContextProvider from "context/payment-context";

// auth
import { SessionProvider } from "next-auth/react";
import AuthGuard from "components/auth-guard";
import Theme from "config/theme";
import PaymentAlert from "components/payment-alert";

const npConfig = {
    method: "cookies",
    allowList: {
        test: ["testText"],
    },
};

const layouts = {
    main: DefaultLayout,
    none: (props) => <>{props.children}</>,
};

function MyApp({ Component, pageProps, cookies, ...rest }) {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());

    const router = useRouter();

    // redux store
    const store = useStore(pageProps.initialReduxState);
    console.log("initialReduxState", store);

    const Layout =
        layouts[Component.layout || "none"] || ((children) => <>{children}</>);

    return (
        <SessionProvider session={pageProps.session}>
            <Theme>
                <Head></Head>
                <Provider store={store}>
                    <AddressContext>
                        <PaymentContextProvider>
                            <ActionContext>
                                <Layout
                                    cookies={cookies}
                                    nested={Component.nested}
                                >
                                    <GlobalStyles
                                        pathname={router.pathname}
                                        locale={router.locale}
                                    />
                                    {Component.guard === true ? (
                                        <AuthGuard
                                            noRedirect={Component.noRedirect}
                                        >
                                            <Component
                                                {...pageProps}
                                                cookies={cookies}
                                                deviceType={rest.breakpoint}
                                            />
                                        </AuthGuard>
                                    ) : (
                                        <Component
                                            {...pageProps}
                                            cookies={cookies}
                                            deviceType={rest.breakpoint}
                                        />
                                    )}

                                    <ModalContainer />
                                    <Checkers cookies={cookies} />
                                    {/* </PersistWrapper> */}
                                </Layout>
                            </ActionContext>
                        </PaymentContextProvider>
                    </AddressContext>
                </Provider>
            </Theme>
        </SessionProvider>
    );
}

MyApp.getInitialProps = async (context) => {
    const { req, res } = context.ctx;
    const pageProps = await App.getInitialProps(context); // Retrieves page's `getInitialProps`
    let cookiesObj = null;

    const cookies = getCookie("user", { req, res });
    if (cookies) {
        cookiesObj = JSON.parse(cookies);
    }

    return {
        ...pageProps,
        cookies: cookiesObj,
    };
};

export default appWithTranslation(MyApp);

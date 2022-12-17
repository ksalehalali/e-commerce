import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
//component
import PaymentPage from "components/views/payment";
import { message } from "antd";
import { PaymentContext } from "context/payment-context";
import useTranslation from "next-translate/useTranslation";
//context

function Payment() {
    const { t } = useTranslation();
    const router = useRouter();
    const { address, started, endPayment } = useContext(PaymentContext);

    useEffect(() => {
        if (!started) {
            message.warning(t("common:messages.sureItemCart"));
            router.push("/cart");
        }
        if (started && !address) {
            message.warning(t("common:messages.chooseAddress"));
            router.push("/delivery-address?payment=cart");
        }

        return () => endPayment();
    }, [started]);

    return (
        <>
            <Head>
                <title>E-commerce - cart</title>
                <meta
                    name="description"
                    content="E-commerce Site - Payment Page"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PaymentPage />
        </>
    );
}
Payment.layout = "main";
export default Payment;

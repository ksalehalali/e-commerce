import Head from "next/head";
//component
import DeliveryPageContent from "components/views/delivery-adress/index";
import AccessDenied from "components/results/access-denied";
// redux
import { useSelector } from "react-redux";

function Delivery(props) {
    const { user } = useSelector((state) => state.user);

    return (
        <>
            <Head>
                <title>E-commerce - Delivery Addresses</title>
                <meta
                    name="description"
                    content="E-commerce Site - Delivery Adress "
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {props?.status !== 401 || user ? (
                <DeliveryPageContent />
            ) : (
                <AccessDenied />
            )}
        </>
    );
}
Delivery.layout = "main";
Delivery.guard = true;
Delivery.noRedirect = true;

export default Delivery;

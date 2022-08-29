import Head from "next/head";
import { useRouter } from "next/router";
// components
import WalletPageContent from "components/views/profile/wallet";

function WalletPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>E-commerce - User Wallet</title>
      </Head>
      <WalletPageContent locale={router.locale} />
    </>
  );
}

WalletPage.layout = "main";
WalletPage.nested = "profile";
WalletPage.guard = true;
WalletPage.noRedirect = true;

export default WalletPage;

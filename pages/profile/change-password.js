import Head from "next/head";
import ChangePasswordContent from "components/views/profile/change-password";

function ChangePassword() {
  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
      <ChangePasswordContent />
    </>
  );
}

ChangePassword.layout = "main";
ChangePassword.nested = "profile";
ChangePassword.guard = true;
ChangePassword.noRedirect = true;

export default ChangePassword;

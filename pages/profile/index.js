import Head from "next/head";
import ProfilePageContent from "components/views/profile";

function ProfilePage() {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfilePageContent />
    </>
  );
}

ProfilePage.layout = "main";
ProfilePage.nested = "profile";
ProfilePage.guard = true;
ProfilePage.noRedirect = true;

export default ProfilePage;

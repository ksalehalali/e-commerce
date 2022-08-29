import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AccessDenied from "./results/access-denied";

export default function AuthGuard({ children, noRedirect }) {
  const router = useRouter();

  const { data, status } = useSession();

  console.log("Auth Guard cookies");
  console.log(data);

  useEffect(() => {
    if (status !== "loading") {
      //auth is initialized and there is no user
      if (!data && !noRedirect) {
        // router.push(`/auth/login?redirect=${router.asPath}`);
        alert("open Login Modal !");
      }
    }
  }, [data, status, router]);

  /* show loading indicator while the auth provider is still initializing */
  if (status === "loading") return <h1>loading ...</h1>;

  if (noRedirect && status === "unauthenticated") return <AccessDenied />;

  // if auth initialized with a valid user show protected page
  if (status !== "loading" && data) {
    if (React.isValidElement(children)) {
      const componentWithProps = React.cloneElement(children, { data: data });
      return componentWithProps;
    }
    return "Error";
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}

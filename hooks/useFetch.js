import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
// contetx
// import { AuthContext } from "context/auth-context/auth-context";
// import { logout } from "context/auth-context/auth-actions";
// cookies
import { useSession, signOut } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
const useFetch = (
  url = "",
  method = "post",
  params = {},
  immediate = true,
  token = true,
  headers = {}
) => {
  const { t } = useTranslation();

  const router = useRouter();
  const { data: cookies } = useSession();

  //   const { dispatch } = useContext(AuthContext);

  // states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const source = axios.CancelToken.source();

  // useCallBack for post submit ..
  const executeFetch = useCallback(
    async (data) => {
      setLoading(true);
      setData(null);
      setError(null);
      try {
        const { data: response } = await axios({
          method: method,
          url: url,
          data: {
            ...params,
            ...data,
          },
          headers: {
            ...headers,
            lang: router.locale,
            Authorization: `Bearer ${cookies?.user?.token}`,
          },
          timeout: 1000 * 10, // wait to 10 seconds for response or cancel the request ..
        });
        setLoading(false);
        if (response.status === true) {
          setData(response); // setting incomed data here
        } else {
          setError(
            response?.description === false
              ? t("common:messages.error500")
              : response?.description
          ); // setting error here
        }
      } catch (err) {
        if (err?.response?.status === 401) {
          // signOut({ callbackUrl: "/" });
        }
      }
    },
    [url, method, params, headers, token, cookies]
  );

  // useEffects
  useEffect(() => {
    const start = async () => {
      if (immediate) {
        immediate = false;
        executeFetch();
      }
    };
    start();
    return () => {
      source.cancel(); // clear axios when this hook unmounted
    };
  }, [immediate]);

  return { data, loading, error, executeFetch };
};

export default useFetch;

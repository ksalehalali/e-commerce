import { removeCookies } from "cookies-next";
import cookie from "cookie";
async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      // console.log("req.url __");
      // console.log(req.url);
      // console.log(req.headers);
      // console.log("req.headers.referer.split(req.headers.host)[1]");
      // console.log(req.headers.referer.split(req.headers.host)[1]);
      // removeCookies("user", {
      //   req,
      //   res,
      //   path: "/",
      //   domain: req.headers.host,
      // });

      res.setHeader("Set-Cookie", [
        cookie.serialize("user", "", {
          maxAge: -1,
          path: "/",
        }),
      ]);
      res.status(200).json({
        status: true,
        description: "Logged out successfully.",
      });
      return;
    } catch (e) {
      console.error("Some Error Happend");
      console.error(e);
    }
  } else {
    return;
  }
}

export default handler;

import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
  //   template: `<div className="loader"><h2>Loading ...</h2></div>`,
});

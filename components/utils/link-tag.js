import NextLink, { LinkProps } from "next/link";

const LinkButton = ({
  as,
  children,
  href,
  replace,
  scroll,
  shallow,
  passHref,
  ...rest
}) => (
  <NextLink
    as={as}
    href={href}
    passHref={passHref}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
  >
    <a {...rest}>{children}</a>
  </NextLink>
);

export default LinkButton;

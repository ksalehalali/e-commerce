import Link from "next/link";
import styled from "styled-components";
// components
import Text from "./text";
import { Badge } from "antd";

import PropTypes from "prop-types";
import { COLORS } from "styles/variables";
import { NavLink } from "layouts/default/components/navbar/delivery-to";

// import LinkButton from "./link-tag";

const StyledLink = styled.a`
    padding: 0 8px;
    display: flex;
    color: ${(props) => (props.color ? `${props.color} !important` : "")};
    white-space: nowrap;
    transition: all 0.3s ease;
    ${(props) =>
        props.block
            ? `
        height: 100%;
        width: 100%;
      `
            : ""};
    font-weight: ${(props) => (props.bold ? props.bold : "")};
    padding: ${(props) =>
        Number.isInteger(props.padding) ? `${props.padding}px` : ""};
    &:hover {
        background-color: #fbfbfb;
        box-shadow: 0 0 9px 0px #0000003e;
    }
`;

export const IconItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: ${(props) => (props.justify ? props.justify : "")};
    flex-direction: ${(props) => props.rowReverse === true && `row-reverse`};
`;
export const IconSpan = styled.span`
    margin-inline-end: 8px;
`;

const NavItemTitle = styled.h3`
    font-weight: 600;
    font-size: 14.6px;
    text-transform: uppercase;
    color: ${COLORS.TITLE};
`;

const IconTitleItem = ({
    icon,
    title,
    href,
    onClick,
    justify,
    bold,
    hoverColor,
    padding,
    block,
    hoverEffect,
    badgeCount,
    color,
    rowReverse,
    locale,
}) => {
    if (badgeCount && badgeCount !== 0)
        return (
            <Badge size="small" count={badgeCount}>
                <Link href={href ? href : "#"} passHref>
                    <StyledLink
                        onClick={onClick}
                        bold={bold}
                        hoverColor={hoverColor}
                        padding={padding}
                        block={block}
                        hoverEffect={hoverEffect}
                    >
                        <IconItem justify={justify}>
                            {icon && <IconSpan>{icon}</IconSpan>}
                            <Text>{title}</Text>
                        </IconItem>
                    </StyledLink>
                </Link>
            </Badge>
        );

    return (
        <Link
            href={href ? { pathname: href } : "#"}
            replace={true}
            locale={locale}
        >
            <StyledLink
                onClick={onClick}
                bold={bold}
                hoverColor={hoverColor}
                padding={padding}
                block={block}
                hoverEffect={hoverEffect}
                color={color}
            >
                <IconItem justify={justify} rowReverse={rowReverse}>
                    {icon && <IconSpan>{icon}</IconSpan>}
                    <NavItemTitle>{title}</NavItemTitle>
                </IconItem>
            </StyledLink>
        </Link>
    );
};

IconTitleItem.propTypes = {
    icon: PropTypes.node,
    title: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    justify: PropTypes.oneOf([
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
    ]),
    bold: PropTypes.oneOfType([
        PropTypes.oneOf([
            "100",
            "200",
            "300",
            "400",
            "500",
            "600",
            "700",
            "800",
            "900",
            "bold",
            "bolder",
            "normal",
            "lighter",
        ]),
        PropTypes.number,
    ]),
    hoverColor: PropTypes.string,
    padding: PropTypes.number,
    block: PropTypes.bool,
};

IconTitleItem.defaultProps = {
    icon: null,
    title: "",
    href: "#",
    onClick: null,
    justify: "",
    bold: "normal",
    hoverColor: COLORS.PRIMARY,
    padding: 0,
    block: false,
};

IconTitleItem.defaultProps = {
    block: false,
    bold: "normal",
};
export default IconTitleItem;

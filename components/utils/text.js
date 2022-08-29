import styled from "styled-components";
import { COLORS } from "styles/variables";

const Text = styled.span`
  max-width: ${(props) =>
    props.maxWidth && Number.isInteger(props.maxWidth)
      ? `${props.maxWidth}px`
      : props.maxWidth};
  ${(props) =>
    props.line &&
    `
 
  `}

  ${(props) =>
    !props.icon
      ? `
      ${
        props.line
          ? `
      display: -webkit-box;
    -webkit-line-clamp: ${Number.isInteger(props.line) ? props.line : ""};
    -webkit-box-orient: vertical;
     overflow: hidden;
      `
          : `
          ${props.block ? "display: block;" : "display: inline;"}

      `
      }
      
    `
      : `
      width: ${props.size ? props.size : "32"}px;
      height: ${props.size ? props.size : "32"}px;
      display: flex;
      justify-content: center;
      align-items: center;
    `}

   

  color: ${(props) => {
    if (props.color === "unset" || !props.color) return "unset";
    else if (props.color === "primary") return COLORS.PRIMARY;
    else if (props.color) return props.color;
    else return COLORS.TITLE;
  }};
  background-color: ${(props) =>
    props.bg ? props.bg : `${props.icon ? "#fff" : ""}`};
  font-size: ${(props) => {
    if (Number.isInteger(props.fontSize)) return `${props.fontSize}px`;
    else if (props.fontSize) return props.fontSize;
    else if (props.price) return "1.4em";
    else return "1em";
  }};
  border-radius: ${(props) => (props.rounded ? "50%" : "")};
  font-weight: ${(props) => {
    if (props.bold === true || props.bold === "bold") return "bold";
    else if (props.bold !== false) return props.bold;
  }};
  text-align: ${(props) => (props.align ? props.align : "")};
  ${(props) =>
    props.priceOffer &&
    `
      color: ${COLORS.GRAY};
      text-decoration: line-through;
    `}
  ${(props) =>
    props.title &&
    `
    font-size: 1.6em;
    font-weight: bold;
  `}
  text-align: ${(props) => (props.textAlign ? props.textAlign : "")};
  ${(props) => props.as === "h1" && `margin-bottom: 20px;`}

  margin: ${(props) => (props.margin ? props.margin + "px" : "")};
`;

export default Text;

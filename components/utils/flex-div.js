import styled from "styled-components";
import { STANDARD_SCREENS } from "styles/variables";

const FlexDiv = styled.div`
  display: flex;
  justify-content: ${(props) => {
    if (props.spaceAround)
      return `
        space-around
        `;
    else if (props.justifyCenter)
      return `
      center
    `;
    else if (props.spaceBetween)
      return `
            space-between
        `;
    else if (props.spaceEvenly)
      return `
            space-evenly
        `;
    else if (props.end)
      return `
            end
        `;
    return "";
  }};
  align-items: ${(props) => {
    if (props.alignSpaceAround)
      return `
        space-around
        `;
    else if (props.alignCenter)
      return `
      center
    `;
    else if (props.alignFlexEnd)
      return `
      flex-end
    `;
    else if (props.alignSpaceBetween)
      return `
            space-between
        `;
    return "";
  }};
  flex-flow: ${(props) => {
    if (props.flowRowReverse)
      return `
    row-reverse
    `;
    return "";
  }};
  flex-wrap: ${(props) => {
    if (props.wrap)
      return `
    wrap
    `;
    return "";
  }};
  width: ${(props) => {
    if (props.width) {
      if (Number.isInteger(props.width)) return `${props.width}px`;
      return props.width;
    } else if (props.block) return "100%";
    else return "";
  }};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  gap: ${(props) => (Number.isInteger(props.gap) ? `${props.gap}px` : "")};
  padding: ${(props) =>
    Number.isInteger(props.padding)
      ? `${props.padding}px`
      : props.padding
      ? props.padding
      : ""};
  margin: ${(props) =>
    Number.isInteger(props.margin) ? `${props.margin}px` : ""};

  flex: ${(props) => (props.flex ? props.flex : "")};

  ${(props) => {
    if (props.responsive) {
      return `
        @media (max-width: ${STANDARD_SCREENS.tablets.width}px) {
          flex-direction: column;
          > div {
            width: 100%;
          }
        }
        `;
    }
  }}

  ${(props) => props.block && "display: block;"}

  ${(props) => {
    if (props.columnWhen && Number.isInteger(props.columnWhen)) {
      return `
          @media(max-width: ${props.columnWhen}px) {
            flex-direction: column;
          }
        `;
    }
  }}

  ${(props) => {
    if (props.gapWhen && Array.isArray(props.gapWhen)) {
      return `
          @media(max-width: ${props.gapWhen[0]}px) {
            gap: ${props.gapWhen[1]}px;
          }
        `;
    }
  }}

  ${(props) => {
    if (props.cStyle) return props.cStyle;
  }}
`;

export default FlexDiv;

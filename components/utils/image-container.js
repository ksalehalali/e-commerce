import styled from "styled-components";

// styles
const StyledImageContainer = styled.div`
  overflow: hidden;
  width: ${(props) =>
    props.width && Number.isInteger(props.width)
      ? props.width + "px"
      : props.width};
  height: ${(props) =>
    props.height && Number.isInteger(props.height)
      ? props.height + "px"
      : props.height};
  border-radius: ${(props) =>
    props.radius && Number.isInteger(props.radius)
      ? props.radius + "px"
      : props.radius};
  margin: ${(props) => {
    if (Number.isInteger(props.margin)) {
      return props.margin + "px";
    } else if (Array.isArray(props.margin)) {
      let str = ``;
      props.margin.map((num, i) => (str += `${props.margin[i]}px `));
      return str;
    } else {
      return props.margin;
    }
  }};
`;

export default function ImageContainer({
  width,
  height,
  radius,
  children,
  margin,
}) {
  return (
    <StyledImageContainer
      width={width}
      height={height}
      radius={radius}
      margin={margin}
    >
      {children}
    </StyledImageContainer>
  );
}

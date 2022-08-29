import styled from "styled-components";

// icons
import {
  RightOutlined,
  LeftOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { COLORS } from "styles/variables";

const StyledArrow = styled.div`
  position: absolute;
  ${(props) => (props.prev ? "left: 25px;" : "")}
  ${(props) => (props.next ? "right: 25px;" : "")}
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: #fff;
  color: #000;
  z-index: 2000;
  border-radius: 50%;
  cursor: pointer;
  ${(props) => {
    if (props.type === "product") {
      return `
        border: 1px solid ${COLORS.TEXT_PRIMARY};
      `;
    }
  }}
`;

export function NextArrow(props) {
  const { className, style, onClick, type } = props;

  return (
    <StyledArrow next onClick={onClick} type={type}>
      {type === "product" ? <ArrowRightOutlined /> : <RightOutlined />}
    </StyledArrow>
  );
}

export function PrevArrow(props) {
  const { className, style, onClick, type } = props;
  return (
    <StyledArrow prev onClick={onClick} type={type}>
      {type === "product" ? <ArrowLeftOutlined /> : <LeftOutlined />}
    </StyledArrow>
  );
}

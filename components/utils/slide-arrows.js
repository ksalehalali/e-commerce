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
    ${(props) => (props.prev ? "left: 5px;" : "")}
    ${(props) => (props.next ? "right: 5px;" : "")}
  top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: #fff;
    color: #000;
    z-index: 2000;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s ease;
    box-shadow: 0 0 9px 0px #00000058;

    &:hover {
        opacity: 1;
    }
    ${(props) => {
        if (props.type === "product") {
            return `
        border: 2px solid ${COLORS.TEXT_PRIMARY};
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

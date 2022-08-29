import { useCallback, useState } from "react";
import styled from "styled-components";
// components
import { COLORS } from "styles/variables";
// styles
const StyledCustomDropdown = styled.div`
  position: relative;
`;

const StyledCustomMenuContainer = styled.div`
  background-color: #fff;
  position: absolute;
  top: calc(100% + 10px);
  right: -10px;
  min-width: 140px;
  max-height: 300px;
  width: fit-content;
  padding: 10px;
  border: 2px solid ${COLORS.GRAY};
  border-radius: 3px;
  z-index: 10000;
`;
//   border-color: 1px solid ${(props) => props.theme.colors.primary};
const StyledMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const StyledMenuItem = styled.li`
  &:hover {
    background-color: ${COLORS.BG_COLOR_GRAY};
  }
`;

function CustomDropdown(props) {
  const [show, setShow] = useState(false);

  const handleVisibleChange = useCallback(() => {
    props.disabled && false;
    setShow((prev) => !prev);
  }, [props.disabled]);

  return (
    <StyledCustomDropdown onClick={handleVisibleChange}>
      {props.children}
      {show && (
        <StyledCustomMenuContainer>
          <StyledMenu>
            <StyledMenuItem>some menu</StyledMenuItem>
          </StyledMenu>
        </StyledCustomMenuContainer>
      )}
    </StyledCustomDropdown>
  );
}

export default CustomDropdown;

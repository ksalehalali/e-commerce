import { memo, useCallback } from "react";
import styled from "styled-components";
// components
import Text from "components/utils/text";
import FlexDiv from "components/utils/flex-div";
import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import { COLORS } from "styles/variables";

// styles
const StyledTag = styled(FlexDiv)`
  border-radius: 5px;
  font-size: 0.9em;
  width: 80px;
  height: ${(props) =>
    props.height && Number.isInteger(props.height) ? `${props.height} px` : ""};
  color: ${COLORS.TITLE};
  border: 2px solid ${COLORS.GRAY};
  padding: 0 5px;
`;
const StyledAction = styled.a`
  line-height: 2px;
  color: ${COLORS.GRAY};
  &:hover {
    color: ${COLORS.PRIMARY};
  }
`;

function ProductItemSum({
  setNumber,
  number,
  height = 24,
  isThereChangesRef,
  handleChangeNumber,
}) {
  const handleNumberChange = useCallback(
    (type) => {
      if (!isThereChangesRef.current || isThereChangesRef.current === false)
        isThereChangesRef.current = true;
      // increament or decrement
      if (type === "increament") setNumber((prev) => ++prev);
      else if (type === "decrement")
        setNumber((prev) => {
          if (prev === 1) return prev;
          else return --prev;
        });
    },
    [number]
  );

  return (
    <StyledTag alignCenter spaceAround height={height}>
      <StyledAction
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleNumberChange("increament");
        }}
      >
        <PlusCircleFilled />
      </StyledAction>
      <Text bold>{number}</Text>
      <StyledAction
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleNumberChange("decrement");
        }}
      >
        <MinusCircleFilled />
      </StyledAction>
    </StyledTag>
  );
}

export default ProductItemSum;

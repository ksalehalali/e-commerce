import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  background-image: url(https://via.placeholder.com/400x400);
`;

function Temporary() {
  return (
    <StyledDiv>
      <h2>Some Text</h2>
    </StyledDiv>
  );
}

export default Temporary;

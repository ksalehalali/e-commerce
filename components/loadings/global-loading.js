import styled from "styled-components";

import { LoadingOutlined } from "@ant-design/icons";
import { COLORS } from "styles/variables";

// redux
import { useSelector } from "react-redux";
// styles

const LoadingContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
`;

const StyledLoading = styled(LoadingOutlined)`
  font-size: 64px;
  color: ${COLORS.PRIMARY};
`;

function GlobalLoading() {
  const { value } = useSelector((state) => state.loading);

  if (!value) return <></>;

  return (
    <LoadingContainer>
      <StyledLoading />
    </LoadingContainer>
  );
}

export default GlobalLoading;

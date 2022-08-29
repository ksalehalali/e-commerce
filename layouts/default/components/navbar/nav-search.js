import styled from "styled-components";
import { useRouter } from "next/router";
// components
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons/lib/icons";
import { FiSearch } from "react-icons/fi";
import { COLORS } from "styles/variables";

const StyledNavSearch = styled.div`
  flex: 1;
`;

const StyledSearchIcon = styled(FiSearch)`
  color: ${COLORS.GRAY};
  font-size: 1.2em;
`;

const StyledInput = styled(Input)`
  border: 0;
  border-radius: 0.4em;
`;

function NavSearch({ t }) {
  const router = useRouter();
  return (
    <StyledNavSearch>
      <StyledInput
        suffix={router.locale === "ar" ? <StyledSearchIcon /> : false}
        prefix={router.locale === "en" ? <StyledSearchIcon /> : false}
        size={"large"}
        placeholder={t("navbar.search")}
      />
    </StyledNavSearch>
  );
}

export default NavSearch;

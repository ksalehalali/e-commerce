import styled from "styled-components";
import { useRouter } from "next/router";
// components
import { Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons/lib/icons";
import { FiSearch } from "react-icons/fi";
import { COLORS } from "styles/variables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchAction, searchLoading } from "redux/modal/action";

const StyledNavSearch = styled.div`
    flex: 1;
    position: relative;
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
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { searchResultNumber, loadingState } = useSelector(
        (state) => state.modal
    );

    const handleSearch = (e) => {
        setInputValue(e.target.value);
        dispatch(searchAction(inputValue));

        if (inputValue.split("").length >= 2) {
            if (router.pathname !== "/categories")
                return router.push("/categories");
        } else {
            return false;
        }
    };

    return (
        <StyledNavSearch>
            {loadingState && <Spin />}
            <StyledInput
                suffix={router.locale === "ar" ? <StyledSearchIcon /> : false}
                prefix={router.locale === "en" ? <StyledSearchIcon /> : false}
                size={"large"}
                placeholder={t("navbar.search")}
                onInput={handleSearch}
                value={inputValue}
            />
        </StyledNavSearch>
    );
}

export default NavSearch;

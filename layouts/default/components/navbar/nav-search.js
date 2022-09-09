import styled from "styled-components";
import { useRouter } from "next/router";
// components
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons/lib/icons";
import { FiSearch } from "react-icons/fi";
import { COLORS } from "styles/variables";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchAction } from "redux/modal/action";

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
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();
    const data = useSelector((state) => state.modal.allProducts);

    const handleSearch = (e) => {
        setInputValue(e.target.value);
        dispatch(searchAction(inputValue));

        if (inputValue.split("").length >= 2) {
            router.push("/categories");
        }
    };

    // const onEnter = (e) => {
    //     if (e.key === "Enter" && inputValue !== "") {
    //         dispatch(searchAction(inputValue));
    //         router.push("/categories");
    //     }
    // };

    return (
        <StyledNavSearch>
            <StyledInput
                suffix={router.locale === "ar" ? <StyledSearchIcon /> : false}
                prefix={router.locale === "en" ? <StyledSearchIcon /> : false}
                size={"large"}
                placeholder={t("navbar.search")}
                onChange={handleSearch}
            />
        </StyledNavSearch>
    );
}

export default NavSearch;

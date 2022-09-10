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
    const { searchResultNumber, st } = useSelector((state) => state.modal);
    console.log("res", searchResultNumber, st);

    const handleSearch = (e) => {
        setInputValue(e.target.value);
        dispatch(searchAction(inputValue));

        if (inputValue.split("").length >= 2) {
            router.push("/categories");
        } else if ((inputValue.split("").length = 0)) {
            console.log("step 2");
        } else if (searchResultNumber === 0) {
            console.log("step 3");
        } else {
            console.log("step 4");
            return false;
        }
    };

    // useEffect(() => {
    //     console.log("back");
    //     setLoading(false);
    // }, [searchResultNumber]);

    return (
        <StyledNavSearch>
            {st && <Spin />}
            <StyledInput
                suffix={router.locale === "ar" ? <StyledSearchIcon /> : false}
                prefix={router.locale === "en" ? <StyledSearchIcon /> : false}
                size={"large"}
                placeholder={t("navbar.search")}
                onInput={handleSearch}
            />
        </StyledNavSearch>
    );
}

export default NavSearch;

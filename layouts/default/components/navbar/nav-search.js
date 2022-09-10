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
    const { searchResultNumber, loading: l } = useSelector(
        (state) => state.modal
    );
    const [loading, setLoading] = useState(false);
    console.log(searchResultNumber, l);

    const handleSearch = (e) => {
        setInputValue(e.target.value);
        dispatch(searchAction(inputValue));
        if (searchResultNumber >= 0) {
            setLoading(false);
        }

        if (inputValue.split("").length >= 2) {
            setLoading(true);
            dispatch(searchLoading(200));
            router.push("/categories");
        } else if ((inputValue.split("").length = 0)) {
            setLoading(false);
        } else {
            return false;
        }
    };

    // useEffect(() => {
    //     console.log("back");
    //     if (st === 404) {
    //         setLoading(false);
    //     }
    // }, [searchLoading]);

    // const onEnter = (e) => {
    //     if (e.key === "Enter" && inputValue !== "") {
    //         dispatch(searchAction(inputValue));
    //         router.push("/categories");
    //     }
    // };

    return (
        <StyledNavSearch>
            {loading && <Spin />}
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

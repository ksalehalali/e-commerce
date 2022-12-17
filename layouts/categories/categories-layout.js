import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
// components
import FlexDiv from "components/utils/flex-div";
import Container from "components/utils/container";
import { Breadcrumb, Space, Tree, Collapse, Empty } from "antd";
import Text from "components/utils/text";
import { AppstoreFilled, DownOutlined } from "@ant-design/icons";
// modules
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";

import SidebarItem from "./SidebarItem";
const { Panel } = Collapse;

// styles
const CategoryLayout = styled(FlexDiv)``;
const Side = styled.aside`
    width: 300px;
`;
const Main = styled.div`
    flex: 1;
`;

const Header = styled.div`
    padding: 12px 16px;
`;

const StyledSideCollapse = styled.div``;

function CategoriesLayout({ children, sideList }) {
    const { t } = useTranslation("common");
    const { searchResultNumber } = useSelector((state) => state.modal);
    const router = useRouter();
    const { id } = router.query;
    const [categoriesList, setCategoriesList] = useState();
    const { locale } = router;
    const [selectedItem, setSelectedItem] = useState();

    // fetch category by category
    useEffect(() => {
        if (id.split(" ").length == 1) {
            axios
                .post(
                    "https://dashcommerce.click68.com/api/ListCategoryByCategory",
                    {
                        id: id,
                    },
                    {
                        headers: {
                            lang: router.locale,
                        },
                    }
                )
                .then((result) => {
                    if (result.data.description.length > 0) {
                        setCategoriesList(result?.data.description);
                    }
                })
                .catch((err) => console.error("Get categories:", err));
        } else {
            setCategoriesList(sideList);
        }
    }, [id]);

    useEffect(() => {
        setSelectedItem("");
    }, [categoriesList]);

    const changeSelectedItem = (item) => {
        setSelectedItem(item);
    };

    return (
        <Container>
            <CategoryLayout gap={10} column>
                <Header>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item href="/">
                            {t("navbar.home")}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {/* {categoriesList && categoriesList[0]?.category} */}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {locale === "ar"
                                ? selectedItem?.name_AR
                                : selectedItem?.name_EN}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <FlexDiv gap={10}>
                    <Side>
                        <StyledSideCollapse>
                            {categoriesList?.map((item, index) => (
                                <SidebarItem
                                    index={index}
                                    key={index}
                                    item={item}
                                    changeSelectedItem={() =>
                                        changeSelectedItem(item)
                                    }
                                    setActive={sideList ? true : false}
                                />
                            ))}
                        </StyledSideCollapse>
                    </Side>
                    <Main>
                        <FlexDiv column>
                            <FlexDiv spaceBetween padding={"12px 16px"}>
                                <Text bold>
                                    {t("searchResultTxt", {
                                        count: searchResultNumber,
                                    })}
                                </Text>
                                <FlexDiv gap={20}>
                                    <a>
                                        <Space>
                                            <Text bold>{t("sortTxt")}</Text>
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                    <a>
                                        <Space>
                                            <Text bold>{t("viewTxt")}</Text>
                                            <AppstoreFilled />
                                        </Space>
                                    </a>
                                </FlexDiv>
                            </FlexDiv>
                            <div>{children}</div>
                        </FlexDiv>
                    </Main>
                </FlexDiv>
            </CategoryLayout>
        </Container>
    );
}

export default CategoriesLayout;

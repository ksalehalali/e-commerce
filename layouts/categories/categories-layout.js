import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
// components
import FlexDiv from "components/utils/flex-div";
import Container from "components/utils/container";
import { Breadcrumb, Space, Tree, Collapse, Empty } from "antd";
import Text from "components/utils/text";
import {
    AppstoreFilled,
    CarryOutOutlined,
    DownOutlined,
    FromOutlined,
    UserOutlined,
    PlusSquareOutlined,
    LoadingOutlined,
    RightOutlined,
} from "@ant-design/icons";
// modules
import { COLORS } from "styles/variables";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import CategoryChild from "./SidebarItem";
import Items from "./data.json";
import SidebarItem from "./SidebarItem";
const { Panel } = Collapse;

const categories = [
    {
        catNameAR: "موضة نسائية",
        catName: "Women's Fashion",
        imagePath: "assets/images/pexels-lan-anh-ho…ng-10353828.jpg",
        id: "31afd7d2-5f4d-406d-ae5d-b46e5055b80c",
        hasChildren: true,
    },
    {
        catNameAR: "موضة رجالية",
        catName: "Men's Fashion",
        imagePath: "assets/images/austin-wade-d2s8NQ6WD24-unsplash.jpg",
        id: "f6222596-f422-4891-9a55-664e5e3017aa",
        hasChildren: true,
    },
    {
        catNameAR: "اولاد، اطفال والعاب",
        catName: "Kids, Baby & Toys",
        imagePath: "assets/images/robo-wunderkind-3EuPcI31MQU-unsplash.jpg",
        id: "818ce955-2ce3-4486-ba6e-45784c5cce99",
        hasChildren: true,
    },
    {
        catNameAR: "إكسسوارات وهدايا",
        catName: "Accessories and gifts",
        imagePath: "assets/images/freestocks-PxM8aeJbzvk-unsplash.jpg",
        id: "d115a1f7-2407-4446-9caa-dc9744e5bfa8",
        hasChildren: true,
    },
    {
        catNameAR: "الجمال",
        catName: "beauty supplies",
        imagePath: "assets/images/laura-chouette-RkINI2JZwss-unsplash.jpg",
        id: "7309f628-b98b-49cf-a67f-f01403baa31a",
        hasChildren: true,
    },
    {
        catNameAR: "ملتزمات رجالية",
        catName: "Men's stuff",
        imagePath: "assets/images/aniket-narula-XjNI-C5G6mI-unsplash.jpg",
        id: "bdd1e12a-ffa7-4b9c-93a5-b4180fb33675",
        hasChildren: true,
    },
    {
        catNameAR: "الموبايل وإكسسواراته",
        catName: "Mobiles & Accessories",
        imagePath: "assets/images/mehrshad-rajabi-cLrcbfSwBxU-unsplash.jpg",
        id: "e38f580e-b705-4055-ba59-6bc5714d7616",
        hasChildren: true,
    },
    {
        catNameAR: "المنزل والمطبخ",
        catName: "Home & Kitchen",
        imagePath: "assets/images/ryan-christodoulou-68CDDj03rks-unsplash.jpg",
        id: "d2a67fba-9070-4687-ae75-fb74f25e7924",
        hasChildren: true,
    },
    {
        catNameAR: "ماركات",
        catName: "Brands",
        imagePath: "assets/images/zara-outlet.jpg",
        id: "4774bfdb-5dca-47e7-a43b-0a8acb659305",
        hasChildren: true,
    },

    {
        catNameAR: "احذية رجالية",
        catName: "Men's shoes",
        imagePath: "assets/images/iman-ameli-XNWBOKpYgYE-unsplash.jpg",
        id: "7ff2c840-1f34-4f76-9fe9-07c123265c1e",
        hasChildren: true,
    },
    {
        catNameAR: "احذية نسائية",
        catName: "Women's shoes",
        imagePath: "assets/images/mohammad-metri-E-0ON3VGrBc-unsplash.jpg",
        id: "3ca11af3-e200-4898-8eb9-30f1bf3b8347",
        hasChildren: true,
    },
    {
        catNameAR: "احذية أطفال",
        catName: "Kids shoes",
        imagePath: "assets/images/lefteris-kallergis-j1GiPlvSGWI-unsplash.jpg",
        id: "33739903-d8c5-4604-9f27-4e52273110e8",
        hasChildren: true,
    },
    {
        catNameAR: "ألبسة الأطفال",
        catName: "Children's Clothing",
        imagePath: "assets/images/lefteris-kallergis-j1GiPlvSGWI-unsplash.jpg",
        id: "6956bc2b-b8f6-48be-8be6-6c56983c79d5",
        hasChildren: true,
    },
];

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

const StyledLink = styled.a`
    ${(props) =>
        props.active
            ? `
    color: ${COLORS.PRIMARY};
    font-weight: bold;
  `
            : ``}
`;

const StyledSideCollapse = styled.div``;
const Item = styled.a`
    display: block;
`;

function CategoriesLayout({ children, sideList }) {
    const { t } = useTranslation("common");
    const { searchResultNumber } = useSelector((state) => state.modal);
    const router = useRouter();
    const { id } = router.query;
    const { searchAction } = useSelector((state) => state.modal);
    const [currentCat, setCurrentCat] = useState();
    const [categoriesList, setCategoriesList] = useState([]);
    const { locale } = router;

    useEffect(() => {
        if (router.pathname === "/categories") {
            setCategoriesList(sideList);
        } else {
            console.log("false");
        }
    }, [router]);

    useEffect(() => {
        const currentIdExist = categories.some((item) => item.id === id);
        if (currentIdExist) {
            setCurrentCat(categories.find((item) => item.id === id));
        }
    }, [id]);

    const [treeData, setTreeData] = useState([]);
    const [treeLoading, setTreeLoading] = useState({
        target: null,
        value: false,
    });
    const [expandKeys, setExpandKeys] = useState([]);
    const [selectedItem, setSelectedItem] = useState();

    // fetch category by category
    useEffect(() => {
        axios
            .post(
                "https://dashcommerce.click68.com/api/ListCategoryByCategory",
                {
                    id: id,
                },
                {
                    headers: {
                        // Authorization: `Bearer ${cookies?.token}`,
                        lang: router.locale,
                    },
                }
            )
            .then((result) => {
                if (result.data.description.length > 0) {
                    setCategoriesList(result?.data.description);
                } else {
                    console.log("No categories!!");
                }
            })
            .catch((err) => console.error("Get categories:", err));
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
                            {locale === "ar"
                                ? currentCat?.catNameAR
                                : currentCat?.catName}
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
                            {categoriesList.length > 0
                                ? categoriesList?.map((item, index) => (
                                      <SidebarItem
                                          index={index}
                                          key={index}
                                          item={item}
                                          changeSelectedItem={() =>
                                              changeSelectedItem(item)
                                          }
                                      />
                                  ))
                                : sideList?.map((item, index) => (
                                      <SidebarItem
                                          index={index}
                                          key={index}
                                          item={item}
                                          changeSelectedItem={() =>
                                              changeSelectedItem(item)
                                          }
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

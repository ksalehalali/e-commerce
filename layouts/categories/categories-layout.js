import { useCallback, useEffect, useState } from "react";
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

const StyledSideCollapse = styled(Collapse)`
    .ant-collapse-item.ant-collapse-item-active {
        .ant-collapse-header {
            color: ${COLORS.PRIMARY};
        }
    }
    .ant-collapse-item {
        .ant-collapse-header {
            &:hover {
                color: ${COLORS.PRIMARY};
            }
        }
    }
    .ant-collapse-content-box {
        padding-top: 0 !important;
    }
`;

function CategoriesLayout({ children, sideList }) {
    const { t } = useTranslation("common");
    const { searchResultNumber } = useSelector((state) => state.modal);
    console.log("modal");
    const router = useRouter();
    const { id } = router.query;

    const choisen = categories.filter((item) => item.id === id);
    console.log(choisen[0]?.catName);

    console.log("side list", sideList);

    const [treeData, setTreeData] = useState([]);
    const [treeLoading, setTreeLoading] = useState({
        target: null,
        value: false,
    });
    const [expandKeys, setExpandKeys] = useState([]);

    const onLoadData = useCallback(({ key, children }) => {
        console.log(key, "key");
        console.log(children, "children");
    }, []);

    // const iterateArray = (list) => {
    //   console.log("iterateArray");
    //   console.log(list);
    //   if (Array?.isArray(list)) {
    //     for (let i = 0; i < list?.length; i++) {
    //       if (Array?.isArray(list[i]?.children) && list[i]?.children.length > 0) {
    //         iterateArray(list[i]?.children);
    //       } else if (list[i]?.children.length === true) {
    //         return true;
    //       } else return false;
    //     }
    //   } else return list;
    // };

    // const validateData = useCallback(
    //   (selectedKey) => {
    //     console.log("treeData?.children");
    //     console.log(treeData);
    //     let go = true;
    //     let i = 0;
    //     let currentData = [];
    //     while (go === true) {
    //       if (treeData[i]?.id === selectedKey) {
    //         currentData = treeData[i]?.children;
    //       }
    //       i++;
    //     }

    //     let isValid = iterateArray(treeData?.children);

    //     console.log("isValid");
    //     console.log(isValid);
    //   },
    //   [treeData]
    // );

    const onSelectTree = useCallback(async (selectedKey, e) => {
        const { id, haveChildren, pos } = e?.node;
        console.log("pos");
        console.log(pos);
        if (haveChildren === false) {
            return;
        } else {
            setTreeLoading({ target: pos, value: true });
            const { data: res } = await axios.post(
                "https://dashcommerce.click68.com/api/ListCategoryByCategory",
                {
                    id,
                }
            );
            if (res?.status === true) {
                console.log(treeData[0]);
                setTreeData((prev) => {
                    let newTree = prev;
                    newTree[0].children = parseTreeDataObject(
                        res?.description,
                        pos
                    );
                    newTree[0].haveChildren = false;
                    return [...newTree];
                });
                setExpandKeys((prev) => {
                    let newArr = prev;
                    newArr.push(pos.toString());
                    return [...newArr];
                });
            }
            setTreeLoading({ target: null, value: false });
        }

        // const isValid = validateData(selectedKey[0]);
        // const { data: res } = await axios.post(
        //   "https://dashcommerce.click68.com/api/ListCategoryByCategory",
        //   {
        //     id: selectedKey[0],
        //   }
        // );
    }, []);

    const handleTreeOnExpand = useCallback(
        async (expandedKeys, { isExpanded, node }) => {
            const { id, haveChildren, pos, children } = node;

            if (haveChildren === true) {
                setTreeLoading({ target: pos, value: true });
                const { data: res } = await axios.post(
                    "https://dashcommerce.click68.com/api/ListCategoryByCategory",
                    {
                        id,
                    }
                );
                if (res?.status === true) {
                    console.log(treeData[0]);
                    setTreeData((prev) => {
                        let newTree = prev;
                        newTree[0].children = parseTreeDataObject(
                            res?.description,
                            pos
                        );
                        newTree[0].haveChildren = false;
                        return [...newTree];
                    });
                    setExpandKeys((prev) => {
                        let newArr = prev;
                        newArr.push(pos.toString());
                        return [...newArr];
                    });
                }
                setTreeLoading({ target: null, value: false });
            }

            setExpandKeys(expandedKeys);
        },
        []
    );

    const parseTreeDataObject = useCallback((list, pos) => {
        let newData = [];
        list?.map((item, i) => {
            newData.push({
                title: item?.[`name_${router.locale.toUpperCase()}`],
                key: pos + "-" + i,
                id: item?.id,
                children: [],
                haveChildren: item?.children,
                icon: item?.children ? <PlusSquareOutlined /> : null,
                // switcherIcon: <FromOutlined />,
            });
        });
        return newData;
    }, []);

    console.log("expandKeys");
    console.log(expandKeys);

    useEffect(() => {
        let newData = [];
        sideList?.map((item, i) => {
            newData.push({
                title: item?.[`name_${router.locale.toUpperCase()}`],
                key: "0-" + i,
                id: item?.id,
                children: item?.children ? ["+"] : [],
                haveChildren: item?.children,
                // icon: item?.children ? <PlusSquareOutlined /> : null,
                // switcherIcon: <FromOutlined />,
            });
        });
        setTreeData([...newData]);
    }, [sideList]);

    useEffect(() => {
        setExpandKeys([]);
    }, [id]);

    return (
        <Container>
            <CategoryLayout gap={10} column>
                <Header>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item href="/">
                            {t("navbar.home")}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {t("footer.categories")}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <FlexDiv gap={10}>
                    <Side>
                        {/* {!loading && error && (
              <Alert description={error} showIcon type="error" />
            )} */}
                        <StyledSideCollapse defaultActiveKey={["1"]} ghost>
                            <Panel header={choisen[0]?.catName} key="1">
                                {/* <Tree loadData={onLoadData} treeData={treeData} /> */}
                                <Tree
                                    // showLine
                                    switcherIcon={<DownOutlined />}
                                    defaultExpandedKeys={[]}
                                    // onSelect={onSelectTree}
                                    selectable={false}
                                    treeData={treeData}
                                    onExpand={handleTreeOnExpand}
                                    expandedKeys={expandKeys}
                                    titleRender={(node) => {
                                        return (
                                            console.log(node),
                                            (
                                                <Link
                                                    href={`/categories/${node?.id}`}
                                                >
                                                    <a>
                                                        {node?.title}
                                                        {treeLoading.target ===
                                                            node?.key &&
                                                            treeLoading.value &&
                                                            "loading ..."}
                                                    </a>
                                                </Link>
                                            )
                                        );
                                    }}
                                />
                            </Panel>
                            {/* <Panel header="Brand" key="2">
                <Empty />
              </Panel>
              <Panel header="Size" key="3">
                <Empty />
              </Panel>
              <Panel header="Color" key="4">
                <Empty />
              </Panel>
              <Panel header="Length" key="5">
                <Empty />
              </Panel> */}
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

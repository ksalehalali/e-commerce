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

  const router = useRouter();
  const { id } = router.query;
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
          newTree[0].children = parseTreeDataObject(res?.description, pos);
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
            newTree[0].children = parseTreeDataObject(res?.description, pos);
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
            <Breadcrumb.Item href="/">{t("navbar.home")}</Breadcrumb.Item>
            <Breadcrumb.Item>{t("footer.categories")}</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <FlexDiv gap={10}>
          <Side>
            {/* {!loading && error && (
              <Alert description={error} showIcon type="error" />
            )} */}
            <StyledSideCollapse defaultActiveKey={["1"]} ghost>
              <Panel header={t("footer.categories")} key="1">
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
                      <Link href={`/categories/${node?.id}`}>
                        <a>
                          {node?.title}{" "}
                          {treeLoading.target === node?.key &&
                            treeLoading.value &&
                            "loading ..."}
                        </a>
                      </Link>
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
                    count: 200,
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

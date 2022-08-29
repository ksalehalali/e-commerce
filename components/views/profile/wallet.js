import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
// components
import { Button, Row, Col, Space, Divider, Pagination } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Text from "components/utils/text";
import FlexDiv from "components/utils/flex-div";
// hooks
import useFetch from "hooks/useFetch";
// redux
import { useDispatch } from "react-redux";
import { openModal } from "redux/modal/action";
import * as constants from "redux/modal/constants";
// styles
import { COLORS } from "styles/variables";
import useTranslation from "next-translate/useTranslation";

const Page = styled.div``;
const PageHeader = styled.div`
  padding: 30px;
  background-color: ${COLORS.ALPHA_PRIMARY};
  border-radius: 10px;
`;
const PageContent = styled.div`
  margin: 20px 0;
`;

const StyledRowHeader = styled(Row)`
  background-color: ${COLORS.TEXT_PRIMARY};
  padding: 10px;
  color: #fff;
`;

const StyledRowContent = styled(Row)`
  padding: 10px;
  &:hover {
    background-color: ${COLORS.BG_COLOR_GRAY};
  }
`;

const SuccessStatus = ({ t }) => (
  <FlexDiv column gap={5} alignCenter>
    <Text title color="green">
      {t("profile:wallet.table.success")}
    </Text>
    <CheckCircleFilled style={{ color: "green", fontSize: 32 }} />
  </FlexDiv>
);
const ErrorStatus = ({ t }) => (
  <FlexDiv column gap={5} alignCenter>
    <Text title color="red">
      {t("profile:wallet.table.fail")}
    </Text>
    <CloseCircleFilled style={{ color: "red", fontSize: 32 }} />
  </FlexDiv>
);

function WalletPageContent({ locale }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [tableData, setTableData] = useState({});
  const [current, setCurrent] = useState(1);

  // get wallet
  const {
    data: myWalletData,
    error: myWalletError,
    loading: myWalletLoading,
    executeFetch: getMyWallet,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_GET_WALLET,
    "get",
    {},
    true
  );
  // list wallet charge
  const {
    data: listData,
    error: listError,
    loading: listLoading,
    executeFetch: getWalletChargeList,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API +
      process.env.NEXT_PUBLIC_LIST_CHARGE_WALLET,
    "post",
    {
      PageNumber: 1,
      SizeNumber: 10,
    },
    false
  );

  const handleOpenModal = useCallback(() => {
    dispatch(
      openModal(constants.modalType_charge_wallet, {
        getMyWallet,
        getWalletChargeList,
      })
    );
  }, []);

  // on page change
  const onPageChange = useCallback((newCurrent) => {
    setCurrent(newCurrent);
  }, []);

  // useEffect for list data
  useEffect(() => {
    if (listData?.status === true && listData?.description?.length > 0) {
      setTableData((prev) => {
        let newData = prev;
        let isExist = newData?.[current];

        if (!isExist) {
          newData[`${current}`] = listData?.description;
        }
        return { ...newData };
      });
    }
  }, [listData]);

  // useEffect for current page
  useEffect(() => {
    document.getElementById("Header").scrollIntoView({ behavior: "smooth" });
    if (!tableData?.[current]) {
      getWalletChargeList({ PageNumber: current });
    }
  }, [current]);

  return (
    <Page>
      <PageHeader id="Header">
        <FlexDiv alignCenter spaceBetween>
          <FlexDiv column gap={5}>
            <Text title color={COLORS.PRIMARY}>
              {myWalletLoading ? (
                <LoadingOutlined />
              ) : (
                <>${myWalletData?.description?.total || "0.00"}</>
              )}
            </Text>
            <Text color={COLORS.PRIMARY}>
              {t("profile:wallet.currentBalance")}
            </Text>
          </FlexDiv>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenModal}
          >
            {t("profile:wallet.addMoney")}
          </Button>
        </FlexDiv>
      </PageHeader>
      <PageContent>
        <Text title>{t("profile:wallet.allTransaction")}</Text>
        <StyledRowHeader>
          <Col span={12}>
            <Text bold>{t("profile:wallet.table.operationDetails")}</Text>
          </Col>
          <Col span={6}>
            <Text bold>{t("profile:wallet.table.total")}</Text>
          </Col>
          <Col span={6} style={{ textAlign: "center" }}>
            <Text bold>{t("profile:wallet.table.status")}</Text>
          </Col>
        </StyledRowHeader>
        {listLoading && (
          <FlexDiv padding={"50px 20px"} alignCenter justifyCenter>
            <LoadingOutlined style={{ fontSize: 42, color: COLORS.PRIMARY }} />
          </FlexDiv>
        )}
        {!listLoading &&
          listData?.status === true &&
          tableData?.[current]?.map((item) => (
            <StyledRowContent key={item.id}>
              <Col span={12}>
                <FlexDiv column justifyCenter cStyle={`height: 100%;`}>
                  <Text bold>{t("profile:wallet.addMoney")}</Text>
                  {/* <Text color={"#ccc"}>Transaction ID: 3245567624</Text> */}
                  <Space split="-">
                    <Text color={"#ccc"}>04 Apr, 2022</Text>
                    <Text color={"#ccc"}>04:45pm</Text>
                  </Space>
                </FlexDiv>
              </Col>
              <Col span={6}>
                <FlexDiv alignCenter cStyle={`height: 100%;`}>
                  <Text color={"#ccc"}>${item.value}</Text>
                </FlexDiv>
              </Col>
              <Col span={6}>
                <SuccessStatus t={t} />
              </Col>
            </StyledRowContent>
          ))}
        <Pagination
          total={listData?.total}
          current={current}
          onChange={onPageChange}
        />
      </PageContent>
    </Page>
  );
}

export default WalletPageContent;

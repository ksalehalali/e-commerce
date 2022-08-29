import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
// components
import { Button, message, Space, Table, Tag, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CreditCardOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Text from "components/utils/text";
import FlexDiv from "components/utils/flex-div";
// hooks
import useFetch from "hooks/useFetch";

// modules
import moment from "moment";

// styles
import { COLORS } from "styles/variables";
import { FaTruck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "redux/loading/actions";
import { ActionRequiredContext } from "context/action-context";
import useTranslation from "next-translate/useTranslation";

// OrderedProductItem styles
const StyledImage = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

function OrderedProductItem({ image, title, id, offer, price }) {
  return (
    <Link href={`/product/${id}`}>
      <a>
        <FlexDiv gap={10}>
          <FlexDiv>
            <StyledImage>
              <Image
                alt="orderd image"
                src={process.env.NEXT_PUBLIC_HOST_API + image}
                layout="responsive"
                width={"100%"}
                height={100}
              />
            </StyledImage>
          </FlexDiv>
          <FlexDiv spaceBetween column gap={10}>
            <Text bold="bold" line={1}>
              {title}
            </Text>
            <FlexDiv gap={20} alignCenter>
              {offer && <Text priceOffer>{offer}%</Text>}
              <Text price fontSize={15} bold>
                {price}$
              </Text>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </a>
    </Link>
  );
}

// Order Status Tag Styles
const StyledTag = styled(Tag)`
  display: flex;
  width: fit-content;
  align-items: center;
`;

function OrderStatusTag({ status, t }) {
  let color, text, icon;
  switch (status) {
    case 0:
      color = "warning";
      text = t("common:deliverStatus.pending");
      icon = <ClockCircleOutlined />;
      break;
    case 1:
      color = "processing";
      text = t("common:deliverStatus.process");
      icon = <SyncOutlined spin />;
      break;
    case 2:
      color = "blue";
      text = t("common:deliverStatus.delivering");
      icon = <FaTruck style={{ marginInlineEnd: 5 }} />;
      break;
    case 3:
      color = "success";
      text = t("common:deliverStatus.success");
      icon = <CheckCircleOutlined />;
      break;
    default:
      color = "default";
      text = "--";
      icon = <ExclamationCircleOutlined />;
  }
  return (
    <StyledTag color={color} icon={icon}>
      {text}
    </StyledTag>
  );
}

function MyOrdersPageContent({ locale, router }) {
  const { t } = useTranslation();
  // states
  const [tableData, setTableData] = useState({});
  const [current, setCurrent] = useState(1);

  const { action, setAction } = useContext(ActionRequiredContext);

  const dispatch = useDispatch();

  const {
    data: listData,
    error: listError,
    loading: listLoading,
    executeFetch: getList,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API +
      process.env.NEXT_PUBLIC_LIST_ORDER_BY_USER,
    "post",
    {
      PageNumber: 1,
      SizeNumber: 10,
    },
    false
  );

  // on page change
  const onPageChange = useCallback((newCurrent) => {
    setCurrent(newCurrent);
  }, []);

  // payment pending order fetch
  const {
    data: paymentData,
    loading: paymentLoading,
    error: paymentError,
    executeFetch: paymentOrder,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_ADD_PAYMENT,
    "POST",
    {},
    false
  );
  // delete order
  const {
    data: deleteData,
    loading: deleteLoading,
    error: deleteError,
    executeFetch: deleteOrder,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_DELETE_ORDER,
    "POST",
    {},
    false
  );

  // payment pending order
  const handlePaymentPendingOrder = useCallback((OrderID, InvoiceValue) => {
    // payment here
    paymentOrder({
      OrderID,
      InvoiceValue,
    });
  }, []);
  // handle delete order
  const handleDeleteOrder = useCallback((id) => {
    deleteOrder({ id });
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
    // document.getElementById("Header").scrollIntoView({ behavior: "smooth" });
    if (!tableData?.[current]) {
      getList({ PageNumber: current });
    }
  }, [current]);

  // useEffect for payment pending orders
  useEffect(() => {
    if (paymentLoading) dispatch(startLoading());
    else dispatch(stopLoading());

    if (!paymentLoading && paymentData?.status === true) {
      console.log(paymentData);
      window?.open(paymentData?.description?.url);

      setAction({
        type: "payment",
        value: {
          orderID: paymentData?.description?.orderID,
          invoiceId: paymentData?.description?.id,
        },
      });
    } else if (!paymentLoading && paymentError) {
      message.error(paymentError || t("common:messages.error500"));
    }
  }, [paymentData, paymentError, paymentLoading]);

  // delete useEffect
  useEffect(() => {
    if (!deleteLoading && deleteData?.status === true) {
      getList();
      setTableData({});
    } else if (!deleteLoading && deleteError) {
      message.error(deleteError || t("common:messages.error500"));
    }
  }, [deleteData, deleteError, deleteLoading]);

  // useEffect(() => {
  //   if (action?.type === "checkPayment") {

  //   }
  // }, [action]);

  // useEffect(() => {
  //   if (checkPaymentLoading) dispatch(startLoading());
  //   else dispatch(stopLoading());

  //   if (!checkPaymentLoading && checkPaymentData?.status === true) {
  //     window.location.reload();
  //   } else if (!checkPaymentLoading && checkPaymentError) {
  //     alert("Error in Payment");
  //   }
  // }, [checkPaymentData, checkPaymentLoading, checkPaymentError]);

  // table columns
  const columns = [
    {
      title: t("profile:myOrders.table.orderedProduct"),
      dataIndex: ["result", "prduct"],
      key: "id",
      width: "30%",
      render: (data) => {
        return (
          <OrderedProductItem
            title={data[0]?.product}
            image={data[0]?.image}
            id={data[0]?.id}
            offer={data[0]?.offer}
            price={data[0]?.price}
          />
        );
      },
    },
    {
      title: t("profile:myOrders.table.orderNum"),
      dataIndex: "",
      key: "id",
      width: "20%",
      render: (data) => {
        return (
          <Link href={`/profile/my-orders/${data?.result?.id}`}>
            <a>{data?.result?.orderNumber}</a>
          </Link>
        );
      },
    },
    {
      title: t("profile:myOrders.table.status"),
      dataIndex: ["result", "status"],
      key: "id",
      width: "20%",
      render: (data) => {
        return <OrderStatusTag t={t} status={data} />;
      },
    },
    {
      title: t("profile:myOrders.table.total"),
      dataIndex: ["result", "total"],
      key: "id",
      width: "10%",
    },
    {
      title: t("profile:myOrders.table.orderDate"),
      dataIndex: ["result", "orderDate"],
      key: "id",
      width: "20%",
      render: (data) => <>{moment(data).format("LLL")}</>,
    },
    {
      title: "Action",
      dataIndex: ["result"],
      key: "id",
      render: (data) => {
        if (data?.status !== 0) return null;
        return (
          <Space>
            <Tooltip placement="top" title={t("profile:myOrders.table.pay")}>
              <Button
                icon={<CreditCardOutlined />}
                shape="circle"
                onClick={() => handlePaymentPendingOrder(data?.id, data?.total)}
              />
            </Tooltip>
            <Tooltip placement="top" title={t("profile:myOrders.table.delete")}>
              <Button
                shape="circle"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteOrder(data?.id)}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Text as="h1" color={COLORS.PRIMARY} bold="bold" fontSize={24}>
        {t("profile:side.myOrders")}
      </Text>
      <Table
        columns={columns}
        loading={listLoading || deleteLoading}
        dataSource={tableData[current]}
        rowKey={"id"}
        pagination={{
          onChange: onPageChange,
          current: current,
          total: listData?.total,
        }}
      />
    </div>
  );
}

export default MyOrdersPageContent;

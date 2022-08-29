import { memo, useCallback, useContext } from "react";
// components
import FlexDiv from "components/utils/flex-div";
import styled from "styled-components";
import Text from "components/utils/text";
import { Menu, Dropdown, Space, Row, Col } from "antd";
import {
  EllipsisOutlined,
  CheckCircleTwoTone,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
// redux
import { useDispatch } from "react-redux";
import { openModal } from "redux/modal/action";
import * as constants from "redux/modal/constants";
// context
import { PaymentContext } from "context/payment-context";
// styles
import { COLORS } from "styles/variables";
import { useRouter } from "next/router";

const StyledAddressItem = styled(FlexDiv)`
  position: relative;
  border: 2px solid ${COLORS.GRAY};
  transition: border-color 0.4s;
  z-index: 10;
  ${(props) => props?.payment && "cursor: pointer;"}
  ${(props) => props.selected === true && `border-color:${COLORS.PRIMARY}; `}
  &:hover {
    border-color: ${COLORS.PRIMARY};
  }
`;

const Checked = styled(CheckCircleTwoTone)`
  position: absolute;
  top: 10px;
  font-size: 22px;
  ${(props) => {
    if (props.rtl)
      return `
      right: 10px;
    `;
    else
      return `
      left: 10px;
    `;
  }}
`;

const StyledMoreLink = styled.a`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.4s;
  border: 2px solid ${COLORS.GRAY};
  border-radius: 50%;
  font-size: 18px;
  z-index: 1000;
  &:hover {
    border-color: ${COLORS.PRIMARY};
    color: #000;
  }
`;

function AddressItem({
  data,
  isSelected,
  setSelected,
  deleteItem,
  getData,
  payment,
  t,
}) {
  const dispatch = useDispatch();

  const router = useRouter();

  // context
  const { chooseAddress, address } = useContext(PaymentContext);

  const handleEditAddress = useCallback((e) => {
    e.preventDefault();
    dispatch(
      openModal(constants.modalType_delivery_address_confirm, getData, {
        id: data.id,
      })
    );
  }, []);

  const handleSelectItem = useCallback(() => {
    if (payment) {
      chooseAddress(data);
      router.push("/payment");
    } else {
      setSelected(data);
    }
  }, []);

  const handleDeleteItem = useCallback((e) => {
    e.preventDefault();
    deleteItem({ id: data.id });
  }, []);

  const menu = (
    <Menu
      items={[
        {
          label: (
            <a href="#" onClick={handleEditAddress}>
              <Space>
                <EditOutlined /> <Text>Edit</Text>
              </Space>
            </a>
          ),
          key: "0",
        },
        {
          label: (
            <a href="#" onClick={handleDeleteItem}>
              <Text color="red">
                <Space>
                  <DeleteOutlined /> <Text color="inherit">Delete</Text>
                </Space>
              </Text>
            </a>
          ),
          key: "1",
        },
      ]}
    />
  );

  return (
    <StyledAddressItem
      padding={10}
      width={350}
      gap={5}
      column
      selected={payment ? false : isSelected}
      onClick={handleSelectItem}
      payment={payment}
    >
      {!payment && isSelected && (
        <Checked
          rtl={router.locale === "ar" ? true : false}
          twoToneColor={COLORS.PRIMARY}
        />
      )}
      <FlexDiv spaceBetween gap={10}>
        <Text bold color={COLORS.PRIMARY} fontSize={15}>
          {data?.title}
        </Text>

        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <StyledMoreLink onClick={(e) => e.preventDefault()}>
            <EllipsisOutlined style={{ fontSize: "30px" }} />
          </StyledMoreLink>
        </Dropdown>
      </FlexDiv>
      <FlexDiv>
        <Row>
          <Col span={9}>
            <Text bold color={COLORS.TITLE} fontSize={15}>
              {t("delivery-address:name")}
            </Text>
          </Col>
          <Col span={15}>
            <Text bold color={COLORS.TEXT_PRIMARY} fontSize={15} line={1}>
              {data?.nameAddress}
            </Text>
          </Col>
          <Col span={9}>
            <Text bold color={COLORS.TITLE} fontSize={15}>
              {t("delivery-address:address")}
            </Text>
          </Col>
          <Col span={15}>
            <Text bold color={COLORS.TEXT_PRIMARY} fontSize={15} line={3}>
              {data?.address}
            </Text>
          </Col>
          <Col span={9}>
            <Text bold color={COLORS.TITLE} fontSize={15}>
              {t("delivery-address:phone")}
            </Text>
          </Col>
          <Col span={15}>
            <Text bold color={COLORS.TEXT_PRIMARY} fontSize={15}>
              {data?.phone}
            </Text>
          </Col>
        </Row>
      </FlexDiv>
    </StyledAddressItem>
  );
}
export default memo(AddressItem);

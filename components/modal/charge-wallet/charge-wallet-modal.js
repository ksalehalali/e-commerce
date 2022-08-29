import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
// components
import { Modal, Form, Input, Button, message, Alert, InputNumber } from "antd";
import Text from "components/utils/text";
import { MdCreditScore } from "react-icons/md";
// import { STANDARD_SCREENS } from "styles/variables";
// redux
import { useDispatch } from "react-redux";
// actions
import { openModal, closeModal } from "redux/modal/action";
import * as constants from "redux/modal/constants";
// services
import axios from "axios";
// cookies
import { setCookies } from "cookies-next";
import { setNewUser } from "redux/user/action";
// context
import { ActionRequiredContext } from "context/action-context";
import useFetch from "hooks/useFetch";
import useTranslation from "next-translate/useTranslation";
// styles
const FormBody = styled.div`
  padding: 10px 20px;
`;

const StyledModal = styled(Modal)`
  width: 300px;
`;

function ChargeWalletModal({ visible, onClose, successAction = () => false }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { setAction } = useContext(ActionRequiredContext);

  const { data, loading, error, executeFetch } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_CHARGE_WALLET,
    "post",
    {},
    false
  );

  const chargeWallet = useCallback(async (values) => {
    console.log("Charge Wallet Worked ");
    console.log(values);
    executeFetch({
      api_key: "rG>JlBHYJiTr2]Ca9f]Gt{Z3_^KUE(",
      api_secret: ":_O~%+-z6:3qb?1Y<_vF(?BTY@@@=8",
      ...values,
    });
  }, []);

  useEffect(() => {
    if (data?.status === true && !loading) {
      message.success(t("common:messages.chargeWallet200"));
      dispatch(closeModal());
      successAction?.getMyWallet();
      successAction?.getWalletChargeList();
    }
  }, [data, loading, error]);

  return (
    <StyledModal
      visible={visible}
      onCancel={onClose}
      footer={false}
      destroyOnClose={true}
    >
      <Text as="h2" fontSize={24} bold block textAlign="center">
        Charge Your Wallet
      </Text>

      <Form
        name="basic"
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={chargeWallet}
      >
        <FormBody>
          {error && <Alert description={error} showIcon type="error" />}
          <Form.Item
            label="value"
            name="invoiceValue"
            rules={[
              {
                required: true,
                message: "Please enter value",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              size="large"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              stringMode
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              placeholder="Value"
            />
          </Form.Item>
          <Button
            type="primary"
            loading={loading}
            icon={<MdCreditScore />}
            htmlType="submit"
            block
            size="large"
          >
            Charge
          </Button>
        </FormBody>
      </Form>
    </StyledModal>
  );
}

export default ChargeWalletModal;

import { useCallback, useContext, useState } from "react";
import styled from "styled-components";
// components
import { Modal, Form, Input, Button, message, Alert } from "antd";
import Text from "components/utils/text";
// import { STANDARD_SCREENS } from "styles/variables";
// redux
import { useDispatch } from "react-redux";
// actions
import { openModal, closeModal } from "redux/modal/action";
import * as constants from "redux/modal/constants";

// context
import { ActionRequiredContext } from "context/action-context";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
// styles
const FormBody = styled.div`
  padding: 10px 20px;
`;

function LoginModal({ visible, onClose }) {
  const { t } = useTranslation("common");

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const queries = router.query;

  const { setAction } = useContext(ActionRequiredContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleModals = (e) => {
    e.preventDefault();

    dispatch(closeModal(constants.modalType_Login));
    dispatch(openModal(constants.modalType_register));
  };

  const fetchLogin = useCallback(
    async (values) => {
      setLoading(true);
      setError(null);
      const { error, ...rest } = await signIn("credentials", {
        ...values,
        redirect: false,
        // callbackUrl: queries?.redirect ? queries?.redirect : "/",
      });

      if (error) setError(error);
      else {
        setLoading(false);
        onClose();
        router.push(rest?.url);
      }
    },
    [queries]
  );

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={false}
      destroyOnClose={true}
      width={400}
    >
      <Text as="h2" fontSize={24} bold block textAlign="center">
        {t("login.welcome")}
      </Text>
      <Text as="h3" fontSize={18} bold="600" block textAlign="center">
        {t("login.noAccount")}{" "}
        <Text color="primary">
          <a
            href="#d"
            onClick={(e) => {
              e.preventDefault();
              toggleModals(e);
            }}
          >
            {t("login.createAccount")}
          </a>
        </Text>
      </Text>
      <Form
        name="basic"
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={fetchLogin}
      >
        <FormBody>
          {error && <Alert description={error} showIcon type="error" />}
          <Form.Item
            name={"UserName"}
            label={t("login.username")}
            hasFeedback
            rules={[
              {
                required: true,
                message: t("validations.required"),
              },
            ]}
          >
            <Input size="large" placeholder={t("login.username")} />
          </Form.Item>
          <Form.Item
            name={"Password"}
            label={t("login.password")}
            hasFeedback
            rules={[
              {
                required: true,
                message: t("validations.required"),
              },
            ]}
            extra={<a>{t("login.forgotPassword")}</a>}
          >
            <Input.Password size="large" placeholder={t("login.password")} />
          </Form.Item>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            block
            size="large"
          >
            {t("login.signIn")}
          </Button>
        </FormBody>
      </Form>
    </Modal>
  );
}

export default LoginModal;

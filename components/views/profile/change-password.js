import { Alert, Button, Col, Form, Input, Row } from "antd";
import Text from "components/utils/text";
import useFetch from "hooks/useFetch";
import useTranslation from "next-translate/useTranslation";
import { useCallback, useEffect } from "react";
import styled from "styled-components";

// styles
const StyledCol = styled(Col)`
  display: flex;
  height: 70vh;
  justify-content: center;
  align-items: center;
`;

export default function ChangePasswordContent() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // fetch apis
  // submit new password
  const {
    data,
    error,
    loading,
    executeFetch: submitNewPassword,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_EDIT_PASSWORD,
    "POST",
    {},
    false
  );

  // handle form on finish
  const handleFormOnFinish = useCallback((values) => {
    submitNewPassword({ ...values });
  }, []);

  // useEffects
  // change password useEffect
  useEffect(() => {
    if (!loading && data?.status === true) {
      form.resetFields();
    }
  }, [data, loading, error]);

  return (
    <Row>
      <StyledCol span={24}>
        <Form onFinish={handleFormOnFinish} layout="vertical" form={form}>
          <Row gutter={[24, 0]} style={{ width: 320 }}>
            {!loading && error && (
              <Col span={24} style={{ margin: "10px 0" }}>
                <Alert showIcon type="error" description={error} />
              </Col>
            )}
            {!loading && data?.status === true && (
              <Col span={24} style={{ margin: "10px 0" }}>
                <Alert
                  showIcon
                  type="success"
                  description={t("common:messages.passwordChange200")}
                />
              </Col>
            )}
            <Col span={24}>
              <Text color="primary" title>
                {t("profile:changePassword.title")}
              </Text>
            </Col>
            <Col span={24}>
              <Form.Item
                name={"OldPassword"}
                label={t("profile:changePassword.currentPassword")}
                rules={[
                  {
                    required: true,
                    message: t("common:validations.required"),
                  },
                ]}
              >
                <Input.Password
                  placeholder={t("profile:changePassword.currentPassword")}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={"Password"}
                label={t("profile:changePassword.newPassword")}
                rules={[
                  {
                    required: true,
                    message: t("common:validations.required"),
                  },
                ]}
              >
                <Input.Password
                  placeholder={t("profile:changePassword.newPassword")}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={"rePassword"}
                label={t("profile:changePassword.confirmPass")}
                rules={[
                  {
                    required: true,
                    message: t("common:validations.required"),
                  },
                ]}
              >
                <Input.Password
                  placeholder={t("profile:changePassword.confirmPass")}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {t("common:confirmTxt")}
              </Button>
            </Col>
          </Row>
        </Form>
      </StyledCol>
    </Row>
  );
}

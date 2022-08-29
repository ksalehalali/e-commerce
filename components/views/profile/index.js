import { Alert, Button, Col, Form, Input, Row, Skeleton } from "antd";
import useFetch from "hooks/useFetch";
import useTranslation from "next-translate/useTranslation";
import { useCallback, useEffect } from "react";

export default function ProfilePageContent() {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  // fetch apis
  // get profile
  const {
    data: getData,
    loading: getLoading,
    error: getError,
    executeFetch: getProfile,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_MY_PROFILE,
    "GET",
    {},
    true
  );
  // submit edit profile
  const {
    data: editData,
    loading: editLoading,
    error: editError,
    executeFetch: editProfile,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_EDIT_PROFILE,
    "POST",
    {},
    false
  );
  // functions
  const handleFormOnFinish = useCallback((values) => {
    editProfile({ ...values });
  }, []);

  // useEffects
  // get data useEffects
  useEffect(() => {
    if (!getLoading && getData?.status === true) {
      form.setFieldsValue({
        FirstName: getData?.description.firstName,
        LastName: getData?.description.lastName,
      });
    }
  }, [getData, getLoading, getError]);

  return (
    <Form layout="vertical" form={form} onFinish={handleFormOnFinish}>
      {getLoading && <Skeleton />}
      {!getLoading && (
        <Row gutter={[24, 24]}>
          {(getError || editError) && (
            <Col span={24}>
              <Alert
                type="error"
                showIcon
                description={getError || editError}
              />
            </Col>
          )}
          {!editLoading && editData?.status === true && (
            <Col span={24}>
              <Alert
                type="success"
                showIcon
                description={t("common:messages.editProfile200")}
              />
            </Col>
          )}
          <Col span={12}>
            <Form.Item
              name={"FirstName"}
              label={t("profile:firstName")}
              rules={[
                {
                  required: true,
                  message: t("common:validations.required"),
                },
              ]}
            >
              <Input placeholder={t("profile:firstName")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"LastName"}
              label={t("profile:lastName")}
              rules={[
                {
                  required: true,
                  message: t("common:validations.required"),
                },
              ]}
            >
              <Input placeholder={t("profile:lastName")} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit" loading={editLoading}>
              {t("common:submitTxt")}
            </Button>
          </Col>
        </Row>
      )}
    </Form>
  );
}

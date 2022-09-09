import { useCallback, useState } from "react";
import styled from "styled-components";
// components
import { Modal, Form, Input, Button, message, Alert } from "antd";
import Text from "components/utils/text";
// redux
import { useDispatch } from "react-redux";
// actions
import { openModal, closeModal } from "redux/modal/action";
import * as constants from "redux/modal/constants";

import axios from "axios";
import useTranslation from "next-translate/useTranslation";

// styles
const FormBody = styled.div`
    padding: 10px 20px;
`;

function RegisterModal({ visible, onClose }) {
    const { t } = useTranslation("common");

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleModals = (e) => {
        if (e) e.preventDefault();
        dispatch(closeModal(constants.modalType_register));
        dispatch(openModal(constants.modalType_Login));
    };

    const fetchRegister = useCallback(async (values) => {
        setLoading(true);
        setError(null);

        try {
            const { data: res } = await axios.post(
                process.env.NEXT_PUBLIC_HOST_API +
                    process.env.NEXT_PUBLIC_REGISTER,
                {
                    ...values,
                }
            );
            setLoading(false);
            if (res?.status === true) {
                message.success(t("messages.userRegister200"));
                toggleModals();
            } else {
                setError(
                    res?.description ??
                        "Something went wrong ! Please try again later."
                );
            }
        } catch (e) {
            setLoading(false);
            console.error(e);
            setError("Something went wrong ! Please try again later.");
        }
    });

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={false}
            destroyOnClose={true}
            width={400}
        >
            <Text as="h2" fontSize={24} bold block textAlign="center">
                {t("register.title")}
            </Text>
            <Text as="h3" fontSize={18} bold="600" block textAlign="center">
                {t("register.have")}{" "}
                <Text color="primary">
                    <a
                        href="#d"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleModals(e);
                        }}
                    >
                        {t("register.login")}
                    </a>
                </Text>
            </Text>
            <Form
                name="basic"
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={fetchRegister}
            >
                <FormBody>
                    {error && (
                        <Alert showIcon description={error} type="error" />
                    )}
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
                    >
                        <Input.Password
                            size="large"
                            placeholder={t("login.password")}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                        size="large"
                    >
                        {t("register.createBtn")}
                    </Button>
                </FormBody>
            </Form>
        </Modal>
    );
}

export default RegisterModal;

import { useCallback, useState } from "react";
import styled from "styled-components";
// components
import { Modal, Form, Input, Button, message, Alert, Spin } from "antd";
import Text from "components/utils/text";
// import { STANDARD_SCREENS } from "styles/variables";
// redux
import { useDispatch } from "react-redux";
// actions
import { openModal, closeModal } from "redux/modal/action";
import * as constants from "redux/modal/constants";
// context
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resetRequest, setResetRequest] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [userName, setUserName] = useState(null);
    const [isReqNumberValid, setIsReqNumberValid] = useState(true);
    const [isResetFormOk, setIsResetFormOk] = useState(true);

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

    // show reset request
    const showResetrequest = async () => {
        setResetRequest(true);
        onClose();
    };

    // Handle sending code
    const handleCodeSending = async () => {
        setLoading(true);
        await axios
            .post(
                `${process.env.NEXT_PUBLIC_HOST_API}api/RequestResetPassword`,
                {
                    UserName: userName,
                }
            )
            .then((res) => {
                if (res?.data.status) {
                    setResetRequest(false);
                    setLoading(false);
                    setResetForm(true);
                    setIsReqNumberValid(true);
                    form.setFieldsValue({
                        UserName: "",
                        Code: "",
                        NewPasswod: "",
                    });
                } else {
                    setLoading(false);
                    setIsReqNumberValid(false);
                }
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    // Handle Reset Password form
    const handleResetForm = async () => {
        const values = form.getFieldsValue();
        setLoading(true);

        await axios
            .post(`${process.env.NEXT_PUBLIC_HOST_API}api/ResetPassword`, {
                ...values,
            })
            .then((res) => {
                setLoading(false);
                if (res?.data.status) {
                    toggleModals();
                } else {
                    setIsResetFormOk(false);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            });
    };

    const resetReqCancel = () => {
        setResetRequest(false);
        setIsReqNumberValid(true);
        setLoading(false);
    };

    // Validation error
    const validError = (err) => {
        return (
            <Alert
                style={{
                    marginTop: "-10px",
                    marginBottom: "10px",
                }}
                description={err}
                type="error"
            />
        );
    };

    const langSwitch = (ar, en) => {
        if (router.locale == "ar") {
            return ar;
        } else {
            return en;
        }
    };
    return (
        <>
            {/* Login modal */}
            {visible && (
                <Modal
                    open={true}
                    onCancel={onClose}
                    footer={false}
                    destroyOnClose={true}
                    width={400}
                >
                    <Text as="h2" fontSize={24} bold block textAlign="center">
                        {langSwitch("أهلاً بك", "Welcome")}
                    </Text>
                    <Text
                        as="h3"
                        fontSize={18}
                        bold="600"
                        block
                        textAlign="center"
                    >
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
                            {error && (
                                <Alert
                                    description={error}
                                    showIcon
                                    type="error"
                                />
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
                                <Input
                                    size="large"
                                    placeholder={t("login.username")}
                                />
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
                                extra={
                                    <a onClick={showResetrequest}>
                                        {t("login.forgotPassword")}
                                    </a>
                                }
                            >
                                <Input.Password
                                    size="large"
                                    placeholder={t("login.password")}
                                />
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
            )}

            {/* Send code for request modal */}
            {resetRequest && (
                <Modal
                    open={true}
                    onCancel={resetReqCancel}
                    footer={false}
                    destroyOnClose={true}
                    width={400}
                >
                    <Text as="h2" fontSize={24} bold block textAlign="center">
                        {langSwitch("أهلاً بك", "Welcome")}
                    </Text>
                    <Text
                        as="h3"
                        fontSize={18}
                        bold="600"
                        block
                        textAlign="center"
                    >
                        <Text color="primary">
                            {langSwitch(
                                "أدخل رقمك لأعادة التعيين",
                                "Enter your phone number"
                            )}
                        </Text>
                    </Text>
                    <Form name="basic" layout="vertical" requiredMark={false}>
                        <FormBody>
                            <Form.Item
                                name={"UserName"}
                                label={langSwitch("رقم ألهاتف", "Phone Number")}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: t("validations.required"),
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder={"974xxxxxxxx"}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                            </Form.Item>
                            {!isReqNumberValid &&
                                langSwitch(
                                    validError("عذراً، الرقم خاطئ"),
                                    validError("The number was not found!")
                                )}
                            <Button
                                type="primary"
                                loading={loading}
                                htmlType="submit"
                                block
                                size="large"
                                onClick={handleCodeSending}
                            >
                                {langSwitch("أرسل", "Send")}
                            </Button>
                        </FormBody>
                    </Form>
                </Modal>
            )}
            {/*  Final password reset form */}
            {resetForm && (
                <Modal
                    open={true}
                    onCancel={(e) => {
                        setResetForm(false);
                        setIsResetFormOk(true);
                    }}
                    footer={false}
                    destroyOnClose={true}
                    width={400}
                >
                    <Text as="h2" fontSize={24} bold block textAlign="center">
                        {langSwitch("أهلاً بك", "Welcome")}
                    </Text>
                    <Text
                        as="h3"
                        fontSize={18}
                        bold="600"
                        block
                        textAlign="center"
                    >
                        <Text color="primary">
                            <a
                                href="#d"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleModals(e);
                                }}
                            >
                                {langSwitch("أعادة تعيين كلمة المرور")}
                            </a>
                        </Text>
                    </Text>
                    <Form
                        name="basic"
                        form={form}
                        layout="vertical"
                        requiredMark={false}
                        onFinish={handleResetForm}
                    >
                        <FormBody name>
                            {error && (
                                <Alert
                                    description={error}
                                    showIcon
                                    type="error"
                                />
                            )}
                            <Form.Item
                                name={"UserName"}
                                label={langSwitch("أسم المستخدم", "User name")}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: t("validations.required"),
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder={langSwitch(
                                        "أسم المستخدم",
                                        "User name"
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                name={"Code"}
                                label={langSwitch(
                                    "رمز أعادة التعيين",
                                    "Confirm code"
                                )}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: t("validations.required"),
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder={langSwitch(
                                        "رمز أعادة التعيين",
                                        "Confirm code"
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                name={"NewPasswod"}
                                label={langSwitch(
                                    "كلمة المرور الجديدة",
                                    "New password"
                                )}
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
                                    placeholder={langSwitch(
                                        "كلمة المرور الجديدة",
                                        "New password"
                                    )}
                                />
                            </Form.Item>
                            {!isResetFormOk &&
                                langSwitch(
                                    validError("عذراً البيانات خاطئة!"),
                                    validError(
                                        "The information is not correct!"
                                    )
                                )}
                            <Button
                                type="primary"
                                loading={loading}
                                htmlType="submit"
                                block
                                size="large"
                            >
                                {langSwitch("أعادة التعيين", "Reset")}
                            </Button>
                        </FormBody>
                    </Form>
                </Modal>
            )}
        </>
    );
}

export default LoginModal;

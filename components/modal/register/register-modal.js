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
import { useRouter } from "next/router";

// styles
const FormBody = styled.div`
    padding: 10px 20px;
`;

function RegisterModal({ visible, onClose }) {
    const { t } = useTranslation("common");
    const { locale } = useRouter();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [confirmCode, setConfirmCode] = useState("");
    const [codeIsValid, setCodeIsValid] = useState(true);
    const [mobileNumber, setMobileNumber] = useState();

    // Confirm modal functions
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Submit confirm code
    const handleOk = () => {
        if (confirmCode == "") {
            setCodeIsValid(false);
            return false;
        } else {
            setCodeIsValid(true);
            setError(null);
            setLoading(true);
            confirmCodeFunction(confirmCode);
        }
    };

    // Confirm code function
    const confirmCodeFunction = async (code) => {
        await axios
            .post(`${process.env.NEXT_PUBLIC_HOST_API}api/ConfirmPhoneNumber`, {
                UserName: mobileNumber,
                Code: code,
            })
            .then((res) => {
                console.log(res);
                if (res?.data.status) {
                    setError();
                    message.success("Your account is created, Please login");
                    toggleModals();
                    setLoading(false);
                    setIsModalOpen(false);
                }
            })
            .catch((err) => {
                console.error("code is wrong", err);
                setError("The code is wrong!!");
                setLoading(false);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        // dispatch(closeModal());
    };

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
                setIsModalOpen(true);
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

    const siwtchLang = (ar, en) => {
        if (locale == "ar") return ar;
        if (locale == "en") return en;
    };

    return (
        <>
            <Modal
                zIndex={2223}
                title="Please enter confirm code!"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                closable={false}
                okText="Send"
            >
                {error && <Alert description={error} type="error" />}
                <p></p>
                <Input
                    className={!codeIsValid && "red-border"}
                    required={true}
                    onChange={(e) => setConfirmCode(e.target.value)}
                />
                <div className="code-confirm-caption">
                    {!codeIsValid && (
                        <span className="confirm-warn">
                            {siwtchLang(
                                "يرجى أدخال رمز التأكيد",
                                "Please Enter Confirm Code!"
                            )}
                        </span>
                    )}
                    <span className="resend-text">
                        {siwtchLang("لم أستلم الرمز؟", "Didn't recieve")}{" "}
                        <a>{siwtchLang("أعد الارسال", "Resend the code")}</a>
                    </span>
                </div>
            </Modal>
            <Modal
                open={visible}
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
                            label={siwtchLang("رقم الهاتف", "Phone Number")}
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
                                onChange={(e) =>
                                    setMobileNumber(e.target.value)
                                }
                                placeholder={"974xxxxxxxxx"}
                            />
                        </Form.Item>
                        <Form.Item
                            name={"FirstName"}
                            label={siwtchLang("الاسم الاول", "First Name")}
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
                                placeholder={
                                    locale == "ar"
                                        ? "الاسم الاول"
                                        : "First Name"
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name={"LastName"}
                            label={siwtchLang("الاسم الاخير", "Last Name")}
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
                                placeholder={siwtchLang(
                                    "الاسم الاخير",
                                    "Last Name"
                                )}
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
        </>
    );
}

export default RegisterModal;

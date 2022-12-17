import { useRouter } from "next/router";
import { useContext, useEffect, useState, useCallback } from "react";
// components
import { Modal, Form, Row, Col, message, Alert, Skeleton, Spin } from "antd";
// contexts
import { AddressesContext } from "context/address-context";
// modules
import axios from "axios";

import useFetch from "hooks/useFetch";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "redux/modal/action";
import styled from "styled-components";
import { useSession } from "next-auth/react";

const Input = styled.input`
    width: 100%;
    border: 1px solid #ddd;
    padding: 5px;
    display: flex;
    align-items: center;
    border-radius: 3px;
`;

function DeliveryAddressConfirmModal({ visible, onClose }) {
    console.log("confirm render");
    const { t } = useTranslation();
    const { addressList, setSelected, setAddressList, selected } =
        useContext(AddressesContext);
    const [currentAddress, setCurrentAddress] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const dispatch = useDispatch();
    const { successAction, mPayloads } = useSelector((state) => state.modal);
    const { afterCodeConfirm } = useSelector((state) => state.modal);
    const router = useRouter();
    const { locale } = router;
    const [form] = Form.useForm();
    const { data: cockies } = useSession();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                console.log(position);
                await axios
                    .get(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=pk.eyJ1IjoiaGFtdWRlc2hhaGluIiwiYSI6ImNrempnc2JzcjA2bmQyb3RhdnRxd2hsbnUifQ.OeXesE3wZ5B_V42D79rjJQ`
                    )
                    .then((response) => {
                        console.log(response.data.features[0].place_name);
                        setCurrentAddress(response.data.features[0].place_name);
                    })
                    .catch((error) => console.error(error));
            });
        }
    }, []);

    const {
        data: getData,
        loading: getLoading,
        error: getError,
        executeFetch: getAddressById,
    } = useFetch(
        process.env.NEXT_PUBLIC_HOST_API +
            process.env.NEXT_PUBLIC_GET_ADRESS_BY_ID,
        "post",
        { id: mPayloads?.id },
        mPayloads?.id ? true : false
    );

    // edit address
    const {
        data: editData,
        error: editError,
        loading: editLoading,
        executeFetch: editAddress,
    } = useFetch(
        process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_EDIT_ADRESS,
        "post",
        {},
        false
    );

    const handleFormOnFinish = async () => {
        setIsloading(true);
        await form.validateFields();
        const values = form.getFieldsValue();
        if (!mPayloads?.id) {
            // Adding new address mode
            await axios
                .post(
                    process.env.NEXT_PUBLIC_HOST_API +
                        process.env.NEXT_PUBLIC_ADD_ADRESS,
                    {
                        Longitude: "0000",
                        Latitude: "0000",
                        Address: currentAddress,
                        NameAddress: values.NameAddress,
                        phone: values.Phone,
                        Area: values.Area,
                        Strret: values.Street,
                        House: values.House,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${cockies?.user?.token}`,
                        },
                    }
                )
                .then((res) => {
                    if (res?.data?.status) {
                        setIsloading(false);
                        dispatch(closeModal());
                        router.push("/delivery-address");
                        message.success(t("common:messages.addressAdd200"));
                    }
                })
                .catch((err) => console.log("error", err));
        } else {
            // Edit old address mode
            editAddress({
                Address: values.Address,
                NameAddress: values.NameAddress,
                Phone: values.Phone,
                Area: values.Area,
                Strret: values.Strret,
                House: values.House,
                id: mPayloads?.id,
            });
        }
    };

    // get data address by id
    useEffect(() => {
        if (getData?.status === true) {
            form.setFieldsValue({
                Address: getData?.description?.address,
                Longitude: getData?.description?.longitude,
                Latitude: getData?.description?.latitude,
                Phone: getData?.description?.phone,
                NameAddress: getData?.description?.nameAddress,
                Address: getData?.description?.address,
                Area: getData?.description?.area,
                House: getData?.description?.house,
                Street: getData?.description?.strret,
            });
        }
    }, [getData]);

    useEffect(() => {
        if (editData?.status === true && !editLoading) {
            message.success(t("common:messages.addressEdit200"));
            !selected && setSelected(addressList.at(-1));
            successAction();
            dispatch(closeModal());
            if (router.pathname !== "/delivery-address")
                router.push("/delivery-address");
        }
    }, [editData, editLoading, editError]);

    return (
        <>
            <Modal
                open={visible}
                destroyOnClose={true}
                onCancel={() => {
                    // clear unsaved address from our context
                    if (!mPayloads?.id) {
                        setAddressList((prev) => {
                            let newList = prev;
                            newList.pop();
                            return [...newList];
                        });
                    }
                    onClose();
                }}
                okButtonProps={{
                    onClick: handleFormOnFinish,
                    loading: isLoading || editLoading,
                }}
                okText={t("common:okTxt")}
                cancelText={t("common:cancelTxt")}
                title={t("forms:confirmAddress.title")}
            >
                {getLoading && <Skeleton />}
                {!getLoading && (
                    <Form form={form} layout="vertical">
                        <Row gutter={[24, 24]}>
                            {false && (
                                <Col span={24}>
                                    <Alert
                                        description={addData?.error}
                                        showIcon
                                        type="error"
                                    />
                                </Col>
                            )}
                        </Row>
                        <Form.Item
                            name="Address"
                            label={locale === "ar" ? "ألعنوان" : "Address"}
                            rules={[
                                {
                                    required: false,
                                    message: "Address",
                                },
                            ]}
                        >
                            {currentAddress ? (
                                ""
                            ) : (
                                <Spin style={{ top: "7px" }} />
                            )}
                            <Input
                                disabled
                                value={currentAddress}
                                size="large"
                                placeholder={currentAddress}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Phone"
                            label={t("forms:confirmAddress.phone")}
                            rules={[
                                {
                                    required: true,
                                    message: t("common:validations.required"),
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder={t("forms:confirmAddress.phone")}
                            />
                        </Form.Item>
                        <Form.Item
                            name="NameAddress"
                            label={t("forms:confirmAddress.name")}
                            rules={[
                                {
                                    required: true,
                                    message: t("common:validations.required"),
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder={
                                    locale === "ar"
                                        ? "مثال: منزلي"
                                        : "Ex: My home"
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="Area"
                            label={locale == "ar" ? "أسم المنطقة" : "Area name"}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        locale == "ar"
                                            ? "أسم المنطقة"
                                            : "Area name",
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder={
                                    locale == "ar" ? "أسم المنطقة" : "Area name"
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="Street"
                            label={locale == "ar" ? "ألشارع" : "Street"}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        locale == "ar" ? "ألشارع" : "Street",
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder={
                                    locale == "ar" ? "ألشارع" : "Street"
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="House"
                            label={
                                locale == "ar" ? "رقم ألمنزل" : "House Number"
                            }
                            rules={[
                                {
                                    required: false,
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder={
                                    locale == "ar"
                                        ? "رقم ألمنزل"
                                        : "House Number"
                                }
                            />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    );
}

export default DeliveryAddressConfirmModal;

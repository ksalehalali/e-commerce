import { useRouter } from "next/router";
import { useContext, useEffect, useState, useCallback } from "react";
// components
import {
  Divider,
  Modal,
  Form,
  Input,
  Row,
  Col,
  message,
  Alert,
  Skeleton,
} from "antd";
// contexts
import { AddressesContext } from "context/address-context";
// modules
import axios from "axios";

import useFetch from "hooks/useFetch";
import useTranslation from "next-translate/useTranslation";

function DeliveryAddressConfirmModal({ visible, onClose }) {
  const { t } = useTranslation();
  const { addressList, setSelected, setAddressList, selected } =
    useContext(AddressesContext);
  const dispatch = useDispatch();
  const { successAction, mPayloads } = useSelector((state) => state.modal);
  const router = useRouter();
  const [form] = Form.useForm();

  const {
    data: getData,
    loading: getLoading,
    error: getError,
    executeFetch: getAddressById,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_GET_ADRESS_BY_ID,
    "post",
    { id: mPayloads?.id },
    mPayloads?.id ? true : false
  );

  // add new address
  const {
    data: addData,
    error: addError,
    loading: addLoading,
    executeFetch: addAddress,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API + process.env.NEXT_PUBLIC_ADD_ADRESS,
    "post",
    {},
    false
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
  const handleFormOnFinish = useCallback(async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    if (mPayloads?.id) {
      editAddress({
        Latitude: values.Latitude,
        Longitude: values.Longitude,
        Address: values.Address,
        NameAddress: values.NameAddress,
        Phone: values.Phone,
        id: mPayloads?.id,
      });
    } else {
      addAddress(values);
    }
  }, [mPayloads]);

  // get data address by id
  useEffect(() => {
    if (getData?.status === true && !addLoading) {
      form.setFieldsValue({
        Address: getData?.description?.address,
        Longitude: getData?.description?.longitude,
        Latitude: getData?.description?.latitude,
        Phone: getData?.description?.phone,
        NameAddress: getData?.description?.nameAddress,
        Address: getData?.description?.address,
      });
    }
  }, [getData, addLoading, addError]);
  // add aata
  useEffect(() => {
    if (addData?.status === true && !addLoading) {
      message.success(t("common:messages.addressAdd200"));
      setSelected(addressList.at(-1));
      successAction();
      dispatch(closeModal());
      if (router.pathname !== "/delivery-address")
        router.push("/delivery-address");
    }
  }, [addData, addLoading, addError]);
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

  useEffect(() => {
    if (!mPayloads?.id) {
      form.setFieldsValue({
        Address: addressList.at(-1)?.value,
        Longitude: addressList.at(-1)?.coordinates[0],
        Latitude: addressList.at(-1)?.coordinates[1],
      });
    }
  }, []);

  return (
    <Modal
      visible={visible}
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
        loading: addLoading || editLoading,
      }}
      okText={t("common:okTxt")}
      cancelText={t("common:cancelTxt")}
      title={t("forms:confirmAddress.title")}
    >
      {getLoading && <Skeleton />}
      {!getLoading && (
        <Form form={form} layout="vertical">
          <Row gutter={[24, 24]}>
            {!addLoading && addData?.error && (
              <Col span={24}>
                <Alert description={addData?.error} showIcon type="error" />
              </Col>
            )}
            <Col span={12}>
              {" "}
              <Form.Item
                name="Longitude"
                label={t("forms:confirmAddress.log")}
                rules={[
                  {
                    required: true,
                    message: t("common:validations.required"),
                  },
                ]}
              >
                <Input
                  size="large"
                  disabled
                  placeholder={t("forms:confirmAddress.log")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                name="Latitude"
                label={t("forms:confirmAddress.lat")}
                rules={[
                  {
                    required: true,
                    message: t("common:validations.required"),
                  },
                ]}
              >
                <Input
                  size="large"
                  disabled
                  placeholder={t("forms:confirmAddress.lat")}
                />
              </Form.Item>
            </Col>
          </Row>
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
            <Input size="large" placeholder={t("forms:confirmAddress.phone")} />
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
            <Input size="large" placeholder={t("forms:confirmAddress.name")} />
          </Form.Item>
          <Form.Item
            name="Address"
            label={t("forms:confirmAddress.address")}
            rules={[
              {
                required: true,
                message: t("common:validations.required"),
              },
            ]}
          >
            <Input
              size="large"
              disabled
              placeholder={t("forms:confirmAddress.address")}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

export default DeliveryAddressConfirmModal;

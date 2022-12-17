import { useCallback, useContext } from "react";
import styled from "styled-components";
// components
import FlexDiv from "components/utils/flex-div";
import { Row, Col, Radio } from "antd";
// styles
import { COLORS } from "styles/variables";
import { PaymentContext } from "context/payment-context";

function PaymentInfo({ t }) {
    // context
    const { startPayment, paymentType, setPaymentType } =
        useContext(PaymentContext);

    console.log("paymentType");
    console.log(paymentType);

    const [form] = Form.useForm();

    const onChange = (e) => {
        setPaymentType(e.target.value);
    };

    const handlePayment = useCallback(() => {
        startPayment();
    });

    return (
        <FlexDiv column padding={15} gap={10}>
            <FlexDiv>
                <Radio.Group onChange={onChange} value={paymentType}>
                    <FlexDiv>
                        <FlexDiv
                            margin={5}
                            style={{
                                border: `1px solid ${COLORS.BG_COLOR_GRAY}`,
                            }}
                            width={240}
                            gap={5}
                            padding={20}
                        >
                            <Radio value={0} checked>
                                {t("payment:radios.deliveryPayment")}
                            </Radio>
                        </FlexDiv>

                        <FlexDiv
                            margin={5}
                            style={{
                                border: `1px solid ${COLORS.BG_COLOR_GRAY}`,
                            }}
                            width={240}
                            padding={20}
                            gap={5}
                        >
                            <Radio value={1}>
                                {t("payment:radios.creditPayment")}
                            </Radio>
                        </FlexDiv>
                        <FlexDiv
                            margin={5}
                            style={{
                                border: `1px solid ${COLORS.BG_COLOR_GRAY}`,
                            }}
                            width={240}
                            gap={5}
                            padding={20}
                        >
                            <Radio value={2}>
                                {t("payment:radios.walletPayment")}
                            </Radio>
                        </FlexDiv>
                    </FlexDiv>
                </Radio.Group>
            </FlexDiv>
            <Form form={form} layout="vertical">
                {paymentType === 1 && (
                    // <Row gutter={10}>
                    //   <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={12}>
                    //     <Row gutter={[12, 0]}>
                    //       <Col span={24}>
                    //         <Form.Item
                    //           name="Name"
                    //           label="Name on card"
                    //           rules={[
                    //             {
                    //               required: true,
                    //               message: "please add the name on card",
                    //             },
                    //           ]}
                    //         >
                    //           <Input
                    //             placeholder="Name on card"
                    //             onFocus={() => setFocusedInp("cardName")}
                    //             onBlur={() => setFocusedInp(null)}
                    //             onChange={(event) => {
                    //               setCardInformation((prev) => ({
                    //                 ...prev,
                    //                 cardName: event.target.value,
                    //               }));
                    //             }}
                    //           ></Input>
                    //         </Form.Item>
                    //       </Col>

                    //       <Col span={24}>
                    //         <Form.Item
                    //           name="CardNo"
                    //           label="Card no"
                    //           rules={[
                    //             {
                    //               required: true,
                    //               message: "please add",
                    //             },
                    //           ]}
                    //         >
                    //           <ReactInputMask
                    //             mask="9999 9999 9999 9999"
                    //             maskChar=" "
                    //             className="ant-input"
                    //             placeholder={"Credit Card Number"}
                    //             inputMode="numeric"
                    //             onFocus={() => setFocusedInp("cardNumber")}
                    //             onBlur={() => setFocusedInp(null)}
                    //             onChange={(event) => {
                    //               setCardInformation((prev) => ({
                    //                 ...prev,
                    //                 cardNumber: event.target.value,
                    //               }));
                    //             }}
                    //           />
                    //         </Form.Item>
                    //       </Col>
                    //       <Col span={12}>
                    //         <Form.Item
                    //           name="Expirationdate"
                    //           label="Expiration date"
                    //           rules={[
                    //             {
                    //               required: true,
                    //               message: "please add Expiration date",
                    //             },
                    //           ]}
                    //         >
                    //           <ReactInputMask
                    //             mask="99/99"
                    //             maskChar=""
                    //             className={`ant-input`}
                    //             placeholder={"Geçerlilik tarihi"}
                    //             onFocus={() => {
                    //               setFocusedInp("validDate");
                    //             }}
                    //             onBlur={() => {
                    //               setFocusedInp(null);
                    //             }}
                    //             onChange={(event) => {
                    //               setCardInformation((prev) => ({
                    //                 ...prev,
                    //                 validDate: event.target.value,
                    //               }));
                    //             }}
                    //           />
                    //         </Form.Item>
                    //       </Col>
                    //       <Col span={12}>
                    //         <Form.Item
                    //           name="securitycodecvv"
                    //           label="Security code cvv"
                    //           rules={[
                    //             {
                    //               required: true,
                    //               message: "please add Security code cvv",
                    //             },
                    //           ]}
                    //         >
                    //           <ReactInputMask
                    //             mask="9999"
                    //             maskChar=""
                    //             className={`ant-input`}
                    //             placeholder={"CVV"}
                    //             onFocus={() => {
                    //               setFlipped(true);
                    //               setFocusedInp("cvc");
                    //             }}
                    //             onBlur={() => {
                    //               setFlipped(false);
                    //               setFocusedInp(null);
                    //             }}
                    //             onChange={(event) =>
                    //               setCardInformation((prev) => ({
                    //                 ...prev,
                    //                 cvc: event.target.value,
                    //               }))
                    //             }
                    //           />
                    //         </Form.Item>
                    //       </Col>
                    //     </Row>
                    //   </Col>
                    //   <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={12}>
                    //     <CreditCard
                    //       cardInformation={cardInformation}
                    //       flipped={flipped}
                    //       focusedInp={focusedInp}
                    //     />
                    //   </Col>

                    //   <Col span={24}>
                    //     <Button type="primary">Confirmation</Button>
                    //   </Col>
                    // </Row>
                    <Row>
                        <Col span={24}>
                            <h2>{t("payment:radios.creditPayment")}</h2>
                        </Col>
                    </Row>
                )}
                {paymentType === 0 && (
                    <Row>
                        <Col span={24}>
                            <h2>{t("payment:radios.deliveryPayment")}</h2>
                        </Col>
                    </Row>
                )}
                {paymentType === 2 && (
                    <Row>
                        <Col span={24}>
                            <h2> {t("payment:radios.walletPayment")}</h2>
                        </Col>
                    </Row>
                )}
            </Form>
        </FlexDiv>
    );
}
export default PaymentInfo;

import { Alert, Button } from "antd";
import { ActionRequiredContext } from "context/action-context";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import FlexDiv from "./utils/flex-div";
const PaymentAlertStyled = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const AlertContent = styled.div`
  width: 300px;
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
`;

export default function PaymentAlert() {
  const router = useRouter();
  const { setAction, action } = useContext(ActionRequiredContext);

  const [alertMessage, setAlertMessage] = useState(null);

  // check payment
  const {
    data: checkPaymentData,
    loading: checkPaymentLoading,
    error: checkPaymentError,
    executeFetch: checkPayment,
  } = useFetch(
    process.env.NEXT_PUBLIC_HOST_API +
      process.env.NEXT_PUBLIC_COMPLETE_PAYMENT_ORDER,
    "POST",
    {},
    false
  );

  const handlePaymentDone = useCallback(() => {
    checkPayment({
      invoiceId: action?.value?.invoiceId,
      OrderID: action?.value?.orderID,
    });
  }, [action]);

  useEffect(() => {
    if (!checkPaymentLoading && checkPaymentData?.status === true) {
      setAction((prev) => {
        let newObj = prev;
        prev.type = "checkPayment";
        return { ...newObj };
      });
      if (router.pathname.startsWith("/profile")) {
        window.location.reload();
      } else {
        router.push(`/profile/my-orders/${action?.value?.orderID}`);
        setAction({
          type: null,
          value: false,
        });
      }
    } else if (!checkPaymentLoading && checkPaymentError) {
      setAlertMessage(
        router.locale === "ar"
          ? `
          لم يتم إكمال عملية الدفع. لإتمام عملية الدفع لاحقاً يرجى <a href="/ar/profile/my-orders/${action?.value?.orderID}" style="color: #1dd3d5">الضغط هنا</a>
        `
          : `Payment didn't completed. To pay later please <a href="/profile/my-orders/${action?.value?.orderID}" style="color: #1dd3d5">click here</a>`
      );
    }
  }, [checkPaymentData, checkPaymentLoading, checkPaymentError]);

  return (
    <PaymentAlertStyled>
      <AlertContent>
        <FlexDiv column gap={10}>
          {alertMessage && (
            <Alert
              description={
                <div dangerouslySetInnerHTML={{ __html: alertMessage }} />
              }
              type="warning"
              showIcon
            />
          )}
          <h2>Payment in process</h2>
          <Button onClick={handlePaymentDone} loading={checkPaymentLoading}>
            Done!
          </Button>
        </FlexDiv>
      </AlertContent>
    </PaymentAlertStyled>
  );
}

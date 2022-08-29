import { useRouter } from "next/router";
// components
import { Result, Button } from "antd";

function ErrorHandler({ title, extraType, failCode }) {
  const router = useRouter();
  return (
    <Result
      status={failCode === 400 ? "warning" : failCode}
      title={title ? title : "There are some problems with your operation."}
      extra={
        extraType === "reload" ? (
          <Button type="primary" onClick={() => router.reload()}>
            Reload
          </Button>
        ) : null
      }
    />
  );
}

export default ErrorHandler;

import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import AuthGuard from "components/auth-guard";
// components
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { Divider } from "antd";
import {
  LockOutlined,
  OrderedListOutlined,
  ProfileOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";

// styles
import { COLORS } from "styles/variables";
import useTranslation from "next-translate/useTranslation";
const StyledProfileLayout = styled.div`
  display: flex;
  gap: 10px;
  min-height: 100vh;
  padding: 10px 40px;
`;
const LayoutContent = styled.main`
  flex: 1;
`;
const LayoutMenu = styled.aside`
  width: 300px;
  border-inline-end: 1px solid ${COLORS.GRAY};
  padding: 0 10px;
`;

const StyledMenuItem = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  position: relative;
  font-weight: 600;
  border-radius: 2px;
  ${(props) => {
    if (props.active === true)
      return `
      background-color: ${COLORS.BG_COLOR_GRAY};
      color: ${COLORS.PRIMARY};
        &::before {
            content: "";
            position: absolute;
            width: 4px;
            border-radius: 2px;
            left: -2px;
            height: 30px;
            top: 50%;
            transform: translateY(-50%);
            background-color: ${COLORS.PRIMARY}
        }
    `;
  }}
`;

function ProfileLayout(props) {
  const { t } = useTranslation();

  const router = useRouter();
  return (
    <StyledProfileLayout>
      <LayoutMenu>
        <Text title as="h1" color={COLORS.PRIMARY}>
          {t("profile:side.accountSettings")}
        </Text>
        <FlexDiv column gap={3}>
          <Link href="/profile">
            <StyledMenuItem
              active={router.pathname === "/profile" ? true : false}
            >
              <UserOutlined />
              <Text>{t("profile:side.profile")}</Text>
            </StyledMenuItem>
          </Link>
          <Link href="/profile/change-password">
            <StyledMenuItem
              active={
                router.pathname === "/profile/change-password" ? true : false
              }
            >
              <LockOutlined />
              <Text>{t("profile:side.changePassword")}</Text>
            </StyledMenuItem>
          </Link>
        </FlexDiv>
        <Divider />
        <FlexDiv column gap={3}>
          <Link href="/profile/my-orders">
            <StyledMenuItem
              active={router.pathname === "/profile/my-orders" ? true : false}
            >
              <OrderedListOutlined />
              <Text>{t("profile:side.myOrders")}</Text>
            </StyledMenuItem>
          </Link>
          <Link href="/profile/wallet">
            <StyledMenuItem
              active={router.pathname === "/profile/wallet" ? true : false}
            >
              <WalletOutlined />
              <Text>{t("profile:side.wallet")}</Text>
            </StyledMenuItem>
          </Link>
        </FlexDiv>
      </LayoutMenu>
      <LayoutContent>{props.children}</LayoutContent>
    </StyledProfileLayout>
  );
}

export default ProfileLayout;

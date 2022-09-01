import styled from "styled-components";
// components
import { DownOutlined } from "@ant-design/icons/lib/icons";
import Container from "components/utils/container";
import FlexDiv from "components/utils/flex-div";
import IconTitleItem from "components/utils/icon-title-item.js";
// import Swiper, { SwiperChild } from "components/utils/swiper";

// css
import { COLORS, PADDINGS, STANDARD_SCREENS } from "styles/variables";
import { useRouter } from "next/router";

const categories = [
 
  
  {
    name: "Men's Fashion",
    name_ar: "أزياء الرجالية",
    id: "f6222596-f422-4891-9a55-664e5e3017aa",
  },
  {
    name: "Women's Fashion",
    name_ar: "أزياء النسائية",
    id: "31afd7d2-5f4d-406d-ae5d-b46e5055b80c",
  },
  {
    name: "Children's Clothing",
    name_ar: "ملابس الاطفال",
    id: "6956bc2b-b8f6-48be-8be6-6c56983c79d5",
  },
  {
    name: "Women's shoes",
    name_ar: "أحذية نسائية",
    id: "3ca11af3-e200-4898-8eb9-30f1bf3b8347",
  },
  {
    name: "Men's shoes ",
    name_ar: "أحذية رجالية",
    id: "7ff2c840-1f34-4f76-9fe9-07c123265c1e",
  },
  {
    name: "Kids shoes ",
    name_ar: "أحذية الاطفال",
    id: "33739903-d8c5-4604-9f27-4e52273110e8",
  },
  {
    name: "Men's stuff",
    name_ar: "مستلزمات الرجال",
    id: "bdd1e12a-ffa7-4b9c-93a5-b4180fb33675",
  },
  {
    name: "Kids, Baby & Toys",
    name_ar: "الاطفال والالعاب",
    id: "818ce955-2ce3-4486-ba6e-45784c5cce99",
  },
  {
    name: "Mobiles & Accessories ",
    name_ar: "إكسسوارات و هواتف",
    id: "e488e898-4744-4caa-9f12-a676ce5d0a5b",
  },
 
 
  {
    name: "Accessories and gifts",
    name_ar: "الهدايا والإكسسوارات",
    id: "d115a1f7-2407-4446-9caa-dc9744e5bfa8",
  },
  {
    name: "beauty supplies",
    name_ar: "اغراض جميلة",
    id: "7309f628-b98b-49cf-a67f-f01403baa31a",
  },
  {
    name: "Mobiles",
    name_ar: "الهواتف",
    id: "6d0a8f39-cde8-459b-9249-d650fb0574e5",
  },
  {
    name: "Home & Kitchen",
    name_ar: "المنزل والمطبخ",
    id: "d2a67fba-9070-4687-ae75-fb74f25e7924",
  },
 
 

  {
    name: "Brands",
    name_ar: "الماركات",
    id: "4774bfdb-5dca-47e7-a43b-0a8acb659305",
  },
  {
    name: "Watches & Bags",
    name_ar: "الساعات والحقائب",
    id: "60fc2a32-8489-4981-872e-9d53f611647b",
  },
];

// styled components
const NavCategories = styled.div`
  background-color: ${COLORS.BG_COLOR_GRAY};
  padding: 0 40px;
`;

const CategoriesContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const AllCategories = styled.div`
  width: 200px;
  font-size:17px;
`;

const CategoriesContainerInner = styled.div`
  display: flex;
  overflow: auto;
  font-size:17px;
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
  > div {
    scroll-snap-align: start;
  }
`;

// &::-webkit-scrollbar {
//   display: none;
// }
function NavbarCategories({ t }) {
  const router = useRouter();

  return (
    <NavCategories>
      <FlexDiv gap={10}>
        <AllCategories>
          <IconTitleItem
            title={t("navbar.allCategories")}
            icon={<DownOutlined />}
            block
            color={
              router.pathname.includes("/categories") ? COLORS.PRIMARY : ""
            }
            href="/categories"
            justify={"space-between"}
            rowReverse={true}
          />
        </AllCategories>
        <CategoriesContainer>
          <CategoriesContainerInner>
            {categories?.map((item) => (
              <IconTitleItem
                title={router.locale === "ar" ? item.name_ar : item.name}
                padding={PADDINGS.categories_item_x_y}
                hoverColor={COLORS.PRIMARY}
                hoverEffect="under-line"
                key={item.id}
                href={`/categories/${item.id}`}
                color={
                  router.asPath.includes(`/categories/${item.id}`)
                    ? COLORS.PRIMARY
                    : ""
                }
              />
            ))}
          </CategoriesContainerInner>
        </CategoriesContainer>
      </FlexDiv>
    </NavCategories>
  );
}

export default NavbarCategories;

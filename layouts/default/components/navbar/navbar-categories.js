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
        name: "Men's stuff",
        name_ar: "مستلزمات الرجال",
        id: "bdd1e12a-ffa7-4b9c-93a5-b4180fb33675",
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
        name: "Home & Kitchen",
        name_ar: "المنزل والمطبخ",
        id: "d2a67fba-9070-4687-ae75-fb74f25e7924",
    },

    {
        name: "Brands",
        name_ar: "الماركات",
        id: "4774bfdb-5dca-47e7-a43b-0a8acb659305",
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
    font-size: 17px;
`;

const CategoriesContainerInner = styled.div`
    display: flex;
    overflow: auto;
    font-size: 17px;
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
                            router.pathname.includes("/categories")
                                ? COLORS.PRIMARY
                                : ""
                        }
                        href="/categories"
                        justify={"space-evenly"}
                        rowReverse={true}
                    />
                </AllCategories>
                <CategoriesContainer>
                    <CategoriesContainerInner>
                        {categories?.map((item) => (
                            <IconTitleItem
                                title={
                                    router.locale === "ar"
                                        ? item.name_ar
                                        : item.name
                                }
                                padding={PADDINGS.categories_item_x_y}
                                hoverColor={COLORS.PRIMARY}
                                hoverEffect="under-line"
                                key={item.id}
                                href={`/categories/${item.id}`}
                                color={
                                    router.asPath.includes(
                                        `/categories/${item.id}`
                                    )
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

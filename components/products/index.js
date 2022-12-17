import ProductSlide from "components/sliders/product-slide";
import Text from "components/utils/text";
import { useRouter } from "next/router";
import styled from "styled-components";
import { COLORS } from "styles/variables";

const ProductSection = styled.div`
    padding: 10px 0;
    position: relative;
`;

const ProductSectionHeader = styled.div`
    padding: 10px 0 0;
    margin-bottom: 10px;
    display: flex;
    border-bottom: 1px solid ${COLORS.GRAY};
    justify-content: space-between;
    align-items: center;
`;

const Viewall = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    height: 80%;
    padding: 4px 8px;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: #f6f6f6;
    }
`;

function ProductSectionPart({ title, list }) {
    const router = useRouter();
    return (
        <ProductSection>
            <ProductSectionHeader>
                <Text as={"h1"} title={"true"}>
                    {title ? title : "Title Required !"}
                </Text>
                <Viewall
                    onClick={() => {
                        router.push(`/products-section/${title}`);
                    }}
                >
                    View all
                </Viewall>
            </ProductSectionHeader>
            <ProductSlide list={list} />
        </ProductSection>
    );
}

export default ProductSectionPart;

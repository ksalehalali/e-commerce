// components
import { Alert, Empty } from "antd";
import axios from "axios";
import ProdcutItem from "components/products/product-item";
import FlexDiv from "components/utils/flex-div";

// modules

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchLoading, searchResultNumber } from "redux/modal/action";
// just test

function CategoriesPageContent({ id, locale, productList }) {
    const { searchAction } = useSelector((state) => state.modal);
    const [filtredProducts, setFiltredProducts] = useState();
    const { data: data2, status } = useSession();
    const dispatch = useDispatch();

    useEffect(async () => {
        dispatch(searchLoading(true));
        try {
            const { data } = await axios.post(
                `https://dashcommerce.click68.com/api/SearchProduct`,
                {
                    PageSize: 100,
                    PageNumber: 1,
                    KeyWord: searchAction, // input value
                },
                {
                    headers: {
                        Authorization: `Bearer ${data2.user.token}`,
                        lang: locale,
                    },
                }
            );
            if (typeof data.description === "string") {
                dispatch(searchLoading(false));
                dispatch(searchResultNumber(data.description.length));
            } else {
                dispatch(searchLoading(false));
                setFiltredProducts(data.description);
                dispatch(searchResultNumber(data.description.length));
            }
        } catch (e) {
            console.error("ERRORRRRR ____22");
            dispatch(searchLoading(false));
            console.error(e.toString());
        }
    }, [searchAction]);

    return (
        <FlexDiv
            style={{ backgroundColor: "#fff", minHeight: "50vh" }}
            wrap
            gap={10}
            flex={1}
            alignCenter={
                productList?.length === 0 || !productList ? true : false
            }
            justifyCenter={filtredProducts?.length !== 0 ? false : true}
        >
            {/* {id && loading && <h2>Loading ...</h2>}
      {id && !loading && error && (
        <Alert description={error} showIcon type="error" />
      )} */}
            {filtredProducts?.length > 0 && (
                <>
                    {filtredProducts.map((item) => (
                        <ProdcutItem
                            key={item.id}
                            title={item[`name_${locale.toUpperCase()}`]}
                            src={process.env.NEXT_PUBLIC_HOST_API + item.image}
                            alt={`${item?.modelName} ${
                                item[`name_${locale.toUpperCase()}`]
                            }`}
                            offer={item?.offer}
                            price={item?.price}
                            modelID={item?.modelID}
                            model={item?.modelName}
                            id={item?.id}
                        />
                    ))}
                </>
            )}
            {(filtredProducts?.length === 0 || !filtredProducts) && <Empty />}
        </FlexDiv>
    );
}

export default CategoriesPageContent;

// components
import { Alert, Empty } from "antd";
import axios from "axios";
import ProdcutItem from "components/products/product-item";
import FlexDiv from "components/utils/flex-div";

// modules

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchLoading, searchResultNumber } from "redux/modal/action";
// just test

function CategoriesPageContent({ id, locale, productList, sideList }) {
    const { searchAction } = useSelector((state) => state.modal);
    const [filtredProducts, setFiltredProducts] = useState();
    const { data: data2, status } = useSession();
    // const router = useRouter();
    // const { id } = router.query;
    const dispatch = useDispatch();
    console.log("prolist", productList);
    console.log("id in index", id);

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

    //fetch products by branch name
    useEffect(async () => {
        if (sideList) {
            await axios
                .post(
                    "https://dashcommerce.click68.com/api/ListProductByCategory",
                    { id: sideList[0]?.id },
                    {
                        headers: {
                            lang: locale,
                        },
                    }
                )
                .then((result) => {
                    if (result.data.status) {
                        dispatch(
                            searchResultNumber(result.data.description.length)
                        );
                        console.log(result.data.description.length);
                        setFiltredProducts(result.data.description);
                    }
                })
                .catch((err) => console.error(err));
        } else {
            console.log("side list is empty");
        }
    }, [sideList]);
    console.log("filtred", filtredProducts);

    useEffect(() => {
        dispatch(searchResultNumber(productList.length));
        console.log("length", productList.length);
        setFiltredProducts(productList);
    }, [id]);

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
            {filtredProducts?.length > 0 ? (
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
            ) : (
                productList.map((item) => (
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
                ))
            )}
            {(filtredProducts?.length === 0 || !productList) && <Empty />}
        </FlexDiv>
    );
}

export default CategoriesPageContent;

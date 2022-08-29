// components
import { Alert, Empty } from "antd";
import ProdcutItem from "components/products/product-item";
import FlexDiv from "components/utils/flex-div";
// modules
import useFetch from "hooks/useFetch";
import { useEffect } from "react";

function CategoriesPageContent({ id, locale, productList }) {
  return (
    <FlexDiv
      style={{ backgroundColor: "#fff", minHeight: "50vh" }}
      wrap
      gap={10}
      flex={1}
      alignCenter={productList?.length === 0 || !productList ? true : false}
      justifyCenter={productList?.length === 0 || !productList ? true : false}
    >
      {/* {id && loading && <h2>Loading ...</h2>}
      {id && !loading && error && (
        <Alert description={error} showIcon type="error" />
      )} */}
      {productList?.length > 0 && (
        <>
          {productList?.map((item) => (
            <ProdcutItem
              key={item.id}
              title={item[`name_${locale.toUpperCase()}`]}
              src={process.env.NEXT_PUBLIC_HOST_API + item.image}
              alt={`${item?.modelName} ${item[`name_${locale.toUpperCase()}`]}`}
              offer={item?.offer}
              price={item?.price}
              modelID={item?.modelID}
              model={item?.modelName}
              id={item?.id}
            />
          ))}
        </>
      )}
      {(productList?.length === 0 || !productList) && <Empty />}
    </FlexDiv>
  );
}

export default CategoriesPageContent;

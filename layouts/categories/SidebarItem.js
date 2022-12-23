import { MinusSquareTwoTone, PlusSquareOutlined } from "@ant-design/icons";

import axios from "axios";
import useFetch from "hooks/useFetch";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startLoading } from "redux/loading/actions";

function SidebarItem({
    index,
    item,
    changeSelectedItem,
    childNumber,
    setActive,
}) {
    const [open, setOpen] = useState(false);
    const [childrens, setChildren] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch();

    const {
        data: data,
        error: error,
        loading: loading,
        executeFetch: executeFetch,
    } = useFetch(
        `${process.env.NEXT_PUBLIC_HOST_API}api/ListCategoryByCategory`,
        "post",
        {},
        false
    );

    // Get categories if the item has children
    useEffect(() => {
        if (item.children) {
            executeFetch({ id: item.id });
        }
    }, [item]);

    useEffect(() => {
        setChildren(data?.description);
    }, [data]);

    // This tow functions To set and empty Selected category
    const clickedItem = (e) => {
        changeSelectedItem(item);
        const categoryItems = document.querySelectorAll(".sidebar-item");
        categoryItems.forEach((item) => {
            item.classList.remove("active");
        });
        e.target.classList.add("active");
    };

    // To remove active class from first side item
    useEffect(() => {
        if (setActive) {
            const categoryItems = document.querySelectorAll(".sidebar-item");
            categoryItems.forEach((item) => {
                item.classList.remove("active");
            });
        }
    }, []);

    if (item.children) {
        return (
            <>
                <div className={open ? `sidebar-item open` : `sidebar-item`}>
                    <div className="sidebar-title hover">
                        <Link
                            href={`/categories/${item.id}?from=side`}
                            onClick={(e) => clickedItem(e)}
                        >
                            {router.locale === "ar"
                                ? item.name_AR
                                : item.name_EN}
                        </Link>
                        {open ? (
                            <MinusSquareTwoTone
                                className="show-icon"
                                onClick={() => setOpen(!open)}
                            />
                        ) : (
                            <PlusSquareOutlined
                                className="show-icon"
                                onClick={() => setOpen(!open)}
                            />
                        )}
                    </div>
                    <div className="sidebar-content">
                        {childrens?.map((child, index) => (
                            <SidebarItem
                                childNumber={2}
                                index={index}
                                key={index}
                                item={child}
                                changeSelectedItem={() =>
                                    changeSelectedItem(child)
                                }
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <Link href={`/categories/${item.id}?from=side`}>
                    <a
                        onClick={(e) => clickedItem(e)}
                        className={`sidebar-item plain ${
                            index === 0 && "active"
                        }`}
                    >
                        {router.locale === "ar" ? item.name_AR : item.name_EN}
                    </a>
                </Link>
            </>
        );
    }
}

export default SidebarItem;

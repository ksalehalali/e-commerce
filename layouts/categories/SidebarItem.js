import { MinusSquareTwoTone, PlusSquareOutlined } from "@ant-design/icons";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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

    // Get categories if the item has children
    useEffect(() => {
        if (item.children) {
            axios
                .post(
                    "https://dashcommerce.click68.com/api/ListCategoryByCategory",
                    {
                        id: item.id,
                    },
                    {
                        headers: {
                            lang: router.locale,
                        },
                    }
                )
                .then((result) => {
                    if (result.data.description.length > 0) {
                        setChildren(result?.data.description);
                    }
                })
                .catch((err) => console.error("Get categories:", err));
        }
    }, [item]);

    // This tow functions To set and empty Selected category
    const clickedItem = (e) => {
        changeSelectedItem(item);
        const categoryItems = document.querySelectorAll(".sidebar-item");
        categoryItems.forEach((item) => {
            item.classList.remove("active");
        });
        e.target.classList.add("active");
    };

    // Seting open class while the item has children or not
    useEffect(() => {
        if (item.children) setOpen(true);
        if (childNumber == 2) setOpen(false);
    }, []);

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
                <div
                    className={open ? `sidebar-item open` : `sidebar-item`}
                    onClick={(e) => clickedItem(e)}
                >
                    <div className="sidebar-title hover">
                        <span>
                            {router.locale === "ar"
                                ? item.name_AR
                                : item.name_EN}
                        </span>
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
                        {childrens.map((child, index) => (
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
                <Link href={`/categories/${item.id}`}>
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

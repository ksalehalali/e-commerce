import { DownOutlined } from "@ant-design/icons";
import Item from "antd/lib/list/Item";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SidebarItemChild from "./SidebarItemChild";

function SidebarItem({ index, item, changeSelectedItem }) {
    const [open, setOpen] = useState(false);
    const [childrens, setChildren] = useState([]);
    const router = useRouter();

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
                            // Authorization: `Bearer ${cookies?.token}`,
                            lang: router.locale,
                        },
                    }
                )
                .then((result) => {
                    if (result.data.description.length > 0) {
                        setChildren(result?.data.description);
                    } else {
                        console.log("No categories!!");
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
        // categoryItems[0].classList.add("active");
        e.target.classList.add("active");
    };

    const setOpenClass = (e) => {
        setOpen(!open);
        const father = e.target.parentElement.parentElement;

        // if (index === 0) {
        //     father.classList.add("open");
        // }
    };

    useEffect(() => {
        if (index === 0) {
            setOpen(true);
        }
    }, []);

    if (item.children) {
        return (
            <>
                <Head>
                    <title>E-commerce</title>
                    <meta name="description" content="E-commerce Site" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
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
                        <DownOutlined
                            className="bi-chevron-down toggle-btn"
                            onClick={() => setOpen(!open)}
                        />
                    </div>
                    <div className="sidebar-content">
                        {childrens.map((child, index) => (
                            <SidebarItemChild
                                key={index}
                                item={child}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <Head>
                    <title>E-commerce</title>
                    <meta name="description" content="E-commerce Site" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Link href={`/categories/${item.id}`}>
                    <a
                        onClick={(e) => clickedItem(e)}
                        className={`sidebar-item plain hover ${
                            index === 0 ? "active" : ""
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

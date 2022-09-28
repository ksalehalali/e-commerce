import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useNa } from "react";
import routerN from "next/router";
import { DownOutlined } from "@ant-design/icons";

function SidebarItemChild({ item, index }) {
    const [childrens, setChildren] = useState([]);
    const router = useRouter();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (index === 0) {
            console.log(router.query.id);
            routerN.push({
                pathname: `/categories/${item.id}`,
            });
        }
    }, [index]);

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
        const categoryItems = document.querySelectorAll(".sidebar-item");
        categoryItems.forEach((item) => {
            item.classList.remove("active");
        });
        categoryItems[0].classList.add("active");
        e.target.classList.add("active");
    };

    if (childrens.length > 0) {
        return (
            <div
                className={open ? "sidebar-item open" : "sidebar-item"}
                onClick={(e) => clickedItem(e)}
            >
                <div className="sidebar-title hover">
                    <span>
                        {router.locale === "ar" ? item.name_AR : item.name_EN}
                    </span>
                    <DownOutlined
                        className="bi-chevron-down toggle-btn"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className="sidebar-content">
                    {childrens.map((child, index) => (
                        <SidebarItemChild key={index} item={child} />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
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
        );
    }
}

export default SidebarItemChild;

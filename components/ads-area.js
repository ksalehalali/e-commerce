import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ads from "../public/images/Event_02.jpeg";
import { COLORS } from "styles/variables";
import axios from "axios";

// Styled element
const AdsElement = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: 20px;
`;

const CaptionImg = styled.div`
    position: absolute;
    padding: 20px;
    z-index: 222;
    top: 50%;
    left: 50px;
    transform: translateY(-40%);
`;

const AdBtn = styled.button`
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    font-size: 20px;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
`;

const AdText = styled.p`
    margin: 0;
`;
function AdsArea() {
    const [adsBanner, setAdsBanner] = useState([]);

    useEffect(async () => {
        await axios
            .get(process.env.NEXT_PUBLIC_HOST_API + "api/ListBanner2", {})
            .then((response) => {
                if (response.data.description.length > 0) {
                    setAdsBanner(response.data.description);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <AdsElement>
            <Image
                layout="responsive"
                width="100%"
                height={20}
                src={`https://dashcommerce.click68.com/${adsBanner[0]?.banner}`}
                alt="Image 2"
            />
            <CaptionImg>
                <AdBtn>Show Details</AdBtn>
                <AdText>Add some text here...</AdText>
            </CaptionImg>
        </AdsElement>
    );
}

export default AdsArea;

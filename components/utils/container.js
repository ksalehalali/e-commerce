// /* containers */

import styled from "styled-components";

const Container = styled.div`
    margin: auto;
    max-width: 2000px;
    overflow: hidden;
    padding: 0 10px;
    background: #fff;
    @media (max-width: 2100px) {
        width: 75%;
        max-width: 75%;
    }
    @media (max-width: 2100px) {
        width: 75%;
        max-width: 75%;
    }

    @media (max-width: 1700px) {
        width: 85%;
        max-width: 85%;
    }

    @media (max-width: 1450px) {
        width: 95%;
        max-width: 95%;
    }
    @media (max-width: 1200px) {
        max-width: 95%;
        width: 95%;
        padding: 0px 0px;
    }
    @media (max-width: 676px) {
        width: 90%;
        max-width: 90%;
    }
`;
// const Container = styled.div`
//   margin: auto;
//   max-width: 2000px;
//   overflow: hidden;
//   @media (max-width: 2100px) {
//     max-width: 1600px;
//   }
//   @media (max-width: 2100px) {
//     max-width: 1600px;
//   }

//   @media (max-width: 1700px) {
//     max-width: 1400px;
//   }

//   @media (max-width: 1450px) {
//     max-width: 1200px;
//   }
//   @media (max-width: 1200px) {
//     max-width: 1100px;
//     padding: 0px 20px;
//   }
//   @media (max-width: 691px) {
//     max-width: 700px;
//   }
// `;

export default Container;

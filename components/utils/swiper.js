// import React, { useEffect, useRef, useState } from "react";

// import { GrNext, GrPrevious } from "react-icons/gr";

// import PropTypes from "prop-types";
// import styled from "styled-components";

// const StyledButton = styled.a`
//   display: flex;
//   width: 32px;
//   height: 32px;
//   justify-content: center;
//   align-items: center;
//   background-color: #fff;
//   border-radius: 50%;
//   border: 1px solid #000;
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   opacity: 0;
//   transition: opacity 0.2s ease;
// `;

// const NextButton = styled(StyledButton)`
//   right: 10px;
// `;
// const PrevButton = styled(StyledButton)`
//   left: 10px;
// `;

// const SwiperContainer = styled.div`
//   position: relative;
//   overflow: hidden;
//   &:hover {
//     > ${StyledButton} {
//       opacity: 1;
//     }
//   }
// `;

// const StyledSwiper = styled.div`
//   display: flex;
//   gap: 10px;
//   overflow: auto;
//   scroll-snap-type: x mandatory;
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const StyledSwiperChild = styled.div`
//   scroll-snap-align: start;
// `;

// export const SwiperChild = React.forwardRef((props, ref) => {
//   //   console.log(props);
//   return <StyledSwiperChild ref={ref}>{props.children}</StyledSwiperChild>;
// });

// function Swiper({ children, nextBtn, prevBtn }) {
//   const [active, setActive] = useState(0);

//   const swiperRef = useRef(null);
//   const swiperChildRefs = useRef([]);

//   //   //   console.log("children", children);
//   //   //   console.log("children", children.type);
//   //   //   console.log("findDOMNode(children[0])", findDOMNode(children[0]));

//   useEffect(() => {
//     // children?.map((child, i) => {
//     //   //   console.log(cloneElement(child, { ref: `item-${i}` }));
//     //   console.log(findDOMNode(child, { ref: `item-${i}` }));
//     // });
//     // console.log("swiperRef.current", swiperRef.current);
//     console.log("swiperRef.current");
//     console.log(swiperRef.current.clientWidth);
//     console.log(swiperChildRefs.current);
//     console.log("children.length", children.length);
//   }, []);

//   // Element.scrollIntoView({ beavior: 'smooth' })

//   // handle next button click
//   const handleNextItem = () => {
//     setActive((prev) => {
//       let newActive = prev;
//       if (newActive === swiperChildRefs.current.length - 1) {
//         newActive = 0;
//       } else {
//         newActive++;
//       }
//       return newActive;
//     });
//   };
//   // handle prev button click
//   const handlePrevItem = () => {
//     setActive((prev) => {
//       let newActive = prev;
//       if (newActive === 0) {
//         newActive = swiperChildRefs.current.length - 1;
//       } else {
//         newActive--;
//       }
//       return newActive;
//     });
//   };

//   useEffect(() => {
//     swiperChildRefs.current[active].scrollIntoView({ behavior: "smooth" });
//   }, [active]);

//   return (
//     <SwiperContainer>
//       {nextBtn && (
//         <NextButton onClick={handleNextItem}>
//           <GrNext />
//         </NextButton>
//       )}
//       <StyledSwiper ref={swiperRef}>
//         {React.Children.map(children, (child, i) =>
//           React.cloneElement(child, {
//             ref: (dom) => {
//               if (!swiperChildRefs.current.includes(dom)) {
//                 return swiperChildRefs.current.push(dom);
//               }
//               return;
//             },
//           })
//         )}
//         {/* {children?.map((child, i) => (
//         <SwiperChild key={i}>{child}</SwiperChild>
//       ))} */}
//       </StyledSwiper>
//       {prevBtn && (
//         <PrevButton onClick={handlePrevItem}>
//           <GrPrevious />
//         </PrevButton>
//       )}
//     </SwiperContainer>
//   );
// }

// Swiper.propTypes = {
//   settings: PropTypes.object,
//   nextBtn: PropTypes.bool || null,
//   prevBtn: PropTypes.bool || null,
// };

// Swiper.defaultProps = {
//   settings: undefined,
//   nextBtn: true,
//   prevBtn: true,
// };

// export default Swiper;

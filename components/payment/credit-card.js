import styled from "styled-components";
// components
import FlexDiv from "../utils/flex-div";
import Text from "../utils/text";

// styles
// credit card styles
const StyledCreditCard = styled.div`
    perspective: 1000px;
    width: 80%;
    height: 200px;
    .flipper {
        transition: 0.6s;
        transform-style: preserve-3d;
        position: relative;
    }
    @media (max-width: 883px) {
        width: 100%;

    }
    ${(props) => {
      if (props.flipped)
        return `
            > .flipper {
                transform: rotateY(180deg);
            }
        `;
    }}}
`;
const CardFrontBack = styled.div`
  width: 100%;
  height: 200px;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  ${(props) => {
    if (props.direc === "front")
      return `
        z-index: 2;
        transform: rotateY(0deg);
      `;
    else if (props.direc === "back")
      return `
        transform: rotateY(180deg);
      `;
  }}
`;

const CardNumber = styled.span`
  position: absolute;
  top: 75px;
  width: fit-content;
  font-size: 36px;
  left: 50%;
  transform: translateX(-50%);
  line-height: 1;
  padding: 0 10px;
  @media (max-width: 1705px) {
    font-size: 2.3em !important;
  }
  @media (max-width: 1220px) {
    font-size: 1.8em !important;
  }
`;

const CardValidNum = styled.span`
  position: absolute;
  top: 120px;
  font-size: 18px;
  left: 110px;
`;

const CardName = styled.span`
  position: absolute;
  bottom: 20px;
  font-size: 18px;
  left: 36px;
`;

const Ws = styled.span`
  display: block;
  background-color: rgba(0, 0, 0, 0.083);
  height: 50px;
  width: 100%;
  position: absolute;
  top: 30px;
`;

const StyledText = styled(Text)`
  position: absolute;
  top: 140px;
  right: 50px;
  font-size: 24px;
  line-height: 1;
  ${(props) => {
    if (props.focused === true)
      return `
                     background-color: ${props.theme.alphaColors.primary};
                     border-radius: 10px;
                     border: 1px solid ${props.theme.colors.primary};
                     transition: all 0.3s ease;
                     `;
  }}
`;

const StyledCvcCode = styled(Text)`
  position: absolute;
  top: 120px;
  right: 50px;
  color: rgba(0, 0, 0, 0.323);
`;

export default function CreditCard({ flipped, cardInformation, focusedInp }) {
  return (
    <FlexDiv justifyCenter alignCenter cStyle={`height: 100%;`}>
      <StyledCreditCard flipped={flipped}>
        <div className="flipper">
          <CardFrontBack direc="front">
            <CardNumber focused={focusedInp === "cardNumber" ? true : false}>
              {cardInformation?.cardNumber === null ||
              cardInformation?.cardNumber === ""
                ? "0000 0000 0000 0000"
                : cardInformation?.cardNumber}
            </CardNumber>
            <CardValidNum focused={focusedInp === "validDate" ? true : false}>
              {cardInformation?.validDate === null ||
              cardInformation?.validDate === ""
                ? "MM/YY"
                : cardInformation?.validDate}
            </CardValidNum>
            <CardName focused={focusedInp === "cardName" ? true : false}>
              {cardInformation?.cardName === null ||
              cardInformation?.cardName === ""
                ? "Cardholder Name"
                : cardInformation?.cardName?.toUpperCase()}
            </CardName>
          </CardFrontBack>
          <CardFrontBack direc="back">
            <Ws></Ws>
            <StyledCvcCode>CVC/CVV</StyledCvcCode>
            <StyledText>
              XXXX{" "}
              <span>
                {cardInformation?.cvc === null || cardInformation?.cvc === ""
                  ? ""
                  : cardInformation?.cvc}
              </span>
            </StyledText>
          </CardFrontBack>
        </div>
      </StyledCreditCard>
    </FlexDiv>
  );
}

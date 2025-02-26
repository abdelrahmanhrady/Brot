import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const HeroG = () => {
  //I love AI
  const [cardImg, setCardImg] = useState([
    // Hearts
    "/HeartA.png",
    "/Heart2.png",
    "/Heart3.png",
    "/Heart4.png",
    "/Heart5.png",
    "/Heart6.png",
    "/Heart7.png",
    "/Heart8.png",
    "/Heart9.png",
    "/Heart10.png",
    "/HeartJ.png",
    "/HeartQ.png",
    "/HeartK.png",

    // Clubs
    "/ClubA.png",
    "/Club2.png",
    "/Club3.png",
    "/Club4.png",
    "/Club5.png",
    "/Club6.png",
    "/Club7.png",
    "/Club8.png",
    "/Club9.png",
    "/Club10.png",
    "/ClubJ.png",
    "/ClubQ.png",
    "/ClubK.png",

    // Spades
    "/SpadeA.png",
    "/Spade2.png",
    "/Spade3.png",
    "/Spade4.png",
    "/Spade5.png",
    "/Spade6.png",
    "/Spade7.png",
    "/Spade8.png",
    "/Spade9.png",
    "/Spade10.png",
    "/SpadeJ.png",
    "/SpadeQ.png",
    "/SpadeK.png",

    // Diamonds
    "/DiamondA.png",
    "/Diamond2.png",
    "/Diamond3.png",
    "/Diamond4.png",
    "/Diamond5.png",
    "/Diamond6.png",
    "/Diamond7.png",
    "/Diamond8.png",
    "/Diamond9.png",
    "/Diamond10.png",
    "/DiamondJ.png",
    "/DiamondQ.png",
    "/DiamondK.png",
  ]);

  const cardArray = useRef([
    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 10, 10, 10,
  ]);
  const cardArrayTemp = useRef(cardArray);
  const [rende,setRender]= useState(0)
  function render(){
    setRender(prevRender => prevRender + 1)
  }

  const [midMsg, setMidMsg] = useState("");

  const empty = "/EmptyCard.png";

  //Card Images
  const dealerImg1 = useRef("/EmptyCard.png");
  const dealerImg2 = useRef("/EmptyCard.png");
  const dealerImg3 = useRef("/EmptyCard.png");
  const dealerImg4 = useRef("/EmptyCard.png");
  const dealerImg5 = useRef("/EmptyCard.png");

  const yourImg1 = useRef("/EmptyCard.png");
  const yourImg2 = useRef("/EmptyCard.png");
  const yourImg3 = useRef("/EmptyCard.png");
  const yourImg4 = useRef("/EmptyCard.png");
  const yourImg5 = useRef("/EmptyCard.png");

  const dealerCard1 = useRef(0);
  const dealerCard2 = useRef(0);
  const dealerCard3 = useRef(0);
  const dealerCard4 = useRef(0);
  const dealerCard5 = useRef(0);

  const flippedCard = useRef(0);

  const yourCard1 = useRef(0);
  const yourCard2 = useRef(0);
  const yourCard3 = useRef(0);
  const yourCard4 = useRef(0);
  const yourCard5 = useRef(0);

  const yourSum = useRef(0);
  const dealerSum = useRef(0);

  const [midGame, setMidGame] = useState(false);
  let CardSelector = 0;

  const [betAmount, setBetAmount] = useState("");

  function ResetCards() {
    yourCard1.current = 0;
    yourCard2.current = 0;
    yourCard3.current = 0;
    yourCard4.current = 0;
    yourCard5.current = 0;

    dealerCard1.current = 0;
    dealerCard2.current = 0;
    dealerCard3.current = 0;
    dealerCard4.current = 0;
    dealerCard5.current = 0;

    setMidMsg("")
  }

  function CheckForAceYou(){
    if (yourCard1.current === 11) {
      yourCard1.current = 1;
      return;
    }
    if (yourCard2.current === 11) {
      yourCard2.current = 1;
      return;
    }
    if (yourCard3.current === 11) {
      yourCard3.current = 1;
      return;
    }
    if (yourCard4.current === 11) {
      yourCard4.current = 1;
      return;
    }
    if (yourCard5.current === 11) {
      yourCard5.current = 1;
      return;
    }
  }

  function CheckForAce() {
    if (dealerCard1.current === 11) {
      dealerCard1.current = 1;
      return;
    }
    if (dealerCard2.current === 11) {
      dealerCard2.current = 1;
      return;
    }
    if (dealerCard3.current === 11) {
      dealerCard3.current = 1;
      return;
    }
    if (dealerCard4.current === 11) {
      dealerCard4.current = 1;
      return;
    }
    if (dealerCard5.current === 11) {
      dealerCard5.current = 1;
      return;
    }
  }

  function SelectorCheck() {
    let CardSelectors = 0;
    CardSelectors = Math.floor(Math.random() * 52);
    while (cardArrayTemp.current[CardSelectors] === 0) {
      CardSelectors = Math.floor(Math.random() * 52);
    }
    return CardSelectors;
  }

  function CheckWinner() {
    if (yourSum.current > dealerSum.current) {
      setMidMsg(`YOU WON: ${yourSum.current} to ${dealerSum.current}`);
    } else if (yourSum.current < dealerSum.current) {
      setMidMsg(`YOU LOST: ${yourSum.current} to ${dealerSum.current} `);
    } else {
      setMidMsg(`DRAW: ${yourSum.current} to ${dealerSum.current}`);
    }
    setMidGame(false);
  }

  function DealerOverflow() {
    setMidMsg(`YOU WON: Dealer ${dealerSum.current}, over 21!`);
    setMidGame(false);
  }
  function YouOverflow() {
    setMidMsg(`YOU LOST: You ${yourSum.current}, over 21!`);
    setMidGame(false);
  }

  function findSums() {
    yourSum.current =
      yourCard1.current +
      yourCard2.current +
      yourCard3.current +
      yourCard4.current +
      yourCard5.current;

    dealerSum.current =
      dealerCard1.current +
      dealerCard2.current +
      dealerCard3.current +
      dealerCard4.current +
      dealerCard5.current;
  }

  //the ancient way of setting a function (???)
  const handleStandClick = () => {
    if (midGame === false) {
      alert("You must bet first");
      return;
    }

    findSums();
    dealerImg2.current = cardImg[flippedCard.current];

    if (dealerSum.current <= 16) {
      CardSelector = SelectorCheck();
      dealerImg3.current = cardImg[CardSelector];
      cardArrayTemp.current[CardSelector] = 0;
      dealerCard3.current = cardArray.current[CardSelector];

      findSums();

      if (dealerSum.current > 21) {
        CheckForAce();
        findSums();
        if (dealerSum.current > 21) {
          DealerOverflow();
          return;
        }
      }

      if (dealerSum.current <= 16) {
        CardSelector = SelectorCheck();
        dealerImg4.current = cardImg[CardSelector];
        cardArrayTemp.current[CardSelector] = 0;
        dealerCard4.current = cardArray.current[CardSelector];

        findSums();

        if (dealerSum.current > 21) {
          CheckForAce();
          findSums();
          if (dealerSum.current > 21) {
            DealerOverflow();
            return;
          }
        }

        if (dealerSum.current <= 16) {
          CardSelector = SelectorCheck();
          dealerImg5.current = cardImg[CardSelector];
          cardArrayTemp.current[CardSelector] = 0;
          dealerCard5.current = cardArray.current[CardSelector];

          findSums();

          if (dealerSum.current > 21) {
            CheckForAce();
            findSums();
            if (dealerSum.current > 21) {
              DealerOverflow();
              return;
            }
          }
        } else {
          CheckWinner();
        }
      } else {
        CheckWinner();
      }
    } else {
      CheckWinner();
    }
    CheckWinner();
  };

  const handleHitClick = () => {
    if (midGame === false) {
      alert("You must bet first");
      return;
    }
    if (yourCard5.current !== 0) {
      alert("You have max cards");
      return;
    }

    if (yourCard3.current == 0) {
      CardSelector = SelectorCheck();
      yourImg3.current = cardImg[CardSelector];
      cardArrayTemp.current[CardSelector] = 0;
      yourCard3.current = cardArray.current[CardSelector];
      findSums();

      if (yourSum.current > 21) {
        CheckForAceYou();
        findSums();
        if (yourSum.current > 21) {
          YouOverflow();
          return;
        }
      }
      render();
      return;
    }
    if (yourCard4.current == 0) {
      CardSelector = SelectorCheck();
      yourImg4.current = cardImg[CardSelector];
      cardArrayTemp.current[CardSelector] = 0;
      yourCard4.current = cardArray.current[CardSelector];
      findSums();

      if (yourSum.current > 21) {
        CheckForAceYou();
        findSums();
        if (yourSum.current > 21) {
          YouOverflow();
          return;
        }
      }
      render();
      return;
    }

    CardSelector = SelectorCheck();
    yourImg5.current = cardImg[CardSelector];
    cardArrayTemp.current[CardSelector] = 0;
    yourCard5.current = cardArray.current[CardSelector];
    findSums();

    if (yourSum.current > 21) {
      CheckForAceYou();
      findSums();
      if (yourSum.current > 21) {
        YouOverflow();
        return;
      }
    }
    render();
  };

  const handleBetClick = () => {
    if (midGame === true) {
      alert("You are in the middle of a game!");
      return;
    }

    if (betAmount < 0) {
      alert("You can't bet negatives");
      return;
    }

    if (betAmount) {
      setMidGame(true);
      alert(`You bet ${betAmount}!`);
      ResetCards();
      //random number
      CardSelector = Math.floor(Math.random() * 52);
      //set image
      dealerImg1.current = cardImg[CardSelector];
      //remove from temp array
      cardArrayTemp.current[CardSelector] = 0;
      //sets the value of first card
      dealerCard1.current = cardArray.current[CardSelector];

      CardSelector = SelectorCheck();
      dealerImg2.current = "/flippedCard.png";
      flippedCard.current = CardSelector;
      cardArrayTemp.current[CardSelector] = 0;
      dealerCard2.current = cardArray.current[CardSelector];

      CardSelector = SelectorCheck();
      yourImg1.current = cardImg[CardSelector];
      cardArrayTemp.current[CardSelector] = 0;
      yourCard1.current = cardArray.current[CardSelector];

      CardSelector = SelectorCheck();
      yourImg2.current = cardImg[CardSelector];
      cardArrayTemp.current[CardSelector] = 0;
      yourCard2.current = cardArray.current[CardSelector];

      dealerImg3.current = empty;
      dealerImg4.current = empty;
      dealerImg5.current = empty;

      yourImg3.current = empty;
      yourImg4.current = empty;
      yourImg5.current = empty;

      setBetAmount("");
    } else {
      alert("Please enter a bet amount!");
    }
  };

  return (
    <>
      <ImageWrapperBlr>
        <Image src="/background.jpg" width={1536} height={515} />
      </ImageWrapperBlr>
      <ImageWrapper>
        <Image src="/PokerBG.jpg" width={1536} height={675} />
      </ImageWrapper>

      <HeadText>{midMsg}</HeadText>

      <BetContainer>
        <BetInput
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)} // Update bet amount on change
          placeholder="Enter Bet"
        />
        <BetButton onClick={handleBetClick}>Place Bet</BetButton>
      </BetContainer>

      <Dealer>Dealer Cards:</Dealer>
      <DealerCards>
        <DealerCard>
          <Image src={dealerImg1.current} width={78} height={111} />
        </DealerCard>
        <DealerCard>
          <Image src={dealerImg2.current} width={78} height={111} />
        </DealerCard>
        <DealerCard>
          <Image src={dealerImg3.current} width={78} height={111} />
        </DealerCard>
        <DealerCard>
          <Image src={dealerImg4.current} width={78} height={111} />
        </DealerCard>
        <DealerCard>
          <Image src={dealerImg5.current} width={78} height={111} />
        </DealerCard>
      </DealerCards>

      <You>Your Cards:</You>
      <YourCards>
        <YourCard>
          <Image src={yourImg1.current} width={78} height={111} />
        </YourCard>
        <YourCard>
          <Image src={yourImg2.current} width={78} height={111} />
        </YourCard>
        <YourCard>
          <Image src={yourImg3.current} width={78} height={111} />
        </YourCard>
        <YourCard>
          <Image src={yourImg4.current} width={78} height={111} />
        </YourCard>
        <YourCard>
          <Image src={yourImg5.current} width={78} height={111} />
        </YourCard>
      </YourCards>

      <HitStandContainer>
        <HitButton onClick={handleHitClick}>
          ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Hit ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎{" "}
        </HitButton>
        <StandButton onClick={handleStandClick}>
          ‎ ‎ ‎ ‎ ‎ ‎ Stand ‎ ‎ ‎ ‎ ‎ ‎{" "}
        </StandButton>
      </HitStandContainer>
    </>
  );
};

const Dealer = styled.h1`
  text-shadow: 
    1px 1px 0px black;, 
    -1px -1px 0px black;,
    1px -1px 0px black;,
    -1px 1px 0px black;


  position: absolute;

  left: 43%;
  top: 170px;
  width: 475px;
  height: 87px;

  color: rgb(255, 215, 0);  
  line-break: auto;
  overflow-wrap: initial;
  white-space: pre;
  text-rendering: geometricPrecision;
  caret-color: rgb(255, 215, 0);
  text-decoration: none;
  letter-spacing: 0px;
  font-family: "Noto Sans Georgian";
  font-style: normal;
  font-weight: 700;
`;

const DealerCards = styled.div`
  position: absolute;
  top: 28%;
  left: 36%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Adds spacing between cards */
`;

const DealerCard = styled.div`
  position: relative;
`;

const YourCards = styled.div`
  position: absolute;
  top: 55%;
  left: 36%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Adds spacing between cards */
`;

const YourCard = styled.div`
  position: relative;
`;

const You = styled.h1`
  text-shadow: 
    1px 1px 0px black;, 
    -1px -1px 0px black;,
    1px -1px 0px black;,
    -1px 1px 0px black;


  position: absolute;

  left: 44%;
  bottom: 125px;
  width: 475px;
  height: 87px;

  color: rgb(255, 215, 0);  
  line-break: auto;
  overflow-wrap: initial;
  white-space: pre;
  text-rendering: geometricPrecision;
  caret-color: rgb(255, 215, 0);
  text-decoration: none;
  letter-spacing: 0px;
  font-family: "Noto Sans Georgian";
  font-style: normal;
  font-weight: 700;
`;

const ImageWrapper = styled.div`
  z-index: -1;

  position: absolute;
  left: 0%;
  top: 97px;
  border-radius: 0px;
  filter: blur(1px);
`;

const ImageWrapperBlr = styled.div`
  z-index: -2;
  position: absolute;
  left: 0%;
  top: 97px;
  border-radius: 0px;
`;

const HeadText = styled.h1`
  text-shadow: 1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black,
    -1px 1px 0px black;

  position: fixed; /* Use fixed positioning to position it relative to the viewport */
  top: 50%;
  left: 50%;
  transform: translate(
    -50%,
    -50%
  ); /* This will center the element both horizontally and vertically */

  width: 675px;
  height: 87px;

  color: rgb(255, 215, 0);
  font-size: 32px;
  font-family: "Noto Sans Georgian";
  font-weight: 700;
  text-align: center;
  text-rendering: geometricPrecision;
  caret-color: rgb(255, 215, 0);
  text-decoration: none;
  letter-spacing: 0px;
`;

const BetContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
`;

const BetInput = styled.input`
  padding: 10px;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  width: 150px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: rgb(255, 215, 0);
  }
`;

const BetButton = styled.button`
font-weight:700;
  padding: 10px 20px;
  font-size: 18px;
  background-color: rgb(255, 215, 0);
  color: black;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 10px;
  cursor: pointer;

&:hover{
    
    background:rgb(208, 177, 0);
    transition: .5s;
`;

const HitStandContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
  gap: 50px;
`;

const HitButton = styled.button`
font-weight:700;
  padding: 10px 20px;
  font-size: 18px;
  background-color: rgb(255, 215, 0);
  color: black;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 10px;
  cursor: pointer;

&:hover{
    
    background:rgb(208, 177, 0);
    transition: .5s;
`;
const StandButton = styled.button`
font-weight:700;
  padding: 10px 20px;
  font-size: 18px;
  background-color: rgb(255, 215, 0);
  color: black;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 10px;
  cursor: pointer;

&:hover{
    
    background:rgb(208, 177, 0);
    transition: .5s;
`;

export default HeroG;

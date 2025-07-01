import React from "react";
import styled from "styled-components";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { db } from "../backend/Firebase";
import { useEffect, useState } from "react";
import { useUser } from "./StateContext/UserContext";
import Image from "next/image";

const Leaderboard = () => {
  const { userData } = useUser();
  const [players, setPlayers] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [dealerProfit, setDealerProfit] = useState(0);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardRef = collection(db, "users");

        // 🔸 Fetch top 10 players for leaderboard display
        const q = query(leaderboardRef, orderBy("money", "desc"), limit(10));
        const snapshot = await getDocs(q);

        const playersData = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          rank: index + 1,
          ...doc.data(),
        }));

        setPlayers(playersData);

        // 🔸 Fetch all users for rank + dealer earnings
        const allUsersSnapshot = await getDocs(leaderboardRef);
        const allUsers = allUsersSnapshot.docs.map((doc) => doc.data());

        // ✅ Calculate dealer profit
        let totalMoneyWon = 0;
        let totalMoneyLost = 0;

        allUsers.forEach((user) => {
          totalMoneyWon += user.MoneyWon || 0;
          totalMoneyLost += user.MoneyLost || 0;
        });

        setDealerProfit(totalMoneyLost - totalMoneyWon);

        // ✅ Calculate current user rank
        if (userData) {
          const sortedUsers = [...allUsers].sort((a, b) => b.money - a.money);
          const globalRank = sortedUsers.findIndex((user) => user.uid === userData.uid) + 1;
          setCurrentUserRank(globalRank);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, [userData]);

  function stringNumConversion(num) {
    let isNegative = num < 0;
    num = Math.abs(num);

    let result;
    if (num >= 1_000_000_000_000) {
      result = Math.floor((num / 1_000_000_000_000) * 100) / 100 + "T";
    } else if (num >= 1_000_000_000) {
      result = Math.floor((num / 1_000_000_000) * 100) / 100 + "B";
    } else if (num >= 1_000_000) {
      result = Math.floor((num / 1_000_000) * 100) / 100 + "M";
    } else if (num >= 1_000) {
      result = Math.floor((num / 1_000) * 100) / 100 + "K";
    } else {
      result = num.toString();
    }

    return isNegative ? "-" + result : result;
  }

  return (
    <>
      <LeaderboardContainer>
        <HeaderT>🏆 Leaderboard</HeaderT>
        <LeaderboardList>
          {players.map((player) => (
            <LeaderboardItem
              key={player.id}
              isCurrentUser={userData?.uid === player.uid}
            >
              <Rank>{player.rank}.</Rank>
              <Username>{player.username}</Username>
              <Money>💰 {stringNumConversion(player.money)}$</Money>
            </LeaderboardItem>
          ))}
        </LeaderboardList>
        {userData && currentUserRank && (
          <UserRank>Your Rank: #{currentUserRank}</UserRank>
        )}
        <DealerProfit>
          💼 Dealer Earnings: {stringNumConversion(dealerProfit)}$
        </DealerProfit>
      </LeaderboardContainer>

      <ImageWrapperBlr>
        <Image src="/PokerBG.jpg" layout="fill" objectFit="cover" />
      </ImageWrapperBlr>
      <ImageWrapper>
        <Image src="/PokerBG.jpg" layout="fill" objectFit="cover" />
      </ImageWrapper>
    </>
  );
};

const DealerProfit = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  color: red;
`;

const ImageWrapper = styled.div`
  z-index: -1;
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0%;
  top: 0px;
  border-radius: 0px;
  filter: blur(10px);
`;

const ImageWrapperBlr = styled.div`
  z-index: -2;
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0%;
  top: 0px;
  border-radius: 0px;
`;

const LeaderboardContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #1a1a1a;
  border-radius: 10px;
  color: white;
  width: 50%;
  margin: auto;
`;

const HeaderT = styled.h1`
  padding: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: gold;
`;

const LeaderboardList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LeaderboardItem = styled.li`
  display: flex;
  justify-content: space-between;
  background: ${(props) =>
    props.isCurrentUser ? "rgb(171, 142, 0)" : "#2c2c2c"};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: ${(props) => (props.isCurrentUser ? "bold" : "normal")};
  color: ${(props) => (props.isCurrentUser ? "white" : "inherit")};
`;

const Rank = styled.span`
  font-weight: bold;
  color: gold;
`;

const Username = styled.span`
  flex: 1;
`;

const Money = styled.span`
  font-weight: bold;
  color: rgb(121, 255, 125);
`;

const UserRank = styled.p`
  margin-top: 15px;
  font-size: 18px;
  color: lightblue;
  font-weight: bold;
`;

export default Leaderboard;

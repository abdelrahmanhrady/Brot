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
  

  //Mostly AI generated
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardRef = collection(db, "users");
        const q = query(leaderboardRef, orderBy("money", "desc"), limit(10));
        const snapshot = await getDocs(q);

        const playersData = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          rank: index + 1,
          ...doc.data(),
        }));

        setPlayers(playersData);

        // Find current user's rank globally if not in top 10
        if (userData) {
          // Query all users to determine global rank
          const allUsersQuery = query(leaderboardRef, orderBy("money", "desc"));
          const allUsersSnapshot = await getDocs(allUsersQuery);
          const allUsers = allUsersSnapshot.docs.map((doc) => doc.data());

          const globalRank =
            allUsers.findIndex((user) => user.uid === userData.uid) + 1;
          setCurrentUserRank(globalRank);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, [userData]);
  function stringNumConversion(num) {
    let result;

    if (num >= 1_000_000_000_000) {
      result = (num / 1_000_000_000_000).toFixed(2) + "T";
    } else if (num >= 1_000_000_000) {
      result = (num / 1_000_000_000).toFixed(2) + "B";
    } else if (num >= 1_000_000) {
      result = (num / 1_000_000).toFixed(2) + "M";
    } else if (num >= 1_000) {
      result = (num / 1_000).toFixed(2) + "K";
    } else {
      result = num.toString();
    }

    return result;
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
//AI GENERATED
const LeaderboardItem = styled.li`
  display: flex;
  justify-content: space-between;
    {/*The heck is this*/}
  background: ${(props) => (props.isCurrentUser ? "rgb(171, 142, 0)" : "#2c2c2c")};
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
  color:rgb(121, 255, 125);
`;

const UserRank = styled.p`
  margin-top: 15px;
  font-size: 18px;
  color: lightblue;
  font-weight: bold;
`;

export default Leaderboard;

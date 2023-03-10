import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import TrendingBar from "./TrendingBar";
import { followUser } from "../services/user";
import SearchBar from "./SearchBar";

export default function Main({ title, children, loading, isUserPage, hasFollowedUser, idUser }) {
  const [activeButton, setActiveButton] = useState(false);
  const [userIsFollower, setUserIsFollower] = useState();

  const idFollower = JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    setUserIsFollower(hasFollowedUser);
  }, [hasFollowedUser])

  async function followAndUnfollowUser() {
    setActiveButton(true);
    try {
      const res = await followUser(idFollower, idUser);
      setUserIsFollower(res.data.follow);
      setActiveButton(false);
    
      if(res.status === 400) {
        alert("An error occurred");
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Timeline>
          {loading ? <TextInfo>Loading ...</TextInfo> : (
            <>
                <SearchBar mobile={true}/>
              
              <Title>
                <h1>{title}</h1> 
                {isUserPage && 
                 (idFollower !== Number(idUser)) &&
                 (userIsFollower ? 
                  <Button disabled={activeButton} onClick={() => {followAndUnfollowUser()}} className="unfollow">Unfollow</Button> :
                  <Button disabled={activeButton} onClick={() => {followAndUnfollowUser()}} className="follow">Follow</Button> 
                )}
              </Title>
              {children}
            </>
          )}
        </Timeline>


        <TrendingBar loading={loading}/>
      </Content>

    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  margin: auto;
  width: 65%;

  gap: 20px;

  @media (max-width:1060px) {
    width: 100%;
  }
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;

  margin: auto;
  margin-top: 130px;

  width: 600px;

  @media (max-width: 705px) {
    margin-top: 100px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1{
    font-family: Oswald;
    font-size: 43px;
    font-weight: 700;
    color: #ffffff;

    margin-bottom: 10px;

    @media (max-width: 705px) {
      margin-left: 20px;
      margin-top: 20px;
      font-size: 35px;
    }
  }

`;

const Button = styled.button`
    font-family: Lato;
    font-weight: 700;
    height: 30px;
    width: 100px;
    margin-top: 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    @media (max-width: 705px) {
      margin-right: 20px;
    }

    &.follow {
      background-color: #1877F2;
      color: #ffffff;
    }

    &.unfollow {
      background-color: #ffffff;
      color: #1877F2;
    } 

    &:disabled {
      opacity: 0.5;
    }
`;


const TextInfo = styled.h1`
  font-family: Oswald;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
`;

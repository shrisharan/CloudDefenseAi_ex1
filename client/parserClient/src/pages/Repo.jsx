import { useEffect, useState } from "react";
import getUrlParams from "../utils/GetUrlParam";
import Cookies from "js-cookie";
import getAccessToken from "../utils/GetAccessToken";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
  gap: 4.8rem;
  background-color: #fff;
  flex-direction: column;

  & .action-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .action-container2 {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }
  & .repo-grid {
    width: 90dwv;
    padding: 4.8rem;
    display: grid;
    grid-template-columns: 4;
  }

  display: flex;
  height: 100dvh;
  width: auto;
  align-items: center;
  padding: 4.8rem;

  & img {
    width: 35dvw;
  }
`;

const StyledHeader = styled.h1`
  font-size: 3.8rem;
  text-align: start;
  color: #ff3e3e;
  justify-content: center;
  padding: 3.8rem;
  display: inline-block;
`;
const StyledButton = styled.button`
  padding: 1.2rem;
  border: none;
  outline: none;
  background-color: #ff3e3e;
  width: 16rem;
  border-radius: 150rem;
  display: inline-block;
  color: #eee;

  &:link,
  &:visited {
  }
  &:active,
  &:hover {
    background-color: #d21414;
  }
`;

const StyledButtonCTA = styled.button`
  padding: 1.2rem;
  border: none;
  outline: none;
  background-color: #555;
  width: 16rem;
  border-radius: 150rem;
  display: inline-block;
  color: #eee;

  &:link,
  &:visited {
  }
  &:active,
  &:hover {
    background-color: #333;
  }
`;
const StyledText = styled.p`
  text-align: center;
  font-size: 2.4rem;
  color: #444;
  padding: 1.8rem;
`;

function Repo() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCookieChanged, setIsCookieChanged] = useState(true);
  const [userRepo, setUserRepo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = getUrlParams();
    const accessCode = params.get("code");

    if (!Cookies.get("auth-token") && accessCode) {
      getAccessToken(accessCode).then((value) => {
        setIsLoading((state) => false);
      });
    } else {
      setIsLoading((state) => false);
    }
  }, []);

  function handleLogout() {
    Cookies.remove("auth-token");
    setIsLoading((state) => true);
    setIsCookieChanged((state) => !state);
    navigate("/");
  }

  async function handleDependencyRequest(e) {
    const buttonValue = e.target.textContent;
    const serviceUrl = `http://localhost:3000/user/repo/${buttonValue}`;
    const response = await fetch(serviceUrl, {
      method: "GET",
      headers: {
        Authourization: `bearer ${Cookies.get("auth-token")}`,
      },
      credentials: "include",
    });
    const content = await response.json();
    const dependencies = content.data;

    navigate("/dependencies", { state: { dependencies } });
  }

  const handleGetRepo = async function () {
    const serviceUrl = `http://localhost:3000/user`;
    const response = await fetch(serviceUrl, {
      method: "GET",
      credentials: "include",
    });
    const userRepoData = await response.json();

    setUserRepo(userRepoData.data);
  };

  return (
    <StyledContainer>
      {isLoading ? (
        <StyledHeader>Loading ...</StyledHeader>
      ) : (
        <>
          <div className="action-container">
            <StyledHeader>Hi There 👋 you are logged in</StyledHeader>
            <StyledButton onClick={handleLogout}>Logout</StyledButton>
          </div>
          <div className="action-container2">
            <StyledText>
              You can find all your GitHub Repos by pressing the button below
            </StyledText>
            <StyledButtonCTA onClick={handleGetRepo}>
              Get Your Repos
            </StyledButtonCTA>
          </div>
          <div>
            {userRepo !== null && userRepo.length !== 0 ? (
              <StyledHeader>Here are your Repos</StyledHeader>
            ) : (
              <></>
            )}
            <div className="repo-grid">
              {userRepo !== null && userRepo.length !== 0 ? (
                userRepo.map((item) => (
                  <StyledButton onClick={handleDependencyRequest} key={item.id}>
                    {item.name}
                  </StyledButton>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </StyledContainer>
  );
}

export default Repo;

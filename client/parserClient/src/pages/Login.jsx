import styled from "styled-components";

const StyledContainer = styled.div`
  gap: 4.8rem;
  background-color: #fff;
  flex-direction: column;

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
  text-align: center;
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

const CLIENT_ID = "c8803e84a016e550d0c1";
const handleLogin = function () {
  const gitHubLoginLink = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;
  window.location.replace(gitHubLoginLink);
};

function Login() {
  return (
    <StyledContainer>
      <StyledHeader>Welcome to GitHub-POM Parser (by Shri) </StyledHeader>
      <img alt="service-img" src="service.jpg" />
      <StyledButton onClick={handleLogin}>Login</StyledButton>
    </StyledContainer>
  );
}

export default Login;

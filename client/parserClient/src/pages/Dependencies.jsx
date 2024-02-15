import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Dependency from "../components/Dependency";

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

  display: flex;
  height: 100dvh;
  width: auto;
  align-items: center;
  padding: 4.8rem;

  & img {
    width: 35dvw;
  }
  & .dependency-list {
    width: 90dvw;
    padding: 2.4rem;
    border-radius: 2.4rem;
    background-color: #d21414;
    flex-direction: column;
    display: flex;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
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

function Dependencies() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { dependencies } = state;
  console.log(dependencies);
  return (
    <StyledContainer>
      <div className="action-container">
        <StyledHeader>
          You can see all the dependencies of the Chosen Repositories
        </StyledHeader>
        <StyledButton
          onClick={function () {
            navigate("/repo");
          }}
        >
          Go Back To previous Page
        </StyledButton>
      </div>
      <div className="dependency-list">
        <Dependency groupId="GROUP-ID" artifact="ARTIFACT-ID" />
        {dependencies.map((item) => (
          <Dependency
            key={`${item.groupId} ${item.artifactId}`}
            groupId={item.groupId}
            artifact={item.artifactId}
          />
        ))}
      </div>
    </StyledContainer>
  );
}

export default Dependencies;

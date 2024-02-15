import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  gap: 3.2rem;
  width: 100%;
  height: 9.6rem;
  background-color: #fff;
  border-radius: 2.4rem;
  align-items: center;
  justify-content: space-around;
  padding: 1.2rem;
  & h2 {
    color: #444;
    text-align: center;
    font-size: 2.4rem;
    width: 40%;
  }
`;

function Dependency({ groupId, artifact }) {
  return (
    <StyledDiv>
      <h3>{groupId}</h3>
      <h3>{artifact}</h3>
    </StyledDiv>
  );
}

export default Dependency;

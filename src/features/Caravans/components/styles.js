import styled from "styled-components";

const S = {};

S.Container = styled.div`
  display: flex;
`;

S.Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-right: 20px;
`;

S.Control = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

S.Right = styled.div``;

export default S;

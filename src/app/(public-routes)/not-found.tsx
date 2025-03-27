"use client";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export default function Page() {
  const textData = {
    notFound: "Nie znaleziono żadnego zestawu pod tym adresem.",
  };
  return (
    <Main>
      <Typography variant="h5">{textData.notFound}</Typography>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30vh;
`;

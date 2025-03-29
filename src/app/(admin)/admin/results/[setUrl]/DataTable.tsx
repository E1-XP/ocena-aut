import { FC, useContext, useEffect, useState } from "react";
// import H1 from "@/components/shared/H1";
import Icon from "@/components/Icons";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import styled from "@emotion/styled";
import { useRedirect } from "@/hooks/useRedirect";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getCarSets } from "@/calls/car-set.call";
import { CarSetWithoutIds, CarSetAnswerWithoutIds } from "@/types";
import { getCarSetAnswers } from "@/calls/car-set-answer.call";
import { useCarSetStore } from "@/state/car-set";
import { useGlobalState } from "@/state/global";

const Main = () => {
  const [carSetAnswers, setCarSetAnswers] = useState<CarSetAnswerWithoutIds[]>(
    []
  );
  const carSetStore = useCarSetStore();

  const { isLoading } = useGlobalState();
  const setIsLoading = useGlobalState((state) => state.setIsLoading);

  useEffect(() => {
    if (carSetStore.id !== "0") {
      getCarSetAnswers(carSetStore.id)
        .then((data) => {
          setCarSetAnswers(data);
          setIsLoading(false);
        })
        .catch((err) => {
          alert("Wystąpił błąd ładowania danych.");
        });
    }
  }, [carSetStore.id]);

  const calcAverageQuestionRatings = (carIdx: number, questionIdx: number) => {
    return (
      carSetAnswers.reduce((acc, set) => {
        if (!set.carAnswers[carIdx]) return acc + 0; // handle not rated car results
        return acc + set.carAnswers[carIdx].questions[questionIdx].rating;
      }, 0) / carSetAnswers.length
    );
  };

  const getColor = (average: number) => {
    if (average === 0) return "#555";
    if (average < 3) return "red";
    if (average === 3) return "orange";
    else return "green";
  };

  if (isLoading || carSetStore.id === "0") {
    return (
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "35vh",
        }}
      >
        <CircularProgress color="secondary" />
      </main>
    );
  }

  return (
    <MainWrapper>
      <Typography variant="h4">Średnia ocen dla zestawu</Typography>
      {carSetAnswers.length ? (
        <Table>
          <Thead>
            <Tr>
              <Th>Pytanie</Th>
              {carSetStore.cars.map((car, carIdx) => (
                <Th key={car.id}>{`${car.brand} ${car.model}`}</Th>
              ))}
            </Tr>
          </Thead>
          <TBody>
            {carSetStore.cars[0]?.questions.map((q, questionIdx) => (
              <Tr key={questionIdx}>
                <Td>{q.text}</Td>
                {carSetStore.cars?.map((car, carIdx) => (
                  <Td
                    key={carIdx}
                    style={{
                      color: getColor(
                        calcAverageQuestionRatings(carIdx, questionIdx)
                      ),
                      fontWeight: "600",
                    }}
                  >
                    {calcAverageQuestionRatings(carIdx, questionIdx) || "-"}
                  </Td>
                ))}
              </Tr>
            ))}
          </TBody>
        </Table>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">
            Nie znaleziono odpowiedzi dla zestawu.
          </Typography>
        </Box>
      )}
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const Th = styled.th`
  padding: 3px 15px;
  text-align: left;
  border-bottom: 1px solid #818181;
`;

const Td = styled.td`
  padding: 3px 15px;
  text-align: left;
  border-right: 1px solid #cecece;
`;

const CenterTd = styled(Td)`
  text-align: center;
`;

const Tr = styled.tr`
  height: 40px;
`;

const TBody = styled.tbody``;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Thead = styled.thead``;

export default Main;

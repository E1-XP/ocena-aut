"use client";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import prisma from "@/../prisma/client";
import { Container } from "@mui/material";
import Image from "next/image";
import { useCarSetStore } from "@/state/car-set";
import { MouseEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCarSet } from "@/calls/car-set.call";
import { useGlobalState } from "@/state/global";
import CircularProgress from "@mui/material/CircularProgress";
import { useCarSetAnswerStore } from "@/state/car-answer";
import { CarAnswer, CarAnswerwithoutIds } from "@/types";
import { getCarSetAnswers } from "@/calls/car-set-answer.call";

interface Props {
  params: { carSet: string };
}

export default function Page({ params }: Props) {
  const { carSet: carSetUrl } = params;

  const globalState = useGlobalState();
  const carState = useCarSetStore();
  const carAnswerState = useCarSetAnswerStore();

  const router = useRouter();

  const textData = {
    notFound: "Nie znaleziono żadnego zestawu pod tym adresem.",
    noCars:
      "Nie znaleziono żadnych samochodów. Przejdź do panelu admina aby je dodać.",
  };

  const setCars = useCarSetStore((state) => state.setCars);
  const setUrl = useCarSetStore((state) => state.setUrl);
  const setId = useCarSetStore((state) => state.setId);

  const setAnswerCars = useCarSetAnswerStore((state) => state.setCars);
  const setCarSetId = useCarSetAnswerStore((state) => state.setCarSetId);
  const setCarSetAnswerId = useCarSetAnswerStore(
    (state) => state.setCarSetAnswerId
  );

  const setIsLoading = useGlobalState((state) => state.setIsLoading);

  const clearAnswerState = () => {
    setAnswerCars([]);
  };

  useEffect(() => {
    if (carSetUrl !== carState.url) {
      getCarSet(carSetUrl).then((carSet) => {
        if (carSet) {
          setCars(carSet.cars.map((car) => ({ ...car, visited: false })));
          setId(carSet.id);
          setUrl(carSet.url);
        }

        getCarSetAnswers(carSet.id)
          .then((answers) => {
            const answerSet = answers.find((set) => set.carSetId === carSet.id);

            if (answerSet) {
              setAnswerCars(answerSet.carAnswers);
              setCarSetAnswerId(answerSet.id);
            }

            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      });
    } else setIsLoading(false);
  }, []);

  const onCarCardClick = (e: MouseEvent<HTMLButtonElement>, carId: string) => {
    clearAnswerState();
    setCarSetId(carState.id);

    if (!carAnswerState.cars.find((car) => car.carId === carId)) {
      setAnswerCars([
        ...carAnswerState.cars,
        { questions: [], carSetAnswerId: carState.id, carId },
      ] as CarAnswer[]); // create answer state car to later append question answers during next screens with questions
    }
    setIsLoading(true);
    router.push(`/${carSetUrl}/${carId}/questions/0`);
  };

  if (globalState.isLoading) {
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
    <main>
      <Container
        maxWidth="xl"
        sx={{ paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        <Grid container spacing={2} justifyContent="center">
          {carState?.cars?.length ? (
            carState.cars.map((car, idx) => (
              <Grid size={{ xs: 12, md: 4 }} key={idx}>
                <Card>
                  <CardActionArea
                    onClick={(e) => onCarCardClick(e, car.id)}
                    disabled={
                      carAnswerState.cars.find(
                        (ansCar) => ansCar.carId === car.id
                      ) !== undefined
                    }
                    sx={{
                      height: "100%",
                      "&[data-active]": {
                        backgroundColor: "action.selected",
                        "&:hover": {
                          backgroundColor: "action.selectedHover",
                        },
                      },
                      opacity:
                        carAnswerState.cars.find(
                          (ansCar) => ansCar.carId === car.id
                        ) !== undefined
                          ? "0.5"
                          : undefined,
                    }}
                  >
                    <CardContent
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src={car.imgUrl}
                        alt={`${car.brand} ${car.model}`}
                        width={200}
                        height={200}
                        style={{ objectFit: "contain" }}
                      />
                      <Typography variant="h5" component="div" align="center">
                        {car.brand} {car.model}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h5" sx={{ marginTop: "20vh" }}>
              {carState.url.length ? textData.noCars : textData.notFound}
            </Typography>
          )}
        </Grid>
      </Container>
    </main>
  );
}

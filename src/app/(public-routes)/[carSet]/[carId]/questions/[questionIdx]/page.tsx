"use client";
import { getCarSet } from "@/calls/car-set.call";
import { useCarSetStore } from "@/state/car-set";
import { useGlobalState } from "@/state/global";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Slider from "@mui/material/Slider";
import { useRouter } from "next/navigation";
import { useEffect, useState, MouseEvent } from "react";
import { Car, CarAnswer, CarAnswerwithoutIds } from "@/types";
import Button from "@/components/Button";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { useCarSetAnswerStore } from "@/state/car-answer";
import {
  createCarSetAnswer,
  editCarSetAnswer,
} from "@/calls/car-set-answer.call";

interface Props {
  params: { questionIdx: string; carId: string; carSet: string };
}

export default function Page({ params }: Props) {
  const { carSet: carSetUrl, questionIdx, carId } = params;

  const globalState = useGlobalState();
  const carState = useCarSetStore();
  const carAnswerState = useCarSetAnswerStore();

  const router = useRouter();
  const [rating, setRating] = useState(3);
  const [car, setCar] = useState<Car | null>(null);

  const textData = {
    nextBtn: "Dalej",
    completedBtn: "Wyślij wyniki",
    instructionsHeading: "Instrukcja",
    instructions:
      "Oceń w skali od 1 do 5 parametry modelu samochodu, który testujesz (1 – źle, 5 – bardzo dobrze).",
  };

  const setCars = useCarSetStore((state) => state.setCars);
  const setIsLoading = useGlobalState((state) => state.setIsLoading);

  const setAnswerCars = useCarSetAnswerStore((state) => state.setCars);
  const setCarSetAnswerId = useCarSetAnswerStore(
    (state) => state.setCarSetAnswerId
  );

  useEffect(() => {
    setIsLoading(true);

    if (!carState.url) return router.push(`/${carSetUrl}`);

    if (carSetUrl !== carState.url) {
      getCarSet(carSetUrl).then((data) => {
        if (data) {
          setCars(data.cars);

          const car = data.cars.find((car) => car.id === carId);
          car && setCar(car);
        }

        setIsLoading(false);
      });
    } else {
      if (carState.cars.length) {
        const car = carState.cars.find((car) => car.id === carId);
        car && setCar(car);
      }
      setIsLoading(false);
    }
  }, []);

  function valuetext(value: number) {
    return `${value}`;
  }

  const nextQuestionUrl = window.location.pathname
    .split("/")
    .slice(0, -1)
    .join("/")
    .concat(`/${+questionIdx + 1}`);

  const isOnLastQuestion =
    car?.questions.length && +questionIdx - 1 === car.questions.length - 1;

  const addQuestionAnswer = () => {
    const cars: CarAnswerwithoutIds[] = [...carAnswerState.cars];
    const carToUpdateIdx = cars.findIndex((car) => car.carId === carId);
    const questions = cars[carToUpdateIdx].questions;
    questions.push({ rating });

    cars[carToUpdateIdx] = { ...cars[carToUpdateIdx], questions };
    setAnswerCars(cars as CarAnswer[]);
  };

  const onNextBtnClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (isOnLastQuestion) {
      e.preventDefault();

      addQuestionAnswer();

      setCars(
        carState.cars.map((car) => ({
          ...car,
          visited: carId === car.id ? true : car.visited,
        }))
      );

      setIsLoading(true);

      if (!carAnswerState.carSetId) throw new Error("carSetId has no value.");

      if (!carAnswerState.carSetAnswerId) {
        const newCarSetAnswer = {
          carAnswers: carAnswerState.cars,
          carSetId: carAnswerState.carSetId,
        };

        const setAnswer = await createCarSetAnswer(newCarSetAnswer);
        setCarSetAnswerId(setAnswer.id);
      } else {
        await editCarSetAnswer({
          carAnswers: carAnswerState.cars,
          carSetId: carAnswerState.carSetId,
          id: carAnswerState.carSetAnswerId,
        });
      }
      router.push(`/${carSetUrl}`);
    } else {
      if (questionIdx !== "0") addQuestionAnswer();
    }
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
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid
            size={{ xs: 12, md: 6 }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Stack spacing={5} alignItems={"center"}>
              {questionIdx === "0" ? (
                <>
                  <Typography variant="h4">
                    {textData.instructionsHeading}
                  </Typography>

                  <Typography variant="h5">{textData.instructions}</Typography>
                </>
              ) : (
                <>
                  <Typography variant="h5" align={"center"}>
                    {car?.brand} {car?.model}
                  </Typography>
                  <Typography variant="h4" align={"center"}>
                    {car?.questions[+questionIdx - 1].text}
                  </Typography>
                  <Typography variant="h6" align="center">
                    {rating} / {5}
                  </Typography>
                  <Slider
                    aria-label="Rate car functionality"
                    color="secondary"
                    defaultValue={5}
                    getAriaValueText={valuetext}
                    step={1}
                    max={5}
                    min={1}
                    value={rating}
                    onChange={(e, v) => setRating(v as number)}
                    sx={{
                      "& .MuiSlider-thumb": {
                        transform: "scale(1.5) translateY(-30%)",
                      },
                    }}
                  />
                </>
              )}
              <Button
                color="secondary"
                href={isOnLastQuestion ? `#` : nextQuestionUrl}
                onClick={onNextBtnClick}
                sx={{ transform: "scale(1.2)" }}
              >
                {isOnLastQuestion ? textData.completedBtn : textData.nextBtn}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

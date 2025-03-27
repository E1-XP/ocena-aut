"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Icon from "@/components/Icons";
import Link from "next/link";
import styled from "@emotion/styled";
import { useRedirect } from "@/hooks/useRedirect";
import { useGlobalState } from "@/state/global";
import CircularProgress from "@mui/material/CircularProgress";
import { getCarSet } from "@/calls/car-set.call";
import { CarSet } from "@/types";
import DataTable from "./DataTable";
import { useCarSetStore } from "@/state/car-set";

interface Props {
  params: { setUrl: string };
}

const Main = ({ params }: Props) => {
  const { setUrl } = params;
  const { session } = useRedirect();

  const carSetStore = useCarSetStore();

  const { isLoading } = useGlobalState();
  const setIsLoading = useGlobalState((state) => state.setIsLoading);

  const getData = async () => {
    try {
      const carSetData = await getCarSet(setUrl);
      carSetStore.setCars(carSetData.cars);
      carSetStore.setId(carSetData.id);
      carSetStore.setUrl(carSetData.url);
      setIsLoading(false);
    } catch (err: any) {
      if (err.response.status === 404) {
        setIsLoading(true);
      } else {
        alert(err);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
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

  return session?.user ? (
    <CenterWrapper>
      <DataTable />
    </CenterWrapper>
  ) : null;
};

export default Main;

const CenterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
`;

const EmptyWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StyledButton = styled(Button)``;

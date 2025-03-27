"use client";
import { FC, useContext, useEffect, useState } from "react";

import Button from "@/components/Button";
import DataTable from "./DataTable";
import Icon from "@/components/Icons";
import Link from "next/link";
// import { getComparisonBlueprints } from "@/calls/comparisonBlueprint.call";
import styled from "@emotion/styled";
import { useRedirect } from "@/hooks/useRedirect";
import { useGlobalState } from "@/state/global";
import CircularProgress from "@mui/material/CircularProgress";
import { getCarSets } from "@/calls/car-set.call";
import { CarSet } from "@/types";

const Main: FC = () => {
  const [carSets, setCarSets] = useState<CarSet[]>([]);
  const { session } = useRedirect();

  const { isLoading } = useGlobalState();
  const setIsLoading = useGlobalState((state) => state.setIsLoading);

  useEffect(() => {
    setIsLoading(false);
    getCarSets()
      .then((data) => {
        setCarSets(data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setIsLoading(true);
        } else {
          alert(err);
        }
      });
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
      {!isLoading && carSets.length > 0 && (
        <CenterWrapper>
          <Link href="admin/create">
            <StyledButton endIcon={<Icon type="add" />}>Dodaj</StyledButton>
          </Link>
          <DataTable />
        </CenterWrapper>
      )}
      {!isLoading && carSets.length === 0 && (
        <div>
          <EmptyWrapper>
            Brak zestawień.
            <Link href="admin/create">
              <StyledButton endIcon={<Icon type="add" />}>Dodaj</StyledButton>
            </Link>
          </EmptyWrapper>
        </div>
      )}
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

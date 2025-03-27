import { FC, useContext, useEffect, useState } from "react";
// import H1 from "@/components/shared/H1";
import Icon from "@/components/Icons";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import styled from "@emotion/styled";
import { useRedirect } from "../../../hooks/useRedirect";
import { Typography } from "@mui/material";
import { getCarSets } from "@/calls/car-set.call";
import { CarSet } from "@/types";
// import {
//   createComparisonBlueprint,
//   deleteComparisonBlueprint,
//   getComparisonBlueprints,
// } from "@/calls/comparisonBlueprint.call";
// import { IComparisonBlueprint } from "@/types";
// import { deleteComparison } from "@/calls/comparison.call";

const Main: FC = () => {
  const [carSets, setCarSets] = useState<CarSet[]>([]);

  useRedirect();

  useEffect(() => {
    getCarSets()
      .then((data) => {
        console.log(data);
        setCarSets(data);
      })
      .catch((err) => {
        alert("Wystąpił błąd ładowania danych.");
      });
  }, []);

  const handleDeleteComparisons = (url: string): void => {
    // if (confirm("Czy na pewno chcesz usunąć porównania dla tego szablonu?")) {
    //   deleteComparison(url, true)
    //     .then(() => {
    //       alert("Porównania dla szablonu zostały usuniete.");
    //     })
    //     .catch((err) => {
    //       alert(err);
    //     });
    // }
  };

  const handleDeleteComparisonBlueprint = (id: string): void => {
    // if (
    //   confirm(
    //     "Czy na pewno chcesz usunąć wybrany szablon porównania? Dodatkowo usunięte zostaną porównania utworzone na jego podstawie."
    //   )
    // ) {
    //   deleteComparisonBlueprint(id).then(() => {
    //     setComparisonBlueprints(
    //       comparisonBlueprints.filter((comparison) => comparison.id !== id)
    //     );
    //   });
    // }
  };

  const handleClone = (id: string, url: string): void => {
    // const originalComparison = comparisonBlueprints.find(
    //   (comparison) => comparison.id === id
    // );
    // if (!originalComparison) return;
    // const isUrlTaken = (url: string) =>
    //   !!comparisonBlueprints.find((comparison) => comparison.url === url);
    // const generateUrl = (url: string) => {
    //   let newUrl = url + "-kopia";
    //   let i = 1;
    //   while (isUrlTaken(newUrl)) {
    //     newUrl = url + "-kopia-" + i;
    //     i++;
    //   }
    //   return newUrl;
    // };
    // const preparedToClone = {
    //   url: generateUrl(url),
    //   cars: originalComparison.cars.map((car) => ({
    //     ...car,
    //     id: undefined,
    //     comparisonBlueprintId: undefined,
    //     options: car.options.map((option) => ({
    //       ...option,
    //       id: undefined,
    //       CarBlueprintId: undefined,
    //     })),
    //   })),
    // };
    // createComparisonBlueprint(preparedToClone)
    //   .then((res) => {
    //     setComparisonBlueprints([...comparisonBlueprints, res]);
    //   })
    //   .catch((err) => {
    //     if (err.response.status === 400) {
    //       alert("Nie udało się sklonować zestawu (możliwy duplikat url)");
    //     }
    //   });
  };

  return (
    <MainWrapper>
      <Typography variant="h4">Zestawy samochodów</Typography>
      <Table>
        <Thead>
          <Tr>
            <Th>URL</Th>
            <Th>Liczba pytań</Th>
            <Th>Akcje</Th>
          </Tr>
        </Thead>
        <TBody>
          {carSets.map((set, idx) => (
            <Tr key={idx}>
              <Td>{set.url}</Td>
              <Td>{set.cars[0].questions.length}</Td>
              <CenterTd>
                <Link href={`/admin/results/${set.url}`}>
                  <Tooltip title="Zobacz wyniki">
                    <IconButton>
                      <Icon type="equalizer" color="primary" />
                    </IconButton>
                  </Tooltip>
                </Link>

                <Link href={`/${set.url}`}>
                  <Tooltip title="Podgląd">
                    <IconButton>
                      <Icon type="visibilityOn" color="success" />
                    </IconButton>
                  </Tooltip>
                </Link>

                <Tooltip title="Duplikuj">
                  <IconButton onClick={() => handleClone(set.id, set.url)}>
                    <Icon type="clone" color="primary" />
                  </IconButton>
                </Tooltip>

                <Link href={`/admin/edit/${set.url}`}>
                  <Tooltip title="Edytuj">
                    <IconButton>
                      <Icon type="edit" color="secondary" />
                    </IconButton>
                  </Tooltip>
                </Link>

                <Tooltip title="Wyczyść utworzone na tej podstawie porównania">
                  <div style={{ display: "inline-block" }}>
                    <IconButton
                      //   disabled={set.results.length === 0}
                      onClick={() => handleDeleteComparisons(set.url)}
                    >
                      <Icon
                        type="delete"
                        // color={
                        //   set.results.length === 0 ? "disabled" : "warning"
                        // }
                      />
                    </IconButton>
                  </div>
                </Tooltip>

                <Tooltip title="Usuń porównanie">
                  <IconButton
                    onClick={() => handleDeleteComparisonBlueprint(set.id)}
                  >
                    <Icon type="delete" color="error" />
                  </IconButton>
                </Tooltip>
              </CenterTd>
            </Tr>
          ))}
        </TBody>
      </Table>
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

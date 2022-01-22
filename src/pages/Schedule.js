import React, { useEffect, useState } from "react";
import useStyles from "../styles/Styles.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TableSortLabel from "@mui/material/TableSortLabel";
import Button from "@mui/material/Button";

function Schedule( { plants } ) {
  const classes = useStyles();
  const {
    table,
    tableContainer,
    schedule,
    buttonPrimary,
  } = classes;

  const [plantSchedule, setPlantSchedule] = useState([]);
  const [sortCol, setSortCol] = useState(0);
	const [sortAsc, setSortAsc] = useState(false);

  const waterPlant = (event, id) => {
    let index = plantSchedule.findIndex(elem => elem.id === id);
    let untilWater = plantSchedule[index].nextWater;
    let newWater = untilWater + plantSchedule[index].water;
    let newArr = [...plantSchedule];
    newArr[index].nextWater = newWater;
    setPlantSchedule(newArr);
  }

  const fertilizePlant = (event, id) => {
    let index = plantSchedule.findIndex(elem => elem.id === id);
    let untilFertilize = plantSchedule[index].nextFertilize;
    let newFertilize = untilFertilize + plantSchedule[index].fertilize;
    let newArr = [...plantSchedule];
    newArr[index].nextFertilize = newFertilize;
    setPlantSchedule(newArr);
  }

  const updateSorting = (event, column) => {
    if (column === sortCol) {
      setSortAsc(!sortAsc);
    }
    setSortCol(column);
  }

  const sortedPlants = plantSchedule.sort((a, b) => {
		let dirMult = (sortAsc?1:-1);
		if (sortCol === 1)
			return (a.water-b.water)*dirMult;
		if (sortCol === 2)
			return (a.fertilize-b.fertilize)*dirMult;
		return 0;
	});

  useEffect(() => {
    let newArr = [...plants];
    newArr.forEach(plant => {
      plant.nextWater = Math.round((plant.nextWater - Date.now()) / 1000 / 60 / 60 / 24);
      plant.nextFertilize = Math.round((plant.nextFertilize - Date.now()) / 1000 / 60 / 60 / 24);
    })
    setPlantSchedule(newArr);
  }, [])

  return(
    <Box className={schedule}>
      <Box>
        <TableContainer className={tableContainer}>
          <Table className={table} component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell>Plant</TableCell>
                <TableCell>
                  Days until next water
                  <TableSortLabel
                    active={sortCol === 1}
                    direction={sortAsc?"asc":"desc"}
                    onClick={(event) => {updateSorting(event, 1)}}
                  >
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  Days until next fertilize
                  <TableSortLabel
                    active={sortCol === 2}
                    direction={sortAsc?"asc":"desc"}
                    onClick={(event) => {updateSorting(event, 2)}}
                  ></TableSortLabel>  
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPlants.map((plant) => (
                <TableRow
                  key={plant.id}
                >
                  <TableCell>
                    {plant.name} ({plant.species})
                  </TableCell>
                  <TableCell>
                    {plant.nextWater}
                  </TableCell>
                  <TableCell>
                    {plant.nextFertilize}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      className={buttonPrimary} 
                      disableElevation
                      onClick={(event) => {waterPlant(event, plant.id)}}
                    >
                      Water
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      className={buttonPrimary} 
                      disableElevation
                      onClick={(event) => {fertilizePlant(event, plant.id)}}
                    >
                      Fertilize
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Schedule;
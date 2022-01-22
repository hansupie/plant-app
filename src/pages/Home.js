import React from "react";
import Button from "@mui/material/Button";
import useStyles from "../styles/Styles.js";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import PlantInfoCard from "../components/PlantInfoCard.js";
import Box from "@mui/material/Box";

function Home( { plants} ) {
  const classes = useStyles();
  const {
    root,
    headerContainer,
    buttonPrimary,
    link,
    plantInfoCard,
    homeCards,
  } = classes;

  const dtf = new Intl.DateTimeFormat("uk-EN", {year: 'numeric', month: 'numeric', day: 'numeric'});

  /**Checks if plants array is empty*/
  if (plants.length === 0) {
    /**Shows Welcome header and link to my plants page if plants is empty */
    return (
      <div className={root}>
        <div className={headerContainer}>
          <h1> Welcome to Plant Watering Reminder </h1>
          <Link className={link} to="/my-plants">
            <Button className={buttonPrimary} variant="contained" disableElevation>Start your jungle</Button>
          </Link>
        </div>
      </div>
    );
  }

  /**Shows plants that need to be watered and fertilized today (date for nextWater equals todays date)*/
  return (
    <Box className={homeCards}>
      <Box>
        <Typography variant="h4">
          Water today
        </Typography>
        <Box>
          {plants.filter(plant => dtf.format(plant.nextWater) === dtf.format(Date.now())).map(filteredPlant => (
            <Card className={plantInfoCard} square variant="string" sx={{ maxWidth: 345 }} key={filteredPlant}>
              <PlantInfoCard
                key={filteredPlant.id}
                name={filteredPlant.name}
                species={filteredPlant.species}
                image={filteredPlant.image}
              />
            </Card>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant="h4">
          Fertilize today
        </Typography>
        <Box>
          {plants.filter(plant => dtf.format(plant.nextFertilize) === dtf.format(Date.now())).map(filteredPlant => (
            <Card className={plantInfoCard} square variant="string" sx={{ maxWidth: 345 }} key={filteredPlant}>
              <PlantInfoCard
                key={filteredPlant.id}
                name={filteredPlant.name}
                species={filteredPlant.species}
                image={filteredPlant.image}
              />
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  )
  
}

export default Home;
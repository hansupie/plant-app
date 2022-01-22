import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useStyles from "../styles/Styles.js";
import NewPlantForm from "./NewPlantForm.js";

const Plant = ( { index, id, name, species, water, fertilize, notes, image, handleSubmit, removePlant } ) => {
  
  const classes = useStyles();
  const {
    plantCard,
  } = classes;
  
  const [editOpen, setEditOpen] = useState(false);

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.code === "KeyY") {
      setEditOpen(true);
    }
    if (event.code === "Escape") {
      setEditOpen(false);
    }
  }

  const handleSave = (e, newInfo) => {
    handleSubmit(e, newInfo);
  }

  const handleClose = () => {
    setEditOpen(false);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [])

  if (editOpen) {
    return (
      <NewPlantForm
        info={[image, name, species, water, fertilize, notes, id, index]}
        formOpen={editOpen}
        handleSubmit={handleSave}
        handleClose={handleClose}
        btnText={"Save Changes"}
      />
    )
  }

  return (
    <div>
      <Card square className={plantCard} variant="string">
        <CardMedia 
          component="img"
          sx={{ width:151 }}
          src={image}
          alt={name}
        />
        <CardContent display="grid" gap={2}>
          <Box gridColumn="span 12">
            <Typography component="div" variant="h5">
              {name}
            </Typography>
          </Box>
          <Box gridColumn="span 6">
            <Typography component="div" variant="subtitle1" color="text.secondary">
              {species}
            </Typography>
            <Typography component="div" variant="subtitle1" color="text.secondary">
              {notes}
            </Typography>
          </Box>
          <Box gridColumn="span 6">
            <Typography component="div" variant="subtitle1" color="text.secondary">
              Water every {water} days
            </Typography>
            <Typography component="div" variant="subtitle1" color="text.secondary">
              Fertilize every {fertilize} days
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          
          
        </CardActions>
        <CardActions>
          <Box displayPrint="none">
            <IconButton
              onClick={() => removePlant(index)}
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              onClick={() => setEditOpen(true)}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </div>
  )
}

export default Plant;
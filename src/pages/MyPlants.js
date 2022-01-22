import React, { useEffect, useState } from "react";
import Plant from "../components/Plant";
import useStyles from "../styles/Styles.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NewPlantForm from "../components/NewPlantForm";
import TestImage from "../assets/download.png";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

function MyPlants( { plants, updatePlants } ) {
  const classes = useStyles();
  const {
    cardList,
    buttonAdd,
  } = classes;

  const [plantItems, setPlantItems] = useState(plants);
  const [formOpen, setFormOpen] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.code === "KeyQ") {
      setFormOpen(true);
    }
    if (event.code === "Escape") {
      setFormOpen(false);
    }
  }

  const undo = (event) => {
		setRedoStack(redoStack.concat([plantItems]));
    setPlantItems(undoStack[undoStack.length-1]);
    setUndoStack(undoStack.slice(0, undoStack.length-1));
	}
	const redo = (event) => {
		setUndoStack(undoStack.concat([plantItems]));
    setPlantItems(redoStack[redoStack.length-1]);
    setRedoStack(redoStack.slice(0, redoStack.length-1));
	}

  const handleSubmit = (event, newPlant) => {
    event.preventDefault();

    const plantObject = {
        image: newPlant[0],
        name: newPlant[1],
        species: newPlant[2],
        water: parseInt(newPlant[3]),
        fertilize: parseInt(newPlant[4]),
        notes: newPlant[5],
        id: Date.now().toString(),
        nextWater: Date.now() + newPlant[3]*(24*60*60*1000),
        nextFertilize: Date.now() + newPlant[4]*(24*60*60*1000),
    }
    const newPlantList = plantItems.concat([plantObject])
    setPlantItems(newPlantList);
    updatePlants(newPlantList);
    setUndoStack(undoStack.concat([plantItems]));
    setRedoStack([]);
  }

  const handleClose = () => {
    setFormOpen(false);
  }

  const handleEdit = (event, editedInfo) => {
    event.preventDefault();

    const editedPlant = {
        image: editedInfo[0],
        name: editedInfo[1],
        species: editedInfo[2],
        water: editedInfo[3],
        fertilize: editedInfo[4],
        notes: editedInfo[5],
        id: editedInfo[6]
    }
    let index = editedInfo[7];
    let editedPlants = plantItems.slice(0, index).concat([editedPlant]).concat(plantItems.slice(index+1));
    setPlantItems(editedPlants);
    updatePlants(editedPlants);
    setUndoStack(undoStack.concat([plantItems]));
    setRedoStack([]);
  }

  const removePlant = (index) => {
    let newArr = plantItems.slice(0, index).concat(plantItems.slice(index+1));
    setPlantItems(newArr);
    updatePlants(newArr);
    setUndoStack(undoStack.concat([plantItems]));
    setRedoStack([]);
  }

  const printPage = () => {
    window.print();
  }

  useEffect(() => {
    let newArr = [...plants];
    newArr.forEach(plant => {
      plant.nextWater = new Date().getTime() + plant.water*(24*60*60*1000);
      plant.nextFertilize = new Date().getTime() + plant.fertilize*(24*60*60*1000);
    })
    setPlantItems(newArr);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [])

  return (
    <div>
      <Box displayPrint="none">
        <Button 
          className={buttonAdd} 
          startIcon={<AddCircleIcon className={buttonAdd}/>} 
          size="large"
          onClick={() => setFormOpen(true)}
          disabled={formOpen}
        >
          Add Plant
        </Button>
        <IconButton
          onClick={printPage}
        >
          <PrintIcon />
        </IconButton>
        <IconButton disabled={undoStack.length === 0} onClick={undo}>
          <UndoIcon/>
        </IconButton>
        <IconButton disabled={redoStack.length === 0} onClick={redo}>
          <RedoIcon/>
        </IconButton>
      </Box>
      <Box className={cardList}>
        <NewPlantForm 
          info={[TestImage, "", "", 0, 0, "", ""]}
          handleSubmit={handleSubmit}
          formOpen={formOpen}
          handleClose={handleClose}
          btnText={"Add Plant"}
          />
        {plantItems.map((plantItem, i) => 
          <Plant 
            index={i}
            key={plantItem.id}
            id={plantItem.id}
            name={plantItem.name}
            species={plantItem.species}
            water={plantItem.water}
            fertilize={plantItem.fertilize}
            notes={plantItem.notes}
            image={plantItem.image}
            handleSubmit={handleEdit}
            removePlant={removePlant}
          />
        )}
      </Box>
    </div>
  )
}

export default MyPlants;
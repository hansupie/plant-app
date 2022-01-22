import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import useStyles from "../styles/Styles.js";
import TestImage from "../assets/download.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

function NewPlantForm(props) {
  const classes = useStyles();
  const {
    btn1,
    plantCard,
  } = classes;

  const [plantInfo, setPlantInfo] = useState(props.info);

  const handleSaveClick = (e, plantInfo) => {
    console.log(plantInfo, "plantInfo")
    props.handleSubmit(e, plantInfo);
    setPlantInfo([TestImage, "", "", 0, 0, "", ""]);
    props.handleClose();
  }
  
  const handleInfoChange = (event, id) => {
    let newArr = [...plantInfo];
    newArr[id] = event.target.value;
    setPlantInfo(newArr);
  }

  const handleImage = (event) => {
    let file = event.target.files[0];
    if (file && file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      let reader = new FileReader()
      reader.onloadend = function(evt) {
        let newArr = [...plantInfo];
        newArr[0] = reader.result;
        setPlantInfo(newArr);
      }
      reader.readAsDataURL(file);
    }
  }

  const imageDragStart = (event) => {
    event.dataTransfer.setData("image/jpeg", event.target.src);
    event.dataTransfer.dropEffect = "copy";
  }

  const ImageOnDrop = (event) => {
    event.preventDefault();
    let file = event.dataTransfer.files[0];
    if (file && file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      let reader = new FileReader()
      reader.onloadend = function(evt) {
        let newArr = [...plantInfo];
        newArr[0] = reader.result;
        setPlantInfo(newArr);
      }
      reader.readAsDataURL(file);
    }
  }

  const imageDragEnter = (event) => {
    event.preventDefault();
    let file = event.dataTransfer.files[0];
    if (file && file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      event.preventDefault();
    } 
  }

  const imageDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }

  if (props.formOpen) {
    return (
      <Card square className={plantCard} variant="string">
        <CardMedia 
          component="img"
          sx={{ width:151 }}
          src={plantInfo[0]}
          alt={plantInfo[1]}
          onDragEnter={imageDragEnter}
          onDrop={ImageOnDrop}
          contentEditable={true}
          onDragStart={imageDragStart}
          onDragOver={imageDragOver}
          draggable={true}
        />
        <Box>
          <label htmlFor="icon-button-file">
            <input 
              accept="image/*" 
              id="icon-button-file" 
              type="file" 
              style={{display: "none"}}
              onChange={handleImage}
            />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>
        <Box component="form" onSubmit={(e) => handleSaveClick(e, plantInfo)}>
          <CardContent>
            <Grid container spacing={2} columns={20}>
              <Grid container item direction="column" justifyContent="flex-end" alignItems="stretch" xs={7} spacing={2}>
                <Grid item>
                  <TextField 
                    label="Name"
                    required
                    value={plantInfo[1]}
                    onChange={(event) => {handleInfoChange(event, 1)}}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <TextField 
                    label="Species"
                    required
                    value={plantInfo[2]}
                    onChange={(event) => {handleInfoChange(event, 2)}}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Notes"
                    multiline
                    rows={4}
                    value={plantInfo[5]}
                    onChange={(event) => {handleInfoChange(event, 5)}}
                    variant="standard"
                  />
                </Grid>
              </Grid>
              <Grid container item direction="column" xs={5} spacing={2}>
                <Grid item>
                  <TextField
                    label="Watering frequency"
                    type="number"
                    required
                    value={plantInfo[3]}
                    onChange={(event) => {handleInfoChange(event, 3)}}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Fertilizing frequency"
                    type="number"
                    required
                    value={plantInfo[4]}
                    onChange={(event) => {handleInfoChange(event, 4)}}
                    variant="standard"
                  />
                </Grid>
              </Grid>
              <Grid container item xs={4} justifyContent="flex-end" alignItems="flex-end">
                <Button variant="outlined" onClick={props.handleClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid container item xs={4} justifyContent="flex-end" alignItems="flex-end">
                <Button className={btn1} type="submit" variant="contained">
                  {props.btnText}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Card>
    )
  } else {
    return (
      <div></div>
    )
  }
  
}

export default NewPlantForm;
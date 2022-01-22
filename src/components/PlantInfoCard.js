import React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function PlantInfoCard(props) {
  return (
    <>
      <CardMedia
        component="img"
        height="140"
        src={props.image}
        alt={props.name}
      />
      <CardContent>
        <Typography variant="h5">
          {props.name}
        </Typography>
        <Typography variant="body2">
          {props.species}
        </Typography>
      </CardContent>
    </>
  )
}
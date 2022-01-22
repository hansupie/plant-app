import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    background: "linear-gradient(180deg, #CBEDCC 0%, #F7CDD1 100%)",
  },
  headerContainer: {
    width: "auto",
    margin: "auto",
    padding: "20px"
  },
  appBar: {
    backgroundColor: "#CBEDCC",
    boxShadow: "none",
  },
  link: {
    textDecoration: "none",
    color: "black",
    margin: "20px",
    "&:hover":{
      borderBottom: "1px solid"
    },
  },
  cardList: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flext-start",
  },
  plantCard: {
    display: "flex",
    marginBottom: "20px",
  },
  plantInfoCard: {
    margin: "20px",
  },
  buttonAdd: {
    color: "black",
  },
  buttonAction: {
    background: "rgba(0,0,0,1)",
    border: 0,
    borderRadius: "50%",
    color: "white",
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    maxWidth: 700,
  },
  table: {
    minWidth: 700,
  },
  schedule: {
    display: "grid",
    gridAutoFlow: "row",
    gridRowGap: "20px",
  },
  buttonSecondary: {
    margin: "0 20px 0 0",
  },
  homeCards: {
    display: "grid",
    gridAutoFlow: "column",
    gridColumnGap: "20px",
  }
});

export default useStyles;
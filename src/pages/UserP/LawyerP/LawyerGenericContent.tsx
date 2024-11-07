import { UserModel } from "../../../services/Model/UserModel/UserModel";
import packageJson from "../../../../package.json";
import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import {
  Autocomplete,
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  outlinedInputClasses,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  createTheme,
  ThemeProvider,
  Theme,
  useTheme,
} from "@mui/material/styles";
import {
  firebaseDatabase,
  USERS_TYPS,
} from "../../../services/Firebase/FirebaseService";
import { collection, query, where, getDocs, limit, orderBy, startAfter } from "firebase/firestore";
import { LawyerModel } from "../../../services/Model/LawyerModel/LawyerModel";
import { JSX } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LawyerGenericContent(props: { datauserparam: UserModel } | any) {
  const textMoreData = "Mostrar más...";
  const textInitScroll = "Volver al principio...";
  const [currentData, setCurrentData] = React.useState<LawyerModel>();
 
  const [showInitButton, setShowInitButton] = React.useState(false);
  const [openPopupDetail, setOpenPopupDetail] = React.useState(false);
  const [dataLoaded, setDataLoaded] = React.useState(false); 
  const [offset, setOffset] = React.useState(0); 
  const [data, setData] = React.useState(Array<LawyerModel>);

  const limitConstant = 8;

  async function loadGridData() {
    const q = query(
      collection(firebaseDatabase, "users"),
      where("role", "==", USERS_TYPS.ABO.value),
      limit(limitConstant)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setData((prevArray: any) => [...prevArray, doc.data()]);
    }); 
  }

  document.title = document.title =
    packageJson.title + " " + props.datauserparam?.name;

  window.addEventListener("scroll", toggleButton);

  function toggleButton() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      setShowInitButton(true);
    } else {
      setShowInitButton(false);
    }
  }

  const tiposDerecho = [
    { label: "Tipo de derecho administrativo", code: "Administrativo" },
    { label: "Tipo de derecho constitucional", code: "Constitucional" },
    { label: "Tipo de derecho penal", code: "Penal" },
    { label: "Tipo de derecho mercantil", code: "Mercantil" },
    { label: "Tipo de derecho civil", code: "Civil" },
    { label: "Tipo de derecho procesal", code: "Procesal" },
    { label: "Tipo de derecho internacional", code: "Internacional" },
    { label: "Tipo de derecho comunitario", code: "Comunitario" },
    { label: "Tipo de derecho fiscal", code: "Fiscal" },
    { label: "Tipo de derecho laboral", code: "Laboral" },
    { label: "Tipo de derecho unión europea", code: "EU" },
  ];

  const colegios = [
    {
      label: "Ilustre Colegio de Abogados de Madrid",
      code: "ICAM",
      location: "Madrid",
    },
    {
      label: "Il·lustre Col·legi de l’Advocacia de Barcelona",
      code: "ICAB",
      location: "Barcelona",
    },
    {
      label: "Ilustre Colegio de Abogados de Valencia",
      code: "ICAV",
      location: "Valencia",
    },
    {
      label: "Colegio de Abogados de Sevilla",
      code: "ICAS",
      location: "Sevilla",
    },
    {
      label: "Ilustre Colegio de Abogados de Málaga",
      code: "ICAMALAGA",
      location: "Málaga",
    },
    {
      label: "Colegio de Abogados de Alicante",
      code: "ICALI",
      location: "Alicante",
    },
    {
      label: "Colegio de Abogados de Zaragoza",
      code: "REICAZ",
      location: "Zaragoza",
    },
    {
      label: "Ilustre Colegio de Abogados de Bizkaia",
      code: "ICASV",
      location: "Bizkaia",
    },
    {
      label: "Colegio de Abogados de Murcia",
      code: "ICAMUR",
      location: "Murcia",
    },
    {
      label: "Colegio de Abogados de Gipuzkoa",
      code: "ICAGI",
      location: "Gipuzkoa",
    },
    {
      label: "Ilustre Colegio de Abogados de Oviedo",
      code: "ICAOVIEDO",
      location: "Oviedo",
    },
    {
      label: "Colegio de Abogados de Granada",
      code: "ICAGR",
      location: "Granada",
    },
    {
      label: "Colegio de Abogados de La Rioja",
      code: "ICAR",
      location: "La Rioja",
    },
    {
      label: "Ilustre Colegio de Abogados de Valladolid",
      code: "ICAVA",
      location: "Valladolid",
    },
    {
      label: "Colegio de Abogados de Córdoba",
      code: "ICACOR",
      location: "Córdoba",
    },
    {
      label: "Ilustre Colegio de Abogados de Castellón",
      code: "ICACS",
      location: "Castellón",
    },
  ];

  const buttonStyle = {
    width: "100%",
    borderRadius: "2rem",
    border: "1px solid",
    padding: "1rem",
    margin: "1rem 0 0 0",
    backgroundColor: "#6b9080",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#6b9080",
      borderColor: "#6b9080",
    },
    "&:focus": {
      backgroundColor: "#fff",
      color: "#6b9080",
      borderColor: "#6b9080",
      outline: "4px auto #6b9080",
    },
  };

  const buttonInitStyle = {
    backgroundColor: "#6b9080",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#6b9080",
      borderColor: "#6b9080",
    },
    "&:focus": {
      backgroundColor: "#fff",
      color: "#6b9080",
      borderColor: "#6b9080",
      outline: "4px auto #6b9080",
    },
    position: "fixed",
    bottom: "6rem",
    right: "0.6rem",
  };

  const handleMoreCard = () => {
    loadGridData();
  };

  const handleShowInit = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const buttonInitScroll = (
    <>
      <Tooltip title={textInitScroll}>
        <Fab
          sx={buttonInitStyle}
          aria-label="initbutton"
          onClick={handleShowInit}
        >
          <ArrowUpwardIcon />
        </Fab>
      </Tooltip>
    </>
  );

  const filterStyle = {
    minWidth: 230,
    paddingInlineStart: { xs: 0, sm: 0, md: 10 },
    paddingBottom: 5,
    display: { xs: "block", sm: "block", md: "inline-flex" },
  };

  function popUpDetailClosed(): void {
    setOpenPopupDetail(false);
  }

  function popUpDetail(data: LawyerModel): void {
    setOpenPopupDetail(true);
    setCurrentData(data);
  }

  function generateLawyerCard(data: LawyerModel): JSX.Element {
    return (
      <Card sx={{ width: 340 }} key={data.email} id={"valItem" + data.email}>
        <CardActionArea onClick={() => popUpDetail(data)}>
          {generateLawyerCardDetail(data)}
        </CardActionArea>
      </Card>
    );
  }

  function generateLawyerCardDetail(data: LawyerModel): JSX.Element {
    return (
      <>
        <CardMedia component="img" image={data.urlAvatarProfile} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.primary" }}
            component="div"
          >
            Descripción del abogado: {data.email}, {data.name}, {data.role}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", padding: 2 }}
            component="div"
          >
            {colegios[7].label}
            {colegios[7].location}
          </Typography>
        </CardContent>
      </>
    );
  }

  function generateLawyerCardDetailWActions(data: LawyerModel): JSX.Element {
    return (
      <>
        <CardMedia component="img" image={data?.urlAvatarProfile} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.primary" }}
            component="div"
          >
            Descripción del abogado: {data?.email}, {data?.name}, {data?.role}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", padding: 2 }}
            component="div"
          >
            {colegios[7].label}
            {colegios[7].location}
          </Typography>
        </CardContent>
      </>
    );
  }


  if(!dataLoaded){
    loadGridData();
    setDataLoaded(true);
  }

  const textFieldFilterStyle = (outerTheme: Theme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              "--TextField-brandBorderColor": "#6b9080",
              "--TextField-brandBorderHoverColor": "#6b9080",
              "--TextField-brandBorderFocusedColor": "#6b9080",
              "& label.Mui-focused": {
                color: "var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: "var(--TextField-brandBorderColor)",
            },
            root: {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "var(--TextField-brandBorderHoverColor)",
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              "&::before, &::after": {
                borderBottom: "2px solid var(--TextField-brandBorderColor)",
              },
              "&:hover:not(.Mui-disabled, .Mui-error):before": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderHoverColor)",
              },
              "&.Mui-focused:after": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              "&::before": {
                borderBottom: "2px solid var(--TextField-brandBorderColor)",
              },
              "&:hover:not(.Mui-disabled, .Mui-error):before": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderHoverColor)",
              },
              "&.Mui-focused:after": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
      },
    });

  return (
    <React.Fragment>
      <Dialog open={openPopupDetail} onClose={popUpDetailClosed}>
        <DialogTitle id="avatar-dialog-title">{currentData?.name}</DialogTitle>
        <DialogContent id="avatar-dialog-content">
          {generateLawyerCardDetailWActions(currentData)}
        </DialogContent>
      </Dialog>

      <Box>
        <ThemeProvider theme={textFieldFilterStyle(useTheme())}>
          <Grid 
            sx={{
              display: { xs: "block", sm: "block", md: "inline-flex" },
              marginTop: 5,
            }}
          >
            <Autocomplete
              sx={filterStyle}
              options={[]}
              renderInput={(params) => (
                <TextField
                  variant="standard"
                  {...params}
                  label="Nombre y/o apellidos..."
                />
              )}
            />
            <Autocomplete
              sx={filterStyle}
              options={tiposDerecho}
              renderInput={(params) => (
                <TextField
                  variant="standard"
                  {...params}
                  label="Tipo del derecho..."
                />
              )}
            />
            <Autocomplete
              sx={filterStyle}
              options={colegios}
              renderInput={(params) => (
                <TextField variant="standard" {...params} label="Colegio..." />
              )}
            />
          </Grid>
        </ThemeProvider>
        <Grid
          container
          spacing={{ xs: 2 }}
          columns={{ xs: 1, sm: 4, md: 8, xl: 16 }}
        >
          {Array.from(data).map((_, index) => generateLawyerCard(data[index]))}
        </Grid>
      </Box>

      {showInitButton ? buttonInitScroll : ""}

      <Tooltip title={textMoreData}>
        <IconButton
          sx={buttonStyle}
          aria-label="loadmore"
          onClick={handleMoreCard}
        >
          <AutorenewIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

export default LawyerGenericContent;

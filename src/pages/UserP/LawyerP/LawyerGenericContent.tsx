import { UserModel } from "../../../services/Model/UserModel/UserModel";
import packageJson from "../../../../package.json";
import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
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

const defaultAvatarUrlUn: string =
  "https://www.limonium.org/wp-content/uploads/2023/08/default-avatar.webp";
const defaultAvatarUrlFe: string =
  "https://www.svgrepo.com/show/10678/avatar.svg";
const defaultAvatarUrlMa: string =
  "https://www.svgrepo.com/show/61986/avatar.svg";

function LawyerGenericContent(props: { datauserparam: UserModel } | any) {
  const textMoreData = "Mostrar más...";
  const textInitScroll = "Volver al principio...";

  const [contador, setContador] = React.useState(12);
  const [showInitButton, setShowInitButton] = React.useState(false);
  const [openPopupDetail, setOpenPopupDetail] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  

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

  const Item = styled(Card)(({ theme }) => ({
    backgroundColor: "#fff",
    borderColor: "#6b9080",
    border: "",
    ...theme.typography.body1,
    padding: theme.spacing(1.5),
    textAlign: "left",
    color: theme.palette.text.primary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  const handleMoreCard = () => {
    let focusVal = contador;
    let newCounterVal = contador * 2;
    setContador(newCounterVal);
    console.log(
      "handleMoreCard - " + document.getElementById("valItem" + focusVal)
    );
    document.getElementById("valItem" + focusVal)?.focus;
  };

  const handleShowInit = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const buttonInitScroll = (
    <Tooltip title={textInitScroll}>
      <Fab
        sx={buttonInitStyle}
        aria-label="initbutton"
        onClick={handleShowInit}
      >
        <ArrowUpwardIcon />
      </Fab>
    </Tooltip>
  );

  const filterStyle = {
    minWidth: 230,
    paddingInlineStart: { xs: 0, sm: 0, md: 10 },
    paddingBottom: 5,
    display: { xs: "block", sm: "block", md: "inline-flex" },
  };

  function popUpDetail(index: number): void{
    setOpenPopupDetail(true);
    setCurrentIndex(index);
  }

  function popUpDetailClosed(): void{
    setOpenPopupDetail(false);
  }

  function generateLawyerCard(index: number): any {
    return (
      <Item key={index} id={"valItem" + index}  >
        <Card sx={{ width: 340 }}>
          <CardActionArea onClick={ ()=> popUpDetail(index)}>
            {generateLawyerCardDetail(index)}
          </CardActionArea>
        </Card>
      </Item>
    );
  }

  function generateLawyerCardDetail(index: number): any {
    return (
            <><CardMedia
            component="img"
            image={index % 7 === 0
                ? defaultAvatarUrlMa
                : index % 3 === 0
                    ? defaultAvatarUrlFe
                    : defaultAvatarUrlUn} /><CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Sr/a Abogado/a núm. {index + 1}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Descripción del abogado con núm. {index}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <p>
                        {index % 7 === 0
                            ? colegios[7].location
                            : index % 3 === 0
                                ? colegios[3].location
                                : index % 5 === 0
                                    ? colegios[5].location
                                    : colegios[15].location}
                    </p>
                </Typography>
            </CardContent></>
    );
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

    <Dialog
        open={openPopupDetail} 
        onClose={popUpDetailClosed}
    > 
        <DialogTitle id="avatar-dialog-title">
             Abogado/a núm. {currentIndex}
        </DialogTitle>
        <DialogContent id="avatar-dialog-content" >
          {generateLawyerCardDetail(currentIndex)}
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
          {Array.from(Array(contador)).map((_, index) =>
            generateLawyerCard(index)
          )}
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

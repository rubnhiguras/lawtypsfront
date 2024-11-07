import React from 'react';
//import { useNavigate } from 'react-router-dom'; 
import { Box, Card} from '@mui/material';
import Warning from '@mui/icons-material/Warning';
import packageJson from '../../../package.json';
import { yellow } from '@mui/material/colors';
import ImgThinking from "../../assets/thinking.svg";

const NotFoundPage: React.FC = () => {
  document.title = document.title = packageJson.title + ' ' + 'No disponible';

  return (
    <Card id="logincard" sx={{ marginTop: 0.4, minWidth: 100, borderRadius: "40px" }}>
        <Box sx={{ minWidth: 99 }}  >  
        <h3>¡Ups!</h3>
            <Box sx={{ minWidth: 99 }}  >  
                <Warning sx={{ color: yellow[700], fontSize: 40 }} /> 
                <p>
                &nbsp;Este&nbsp;sitio&nbsp;no&nbsp;está&nbsp;disponible.
                Pulsa&nbsp;<a href='/'>aquí</a>&nbsp;para&nbsp;ir&nbsp;al&nbsp;inicio.
                <img src={ImgThinking} width="150" height="150"></img> 
                </p>
              </Box>
        </Box> 
    </Card>
  );
};

export default NotFoundPage;


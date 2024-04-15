import { Box, AppBar, Toolbar,
  Typography,
  Divider
} from '@mui/material';
import TaxPayerSearch from './components/TaxPayerSearch';
import Add from './components/Add';


function App() {
  return (
    // Main container
    <Box width='100%' height='100%'>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Consultas DGII
            </Typography>
            </Toolbar>
          </AppBar>
      </Box>
      <Box width='100%' sx={{ display: 'flex' }}>
        <TaxPayerSearch />
        <Divider orientation='vertical'/>
        <Add />
      </Box>
    </Box>
  )
}

export default App;

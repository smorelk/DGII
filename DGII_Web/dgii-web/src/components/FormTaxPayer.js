import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    MenuItem,
    Box,
    Snackbar,
    Alert
} from '@mui/material';
import React from 'react';


const types = [
  'PERSONA JURIDICA',
  'PERSONA FISICA'
];

const status = [
  'activo',
  'inactivo'
]

function FormTaxPayer({open, onClose}) {
    const [alertSuccess, setAlertSuccess] = React.useState(false);
    const [alertFailed, setAlertFailed] = React.useState(false);

    const sendTaxPayer = async (payload) => {
      const api = 'http://localhost:5173/taxpayers/insert';
      const body = JSON.stringify([payload]);

      fetch(api, {
          method: 'post',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          body: body,
      }).then(r => {
        if (r.status === 200)
          setAlertSuccess(true)
        else
          setAlertFailed(true);
      });
      
    }

    return (
      <Box>
        <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            sendTaxPayer(formJson);
            onClose();
          },
        }}
      >
        <DialogTitle>Agregar contribuyente</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <label><b>RNC / Cedula</b></label>
          <TextField
            autoFocus
            required
            margin="dense"
            id="rncCedula"
            name="rncCedula"
            label="RNC / Cedula"
            type="text"
            fullWidth
            variant="standard"
            sx={{ marginBottom: 3 }}
          />
          <label><b>Nombre</b></label>
          <TextField
            autoFocus
            required
            margin="dense"
            id="nombre"
            name="nombre"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            sx={{ marginBottom: 3 }}
          />
        <label><b>Tipo</b></label>
          <TextField
            autoFocus
            required
            select
            margin="dense"
            id="tipo"
            name="tipo"
            label="Tipo"
            fullWidth
            defaultValue={types[0]}
            variant="standard"
            sx={{ marginBottom: 3 }}
          >
            {types.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          </TextField>
          <label><b>Estatus</b></label>
          <TextField
            autoFocus
            required
            select
            margin="dense"
            id="estatus"
            name="estatus"
            label="Estatus"
            fullWidth
            defaultValue={status[0]}
            variant="standard"
            sx={{ marginBottom: 3 }}
          >
            {status.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">Agregar</Button>
        </DialogActions>
      </Dialog>

      
      <Snackbar open={alertSuccess} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={() => setAlertSuccess(false)}>
        <Alert
        onClose={() => setAlertSuccess(false)}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        El contribuyente se agrego correctamente
      </Alert>
      </Snackbar>

      <Snackbar open={alertFailed} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={() => setAlertFailed(false)}>
        <Alert
        onClose={() => setAlertFailed(false)}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        Error al agregar contribuyente
      </Alert>
      </Snackbar>


      </Box>
    )
}

export default FormTaxPayer;
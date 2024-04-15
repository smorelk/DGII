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

function FormTaxReceipt({open, onClose}) {
    const [taxPayers, setTaxPayers] = React.useState([]);
    const [tax, setTax] = React.useState(0);
    const [alertSuccess, setAlertSuccess] = React.useState(false);
    const [alertFailed, setAlertFailed] = React.useState(false);

    React.useEffect(() => {
        const api = 'http://localhost:5173/taxpayers/all';
        fetch(api, {
            method: 'get',
            mode: 'cors'
        })
        .then(resp => resp.json())
        .then(data =>setTaxPayers(data))
        .catch(err => console.error(err));

    }, []);

    const calculateTax = (e) => {
        const amount = parseFloat(e.target.value);
        const _tax = amount*0.18;
        setTax(_tax);
    }

    const sendTaxReceipt = async (payload) => {
        const api = 'http://localhost:5173/receipts/insert';
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
                setAlertSuccess(true);
            else
                setAlertFailed(true);
        })
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
            sendTaxReceipt(formJson);
            onClose();
          },
        }}
      >
        <DialogTitle>Agregar comprobante fiscal</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <label><b>RNC/Cedula</b></label>
          <TextField
            autoFocus
            required
            select
            margin="dense"
            id="rncCedula"
            name="rncCedula"
            label="RNC/Cedula"
            fullWidth
            defaultValue={''}
            variant="standard"
            sx={{ marginBottom: 3 }}
          >
            {taxPayers.map((option) => (
            <MenuItem key={option.rncCedula} value={option.rncCedula}>
              {option.rncCedula}
            </MenuItem>
          ))}
          </TextField>

          <label><b>NCF</b></label>
          <TextField
            autoFocus
            required
            margin="dense"
            id="NCF"
            name="NCF"
            label="NCF"
            type="text"
            fullWidth
            variant="standard"
            sx={{ marginBottom: 3 }}
          />
        <label><b>Monto</b></label>
          <TextField
            autoFocus
            required
            margin="dense"
            id="monto"
            name="monto"
            label="Monto"
            fullWidth
            variant="standard"
            onChange={calculateTax}
            sx={{ marginBottom: 3 }}
          />
          <label><b>ITBIS</b></label>
          <TextField
            value={tax}
            autoFocus
            margin="dense"
            id="itbis18"
            name="itbis18"
            label="ITBIS"
            fullWidth
            variant="standard"
            sx={{ marginBottom: 3 }}
          >
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
        Se agrego el comprobante correctamente!
      </Alert>
      </Snackbar>

      <Snackbar open={alertFailed} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={() => setAlertFailed(false)}>
        <Alert
        onClose={() => setAlertFailed(false)}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        Error al agregar comprobante
      </Alert>
      </Snackbar>



      </Box>
    )
}

export default FormTaxReceipt;
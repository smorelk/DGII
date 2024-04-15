import { Typography, Box,
    TextField, Button, List,
    Divider, Alert, Collapse,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    Modal
} from "@mui/material";
import RadioButtonUncheckedSharpIcon from '@mui/icons-material/RadioButtonUncheckedSharp';
import React from 'react';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  


function TaxPayerSearch() {
    const [taxpayers, setTaxPayers] = React.useState([]);
    const [displayList, setDisplayList] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [showResults, setShowResults] = React.useState(false);
    const [showTaxes, setShowTaxes] = React.useState(false);
    const [taxDetail, setTaxDetail] = React.useState({});
    const [taxesList, setTaxesList] = React.useState([]);

    const currentTaxPayer = React.useRef({ id: '', name: '' });
    const taxpayerIdRef = React.createRef();

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

    const searchTaxPayer = () => {
        const t = taxpayers.find(t => t.rncCedula === taxpayerIdRef.current.value);
        console.log(t);
        if (!t) {
            setOpen(true);
        }
        else {
            setDisplayList([t]);
            setOpen(false);
            setShowResults(true);
        }
    }

    const searchAll = () => {
        setDisplayList(taxpayers);
        setOpen(false);
        setShowResults(true);
    }

    const showItem = (e) => {
        const [taxpayerId, taxPayerName] = e.target.innerHTML.split('-');
        currentTaxPayer.current.id = taxpayerId;
        currentTaxPayer.current.name = taxPayerName;
        
        const api = `http://localhost:5173/receipts/${currentTaxPayer.current.id}`;
        fetch(api, {
            method: 'get',
            mode: 'cors'
        })
        .then(resp => resp.json())
        .then(data => {
            setTaxDetail(data)
            setTaxesList(data.comprobantes)
        })
        .catch(err => console.error(err));


        setShowTaxes(true);
    }

    const listItems = displayList.map(i => {
        const text = `${i.rncCedula} - ${i.nombre}`;
        const component = <ListItem disablePadding>
        <ListItemButton onClick={showItem}>
          <ListItemIcon>
            <RadioButtonUncheckedSharpIcon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
        return component;
    });

    const listTaxes = taxesList.map(i => {
        const text = `NCF: ${i.NCF}, MONTO: ${i.monto}, ITBIS: ${i.itbis18}`;
        const component = <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
        return component;
    });

    return (
        <Box width='50%' marginTop={2} marginLeft={2}>
            <Typography
                variant="h5"
                component='div'
            >
                Busqueda Contribuyente
            </Typography>
            <Divider />
            <br />

            <Typography>RNC / Cedula</Typography>
            <br />
            <Collapse in={open}>
                <Alert severity="warning">
                    No se encontraron datos registrados de este contribuyente
                </Alert>
                <br/>
            </Collapse>
            <Box sx={{ display: 'flex'}}>
                <TextField id="outlined-basic" inputRef={taxpayerIdRef} label="RNC/Cedula" variant="outlined" sx={{ marginRight: 1 }} />
                <Button onClick={searchTaxPayer} variant="outlined" sx={{ marginRight: 1 }}>Buscar</Button>
                <Button onClick={searchAll} variant='outlined'>Listar todos</Button>
            </Box>

            <Collapse in={showResults}>
                <Typography variant="h5" marginTop={2} >Resultados Busqueda</Typography>
                <Divider/>
                <List>{listItems}</List>
            </Collapse>
            <Modal
                open={showTaxes}
                onClose={() => { setShowTaxes(false)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    {currentTaxPayer.current.id} - {currentTaxPayer.current.name}
                    </Typography>
                    <Divider />
                    <br />
                    <Typography variant="h6" component='p'>
                        <b>Total ITBIS</b>: RD$ {taxDetail.totalITBIS}
                    </Typography>
                    <br/>
                    <Typography variant="h6" component='div'>
                        <b>Listado Comprobantes</b>
                    </Typography>
                    <List>{listTaxes}</List>
                    <Divider />
                </Box>
            </Modal>
        </Box>
    );
}

export default TaxPayerSearch;
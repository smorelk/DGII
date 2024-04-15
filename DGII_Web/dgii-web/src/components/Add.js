import { Typography, Box,
    Button, Divider
} from "@mui/material";
import React from 'react';
import FormTaxPayer from './FormTaxPayer';
import FormTaxReceipt from "./FormTaxReceipt";

function Add() {
    const [openTaxPayerForm, setOpenTaxPayerForm] = React.useState(false);
    const [openTaxReceiptForm, setOpenTaxReceiptForm] = React.useState(false);


    return (
        <Box width='50%' marginTop={2} marginLeft={2}>
            <Typography
                variant="h5"
                component='div'
            >
                Importar Contribuyentes / Comprobantes Fiscales
            </Typography>
            <Divider />
            <br />

            <Typography>Agregar contribuyente</Typography>
            <br />
            <Box sx={{ display: 'flex'}}>
                <Button onClick={() => setOpenTaxPayerForm(true)} variant="outlined" sx={{ marginRight: 1 }}>Agregar Contribuyente</Button>
                <FormTaxPayer open={openTaxPayerForm} onClose={() => { setOpenTaxPayerForm(false) }} />
            </Box>
            <br />
            <Typography>Agregar Comprobantes fiscal</Typography>
            <br />
            <Box sx={{ display: 'flex'}}>
                <Button onClick={() => setOpenTaxReceiptForm(true) } variant="outlined" sx={{ marginRight: 1 }}>Agregar Comprobante Fiscal</Button>
                <FormTaxReceipt open={openTaxReceiptForm} onClose={() => { setOpenTaxReceiptForm(false); }}  />
            </Box>
        </Box>
    );
}

export default Add;
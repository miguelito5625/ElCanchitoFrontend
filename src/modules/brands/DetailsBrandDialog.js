import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import { useBrandsContext } from "../../context/BrandsContext";
import * as moment from 'moment';


const useStylesDetailsBrandDialog = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailsBrandDialog() {
    const classes = useStylesDetailsBrandDialog();
    const { clearSelectedBrand, openDetailsBrandDialog, setOpenDetailsBrandDialog } = useBrandsContext();




    const handleClose = () => {
        setOpenDetailsBrandDialog(false);
        clearSelectedBrand();
    };


    return (
        <div>

            <Dialog
                fullScreen
                open={openDetailsBrandDialog}
                onClose={handleClose}
                TransitionComponent={Transition}
            >

                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Detalles
                         </Typography>

                    </Toolbar>
                </AppBar>


                <DetailsBrandForm />

            </Dialog>
        </div>
    );
}


const useStylesForm = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: '10px',
            paddingLeft: '10px',
            paddingRight: '10px',
            width: '100%',
        },
        rootGrid: {
            flexGrow: 1,
        },
    },
}));

const DetailsBrandForm = forwardRef((props, ref) => {
    const classes = useStylesForm();
    const { brandInForm, selectedDate } = useBrandsContext();


    return (
        <form className={classes.root} noValidate autoComplete="off">


            <div className={classes.rootGrid}>
                <Grid container spacing={3}>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField
                            id="name"
                            label="Nombre"
                            variant="outlined"
                            fullWidth={true}
                            defaultValue={brandInForm.name}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="description" 
                        label="Descripcion" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={brandInForm.description} 
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                   

                </Grid>
            </div>

        </form>
    );
})
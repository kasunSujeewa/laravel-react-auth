import React, { useState } from 'react'
import ReactDOM from "react-dom/client";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";
import { Login } from './Login';
import { Register } from './Register';
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "35%",
        margin: "auto",
        marginTop: "4%",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Auth = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [open, setopen] = useState(false);
    const [loginErrorMessage, setloginErrorMessage] = useState("");
    const [alertType, setalertType] = useState("success")
    const [backdropOpen, setbackdropOpen] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setopen(false);
    };

    const alertHandle = (data) =>{
        setloginErrorMessage(data.message);
        setalertType(data.alertType)
        setopen(true);
    }

    const backdropHandle = (data) =>{
        setbackdropOpen(data);
    }
  return (
    <div className={classes.root}>
    <AppBar position="static">
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            centered
            variant="fullWidth"
        >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
    </AppBar>
    <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
    >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <Login alertSowing={alertHandle} onChangebackdrop={backdropHandle}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <Register alertSowing={alertHandle} onChangebackdrop={backdropHandle}/>
        </TabPanel>
    </SwipeableViews>
    <div>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={alertType}>
                        {loginErrorMessage}
                    </Alert>
                </Snackbar>
            </div>
            <Backdrop className={classes.backdrop} open={backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
</div>
  )
}

if (document.getElementById("auth")) {
    const Index = ReactDOM.createRoot(document.getElementById("auth"));

    Index.render(
        <React.StrictMode>
            <Auth />
        </React.StrictMode>
    );
}

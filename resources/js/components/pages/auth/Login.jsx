import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
    },
    filedMargin: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    button: {
        margin: theme.spacing(1),
    },
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

export const Login = (props) => {
    const classes = useStyles();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const [error, seterror] = useState({
        email: "",
        password: "",
    });

    const handleLogin = () => {
        if (validateForm(email, password)) {
            const token = document.head.querySelector(
                'meta[name="csrf-token"]'
            ).content;

            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            props.onChangebackdrop(true);
            axios
                .post("/login", formData, {
                    headers: {
                        "X-CSRF-Token": token, 
                        "Content-Type": "application/json", 
                    },
                })
                .then((response) => {
                    props.onChangebackdrop(false);
                    props.alertSowing({
                        message: "you successfully logged",
                        alertType: "success",
                    });
                    window.location.reload();
                })
                .catch((error) => {
                    props.onChangebackdrop(false);
                    console.log(error.response.data.message);
                    props.alertSowing({
                        message: error.response.data.message,
                        alertType: "error",
                    });
                    seterror({
                        email: "email invalid",
                        password: "password not matching",
                    });
                });
        }
    };

    const validateForm = (email, password) => {
        const newErrors = {};

        if (email == "") {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Invalid email format";
        } else {
            newErrors.email = "";
        }

        if (password.length < 8) {
            newErrors.password = "at least 8 characters long";
        } else {
            newErrors.password = "";
        }

        seterror(newErrors);
        if (newErrors.email === "" && newErrors.password === "") {
            seterror({
                email: "",
                password: "",
            });

            return true;
        } else {
            return false;
        }
    };

    return (
        <div>
            <Typography className={classes.margin} align="center" variant="h4">
                Login
            </Typography>
            <div className={classes.filedMargin}>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            {error.email !== "" ? (
                                <TextField
                                    error
                                    className={classes.textFields}
                                    type="email"
                                    value={email}
                                    defaultValue={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    //id="input-with-icon-grid"
                                    label="Email"
                                    helperText={error.email}
                                />
                            ) : (
                                <TextField
                                    className={classes.textFields}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    //id="input-with-icon-grid"
                                    label="Email"
                                />
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            {error.password !== "" ? (
                                <TextField
                                    error
                                    type="password"
                                    className={classes.textFields}
                                    value={password}
                                    onChange={(e) =>
                                        setpassword(e.target.value)
                                    }
                                    //id="input-with-icon-grid"
                                    label="Password"
                                    helperText={error.password}
                                />
                            ) : (
                                <TextField
                                    type="password"
                                    className={classes.textFields}
                                    value={password}
                                    onChange={(e) =>
                                        setpassword(e.target.value)
                                    }
                                    //id="input-with-icon-grid"
                                    label="Password"
                                />
                            )}
                        </Grid>
                    </Grid>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </div>
        </div>
    );
};

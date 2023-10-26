import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
useState

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
    },
    filedMargin:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    button: {
        margin: theme.spacing(1),
      },
}));

export const Register = (props) => {
    const classes = useStyles();
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [passwordConfirm, setpasswordConfirm] = useState("")

    const [error, seterror] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const handleSignup = () =>{
        if (validateForm(name, email, password, passwordConfirm)) {
            const token = document.head.querySelector(
                'meta[name="csrf-token"]'
            ).content;
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("password_confirmation", passwordConfirm);
            props.onChangebackdrop(true);
            axios
                .post("/register", formData, {
                    headers: {
                        "X-CSRF-Token": token, 
                        "Content-Type": "application/json", 
                    },
                })
                .then((response) => {
                    props.onChangebackdrop(false);
                    props.alertSowing({
                        message: "you successfully sign up",
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

    }

    const validateForm = (name, email, password, passwordConfirm) => {
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

        if (passwordConfirm !== password) {
            newErrors.passwordConfirm = "passwords are not matching";
        } else {
            newErrors.passwordConfirm = "";
        }

        if (name.length < 3) {
            newErrors.name = "at least 3 characters long";
        } else {
            newErrors.name = "";
        }

        seterror(newErrors);
        if (newErrors.email === "" && newErrors.password === "" && newErrors.name === "") {
            seterror({
                email: "",
                password: "",
                name: "",
            });

            return true;
        } else {
            return false;
        }
    };

  return (
    <div>
            <Typography className={classes.margin} align="center" variant="h4">
                Register
            </Typography>
            <div className={classes.filedMargin}>
            <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        {error.name !== '' ? (
                             <TextField
                             error
                             className={classes.textFields}
                             type="text"
                             value={name}
                             defaultValue={name}
                             onChange={(e) => setname(e.target.value)}
                             //id="input-with-icon-grid"
                             label="Name"
                             helperText={error.name}
                         />
                        )
                    : (
                        <TextField
                        className={classes.textFields}
                        type="text"
                        //id="input-with-icon-grid"
                        label="Name"
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
                                    value={passwordConfirm}
                                    onChange={(e) =>
                                        setpasswordConfirm(e.target.value)
                                    }
                                    //id="input-with-icon-grid"
                                    label="Confirm Password"
                                    helperText={error.passwordConfirm}
                                />
                            ) : (
                                <TextField
                                    type="password"
                                    className={classes.textFields}
                                    value={passwordConfirm}
                                    onChange={(e) =>
                                        setpasswordConfirm(e.target.value)
                                    }
                                    //id="input-with-icon-grid"
                                    label="Confirm Password"
                                />
                            )}
                    </Grid>
                </Grid>
            </div>
            <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleSignup}
                >
                    Sign Up
                </Button>
            </div>
        </div>
  )
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./Auth.module.css";
import Footer from "../../Footer";
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Tooltip,
} from "@material-ui/core";
import { cyan } from "@material-ui/core/colors";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { FcGoogle } from "react-icons/fc";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  fetchAsyncLogin,
  fetchAsyncCreate,
  fetchCredStart,
  fetchCredEnd,
  selectIsLoginView,
  selectIsLoading,
  selectNotLogin,
  toggleMode,
} from "./authSlice";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: "#292f35",
    primary: cyan,
    secondary: {
      main: "#ff4081",
    },
  },
  typography: {
    fontFamily: "Comic Neue",
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: " #00bcd4",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  span: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  },
  spanError: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#f44336",
    marginTop: 10,
  },
}));

const Auth = () => {
  const classes = useStyles();
  const isLoginView = useSelector(selectIsLoginView);
  const isLoadingAuth = useSelector(selectIsLoading);
  const notLogin = useSelector(selectNotLogin);
  const dispatch = useDispatch();

  return (
    <MuiThemeProvider theme={theme}>
      <Formik
        className={styles.auth}
        initialErrors={{ email: "required" }}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          await dispatch(fetchCredStart());
          if (isLoginView) {
            await dispatch(fetchAsyncLogin(values));
            await dispatch(fetchCredEnd());
          } else {
            await dispatch(fetchAsyncCreate(values));
            await dispatch(fetchAsyncLogin(values));
            await dispatch(fetchCredEnd());
          }
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("email format is wrong")
            .required("email is must"),
          password: Yup.string().required("password is must").min(4),
        })}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <div>
            <Container maxWidth="xs">
              <form onSubmit={handleSubmit}>
                <div className={classes.paper}>
                  {isLoadingAuth && <CircularProgress />}
                  <Typography color="primary" variant="h3">
                    Favo
                    <br />
                    Road Bike
                  </Typography>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography variant="h5">
                    {isLoginView ? "Login" : "Register"}
                  </Typography>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email"
                    type="input"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    color="primary"
                  />
                  {touched.email && errors.email ? (
                    <div className={classes.spanError}>{errors.email}</div>
                  ) : null}

                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {touched.password && errors.password ? (
                    <div className={classes.spanError}>{errors.password}</div>
                  ) : null}
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                    type="submit"
                  >
                    {isLoginView ? "Login" : "Register"}
                  </Button>
                  <br />
                  {notLogin && (
                    <Typography variant="h5" color="error">
                      email or password is incorrect
                    </Typography>
                  )}
                  <br />
                  <span
                    onClick={() => dispatch(toggleMode())}
                    className={classes.span}
                  >
                    {isLoginView ? "Create Account ?" : "Back to login ?"}
                  </span>
                </div>
              </form>
            </Container>
          </div>
        )}
      </Formik>
      <div className="center">
        <Tooltip title="お試しログイン">
          <div className={styles.mt_15}>
            <Button
              className={styles.try_btn}
              variant="contained"
              color="secondary"
              onClick={() =>
                dispatch(
                  fetchAsyncLogin({
                    email: "test1@gmail.com",
                    password: "test1",
                  })
                )
              }
            >
              TRY IT !
            </Button>
          </div>
        </Tooltip>
        <Tooltip title="おすすめスポット！">
          <div className={styles.mt_15}>
            <Button
              variant="contained"
              className={styles.map_btn}
              onClick={() => (window.location.href = "/map")}
            >
              <FcGoogle />
              Favo map
            </Button>
          </div>
        </Tooltip>
      </div>
      <Footer />
    </MuiThemeProvider>
  );
};

export default Auth;

import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 0,
    marginRight: theme.spacing(2),
    textDecoration: "none",
    color: "white",
    '&:hover': {
        color: 'goldenrod',
        textDecoration: 'none'
    }
  },
  active: {
      color: 'goldenrod'
  }
}));

function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography edge="start">
            <NavLink to="/" className={classes.title} activeClassName={classes.active} exact={true}>
              Home
            </NavLink>
          </Typography>
          <Typography edge="start">
            <NavLink to="/workshops" className={classes.title}  activeClassName={classes.active} exact={true}>
              Workshops
            </NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
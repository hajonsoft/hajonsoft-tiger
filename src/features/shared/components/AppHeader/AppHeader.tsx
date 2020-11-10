import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Divider,
  Grid,
  Grow,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popper,
  Slide,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { blue } from "@material-ui/core/colors";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import firebase from "../../../../firebaseapp";
import { IButtonState, IHeaderConfig, IMenuItem } from "../interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  toolBar: {
    marginTop: "0",
  },
  drawerContainer: {
    overflow: "auto",
    marginTop: "80px",
    textAlign: "left",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuList: {
    width: "100%",
  },
  menuItem: {
    fontSize: "0.875rem",
    paddingLeft: "16px",
  },
  menuItemSelected: {
    borderLeft: "2px solid " + theme.palette.primary.main,
    color: "#222222",
  },
  buttonItem: {
    "&:hover": {
      color: "#222222",
    },
  },
  submenuItem: {
    color: theme.palette.grey[700],
    textAlign: "left",
    "&root": {
      border: "1px solid silver",
    },
    "&:hover": {
      backgroundColor: theme.palette.grey[100],
      color: "#222222",
    },
  },
  submenuItemSelected: {
    color: "#222222",
    background: theme.palette.common.white,
  },
  root: {
    height: "100%",
  },
  rootList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  container: {
    display: "flex",
  },
  paper: {
    margin: theme.spacing(1),
  },
  rounded: {
    color: "#fff",
    backgroundColor: blue[500],
  },
}));

const AppHeader = ({ config }: { config: IHeaderConfig }) => {
  const classes = useStyles();
  const [user] = useAuthState(firebase.auth());

  let history = useHistory();
  const mobileMedia = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const [state, setState] = useState({
    drawerOpen: false,
    sidebar: { selectedItem: "", selectedSubItem: "", anchorElement: null },
    buttons: [],
  });

  const handleButtonMenuClose = (e: any, b: any) => {
    setState((p) => {
      const newState = { ...p };
      newState.buttons.forEach((s: IButtonState) => {
        if (s.key === (b.name || b.title)) s.open = false;
      });
      return newState;
    });
  };

  const handleButtonClick = (e: any, button: IMenuItem) => {
    setState((prev: any) => {
      let newButtonsStates: IButtonState[] = [...prev.buttons];
      let buttonState: IButtonState = prev.buttons.find(
        (b: { name: string }) => b.name === button.name
      )!;
      if (!buttonState) {
        buttonState = {
          key: button.name || button.title,
          open: true,
          anchorElement: e.currentTarget,
        };
      } else {
        buttonState.open = !buttonState.open;
        newButtonsStates = newButtonsStates.filter(
          (b: { key: string }) => b.key !== (button.name || button.title)
        );
      }
      newButtonsStates.push(buttonState);
      return { ...prev, buttons: newButtonsStates };
    });
  };

  const handleButtonItemClick = (
    e: any,
    button: IMenuItem,
    parentButton: IMenuItem
  ) => {
    history.push(button.name || button.title.replace(/ /g, "-").toLowerCase());
    setState((p) => {
      const newState = { ...p };
      newState.buttons.forEach((s: IButtonState) => {
        if (s.key === (parentButton.name || parentButton.title)) s.open = false;
      });
      return newState;
    });
  };

  const handleLogout = (e: any, mi: any, b: any) => {
    firebase.auth().signOut();
    handleButtonItemClick(e, mi, b);
  };

  return (
    <HideOnScroll>
      <div>
        <AppBar position="sticky" color="inherit">
          <Toolbar>
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs>
                <Box p={2}>
                  <img
                    style={{ maxHeight: "48px" }}
                    src={mobileMedia ? config.smallLogo : config.logo}
                    alt="HajOnSoft"
                  />
                </Box>
              </Grid>
              <Grid item>
                {user &&
                  user.uid &&
                  config.buttons.map((b) => (
                    <React.Fragment key={`topButton/${b.name || b.title}`}>
                      <IconButton
                        aria-label={`top button ${b.title}`}
                        key={b.name}
                        onClick={(e) => handleButtonClick(e, b)}
                      >
                        <b.icon />
                      </IconButton>
                      {b.menuItems && (
                        <Popper
                          key={`popper${b.name || b.title}`}
                          open={state.buttons.some(
                            (p: IButtonState) =>
                              b.menuItems &&
                              p.key === (b.name || b.title) &&
                              p.open
                          )}
                          anchorEl={() => {
                            const btnState: any = state.buttons.find(
                              (btn: IButtonState) =>
                                btn.key === b.name || b.title
                            );
                            if (btnState && btnState.anchorElement) {
                              return btnState.anchorElement!;
                            }
                            return null;
                          }}
                          role={undefined}
                          transition
                          disablePortal
                          style={{
                            width: b.width || "280px",
                            marginLeft: "-200px",
                          }}
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                              }}
                            >
                              <ClickAwayListener
                                onClickAway={(e) => handleButtonMenuClose(e, b)}
                              >
                                <Card elevation={1}>
                                  <CardHeader
                                    title={b.title}
                                    style={{
                                      textAlign: "left",
                                      fontWeight: "bold",
                                      fontSize: "16px",
                                    }}
                                  ></CardHeader>
                                  <Divider />
                                  <CardContent style={{ padding: "0px" }}>
                                    <List component="nav">
                                      <React.Fragment>
                                        {b.menuItems &&
                                          b.menuItems.map((mi) => (
                                            <ListItem
                                              key={`topButton/menuItm/${b.name ||
                                                b.title}${mi.name || mi.title}`}
                                              button
                                              className={classes.buttonItem}
                                              onClick={(e) =>
                                                handleButtonItemClick(e, mi, b)
                                              }
                                            >
                                              <ListItemIcon>
                                                {mi.icon ? (
                                                  <mi.icon />
                                                ) : (
                                                  <ArrowForwardOutlinedIcon color="secondary" />
                                                )}
                                              </ListItemIcon>
                                              <ListItemText
                                                primary={mi.title}
                                              />
                                            </ListItem>
                                          ))}
                                      </React.Fragment>
                                    </List>
                                  </CardContent>
                                </Card>
                              </ClickAwayListener>
                            </Grow>
                          )}
                        </Popper>
                      )}
                    </React.Fragment>
                  ))}
                {user && user.uid && (
                  <React.Fragment key={`profile`}>
                    <IconButton
                      onClick={(e) =>
                        handleButtonClick(e, { title: "profile" })
                      }
                    >
                      <AccountCircleTwoToneIcon />
                    </IconButton>
                    <Popper
                      key={`popper-profile`}
                      open={state.buttons.some(
                        (p: IButtonState) => p.key === "profile" && p.open
                      )}
                      anchorEl={() => {
                        const btnState: any = state.buttons.find(
                          (btn: IButtonState) => btn.key === "profile"
                        );
                        if (btnState && btnState.anchorElement) {
                          return btnState.anchorElement!;
                        }
                        return null;
                      }}
                      role={undefined}
                      transition
                      disablePortal
                      style={{ width: "280px", marginLeft: "-200px" }}
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom"
                                ? "center top"
                                : "center bottom",
                          }}
                        >
                          <ClickAwayListener
                            onClickAway={(e) =>
                              handleButtonMenuClose(e, { title: "profile" })
                            }
                          >
                            <Card elevation={1} variant="outlined">
                              <CardContent style={{ padding: "0px" }}>
                                <Grid
                                  container
                                  justify="space-around"
                                  alignItems="center"
                                  style={{ padding: "1rem" }}
                                >
                                  <Grid item xs={3}>
                                    <Avatar
                                      variant="rounded"
                                      className={classes.rounded}
                                    >
                                      {`${user?.displayName || user?.email}`}
                                    </Avatar>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={9}
                                    container
                                    justify="space-around"
                                    direction="column"
                                  >
                                    <Grid item>
                                      <Typography gutterBottom>
                                        {" "}
                                        {`${user?.displayName || user?.email}`}
                                      </Typography>
                                    </Grid>
                                    <Grid item>
                                      <Link
                                        href="#"
                                        onClick={() => history.push("profile")}
                                      >
                                        Profile
                                      </Link>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Divider />

                                <List component="nav">
                                  <React.Fragment>
                                    <ListItem
                                      key={`/logout`}
                                      button
                                      style={{ color: "#0089C7" }}
                                      onClick={(e) =>
                                        handleLogout(
                                          e,
                                          { title: "logout" },
                                          { title: "profile" }
                                        )
                                      }
                                    >
                                      <ListItemIcon
                                        style={{ color: "#0089C7" }}
                                      >
                                        <PowerSettingsNewIcon />
                                      </ListItemIcon>
                                      <ListItemText primary={"Log Out"} />
                                    </ListItem>
                                  </React.Fragment>
                                </List>
                              </CardContent>
                            </Card>
                          </ClickAwayListener>
                        </Grow>
                      )}
                    </Popper>
                  </React.Fragment>
                )}

                {(!user || !user.uid) && !mobileMedia && (
                  <Box p={2}>
                    <Button
                      type="submit"
                      color="primary"
                      size="large"
                      variant="contained"
                      style={{ borderRadius: "8px" }}
                      onClick={() => history.push("/login")}
                    >
                      Sign In
                    </Button>
                  </Box>
                )}

                {(!user || !user.idToken) && mobileMedia && (
                  <Button
                    type="submit"
                    color="primary"
                    size="large"
                    style={{ borderRadius: "8px" }}
                    onClick={() => history.push("/login")}
                  >
                    Sign In
                  </Button>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </HideOnScroll>
  );
};
const HideOnScroll = (props: any) => {
  const scrolledUp = useScrollTrigger();
  const { children } = props;

  return (
    <Slide direction="left" in={!scrolledUp}>
      {children}
    </Slide>
  );
};

export default AppHeader;

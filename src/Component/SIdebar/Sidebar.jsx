import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import { AdminPanelSettingsSharp, AppRegistrationTwoTone, CalendarMonthOutlined, LoginTwoTone, Person3Outlined, PersonOffRounded } from '@mui/icons-material';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationPopover from "./NotificationPopover";
import { Popover } from "@mui/material";
import socket from "../../Socket";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [message, setMessage] = React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;


  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const [ContractorItSelfDetails, setContractorItSelfDetails] = useState('');
  const location  = useLocation()

  const { usertoken } = JSON.parse(localStorage.getItem('token'))
  const headers = { 'Authorization': `Bearer ${usertoken}` };

  const token = JSON.parse(localStorage.getItem("token"));
  token === null && dispatch(showToast({ type: "warning", message: "Token Has Expired ! Please SignIn Again", }));

  let currentDate = new Date();

  const getNotificationforContractor = () =>
  axios({
    method: "get",
    url: `https://braided-complex-403612.el.r.appspot.com/api/getNotificationforContractor`,
    headers: {
      Authorization: `Bearer ${usertoken}`,
    },
  })
    .then((res) => {
      if (res.data.message !== "No notification are currently in database") {
        setMessage((preVal) => {
          return [...res.data.getNotification, ...preVal];
        });
      }
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

React.useEffect(() => {
  getNotificationforContractor();
}, []);

React.useEffect(() => {
  socket.on("contractorinvoiceapprovesocket", (data) => {
    console.log(data)
    setMessage((prevMessage) => [data, ...prevMessage]);
  });
}, []);

React.useEffect(() => {
  socket.on("contractorprofileapprovesocket", (data) => {
    setMessage((prevMessage) => [data, ...prevMessage]);
  });
}, []);

React.useEffect(() => {
  socket.on("contractorprofiledeclinesocket", (data) => {
    setMessage((prevMessage) => [data, ...prevMessage]);
  });
}, []);

console.log(message)
  React.useEffect(() => {
    if(token){
      const tokenExpiry = new Date(token.expiry);
      if (!tokenExpiry || (currentDate > tokenExpiry)) {
        navigate("/login");
      }
    }
  }, []);

  useEffect(() => {
     axios(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_OWN_DETAILS}`, { headers })
    .then((res) => {
        console.log(res)
        setContractorItSelfDetails(res.data.data)
        }).catch((error) => {
        console.log("error", error)
       })
  }, [])
  
console.log(ContractorItSelfDetails?.profileId?.IsApproved)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogOut = () => {
    localStorage.clear()
    navigate("/login")
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
          <ListItem disablePadding >
            <ListItemButton style={location.pathname === '/' ? {background: 'white', color:'black'} : {background: '#34495E', color:'white'}} >
              <ListItemIcon>
                 <Person3Outlined style={location.pathname === '/' ? {color:'black'} : {color:'white'}} />
              </ListItemIcon>
              <ListItemText  primary="Profile" onClick={()=>(navigate("/"))}/>
            </ListItemButton>
          </ListItem>
          {
            ContractorItSelfDetails?.profileId?.IsApproved === true &&
            <>
            <ListItem disablePadding >
            <ListItemButton style={location.pathname.match('/calender') ? {background: 'white', color:'black'} : {background: '#34495E', color:'white'}} >
              <ListItemIcon >
                 <CalendarMonthOutlined style={location.pathname === '/calender' ? {color:'black'} : {color:'white'}} />
              </ListItemIcon>
              <ListItemText  primary="Calender" onClick={()=>{navigate("/calender")}} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton style={location.pathname.match('/invoices') ? {background: 'white', color:'black'} : {background: '#34495E', color:'white'}} >
              <ListItemIcon >
                 <CalendarMonthOutlined style={location.pathname === '/invoices' ? {color:'black'} : {color:'white'}} />
              </ListItemIcon>
              <ListItemText  primary="Invoices" onClick={()=>{navigate("/invoices?page=1&page2=1")}} />
            </ListItemButton>
          </ListItem>
          </>
          }
          <ListItem disablePadding>
            <ListItemButton id='white-color'>
              <ListItemIcon style={{color: "white"}}>
                 <AdminPanelSettingsSharp />
              </ListItemIcon>
              <ListItemText primary="LogOut" onClick={()=>{handleLogOut()}} />
            </ListItemButton>
          </ListItem>
      </List>
      {/* <Divider /> */}

    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: "100%", // Full width
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure it's above the drawer
          backgroundColor: "#FFFFFF",
        }}
      >
        <Toolbar style={{ backgroundColor: "white" }}>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <NotificationsIcon
              style={{
                color: "#000",
                cursor: "pointer",
                position: "absolute",
                right: "20",
                top: "20",
              }}
              aria-describedby={id}
              onClick={handleClick}
            />

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{
                mt: 1,
                mr: 0,
                height: 500,
              }}
            >
              <NotificationPopover message={message} sx={{}} />
            </Popover>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#34495E"
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#34495E"
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;

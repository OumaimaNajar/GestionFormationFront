import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Container, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ opacity: 0.5 }}>
      <Container>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <img src="path/to/logo-light.png" alt="Logo" style={{ height: 50 }} />
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/formations">
            Formations
          </Button>
          
          <Button color="inherit" component={Link} to="/evaluations">
            Evaluations
          </Button>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Dropdown Item 1</MenuItem>
            <MenuItem onClick={handleClose}>Dropdown Item 2</MenuItem>
            <MenuItem onClick={handleClose}>Dropdown Item 3</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

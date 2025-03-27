import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NMLogo from "./NMLogo";
import Link from "next/link";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ display: "inline-block" }}>
              <NMLogo />
            </Link>
          </Typography>
          <Button color="inherit">Zaloguj się</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

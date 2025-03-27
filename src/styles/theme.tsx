import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import NextLink, { LinkProps } from "next/link";
import { forwardRef } from "react";

const LinkBehaviour = forwardRef<HTMLAnchorElement, LinkProps>(
  function LinkBehaviour(props, ref) {
    return <NextLink ref={ref} {...props} />;
  }
);

export const theme = createTheme({
  typography: {
    fontFamily: "Archivo, Arial",
  },
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: "#EB145B",
    },
    common: {
      black: "rgba(0,0,0, 0.9)",
      white: "rgba(255,255,255, 0.9)",
    },
    error: { main: "#FF422D" },
    success: { main: "#1FA12C" },
    warning: { main: "#FFB835" },
    info: { main: "#cecece" },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour,
      },
    },
  },
});

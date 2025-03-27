import AccessTimeFilledRounded from "@mui/icons-material/AccessTimeFilledRounded";
import Add from "@mui/icons-material/AddRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import CachedRounded from "@mui/icons-material/CachedRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseRounded from "@mui/icons-material/CloseRounded";
import Delete from "@mui/icons-material/DeleteRounded";
import Edit from "@mui/icons-material/EditRounded";
import { FC } from "react";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import LoginIcon from "@mui/icons-material/LoginRounded";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import Menu from "@mui/icons-material/MenuRounded";
import NotificationOffIcon from "@mui/icons-material/NotificationsOffRounded";
import NotificationOnIcon from "@mui/icons-material/NotificationsRounded";
import NotificationsRounded from "@mui/icons-material/NotificationsRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityOnRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EqualizerIcon from "@mui/icons-material/Equalizer";

interface IProps {
  type:
    | "logout"
    | "login"
    | "notificationsOn"
    | "notificationsOff"
    | "menu"
    | "add"
    | "edit"
    | "delete"
    | "school"
    | "time"
    | "rightArrow"
    | "back"
    | "close"
    | "check"
    | "cached"
    | "notifications"
    | "play"
    | "top"
    | "clone"
    | "cloudUpload"
    | "visibilityOn"
    | "visibilityOff"
    | "equalizer";

  color?:
    | "inherit"
    | "disabled"
    | "action"
    | "primary"
    | "secondary"
    | "warning"
    | "error"
    | "info"
    | "success"
    | undefined;
}

const Main: FC<IProps> = ({ type: icon, color }) => {
  switch (icon) {
    case "logout":
      return <LogoutIcon color={color} />;
    case "login":
      return <LoginIcon color={color} />;
    case "notificationsOn":
      return <NotificationOnIcon color={color} />;
    case "notificationsOff":
      return <NotificationOffIcon color={color} />;
    case "menu":
      return <Menu color={color} />;
    case "add":
      return <Add color={color} />;
    case "edit":
      return <Edit color={color} />;
    case "delete":
      return <Delete color={color} />;
    case "school":
      return <SchoolRounded color={color} />;
    case "time":
      return <AccessTimeFilledRounded color={color} />;
    case "rightArrow":
      return <ArrowForwardIosRounded color={color} />;
    case "back":
      return <ArrowBackRounded color={color} />;
    case "close":
      return <CloseRounded color={color} fontSize={"inherit"} />;
    case "check":
      return <CheckRounded color={color} fontSize={"inherit"} />;
    case "cached":
      return <CachedRounded color={color} fontSize={"inherit"} />;
    case "notifications":
      return <NotificationsRounded color={color} fontSize={"inherit"} />;
    case "play":
      return <PlayArrowRoundedIcon color={color} fontSize={"inherit"} />;
    case "top":
      return <ArrowUpwardRoundedIcon color={color} fontSize={"inherit"} />;
    case "clone":
      return <FileCopyRoundedIcon color={color} fontSize={"inherit"} />;
    case "cloudUpload":
      return <CloudUploadIcon color={color} fontSize={"inherit"} />;
    case "visibilityOn":
      return <VisibilityOnRoundedIcon color={color} fontSize={"inherit"} />;
    case "visibilityOff":
      return <VisibilityOffRoundedIcon color={color} fontSize={"inherit"} />;
    case "equalizer":
      return <EqualizerIcon color={color} fontSize={"inherit"} />;
    default:
      return null;
  }
};

export default Main;

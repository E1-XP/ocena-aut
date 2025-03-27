import TextField, { TextFieldProps } from "@mui/material/TextField";

const Main = ({ ...props }: TextFieldProps) => (
  <TextField
    {...props}
    fullWidth
    color={props.color || "secondary"}
    helperText={props.helperText !== "" && props.helperText}
    error={props.helperText !== "" && props.helperText !== undefined}
    style={{ margin: "5px 0" }}
  />
);

export default Main;

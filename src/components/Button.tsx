import Button, { ButtonProps } from "@mui/material/Button";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Main = styled(
  ({ small, ...props }: ButtonProps & { small?: boolean }) => (
    <Button {...props} variant={props.variant || "contained"} />
  )
)<{
  small?: boolean;
}>`
  font-weight: 800 !important;
  box-shadow: none !important;
  border-radius: 1000px !important;
  text-transform: none !important;

  &:active {
    box-shadow: none !important;
  }

  &:focus {
    box-shadow: none !important;
  }

  &:hover {
    box-shadow: none !important;
  }

  ${(props) =>
    !props.small &&
    css`
      padding: 10px 50px !important;
    `};
`;

export default Main;

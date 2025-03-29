"use client";
import styled from "@emotion/styled";
import Button from "@/components/Button";
import { FC } from "react";
import Icon from "@/components/Icons";
import Link from "next/link";
import Logo from "@/components/NMLogo";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { logout } from "@/calls/auth.call";
import { useRedirect } from "@/hooks/useRedirect";
import { useState } from "react";

const Main: FC = () => {
  const { session } = useRedirect();

  return (
    <NavbarContainer id="top">
      <Logo darkText />
      <RightContainer>{session?.user && <AdminMenu />}</RightContainer>
    </NavbarContainer>
  );
};

export const AdminMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button small onClick={handleClick} endIcon={<Icon type={"menu"} />}>
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link
          href="/admin"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem onClick={handleClose}>Lista zestawów</MenuItem>
        </Link>

        <MenuItem
          onClick={() => {
            handleClose();
            // logout();
          }}
        >
          Wyloguj się
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Main;

export const NavbarContainer = styled.div`
  position: sticky;
  padding: 0 5%;
  height: 216px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RightContainer = styled.div``;

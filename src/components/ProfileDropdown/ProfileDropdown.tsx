import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { memo, useEffect } from "react";
import ModalChangePassWord from "../modal/ModalChangePassWord/ModalChangePassWord";
import ModalUpdateUserInfo from "../modal/ModalUpdateUserInfo/ModalUpdateUserInfo";

function ProfileDropdown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState<string | null>(null);
  const open = Boolean(anchorEl);

  const fullName = Cookies.get("fullName");
  const email = Cookies.get("email");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenUpdateUserModal = () => {
    setOpenModal("updateUserInfo");
  };
  const handleOpenChangePassWordModal = () => {
    setOpenModal("changePassword");
  };

  const onCloseModal = () => {
    setOpenModal(null);
  };
  const handleLogout = async () => {
    Cookies.remove("accessToken");
    Cookies.remove("fullName");
    Cookies.remove("email");
    Cookies.remove("addres");
    Cookies.remove("fullName");
    Cookies.remove("id");
    window.location.reload();
  };
  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        aria-expanded={open ? "true" : undefined}
      >
        <Stack direction="row" spacing="10px" alignItems="center">
          <Avatar
            src="/static/images/avatar/1.jpg"
            sx={{ width: 50, height: 50 }}
            alt="Remy Sharp"
          />
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#7d7d7d",
              }}
            >
              Xin chào
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#EA6200",
              }}
            >
              {fullName}
            </Typography>
          </Box>
        </Stack>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          sx={{
            backgroundColor: "#F5F7FA",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
        >
          <Typography>{email ?? "admin123"}</Typography>
        </Box>
        <MenuItem>
          <Link href={"/YourOder"}>
            <Typography color="#50C2C9" fontWeight={500}>
              Đơn hàng của bạn
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Typography
            color="#50C2C9"
            fontWeight={500}
            onClick={handleOpenUpdateUserModal}
          >
            Cập nhật thông tin
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography
            color="#50C2C9"
            fontWeight={500}
            onClick={handleOpenChangePassWordModal}
          >
            Đổi mật khẩu
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography color="#ff0000" fontWeight={500}>
            Đăng xuất
          </Typography>
        </MenuItem>
      </Menu>
      {/* Modal */}
      <Box>
        <ModalChangePassWord
          visible={openModal === "changePassword"}
          onClose={onCloseModal}
        />
        <ModalUpdateUserInfo
          visible={openModal === "updateUserInfo"}
          onClose={onCloseModal}
        />
      </Box>
    </React.Fragment>
  );
}
export default memo(ProfileDropdown);

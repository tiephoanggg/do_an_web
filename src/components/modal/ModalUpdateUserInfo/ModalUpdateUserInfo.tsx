import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Backdrop,
  Box,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";

import { ValueUpdateUserInfoForm } from "./constants";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import { get, includes, isEmpty, remove } from "lodash";
import { useStyles } from "./constants";
import { useToggle } from "ahooks";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import LoadingButton from "@mui/lab/LoadingButton";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

export interface ModalUpdateUserInfoProps {
  visible: boolean;
  onClose?: () => void;
}

function ModalUpdateUserInfo({ visible, onClose }: ModalUpdateUserInfoProps) {
  const classes = useStyles();
  const storedToken = Cookies.get("accessToken");
  const fullNameDefau = Cookies.get("fullName");
  const emailDefau = Cookies.get("email");
  const phoneNumberDefau = Cookies.get("phoneNumber");
  const addressDefau = Cookies.get("address");
  const [open, setOpen] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<ValueUpdateUserInfoForm>({
    mode: "all",
    defaultValues: {
      fullName: fullNameDefau,
      email: emailDefau,
      phoneNumber: phoneNumberDefau,
      address: addressDefau,
    },
  });

  useEffect(() => {
    setOpen(visible);
    if (!visible) {
      reset();
    }
  }, [visible]);

  const handleUpdateUserInfo = async (data: any) => {
    try {
      const { data: res } = await axios.put(
        "http://localhost:4000/v4/user/updateProfile",
        data,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      console.log(res);

      toast.success("Thay đổi thông tin thành công");
      alert("đổi thông tin  thành công");
      Cookies.remove("fullName");
      Cookies.remove("email");
      Cookies.remove("phoneNumber");
      Cookies.remove("address");

      Cookies.set("fullName", res.fullName, { expires: 3 });
      Cookies.set("email", res.email, { expires: 3 });
      Cookies.set("phoneNumber", res.phoneNumber, { expires: 3 });
      Cookies.set("address", res.address, { expires: 3 });
      onClose?.();
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = (values: any) => {
    console.log(values);
    handleUpdateUserInfo(values);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      fullWidth
      maxWidth="sm"
      disableEscapeKeyDown={true}
      keepMounted={false}
    >
      <Box className={classes.headerModal}>
        <DialogTitle color="#015A94" fontSize={20} fontWeight={700}>
          Chỉnh sửa thông tin cá nhân
        </DialogTitle>
      </Box>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container columns={12} spacing="20px" padding="16px 30px">
          <Grid item xs={12}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Email không được bỏ trống",
                },
              }}
              name="email"
              render={({ field }) => (
                <Box>
                  <InputLabel
                    sx={{ color: "#50C2C9", mb: "5px" }}
                    htmlFor="oldpassword"
                  >
                    Email
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                    id="email"
                    placeholder="Email"
                    error={!isEmpty(errors.email)}
                    autoComplete="off"
                    className={classes.input}
                    fullWidth
                  />
                  {!isEmpty(errors.email) && (
                    <Typography fontSize={12} color="#ff0000" my="5px">
                      {get(errors, "email.message", "")}
                    </Typography>
                  )}
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Họ và tên không được bỏ trống",
                },
              }}
              name="fullName"
              render={({ field }) => (
                <Box>
                  <InputLabel
                    sx={{ color: "#50C2C9", mb: "5px" }}
                    htmlFor="oldpassword"
                  >
                    Họ và tên
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                    id="fullName"
                    placeholder="Họ và tên "
                    error={!isEmpty(errors.fullName)}
                    autoComplete="off"
                    className={classes.input}
                    fullWidth
                  />
                  {!isEmpty(errors.fullName) && (
                    <Typography fontSize={12} color="#ff0000" my="5px">
                      {get(errors, "fullName.message", "")}
                    </Typography>
                  )}
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Số điện thoại không được bỏ trống",
                },
              }}
              name="phoneNumber"
              render={({ field }) => (
                <Box>
                  <InputLabel
                    sx={{ color: "#50C2C9", mb: "5px" }}
                    htmlFor="oldpassword"
                  >
                    Số điện thoại
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                    id="phoneNumber"
                    placeholder="Số điện thoại"
                    error={!isEmpty(errors.phoneNumber)}
                    autoComplete="off"
                    className={classes.input}
                    fullWidth
                  />
                  {!isEmpty(errors.phoneNumber) && (
                    <Typography fontSize={12} color="#ff0000" my="5px">
                      {get(errors, "phoneNumber.message", "")}
                    </Typography>
                  )}
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Địa chỉ không được bỏ trống",
                },
              }}
              name="address"
              render={({ field }) => (
                <Box>
                  <InputLabel
                    sx={{ color: "#50C2C9", mb: "5px" }}
                    htmlFor="oldpassword"
                  >
                    Địa chỉ
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                    id="address"
                    placeholder="Địa chỉ"
                    error={!isEmpty(errors.address)}
                    autoComplete="off"
                    className={classes.input}
                    fullWidth
                  />
                  {!isEmpty(errors.address) && (
                    <Typography fontSize={12} color="#ff0000" my="5px">
                      {get(errors, "address.message", "")}
                    </Typography>
                  )}
                </Box>
              )}
            />
          </Grid>
        </Grid>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <LoadingButton
            type="submit"
            sx={{ backgroundColor: "#50C2C9", my: "10px" }}
            variant="contained"
            className={classes.btn}
          >
            Cập nhật chỉnh sửa
          </LoadingButton>
        </Box>
        <Divider />
        <Box padding="20px"></Box>
      </form>
    </Dialog>
  );
}

export default ModalUpdateUserInfo;

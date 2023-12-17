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

import { ValueChangePassWordForm } from "./constants";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import { get, includes, isEmpty, remove } from "lodash";
import { useStyles } from "./constants";
import { useToggle } from "ahooks";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import LoadingButton from "@mui/lab/LoadingButton";

import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { toast } from "react-toastify";
export interface ModalChangePassWordProps {
  visible: boolean;
  onClose?: () => void;
}

function ModalChangePassWord({ visible, onClose }: ModalChangePassWordProps) {
  const classes = useStyles();
  const storedToken = Cookies.get("accessToken");
  const [open, setOpen] = useState(false);
  const [visibleOldPassword, { toggle: toggleOldPassword }] = useToggle();
  const [visibleNewPassword, { toggle: toggleNewPassword }] = useToggle();
  const [visibleVerifyPassword, { toggle: toggleVerifyPassword }] = useToggle();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<ValueChangePassWordForm>({
    mode: "all",
    defaultValues: {
      newpassword: "",
      verifyPassword: "",
      oldpassword: "",
    },
  });
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    setOpen(visible);
    if (!visible) {
      reset();
    }
  }, [visible]);

  const handleChangePassWord = async (data: any) => {
    try {
      const { data: res } = await axios.put(
        "http://localhost:4000/v4/user/changepassword",
        data,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      console.log(res);
      messageApi.open({
        type: "success",
        content: "Đổi mật khẩu thành công",
        duration: 10,
      });
      toast.success("Thay đổi mật khẩu thành công");
      alert("đổi mật khẩu thành công");
      onClose?.();
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = (values: any) => {
    console.log(values);

    if (values.newpassword === values.verifyPassword) {
      handleChangePassWord({
        oldPassword: values.oldpassword,
        newPassword: values.newpassword,
      });
    } else {
      messageApi.open({
        type: "error",
        content: "nhập lại chính xác mật khẩu mới",
      });
    }
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
      {contextHolder}
      <Box className={classes.headerModal}>
        <DialogTitle color="#015A94" fontSize={20} fontWeight={700}>
          Đổi mật khẩu
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
                  message: "Mật khẩu cũ không được bỏ trống",
                },
              }}
              name="oldpassword"
              render={({ field }) => (
                <Box>
                  <OutlinedInput
                    {...field}
                    id="oldpassword"
                    sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                    placeholder="Mật khẩu cũ"
                    error={!isEmpty(errors.oldpassword)}
                    autoComplete="off"
                    type={visibleOldPassword ? "text" : "password"}
                    className={classes.input}
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleOldPassword}
                        >
                          {!visibleOldPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {!isEmpty(errors.oldpassword) && (
                    <Typography fontSize={12} color="#ff0000" my="5px">
                      {get(errors, "oldpassword.message", "")}
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
                  message: "Mật khẩu mới không được bỏ trống",
                },
              }}
              name="newpassword"
              render={({ field }) => (
                <Box>
                  <OutlinedInput
                    {...field}
                    id="newpassword"
                    sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                    placeholder="Mật khẩu mới"
                    error={!isEmpty(errors.newpassword)}
                    autoComplete="off"
                    type={visibleNewPassword ? "text" : "password"}
                    className={classes.input}
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleNewPassword}
                        >
                          {!visibleNewPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {!isEmpty(errors.newpassword) && (
                    <Typography fontSize={12} color="#ff0000" my="5px">
                      {get(errors, "newpassword.message", "")}
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
                  message: "Nhập lại mật khẩu không được bỏ trống",
                },
              }}
              name="verifyPassword"
              render={({ field }) => (
                <Box>
                  <OutlinedInput
                    {...field}
                    id="verifyPassword"
                    sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                    placeholder="Nhập lại mật khẩu mới"
                    error={!isEmpty(errors.verifyPassword)}
                    autoComplete="off"
                    type={visibleVerifyPassword ? "text" : "password"}
                    className={classes.input}
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleVerifyPassword}
                        >
                          {!visibleVerifyPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {!isEmpty(errors.verifyPassword) && (
                    <Typography fontSize={12} color="#ff0000" my="5px">
                      {get(errors, "verifyPassword.message", "")}
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
            Đổi mật khẩu
          </LoadingButton>
        </Box>
        <Divider />
        <Box padding="20px"></Box>
      </form>
    </Dialog>
  );
}

export default ModalChangePassWord;

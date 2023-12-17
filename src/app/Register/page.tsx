"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem as MuiMenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Image from "next/image";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import logo from "public/img/Logomark.png";
import { Controller, useForm, useWatch } from "react-hook-form";
import { get, includes, isEmpty, remove } from "lodash";
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useStyles } from "../Login/style";
import {
  CalendarIcon,
  PasswordIcon,
  PenIcon,
  UsernameIcon,
} from "@/components/SvgIcon/SvgIcon";
import "../style.css";
import { useBoolean, useToggle } from "ahooks";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Values {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  rePass: string;
}
function Register() {
  const classes = useStyles();
  const router = useRouter();
  const [visiblePassword, { toggle: togglePassword }] = useToggle();
  const [remember, { toggle: toggleRemember }] = useBoolean(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: {},
    mode: "onSubmit",
  });
  const handleCreateAcc = async (data: any) => {
    try {
      const { data: res } = await axios.post(
        "http://localhost:4000/v4/user/register",
        data
      );
      console.log(res);

      if (res.role) {
        console.log("ok");
        alert("Đăng Ký thành công");
        router.push("/Login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = (values: Values) => {
    console.log(values);
    handleCreateAcc(values);
  };
  return (
    <div className="bg-home bg-center overflow-hidden relative ">
      <Box>
        <Grid container columns={18} py="40px" px="100px" alignItems="center">
          <Grid item xs={3}>
            <Box>
              <Link href={"/"}>
                <Grid container columns={26}>
                  <Grid item xs={3}>
                    <Image src={logo} alt="" />
                  </Grid>
                  <Grid item xs={23}>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        marginBottom: "2px",
                        fontSize: "40px",
                        color: "#000000",
                      }}
                    >
                      Cavila Store
                    </Typography>
                  </Grid>
                </Grid>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py="35px"
          my="0px"
        >
          {" "}
          <Typography
            sx={{
              fontWeight: 600,
              marginBottom: "2px",
              fontSize: "48px",
              color: "#000000",
            }}
          >
            Đăng kí
          </Typography>
          <Box sx={{ width: "400px", my: "20px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  <Box my="15px">
                    <OutlinedInput
                      {...field}
                      sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                      id="email"
                      placeholder="Email"
                      error={!isEmpty(errors.email)}
                      autoComplete="off"
                      className={classes.input}
                      fullWidth
                      startAdornment={
                        <InputAdornment position="start">
                          <UsernameIcon />
                        </InputAdornment>
                      }
                    />
                    {!isEmpty(errors.email) && (
                      <Typography fontSize={12} color="#ff0000" my="5px">
                        {get(errors, "email.message", "")}
                      </Typography>
                    )}
                  </Box>
                )}
              />
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Mật khẩu không được bỏ trống",
                  },
                }}
                name="password"
                render={({ field }) => (
                  <Box my="15px">
                    <OutlinedInput
                      {...field}
                      id="password"
                      sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                      placeholder="Mật khẩu"
                      error={!isEmpty(errors.password)}
                      autoComplete="off"
                      type={visiblePassword ? "text" : "password"}
                      className={classes.input}
                      fullWidth
                      startAdornment={
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePassword}
                          >
                            {!visiblePassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {!isEmpty(errors.password) && (
                      <Typography fontSize={12} color="#ff0000" my="5px">
                        {get(errors, "password.message", "")}
                      </Typography>
                    )}
                  </Box>
                )}
              />
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Mật khẩu không được bỏ trống",
                  },
                }}
                name="rePass"
                render={({ field }) => (
                  <Box my="15px">
                    <OutlinedInput
                      {...field}
                      id="rePass"
                      sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                      placeholder="Nhập lại mật khẩu"
                      error={!isEmpty(errors.password)}
                      autoComplete="off"
                      type={visiblePassword ? "text" : "password"}
                      className={classes.input}
                      fullWidth
                      startAdornment={
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePassword}
                          >
                            {!visiblePassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {!isEmpty(errors.password) && (
                      <Typography fontSize={12} color="#ff0000" my="5px">
                        {get(errors, "password.message", "")}
                      </Typography>
                    )}
                  </Box>
                )}
              />
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
                  <Box my="15px">
                    <OutlinedInput
                      {...field}
                      sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                      id="fullName"
                      placeholder="Họ và tên "
                      error={!isEmpty(errors.fullName)}
                      autoComplete="off"
                      className={classes.input}
                      fullWidth
                      startAdornment={
                        <InputAdornment position="start">
                          <PenIcon />
                        </InputAdornment>
                      }
                    />
                    {!isEmpty(errors.email) && (
                      <Typography fontSize={12} color="#ff0000" my="5px">
                        {get(errors, "email.message", "")}
                      </Typography>
                    )}
                  </Box>
                )}
              />
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
                  <Box my="15px">
                    <OutlinedInput
                      {...field}
                      sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                      id="address"
                      placeholder="Địa chỉ"
                      error={!isEmpty(errors.address)}
                      autoComplete="off"
                      className={classes.input}
                      fullWidth
                      startAdornment={
                        <InputAdornment position="start">
                          <PenIcon />
                        </InputAdornment>
                      }
                    />
                    {!isEmpty(errors.email) && (
                      <Typography fontSize={12} color="#ff0000" my="5px">
                        {get(errors, "email.message", "")}
                      </Typography>
                    )}
                  </Box>
                )}
              />
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
                  <Box my="15px">
                    <OutlinedInput
                      {...field}
                      sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                      id="email"
                      placeholder="Số điện thoại"
                      error={!isEmpty(errors.email)}
                      autoComplete="off"
                      className={classes.input}
                      fullWidth
                      startAdornment={
                        <InputAdornment position="start">
                          <PenIcon />
                        </InputAdornment>
                      }
                    />
                    {!isEmpty(errors.email) && (
                      <Typography fontSize={12} color="#ff0000" my="5px">
                        {get(errors, "email.message", "")}
                      </Typography>
                    )}
                  </Box>
                )}
              />
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
                  Đăng kí
                </LoadingButton>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Register;

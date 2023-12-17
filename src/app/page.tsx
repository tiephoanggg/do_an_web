"use client";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImgHome from "public/img/Logohome.png";
import EmailIcon from "@mui/icons-material/Email";
import TopList from "@/components/TopList/TopList";
import NewList from "@/components/NewList/NewList";
import NavBar from "@/components/NavBar/NavBar";
import axios from "axios";
import { useEffect } from "react";
import "./style.css";
import BackGroundImg from "public/img/MaskGroup.png";

export default function Home() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/Login");
  };

  return (
    <div className="bg-home bg-center overflow-hidden relative ">
      <Box>
        <NavBar />

        <Grid container columns={11} px="80px">
          <Grid item xs={6} mt="80px">
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "78px",
                color: "#000000",
              }}
            >
              Chào mừng bạn đến với website bán hàng của Cavila Store
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "32px",
                color: "#000000",
              }}
            >
              Vui lòng nhập email của bạn để nhận được những khuyến mãi đến từ
              Cavila Store.
            </Typography>
            <Grid container columns={22}>
              <Grid item xs={8} mt="80px">
                <Box
                  sx={{
                    backgroundColor: "#F6F2F5",
                    border: "2px solid #000000",
                    borderRadius: "10px",
                    px: "5px",
                  }}
                >
                  <TextField
                    id="input-with-icon-textfield"
                    placeholder="Email"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ color: "#000000" }}
                        >
                          <EmailIcon />
                        </InputAdornment>
                      ),
                      style: { color: "#000000", height: "42px" },
                    }}
                    variant="standard"
                  />
                </Box>
              </Grid>
              <Grid item xs={2} mt="80px">
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "#50C2C9",
                    padding: "8px 24px",
                    width: "100%",
                    maxWidth: "100%",
                    marginLeft: "20px",
                    textTransform: "none",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "18px",
                    }}
                  >
                    Send
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Image src={ImgHome} alt="" />
          </Grid>
        </Grid>
        <TopList />
        <NewList />
      </Box>
    </div>
    // <div className="bg-home  h-[610px] bg-no-repeat bg-cover bg-center overflow-hidden relative mt-[80px]"></div>
  );
}

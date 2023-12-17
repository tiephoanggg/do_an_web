"use client";
import NavBar from "@/components/NavBar/NavBar";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem as MuiMenuItem,
} from "@mui/material";

import CartTable from "@/components/cartTable/cartTable";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Imgstep from "public/img/Ellipse.png";
import Image from "next/image";
import axios from "axios";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "../style.css";
function QontoStepIcon(props: any) {
  const { active, completed, className } = props;

  return (
    <Box>
      <Image width="15" height="15" src={Imgstep} alt="" />
    </Box>
  );
}
function YourOderDetail() {
  const steps = [
    "Đơn hàng đã được giao thành công (12:22 03/11/2023)",
    "Đơn hàng đang trên đường đến với bạn (12:22 03/11/2023)",
    "Đơn hàng đã đến bưu cục (12:22 03/11/2023)",
    "Đơn hàng đã được vận chuyển (12:22 03/11/2023)",
    "Đơn hàng đang được chuẩn bị (12:22 03/11/2023)",
    "Đơn hàng đã được xác nhận (12:22 03/11/2023)",
    "Đơn hàng đang chờ được xác nhận (12:22 03/11/2023)",
  ];
  return (
    <div className="bg-home bg-center overflow-hidden relative ">
      <Box>
        <NavBar />
        <Box display="flex" flexDirection="column" mx="100px">
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "42px",
              color: "#DFA32E",
              my: "18px",
            }}
          >
            Đơn hàng của bạn
          </Typography>
        </Box>
        <Box sx={{ width: "100%", height: "800px" }} mx="100px">
          <Stepper orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step}>
                <StepLabel
                  StepIconComponent={QontoStepIcon}
                  optional={
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "18px",
                        color: "#0DC06A",
                      }}
                      variant="caption"
                    >
                      {step}
                    </Typography>
                  }
                ></StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
    </div>
  );
}

export default YourOderDetail;

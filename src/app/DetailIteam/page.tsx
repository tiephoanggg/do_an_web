"use client";

import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import ImgItem from "public/img/ItemItem.png";
import Boxcustom from "@/components/BoxCustom/Boxcustom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NumberInput from "@/components/InputQuantity/InputQuantity";
function DetailIteam() {
  const [valueSize, setValueSize] = useState<any>("");
  const [favorite, setFavorite] = useState<boolean>(true);
  const data = {
    size: ["S", "M", "L", "XL"],
  };

  const onSelectSize = (e: SelectChangeEvent) => {
    setValueSize(e.target.value);
  };
  useEffect(() => {
    setValueSize(data.size[0]);
  }, []);
  const handClickFavorite = () => {
    setFavorite(!favorite);
    console.log("sgdfvsdhgvsajth");
  };
  const handleAddToCard = () => {};
  return (
    <Box bgcolor="#F6F2F5">
      <NavBar />
      <Box px="180px">
        <Grid container columns={10}>
          <Grid
            item
            xs={3}
            mt="80px"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Image width="420" src={ImgItem} alt="" />
          </Grid>

          <Grid item xs={7} mt="80px" px="50px">
            <Box display="flex" flexDirection="row" mb={"30px"}>
              <Boxcustom
                Contents={"Tên sản phẩm"}
                size={250}
                justifyContent={"center"}
              />
              <Boxcustom
                Contents={"Thịt chó"}
                size={400}
                justifyContent={"left"}
              />
            </Box>
            <Box display="flex" flexDirection="row" mb={"30px"}>
              <Boxcustom
                Contents={"Giá"}
                size={250}
                justifyContent={"center"}
              />
              <Boxcustom
                Contents={"300.000 đ"}
                size={400}
                justifyContent={"left"}
              />
            </Box>
            <Box display="flex" flexDirection="row" mb={"30px"}>
              <Boxcustom
                Contents={"size"}
                size={250}
                justifyContent={"center"}
              />
              <FormControl>
                <Select
                  sx={{
                    width: "200px",
                    height: "60px",
                    borderRadius: "15px",
                    backgroundColor: "#F6F2F5",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#0D0D0D",
                    "& svg": {
                      color: "#0D0D0D",
                    },
                    ml: "20px",
                  }}
                  value={valueSize}
                  onChange={onSelectSize}
                >
                  {data.size.map((item: any, index: number) => (
                    <MenuItem
                      key={index}
                      value={item}
                      sx={{ fontSize: "14px", color: "#EA6200" }}
                    >
                      <Typography sx={{ fontSize: "14px" }}>{item}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" flexDirection="row" mb={"30px"}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent={"flex-start"}
                alignItems="left"
                width={900}
                height={300}
                sx={{
                  backgroundColor: "#F6F2F5",
                  border: "1px solid #000000",
                  borderRadius: "10px",
                  px: "15px",
                  py: "15px",
                }}
                mx="20px"
              >
                <Typography
                  sx={{ fontWeight: 600, fontSize: "20px", color: "#000000" }}
                >
                  Marvel là một chiếc áo hoàn hảo dành cho những ngày hè nóng
                  nực. Với chất vải mát lạnh và khô thoáng, Marvel sẽ là giải
                  pháp tuyệt vời của bạn trước khi ra đường{" "}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" mb={"30px"}>
              <Boxcustom
                Contents={"Số lượng"}
                size={140}
                justifyContent={"center"}
              />
              {/* dsvdgdgfdgdfgdfg */}
              <NumberInput aria-label="Quantity Input" min={0} />
            </Box>
            <Box mb={"50px"}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#50C2C9",
                  padding: "12px 24px",
                  width: "250px",

                  marginLeft: "20px",
                  textTransform: "none",
                }}
                onClick={handleAddToCard}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "18px",
                  }}
                >
                  Thêm vào giỏ hàng
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DetailIteam;

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
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "../../style.css";
import { message } from "antd";
function DetailIteam(props: any) {
  const router = useRouter();
  const [valueSize, setValueSize] = useState<any>("");
  const [valueColor, setValueColor] = useState<any>("");
  const [favorite, setFavorite] = useState<boolean>(true);
  const [dataDetail, setDatadetail] = useState<any>({
    images: [],
    sizes: ["S", "M", "L", "XL"],
    price: 0,
    colors: ["Red", "Blue"],
  });
  const [messageApi, contextHolder] = message.useMessage();
  const storedToken = Cookies.get("accessToken");
  const handleGetProduct = async () => {
    axios
      .get(`http://localhost:4000/v4/product/${props.params.slug}/viewProduct`)
      .then(function (res) {
        // handle success

        console.log(res.data);
        setDatadetail(res.data);
        setValueSize(res.data.sizes[0]);
        setValueColor(res.data.colors[0]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    console.log(props.params.slug);
    handleGetProduct();
  }, []);
  const onSelectSize = (e: SelectChangeEvent) => {
    setValueSize(e.target.value);
  };
  const onSelectColor = (e: SelectChangeEvent) => {
    setValueColor(e.target.value);
  };
  const handClickFavorite = () => {
    setFavorite(!favorite);
  };
  const getAddTocard = async (data: any) => {
    try {
      const { data: res } = await axios.post(
        "http://localhost:4000/v4/user/addLikedProduct",
        data,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      console.log(res);
      messageApi.open({
        type: "success",
        content: "Đã thêm sản phẩm vào giỏ hàng",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddToCard = () => {
    const value = {
      productId: props.params.slug,
      size: valueSize,
      color: valueColor,
    };
    if (storedToken) {
      getAddTocard(value);
    } else {
      router.push("/Login");
    }
  };
  return (
    <div className="bg-home bg-center overflow-hidden relative ">
      <Box>
        {contextHolder}
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
              <Image
                width="620"
                height="620"
                src={dataDetail.images[0]}
                alt="Ảnh Sp"
              />
            </Grid>

            <Grid item xs={7} mt="80px" px="50px">
              <Box display="flex" flexDirection="row" mb={"30px"}>
                <Boxcustom
                  Contents={"Tên sản phẩm"}
                  size={250}
                  justifyContent={"center"}
                />
                <Boxcustom
                  Contents={dataDetail.name}
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
                  Contents={`${dataDetail.price.toLocaleString("de-DE")} đ`}
                  size={400}
                  justifyContent={"left"}
                />
              </Box>
              <Box display="flex" flexDirection="row" mb={"30px"}>
                <Boxcustom
                  Contents={"Size"}
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
                    {dataDetail.sizes.map((item: any, index: number) => (
                      <MenuItem
                        key={index}
                        value={item}
                        sx={{ fontSize: "14px", color: "#EA6200" }}
                      >
                        <Typography sx={{ fontSize: "14px" }}>
                          {item}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box display="flex" flexDirection="row" mb={"30px"}>
                <Boxcustom
                  Contents={"Màu sắc"}
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
                    value={valueColor}
                    onChange={onSelectColor}
                  >
                    {dataDetail.colors.map((item: any, index: number) => (
                      <MenuItem
                        key={index}
                        value={item}
                        sx={{ fontSize: "14px", color: "#EA6200" }}
                      >
                        <Typography sx={{ fontSize: "14px" }}>
                          {item}
                        </Typography>
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
                  height={200}
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
                    {dataDetail.description}
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
                <NumberInput
                  aria-label="Quantity Input"
                  min={1}
                  defaultValue={1}
                />
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
    </div>
  );
}

export default DetailIteam;

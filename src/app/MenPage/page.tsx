"use client";

import ItemDefault from "@/components/ItemDefault/ItemDefault";
import NavBar from "@/components/NavBar/NavBar";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Card } from "antd";
import ImgItem from "public/img/ItemItem.png";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../style.css";
import axios from "axios";
function MenPage() {
  const [dataMenList, setDataMenList] = useState<any>([
    {
      images: [ImgItem],
      name: "Loading!!!",
      price: 300000,
      sizes: ["S", "M", "L", "XL"],
      id: 1,
    },
  ]);
  const handleGetMenList = async () => {
    axios
      .get("http://localhost:4000/v4/product/list/M")
      .then(function (res) {
        // handle success

        console.log(res.data);
        setDataMenList(res.data.products);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    handleGetMenList();
  }, []);
  const handleChangePaginate = (
    event: React.ChangeEvent<unknown>,
    pageSelected: number
  ) => {
    console.log(pageSelected);
  };
  return (
    <div className="bg-home bg-center overflow-hidden relative ">
      <Box>
        <NavBar />
        <Box px="80px">
          <Typography
            sx={{ fontWeight: 500, fontSize: "48px", color: "#000000" }}
            my="30px"
          >
            Sản phẩm nam
          </Typography>
        </Box>
        <Box>
          <Grid container columns={8}>
            {dataMenList.map((item: any) => (
              <Grid key={item.id} item xs={2} px="80px" py="40px">
                <ItemDefault
                  img={item.images[0]}
                  name={item.name}
                  price={item.price}
                  size={item.sizes}
                  id={item._id}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            py="30px"
          >
            <Stack spacing={2}>
              <Pagination
                count={10}
                onChange={handleChangePaginate}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default MenPage;

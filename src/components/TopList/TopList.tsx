import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImgItem from "public/img/ItemItem.png";
import ItemDefault from "../ItemDefault/ItemDefault";
import { useRouter } from "next/navigation";
import axios from "axios";
function TopList() {
  const [dataTopList, setDataTopList] = useState<any>([
    {
      images: [ImgItem],
      name: "Thit chó",
      price: 300000,
      sizes: ["S", "M", "L", "XL"],
      id: 1,
    },
  ]);

  const handleGetTrensList = async () => {
    axios
      .get("http://localhost:4000/v4/product/trend/list")
      .then(function (res) {
        // handle success
        setDataTopList(res.data.data.slice(0, 4));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    handleGetTrensList();
  }, []);
  const router = useRouter();
  const handleViewTopProduct = () => {
    router.push("/TopProduct");
  };
  return (
    <Box px="80px" py="40px">
      <Typography
        sx={{ fontWeight: 500, fontSize: "64px", color: "#000000" }}
        mb="60px"
      >
        Top sản phẩm nổi bật
      </Typography>
      <Grid container columns={8}>
        {dataTopList.map((item: any) => (
          <Grid key={item.id} item xs={2}>
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
      <Box display="flex" justifyContent="center" mr="100px">
        <Button
          variant="text"
          sx={{
            color: "#000000",
            backgroundColor: "#070707",
            border: "2px solid #000000",
            borderRadius: "30px",
            px: "64px",
            py: "12px",
            mt: "60px",
            "&:hover": {
              textDecoration: "underline",
              color: "#50C2C9",
              border: "2px solid #50C2C9",
            },
          }}
          onClick={handleViewTopProduct}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              color: "#000000",
              "&:hover": {
                textDecoration: "underline",
                color: "#50C2C9",
              },
            }}
          >
            Xem thêm
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default TopList;

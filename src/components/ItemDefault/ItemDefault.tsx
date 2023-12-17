import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/navigation";
import { Image } from "antd";
interface Props {
  img: any;
  name: string;
  price: number;
  size: any;
  id: string;
}
function ItemDefault({ img, name, price, size, id }: Props) {
  const router = useRouter();
  const handleViewDetail = () => {
    router.push(`/DetailIteam/${id}`);
  };
  return (
    <Card sx={{ maxWidth: 310 }} onClick={handleViewDetail}>
      <CardActionArea>
        <Image width={310} height={360} src={img} alt="" />
        <CardContent>
          <Typography
            sx={{ fontWeight: 500, fontSize: "24px", color: "#000000" }}
          >
            {name}
          </Typography>
          <Typography
            sx={{ fontWeight: 500, fontSize: "24px", color: "#000000" }}
          >
            {price}đ
          </Typography>
          <Typography
            sx={{ fontWeight: 500, fontSize: "24px", color: "#000000" }}
          >
            size:{size?.join()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ItemDefault;

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
import ImgItem from "public/img/ItemItem.png";
import Image from "next/image";
import axios from "axios";
import "../style.css";
interface DataType {
  key: string;
  name: string;
  code: string;
  images: string[];
  Status: string;
}
function YourOder() {
  const router = useRouter();
  const [dataCart, setDataCart] = useState<any>([
    {
      key: "1",
      name: " Áo Marvel ",
      code: "MBB6226924022001",
      status: "Chờ phê duyệt",
      images: [ImgItem],
    },
    {
      key: "2",
      name: " Áo Marvel ",
      code: "MBB6226924022001",
      status: "Đã phê duyệt",
      images: [ImgItem],
    },
    {
      key: "3",
      name: " Áo Marvel ",
      code: "MBB6226924022001",
      status: "Đang vận chuyển",
      images: [ImgItem],
    },
    {
      key: "4",
      name: " Áo Marvel ",
      code: "MBB6226924022001",
      status: "Hoàn thành",
      images: [ImgItem],
    },
    {
      key: "5",
      name: " Áo Marvel ",
      code: "MBB6226924022001",
      status: "Hoàn thành",
      images: [ImgItem],
    },
    {
      key: "6",
      name: " Áo Marvel ",
      code: "MBB6226924022001",
      status: "Hoàn thành",
      images: [ImgItem],
    },
    {
      key: "7",
      name: " Áo Marvel ",
      code: "MBB6226924022001",
      status: "Hoàn thành",
      images: [ImgItem],
    },
    {
      key: "8",
      name: " Áo Marvel ",
      code: "MBB6226924022001",
      status: "Hoàn thành",
      images: [ImgItem],
    },
    {
      key: "9",
      name: " Áo Marvel ",
      code: "MBB6226924022001",
      status: "Hoàn thành",
      images: [ImgItem],
    },
  ]);

  const handleDel = async (data: any) => {
    router.push("/YourOderDetail");
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Sản phẩm",
      key: "product",
      dataIndex: "product",
      render: (_, { images }) => (
        <>
          {images.map((image) => {
            return (
              <Image key={image} width="210" height="210" src={image} alt="" />
            );
          })}
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã vận đơn",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a className="underline" onClick={() => handleDel(record)}>
            Xem chi tiết
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div className="bg-home bg-center overflow-hidden relative ">
      <Box>
        <NavBar />
        <Box>
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
            <Box>
              <Table
                columns={columns}
                pagination={{ pageSize: 5 }}
                dataSource={dataCart}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default YourOder;

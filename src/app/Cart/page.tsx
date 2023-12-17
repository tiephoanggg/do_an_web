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
import { Radio } from "antd";
import { Controller, useForm, useWatch } from "react-hook-form";
import { get, includes, isEmpty, remove } from "lodash";
import { useStyles } from "../Login/style";
import LoadingButton from "@mui/lab/LoadingButton";
import CartTable from "@/components/cartTable/cartTable";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import Image from "next/image";
import axios from "axios";
import VoucherImg from "public/img/Subtraction.png";
import "../style.css";
import Boxcustom from "@/components/BoxCustom/Boxcustom";
interface Values {
  fullName: string;
  phoneNumber: string;
  address: string;
  note: string;
  typePay: string;
}
interface DataType {
  key: string;
  name: string;
  age: number;
  images: string[];
  color: string;
}

const radioStyle = {
  backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/shop-hptt.appspot.com/o/ba7d0d92-857a-429c-9141-edb0d4f7e4ce.png?alt=media)`,
  backgroundSize: "cover",
  backgroundColor: "#F6F2F5",
  backgroundPosition: "center", // Đặt vị trí của hình nền là trung tâm
  width: "200px", // Đảm bảo nút radio mở rộng hết kích thước của nút
  height: "60px", // Đảm bảo nút radio mở rộng hết kích thước của nút
  display: "flex",
  alignItems: "center",
  margin: "0 5px",
  justifyContent: "center",
  color: "#000000", // Màu chữ để đảm bảo đọc được trên hình nền
};
const radioGroupStyle = {
  display: "flex", // Xếp các nút radio theo chiều ngang
  justifyContent: "center",
  margin: "15px 0",
};
function Cart() {
  const classes = useStyles();
  const storedToken = Cookies.get("accessToken");
  const fullNameDefau = Cookies.get("fullName");
  const emailDefau = Cookies.get("email");
  const phoneNumberDefau = Cookies.get("phoneNumber");
  const addressDefau = Cookies.get("address");
  const router = useRouter();
  const idUser = Cookies.get("id");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataCart, setDataCart] = useState<any>([]);
  const [dataCartPay, setDataCartPay] = useState<any>([
    {
      idProduct: "1",
      price: 0,
      color: " ",
      size: " ",
    },
  ]);
  const [productPay, setProductPay] = useState<any>([
    {
      idProduct: "1",
      price: 0,
      color: " ",
      size: " ",
    },
  ]);
  const [listVoucher, setListVoucher] = useState<any>([]);
  const [voucherValue, setVoucherValue] = useState<any>(0);
  const [voucherId, setVoucherId] = useState<any>("0");
  const [finalPrice, setFinalPrice] = useState<any>(0);
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const optionPay = [
    { label: "Thanh toán khi nhận hàng", value: "COD" },
    { label: "Thanh toán bằng QR code", value: "QRCode" },
    { label: "Chuyển khoản ngân hàng", value: "Bank" },
  ];
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: {
      fullName: fullNameDefau,
      phoneNumber: phoneNumberDefau,
      address: addressDefau,
    },
    mode: "onSubmit",
  });
  useEffect(() => {
    if (!storedToken) {
      router.push("/");
    }
  }, []);
  const handleGetCart = async () => {
    axios
      .get(`http://localhost:4000/v4/user/viewAllLikedProduct`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(function (res) {
        // handle success
        const dataFill = res.data.likedProducts.map((item: any) => {
          return {
            key: item.productId._id,
            name: item.productId.name,
            price: item.productId.price.toLocaleString("de-DE"),
            quantity: item.productId.quantity,
            color: item.color.toLowerCase(), // Convert to lowercase as per your example
            size: item.size,
            images: item.productId.images,
          };
        });
        const dataFillPay = res.data.likedProducts.map((item: any) => {
          return {
            idProduct: item.productId._id,
            price: item.productId.price,
            quantity: item.productId.quantity,
            color: item.color,
            size: item.size,
          };
        });
        setDataCartPay(dataFillPay);
        setDataCart(dataFill);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const handleVoucher = async () => {
    axios
      .get(`http://localhost:4000/v4/voucher/list/all`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(function (res) {
        // handle success
        console.log(res.data);
        setListVoucher(res.data.vouchers);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    handleGetCart();
    handleVoucher();
  }, []);
  const handleDel = async (data: any) => {
    console.log(data);
    const payload = { productId: data.key };
    await axios
      .delete(`http://localhost:4000/v4/user/deleteLikedProduct`, {
        headers: { Authorization: `Bearer ${storedToken}` },
        data: payload,
      })
      .then((res) => {
        console.log(res);
        handleGetCart();
      })
      .catch((err) => {
        console.log(err);
      });
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
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a className="underline" onClick={() => handleDel(record)}>
            Delete
          </a>
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    const resultArr = dataCartPay.filter((product: any) =>
      newSelectedRowKeys.includes(product.idProduct)
    );
    console.log(resultArr);
    setProductPay(resultArr);
    setSelectedRowKeys(newSelectedRowKeys);
    const total = resultArr.reduce((accumulator: any, product: any) => {
      return accumulator + product.price * product.quantity;
    }, 0);
    setTotalPrice(total);
  };
  const onSelectVoucher = (e: any) => {
    const element = listVoucher.find(
      (item: any) => item._id === e.target.value
    );
    setVoucherValue(element.discountPrice);
    setVoucherId(e.target.value);
  };
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  useEffect(() => {
    if (totalPrice === 0) {
      setFinalPrice(0);
    } else {
      setFinalPrice(totalPrice - voucherValue + 30000);
    }
  }, [totalPrice, voucherValue]);

  const getPay = async (data: any) => {
    try {
      const { data: res } = await axios.post(
        "http://localhost:4000/v4/product/queue/add",
        data,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      console.log(res);
      alert("Đặt hàng thành công");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = (values: Values) => {
    console.log(values);

    const payload = {
      idUser: idUser,
      products: productPay,
      voucherId: voucherId,
      finalPrice: finalPrice,
    };
    if (productPay.length !== 0) {
      getPay(payload);
    } else {
      alert("Thêm sản phẩm cần thanh toán");
    }
  };

  return (
    <div className="bg-home bg-center overflow-hidden relative ">
      <Box>
        <NavBar />
        <Grid container columns={12} px="50px">
          <Grid item xs={6} mt="80px" ml="50px">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="left"
              alignItems="flex-start"
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "36px",
                  color: "#DFA32E",
                  my: "18px",
                  mx: "100px",
                }}
              >
                Thông tin vận chuyển
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <Grid container columns={12} px="80px">
                  <Grid item xs={6} px="20px">
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
                        <Box>
                          <InputLabel
                            sx={{ color: "#015A94", mb: "5px" }}
                            htmlFor="fullName"
                          >
                            Họ và tên
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                            id="fullName"
                            placeholder="Họ và tên"
                            error={!isEmpty(errors.fullName)}
                            autoComplete="off"
                            className={classes.input}
                            fullWidth
                          />
                          {!isEmpty(errors.fullName) && (
                            <Typography fontSize={12} color="#ff0000" my="5px">
                              {get(errors, "fullName.message", "")}
                            </Typography>
                          )}
                        </Box>
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} px="20px">
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
                        <Box>
                          <InputLabel
                            sx={{ color: "#015A94", mb: "5px" }}
                            htmlFor="phoneNumber"
                          >
                            Số điện thoại
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                            id="phoneNumber"
                            placeholder="Số điện thoại"
                            error={!isEmpty(errors.phoneNumber)}
                            autoComplete="off"
                            className={classes.input}
                            fullWidth
                          />
                          {!isEmpty(errors.phoneNumber) && (
                            <Typography fontSize={12} color="#ff0000" my="5px">
                              {get(errors, "phoneNumber.message", "")}
                            </Typography>
                          )}
                        </Box>
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box px="100px">
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "địa chir nhận hàng không được bỏ trống",
                    },
                  }}
                  name="address"
                  render={({ field }) => (
                    <Box>
                      <InputLabel
                        sx={{ color: "#015A94", mb: "5px" }}
                        htmlFor="address"
                      >
                        Địa chỉ nhận hàng
                      </InputLabel>
                      <OutlinedInput
                        {...field}
                        sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                        id="address"
                        placeholder="địa chỉ nhận hàng"
                        error={!isEmpty(errors.address)}
                        autoComplete="off"
                        className={classes.input}
                        fullWidth
                      />
                      {!isEmpty(errors.address) && (
                        <Typography fontSize={12} color="#ff0000" my="5px">
                          {get(errors, "address.message", "")}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              </Box>
              <Box px="100px">
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: false,
                      message: "Ghi chú nhận hàng không được bỏ trống",
                    },
                  }}
                  name="note"
                  render={({ field }) => (
                    <Box>
                      <InputLabel
                        sx={{ color: "#015A94", mb: "5px" }}
                        htmlFor="note"
                      >
                        Ghi chú
                      </InputLabel>
                      <OutlinedInput
                        {...field}
                        sx={{ backgroundColor: "#E8E3E3", my: "10px" }}
                        id="note"
                        placeholder="Ghi chú"
                        error={!isEmpty(errors.note)}
                        autoComplete="off"
                        className={classes.input}
                        fullWidth
                      />
                      {!isEmpty(errors.note) && (
                        <Typography fontSize={12} color="#ff0000" my="5px">
                          {get(errors, "note.message", "")}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              </Box>
              <Box px="80px" display="flex" flexDirection="row" mt="20px">
                <Boxcustom
                  Contents={`Phí ship`}
                  size={120}
                  justifyContent={"left"}
                />
                <Boxcustom
                  Contents={`30.000 đ`}
                  size={250}
                  justifyContent={"left"}
                />
              </Box>
              <Box px="100px">
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "36px",
                    color: "#DFA32E",
                    my: "18px",
                  }}
                >
                  Phương thức thanh toán
                </Typography>
                <Controller
                  control={control}
                  name="typePay"
                  defaultValue={"COD"}
                  rules={{
                    required: {
                      value: true,
                      message: "Phương thức thanh toán không được dể trống",
                    },
                  }}
                  render={({ field }) => {
                    return (
                      <Box>
                        <InputLabel
                          id="status-select"
                          sx={{ color: "#282828", fontSize: 14, mb: "5px" }}
                        >
                          Phương thức thanh toán
                          <span>
                            (<span style={{ color: "#FF0000" }}>*</span>)
                          </span>
                        </InputLabel>
                        <Select
                          {...field}
                          labelId="status-select"
                          fullWidth
                          sx={{ height: "40px", backgroundColor: "white" }}
                        >
                          {optionPay?.map((opt) => (
                            <MuiMenuItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </MuiMenuItem>
                          ))}
                        </Select>
                      </Box>
                    );
                  }}
                />
              </Box>
              <Box px="100px">
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "32px",
                    color: "#DFA32E",
                    my: "18px",
                  }}
                >
                  Voucher
                </Typography>
                <Radio.Group
                  onChange={onSelectVoucher}
                  style={radioGroupStyle}
                  size="large"
                >
                  {listVoucher?.map((opt: any) => (
                    <Radio.Button
                      key={opt._id}
                      style={radioStyle}
                      value={opt._id}
                    >
                      <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                        {opt.name}
                      </Typography>
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </Box>
              <Box px="100px">
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "32px",
                    color: "#000000",
                    my: "18px",
                  }}
                >
                  Tổng tiền cần thanh toán
                </Typography>
                <Boxcustom
                  Contents={`${finalPrice.toLocaleString("de-DE")} đ`}
                  size={250}
                  justifyContent={"left"}
                />
              </Box>
              <Box px="100px"></Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <LoadingButton
                  type="submit"
                  sx={{ backgroundColor: "#50C2C9", my: "28px" }}
                  variant="contained"
                  className={classes.btn}
                >
                  Đặt hàng
                </LoadingButton>
              </Box>
            </form>
          </Grid>
          <Grid item xs={5} mt="80px">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="left"
              alignItems="start"
            >
              <Typography
                sx={{ fontWeight: 600, fontSize: "36px", color: "#DFA32E" }}
              >
                Thông tin giỏ hàng
              </Typography>
            </Box>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              pagination={{ pageSize: 3 }}
              dataSource={dataCart}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Cart;

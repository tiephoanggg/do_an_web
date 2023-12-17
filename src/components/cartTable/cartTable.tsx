import React, { useState } from "react";

import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import type { TableRowSelection } from "antd/es/table/interface";
interface DataType {
  key: string;
  name: string;
  age: number;
  tags: string[];
  color: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Sản phẩm",
    key: "product",
    dataIndex: "product",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          return <Image key={tag} width="310" height="310" src={tag} alt="" />;
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
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Số lượng",
    dataIndex: "address",
    key: "address",
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
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    color: "red",
    tags: [
      "https://aokhoacnam.vn/upload/product/akn-122/ao-khoac-mang-to-kaki-lot-long.jpg",
    ],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    color: "red",
    tags: [
      "https://aokhoacnam.vn/upload/product/akn-122/ao-khoac-mang-to-kaki-lot-long.jpg",
    ],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    color: "red",
    tags: [
      "https://aokhoacnam.vn/upload/product/akn-122/ao-khoac-mang-to-kaki-lot-long.jpg",
    ],
  },
  {
    key: "44",
    name: "Joe Black",
    age: 32,
    color: "red",
    tags: [
      "https://aokhoacnam.vn/upload/product/akn-122/ao-khoac-mang-to-kaki-lot-long.jpg",
    ],
  },
  {
    key: "5",
    name: "Joe Black",
    age: 32,
    color: "red",
    tags: [
      "https://aokhoacnam.vn/upload/product/akn-122/ao-khoac-mang-to-kaki-lot-long.jpg",
    ],
  },
  {
    key: "6",
    name: "Joe Black",
    age: 32,
    color: "red",
    tags: [
      "https://aokhoacnam.vn/upload/product/akn-122/ao-khoac-mang-to-kaki-lot-long.jpg",
    ],
  },
  {
    key: "7",
    name: "Joe Black",
    age: 32,
    color: "red",
    tags: [
      "https://aokhoacnam.vn/upload/product/akn-122/ao-khoac-mang-to-kaki-lot-long.jpg",
    ],
  },
  {
    key: "8",
    name: "Joe Black",
    age: 32,
    color: "red",
    tags: [
      "https://aokhoacnam.vn/upload/product/akn-122/ao-khoac-mang-to-kaki-lot-long.jpg",
    ],
  },
];

const CartTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
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
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      pagination={{ pageSize: 3 }}
      dataSource={data}
    />
  );
};

export default CartTable;

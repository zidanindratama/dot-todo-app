"use client";

import React, { useState } from "react";
import { Checkbox, Button, Modal, Form, Input, Select } from "antd";
import { HiOutlinePencil } from "react-icons/hi2";
import { IoTrashOutline } from "react-icons/io5";
import Image from "next/image";
import { Item } from "@/types/type";

type ListItemProps = {
  item: Item;
  priorityColors: { [key: string]: string };
  onUpdateItem: (id: string, updatedData: Partial<Item>) => void;
  onUpdateCheck: (item: Item) => void;
  onDelete: (id: string) => void;
};

const ListItem = ({
  item,
  priorityColors,
  onUpdateItem,
  onUpdateCheck,
  onDelete,
}: ListItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => setIsModalOpen(true);
  const showModalUpdate = () => setIsModalUpdateOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleUpdateCheck = () => {
    onUpdateCheck(item);
  };

  const handleDelete = () => {
    onDelete(item.id);
    setIsModalOpen(false);
  };

  const handleEditSubmit = (values: any) => {
    onUpdateItem(item.id, { name: values.name, priority: values.priority });
    setIsModalUpdateOpen(false);
  };

  console.log(item.isCompleted);

  return (
    <div className="bg-white drop-shadow-sm shadow-md p-8 flex flex-row justify-between items-center rounded-md">
      <div className="flex flex-row gap-5 items-center">
        <Checkbox checked={item.isCompleted} onChange={handleUpdateCheck} />
        <div
          className={`h-2 w-2 rounded-full ${
            priorityColors[item.priority] || "bg-gray-400"
          } !important`}
        ></div>
        <h1 className={`text-black ${item.isCompleted ? "line-through" : ""}`}>
          {item.name}
        </h1>
        <HiOutlinePencil
          className="w-4 h-4 text-[#888888] hover:text-yellow-300 cursor-pointer"
          onClick={showModalUpdate}
        />
      </div>
      <IoTrashOutline
        className="w-5 h-5 text-[#888888] hover:text-red-300 cursor-pointer"
        onClick={showModal}
      />

      {/* FORM UPDATE  */}
      <Modal
        title="Edit Item"
        open={isModalUpdateOpen}
        onCancel={() => setIsModalUpdateOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
          initialValues={{ name: item.name, priority: item.priority }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the item name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select
              options={[
                { label: "Very Low", value: "VERY_LOW" },
                { label: "Low", value: "LOW" },
                { label: "Medium", value: "MEDIUM" },
                { label: "High", value: "HIGH" },
                { label: "Very High", value: "VERY_HIGH" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Item
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* FORM DELETE */}
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Image
          src="/main/warning.png"
          alt="warning"
          height={1000}
          width={1000}
          className="w-52 mx-auto"
        />
        <div className="text-center">
          <p className="text-lg">
            Apakah anda yakin menghapus List Item{" "}
            <span className="font-bold">&apos;{item.name}&apos;</span>?
          </p>
        </div>
        <div className="flex justify-center gap-10 mt-5">
          <Button size="large" onClick={handleCancel}>
            Batal
          </Button>
          <Button size="large" type="primary" danger onClick={handleDelete}>
            Hapus
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ListItem;

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Select, Input, Form, Popover, message } from "antd";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import { priorityColors } from "@/data/style-data";
import ListItem from "./ListItem";
import Image from "next/image";
import { LiaSortAlphaDownSolid } from "react-icons/lia";
import { Activity, Item } from "@/types/type";
import { HiOutlinePencil } from "react-icons/hi2";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "@/helpers/axiosInstance.";

type Props = {
  activityId: string;
};

const priorities = [
  { label: "Very Low", value: "VERY_LOW" },
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
  { label: "Very High", value: "VERY_HIGH" },
];

const Hero = ({ activityId }: Props) => {
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState<Activity>();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState("terbaru");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const [form] = Form.useForm();

  const fetchActivity = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/activities/${activityId}`);
      const activity = response.data.activity;
      setActivity(activity);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `/items/${activityId}?sort=${sortType}`
      );
      setItems(response.data.items || []);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleSortChange = (value: string) => {
    setSortType(value);
    fetchItems();
  };

  const handleAddItem = async (values: any) => {
    try {
      await axiosInstance.post("/items", {
        activityId,
        name: values.name,
        priority: values.priority,
      });
      message.success("Item berhasil ditambah.");
      setIsModalOpen(false);
      form.resetFields();
      fetchItems();
    } catch (err) {
      console.error("Item gagal ditambah:", err);
    }
  };

  const handleUpdateItem = async (id: string, updatedData: Partial<Item>) => {
    try {
      await axiosInstance.put(`/items/${id}`, updatedData);
      message.success("Item berhasil diubah.");
      fetchItems();
    } catch (err) {
      console.error("Item gagal diubah:", err);
      message.error("Item gagal diubah.");
    }
  };

  const handleUpdateCheck = async (item: Item) => {
    try {
      await axiosInstance.put(`/items/${item.id}`, {
        isCompleted: !item.isCompleted,
      });
      message.success("Item berhasil diubah");
      fetchItems();
    } catch (error) {
      message.error("Item gagal diubah");
    }
  };

  const handleUpdateActivity = async () => {
    try {
      await axiosInstance.put(`/items/${activityId}`, {
        title: newTitle,
      });
      message.success("Activity berhasil diubah.");
      fetchActivity();
      setIsUpdateModalOpen(false);
    } catch (err) {
      console.error("Activity gagal diubah:", err);
      message.error("Activity gagal diubah.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/items/${id}`);
      message.success("Item berhasil dihapus");
      setItems((prev) => prev.filter((items) => items.id !== id));
    } catch (error) {
      message.error("Item gagal dihsapus");
    }
  };

  useEffect(() => {
    fetchItems();
    fetchActivity();
  }, [activityId, sortType]);

  return (
    <div className="h-screen bg-[#F4F4F4]">
      <div className="flex flex-col mx-auto max-w-7xl p-6">
        <div className="flex flex-row justify-between items-center gap-5">
          <div className="flex flex-row items-center gap-4">
            <Link href={"/"}>
              <FaChevronLeft className="w-5 h-5 text-black" />
            </Link>
            <div className="flex flex-row justify-between gap-5 items-center">
              <h1 className="capitalize text-xl md:text-3xl font-bold text-black">
                {activity?.title}
              </h1>
              <HiOutlinePencil
                className="w-4 h-4 text-[#888888] hover:text-yellow-300 cursor-pointer"
                onClick={() => {
                  setIsUpdateModalOpen(true);
                  setNewTitle(activity?.title || "");
                }}
              />
            </div>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <Popover
              content={
                <Select
                  defaultValue={sortType}
                  className="w-48"
                  onChange={handleSortChange}
                  options={[
                    { value: "terbaru", label: "Terbaru" },
                    { value: "terlama", label: "Terlama" },
                    { value: "a-z", label: "A-Z" },
                    { value: "z-a", label: "Z-A" },
                    { value: "belum-selesai", label: "Belum selesai" },
                  ]}
                />
              }
              placement="bottom"
              title="Sort By"
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <Button size="large" icon={<LiaSortAlphaDownSolid />}></Button>
            </Popover>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              shape="round"
              size={"large"}
              onClick={() => setIsModalOpen(true)}
            >
              Tambah
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : error ? (
          <p className="text-center mt-10 text-red-500">{error}</p>
        ) : items.length > 0 ? (
          <div className="mt-20 flex flex-col gap-5">
            {items.map((item: any) => (
              <ListItem
                key={item.id}
                item={item}
                priorityColors={priorityColors}
                onUpdateItem={handleUpdateItem}
                onUpdateCheck={handleUpdateCheck}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-20">
            <Image
              src="/main/home-activities.png"
              alt="home"
              width={1000}
              height={1000}
              className="h-96 object-contain"
            />
          </div>
        )}

        <Modal
          title="Tambah List Item"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddItem}
            initialValues={{ priority: "MEDIUM" }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter the item name" },
              ]}
            >
              <Input placeholder="Enter item name" />
            </Form.Item>
            <Form.Item label="Priority" name="priority">
              <Select
                options={priorities.map((priority) => ({
                  value: priority.value,
                  label: priority.label,
                }))}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Tambah Item
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Update Activity"
          open={isUpdateModalOpen}
          onCancel={() => setIsUpdateModalOpen(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsUpdateModalOpen(false)}>
              Batal
            </Button>,
            <Button
              key="update"
              type="primary"
              onClick={handleUpdateActivity}
              disabled={!newTitle.trim()}
            >
              Ubah
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item
              label="New Title"
              rules={[
                { required: true, message: "Please enter the new title" },
              ]}
            >
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter new activity title"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Hero;

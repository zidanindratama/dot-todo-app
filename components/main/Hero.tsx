"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Input } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ListActivity from "./ListActivity";
import axios from "axios";
import { Activity } from "@/types/type";

const Hero = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newActivity, setNewActivity] = useState<string>("");

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/activities`
      );
      setActivities(data.activities);
    } catch (error) {
      message.error("Activity gagal difetch");
    } finally {
      setLoading(false);
    }
  };

  const handleAddActivity = async () => {
    if (!newActivity.trim()) {
      message.warning("Judul activity tidak boleh kosong");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/activities`,
        { title: newActivity }
      );
      message.success("Activity berhasil ditambahkan");
      setActivities((prev) => [...prev, response.data.activity]);
      setModalVisible(false);
      setNewActivity("");
    } catch (error) {
      message.error("Gagal menambahkan activity");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/activities/${id}`);
      message.success("Activity berhasil dihapus");
      setActivities((prev) => prev.filter((activity) => activity.id !== id));
    } catch (error) {
      message.error("Activity gagal dihapus");
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="h-screen bg-[#F4F4F4]">
      <div className="flex flex-col mx-auto max-w-7xl p-6">
        <div className="flex flex-row justify-between items-center gap-5">
          <h1 className="capitalize text-3xl font-bold text-black">Activity</h1>
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            size={"large"}
            onClick={() => setModalVisible(true)}
          >
            Tambah
          </Button>
        </div>
        {loading ? (
          <div className="text-center mt-20">Loading...</div>
        ) : activities.length > 0 ? (
          <div className="mx-auto mt-20 grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-10 w-full">
            {activities.map((activity) => (
              <ListActivity
                activity={activity}
                key={activity.id}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-20">
            <Image
              src="/main/home.png"
              alt="home"
              width={1000}
              height={1000}
              className="h-96 object-contain"
            />
          </div>
        )}

        <Modal
          title="Tambah Activity"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={handleAddActivity}
          okText="Tambah"
          cancelText="Batal"
        >
          <Input
            placeholder="Masukkan judul activity"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Hero;

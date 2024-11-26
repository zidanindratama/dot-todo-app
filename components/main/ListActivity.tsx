"use client";

import { formatDate } from "@/helpers/formatDate";
import { Activity } from "@/types/type";
import { Button, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

type Props = {
  activity: Activity;
  onDelete: (id: string) => void;
};

const ListActivity = ({ activity, onDelete }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleDelete = () => {
    onDelete(activity.id);
    setIsModalOpen(false);
  };

  return (
    <div
      key={activity.id}
      className="bg-white drop-shadow-sm shadow-md p-8 grid grid-cols-1 content-between gap-10 min-h-[250px] rounded-md"
    >
      <Link
        href={`/activities/${activity.id}`}
        className="text-black hover:text-blue-500 font-bold text-xl"
      >
        {activity.title}
      </Link>
      <div className="text-[#888888] flex flex-row justify-between items-center">
        <h1 className="">{formatDate(activity.created_at)}</h1>
        <IoTrashOutline
          className="w-5 h-5 text-[#888888] hover:text-red-300 cursor-pointer"
          onClick={showModal}
        />
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
              Apakah anda yakin menghapus List Activity{" "}
              <span className="font-bold">&apos;{activity.title}&apos;</span>?
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
    </div>
  );
};

export default ListActivity;

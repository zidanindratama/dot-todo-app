import Hero from "@/components/main/activities/Hero";
import Navbar from "@/components/main/Navbar";
import React from "react";

type Param = {
  id: string;
};

type Props = {
  params: Param;
};

const ActivityItemsPage = ({ params }: Props) => {
  return (
    <div>
      <Navbar />
      <Hero activityId={params.id} />
    </div>
  );
};

export default ActivityItemsPage;

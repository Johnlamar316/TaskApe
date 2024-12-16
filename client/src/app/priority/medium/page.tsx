import React from "react";
import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reuseablePriorityPage";

const Medium = () => {
  return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default Medium;

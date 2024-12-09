import React from "react";
import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reuseablePriorityPage";

const Low = () => {
  return <ReusablePriorityPage priority={Priority.Low} />;
};

export default Low;

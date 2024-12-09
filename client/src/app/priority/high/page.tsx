import React from "react";
import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reuseablePriorityPage";

const High = () => {
  return <ReusablePriorityPage priority={Priority.High} />;
};

export default High;

import React from "react";
import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reuseablePriorityPage";

const Backlog = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Backlog;

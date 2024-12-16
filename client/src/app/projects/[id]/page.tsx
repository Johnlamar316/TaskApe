"use client";

import React, { use, useState } from "react";
import ProjectHeader from "../ProjectHeader";
import Board from "../BoardView";
import List from "../ListView";
import Timeline from "../TimelineView";
import Table from "../TableView";
import ModalNewTask from "@/components/ModalNewTask";
import { Status } from "@/state/api";

type Props = {
  params: Promise<{ id: string }>;
};

const Project = ({ params }: Props) => {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("Board");
  const [defaultStatus, setDefaultStatus] = useState<Status>(Status.ToDo);
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  console.log("isModalNewTaskOpen", isModalNewTaskOpen);

  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
        setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        defaultStatus={defaultStatus}
      />
      <ProjectHeader
        id={id}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "Board" && (
        <Board
          id={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          setDefaultStatus={setDefaultStatus}
        />
      )}
      {activeTab === "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;

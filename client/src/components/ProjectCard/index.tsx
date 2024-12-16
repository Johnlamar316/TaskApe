import { Project } from "@/state/api";
import React from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="mb-6 w-full max-w-md cursor-grab overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-dark-secondary">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
    </div>
  );
};

export default ProjectCard;

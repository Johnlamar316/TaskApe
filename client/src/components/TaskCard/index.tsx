import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";

type Props = {
  task: Task;
};

type TaskFieldProps = {
  label: string;
  value: string | React.ReactNode;
};

const TaskField = ({ label, value }: TaskFieldProps) => (
  <div className="mb-2 flex flex-wrap justify-between">
    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
      {label}:
    </span>
    <span className="overflow-auto break-words text-sm text-gray-900 dark:text-gray-100">
      {value}
    </span>
  </div>
);

const TaskCard = ({ task }: Props) => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const statusColor = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };

  const startResize = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const onResize = useCallback(
    (e: MouseEvent) => {
      if (isResizing && cardRef.current) {
        const deltaY = e.clientY - cardRef.current.getBoundingClientRect().top;
        const deltaX = e.clientX - cardRef.current.getBoundingClientRect().left;

        setHeight(Math.max(deltaY, 200));
        setWidth(Math.max(deltaX, 200));
      }
    },
    [isResizing],
  );

  const stopResize = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", onResize);
      document.addEventListener("mouseup", stopResize);
    } else {
      document.removeEventListener("mousemove", onResize);
      document.removeEventListener("mouseup", stopResize);
    }
    return () => {
      document.removeEventListener("mousemove", onResize);
      document.removeEventListener("mouseup", stopResize);
    };
  }, [isResizing, onResize]);

  return (
    <div
      ref={cardRef}
      className="mb-6 w-full max-w-md cursor-grab overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-dark-secondary"
      onMouseDown={startResize}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Attachments */}
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4">
          <strong className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
            Attachments:
          </strong>
          <div className="mt-2 flex flex-wrap gap-2">
            <Image
              src={`https://taskape-s3-images.s3.eu-west-2.amazonaws.com/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName}
              width={400}
              height={200}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      )}

      {/* Task Details */}
      <TaskField label="ID" value={task.id} />
      <TaskField label="Title" value={task.title} />
      <TaskField
        label="Description"
        value={task.description || "No description provided"}
      />

      {/* Status */}
      <TaskField
        label="Status"
        value={
          task.status ? (
            <span
              style={{
                backgroundColor: statusColor[task.status],
              }}
              className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-white"
            >
              {task.status}
            </span>
          ) : (
            "Unknown Status"
          )
        }
      />

      {/* Priority */}
      <TaskField label="Priority" value={task.priority} />
      <TaskField label="Tags" value={task.tags || "No tags"} />

      {/* Dates */}
      <TaskField
        label="Start Date"
        value={
          task.startDate ? format(new Date(task.startDate), "P") : "Not set"
        }
      />
      <TaskField
        label="Due Date"
        value={task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
      />

      {/* Author and Assignee */}
      <TaskField
        label="Author"
        value={task.author ? task.author.username : "Unknown"}
      />
      <TaskField
        label="Assignee"
        value={task.assignee ? task.assignee.username : "Unassigned"}
      />
    </div>
  );
};

export default TaskCard;

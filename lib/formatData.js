export const mapNoteToModel = ({
  _id, title, description, color, pinned, created_at, updated_at,
}) => (
  {
    id: _id,
    title,
    description,
    color,
    pinned,
    createdAt: created_at,
    updatedAt: updated_at,
  }
);

export const mapProjectToModel = ({
  _id, name, status, tasks_id, color, created_at, updated_at, doneTasks,
}) => (
  {
    id: _id,
    name,
    status,
    tasks: {
      length: tasks_id.length,
      completed: doneTasks.length,
      unCompleted: tasks_id.length - doneTasks.length,
      data: tasks_id.map((task) => task._id),
    },
    color,
    createdAt: created_at,
    updatedAt: updated_at,
  }
);

export const mapProjectToModelFull = ({
  _id, name, status, tasks_id, color, created_at, updated_at, doneTasks,
}) => (
  {
    id: _id,
    name,
    status,
    tasks: {
      length: tasks_id.length,
      completed: doneTasks.length,
      unCompleted: tasks_id.length - doneTasks.length,
      data: tasks_id.map((task) => ({
        id: task._id,
        name: task.name,
        done: task.done,
      })),
    },
    color,
    createdAt: created_at,
    updatedAt: updated_at,
  }
);

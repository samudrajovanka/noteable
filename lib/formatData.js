export const mapNoteToModel = ({
  id, title, description, color, pinned, created_at, updated_at,
}) => (
  {
    id,
    title,
    description,
    color,
    pinned,
    createdAt: created_at,
    updatedAt: updated_at,
  }
);

export const mapProjectToModel = ({
  id, name, status, tasks_id, color, created_at, updated_at, doneTasks,
}) => (
  {
    id,
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

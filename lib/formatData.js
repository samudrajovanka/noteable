/* eslint-disable  */
export const mapNoteToModel = ({ 
  id, title, description, color, pinned, created_at, updated_at
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

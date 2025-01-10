import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

// https://stackoverflow.com/questions/75715035/react-beautiful-drag-and-drop-not-work-for-me
export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

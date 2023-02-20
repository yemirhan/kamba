import { RouterOutputs } from "@acme/api";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSwappingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState } from "react";

import { SortableItem } from "./SortableItem";

export function Sortable({
  addNew = undefined,
  menuItems = [],
}: {
  addNew?: React.ReactNode;
  menuItems?: NonNullable<
    RouterOutputs["newMenuCategories"]["byId"]
  >["menuItems"];
}) {
  const [items, setItems] = useState(menuItems.map((item) => item.id));
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-4">
        {addNew}
        <SortableContext items={items} strategy={rectSwappingStrategy}>
          {items.map((id) => (
            <SortableItem
              key={id}
              id={id}
              menuItem={menuItems.find((item) => item.id === id)}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}

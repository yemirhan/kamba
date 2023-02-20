import { useMenuSort } from "@/hooks/useMenuSort";
import { RouterOutputs } from "@acme/api";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ActionIcon } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons";
import { MenuItem } from "../TablesComponents/MenuItem";

export function SortableItem({
  id,
  menuItem,
}: {
  id: string;
  menuItem:
    | NonNullable<
        RouterOutputs["newMenuCategories"]["byId"]
      >["menuItems"][number]
    | undefined;
}) {
  const { sortEnabled } = useMenuSort();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,

    transition,
    isDragging,
  } = useSortable({
    id: id,
    disabled: !sortEnabled,
    transition: {
      duration: 300, // milliseconds
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        zIndex: isDragging ? 1000 : 1,
      }}
    >
      {menuItem ? (
        <MenuItem
          {...menuItem}
          sortableComponent={
            <ActionIcon {...listeners} {...attributes}>
              <IconGripVertical />
            </ActionIcon>
          }
        />
      ) : null}
    </div>
  );
}

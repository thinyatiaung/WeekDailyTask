export interface MenuType {
  to: string;
  icon: string;
  title: string;
  roles?: string[];
}

export const SidebarData = [
    {
      title: "Tasks",
      to: "/",
      icon: "bi bi-card-checklist",
    },
    {
      title: "New Task",
      to: "/addTask",
      icon: "bi bi-file-text",
    }
  ] as MenuType[];

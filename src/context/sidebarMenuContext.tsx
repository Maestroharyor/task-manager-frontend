import { FC, createContext, useContext, useState } from "react";

interface SidebarMenuContextProps {
  menuState: { isVisible: boolean };
  showSidebar: () => void;
  hideSidebar: () => void;
  toggleSidebar: () => void;
}

const SidebarMenuContext = createContext<SidebarMenuContextProps>({
  menuState: { isVisible: false },
  showSidebar: () => {},
  hideSidebar: () => {},
  toggleSidebar: () => {},
});

export const useSidebarMenuContext = () => useContext(SidebarMenuContext);

export const SidebarMenuProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [menuState, setMenuState] = useState({ isVisible: false });

  const showSidebar = () => {
    setMenuState({ isVisible: true });
  };

  const hideSidebar = () => {
    setMenuState({ isVisible: false });
  };

  const toggleSidebar = () => {
    setMenuState((prevState) => ({
      isVisible: !prevState.isVisible,
    }));
  };

  return (
    <SidebarMenuContext.Provider
      value={{ menuState, showSidebar, hideSidebar, toggleSidebar }}
    >
      {children}
    </SidebarMenuContext.Provider>
  );
};

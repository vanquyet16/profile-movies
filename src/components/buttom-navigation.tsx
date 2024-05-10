import { BottomNavigation, Icon, useNavigate } from "zmp-ui";
import { MenuItem } from "../model/menu";
import React, { FC, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useVirtualKeyboardVisible } from "../hooks";
import '../css/app.css'
const tabs: Record<string,MenuItem> = {
    "/": {
        label: "Trang chủ",
        icon: <Icon icon="zi-home" />,
        // activeIcon: <Icon icon="zi-home" />
      },
      "/about": {
        label: "Thông báo",
        icon: <Icon icon="zi-notif" />,
      },
      "/form": {
        label: "Cá nhân",
        icon: <Icon icon="zi-user" />,
        // activeIcon: <Icon icon="zi-user-solid"/>

      },
      "/user": {
        label: "Cá nhân",
        icon: <Icon icon="zi-user" />,
        // activeIcon: <Icon icon="zi-user-solid"/>
      },
}

export type TabKeys = keyof typeof tabs;
// const { id } = useParams(); // Trích xuất ID phim từ tham số đường dẫn

export const NO_BOTTOM_NAVIGATION_PAGES = [`/detail-movie/\\w+`];

export const ButtomNavigation: FC = () => {
    const [activeTab, setActiveTab] = useState<TabKeys>("/");
    const keyboardVisible = useVirtualKeyboardVisible();
    const navigate = useNavigate();
    const location = useLocation();
  
    const noBottomNav = useMemo(() => {
      return NO_BOTTOM_NAVIGATION_PAGES.some((page) => {
        const regex = new RegExp(page);
        return regex.test(location.pathname);
      });
    }, [location]);
    if (noBottomNav || keyboardVisible) {
      return null;
    }
  
    return (
      <BottomNavigation
        id="footer"
        activeKey={activeTab}
        onChange={(key: TabKeys) => setActiveTab(key)}
        className="z-50"
      >
        {Object.keys(tabs).map((path: TabKeys) => (
          <BottomNavigation.Item
            key={path}
            label={tabs[path].label}
            icon={tabs[path].icon}
            activeIcon={tabs[path].activeIcon}
            onClick={() => navigate(path)}
          />
        ))}
      </BottomNavigation>
    );
  };

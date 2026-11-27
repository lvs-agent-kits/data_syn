import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import {HamburgerButton} from "@icon-park/react"
// 

import './AppLayout.css'

export default function AppLayout() {
  // sider 的打开与关闭控制
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app">
      {sidebarOpen && (<div className="glass-overlay" onClick={() => setSidebarOpen(false)}/>)}
      <div className="app-header">
        <button className="menu-button" onClick={() => setSidebarOpen((open) => !open)}>
          <HamburgerButton theme="outline" size="20" />
        </button>
        <p className="title">DATASYN</p>
      </div>
      <aside className={`sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="app-header">
          <button className="menu-button" onClick={() => setSidebarOpen((open) => !open)}>
            <HamburgerButton theme="outline" size="24" />
          </button>
          <p className="title">DATASYN</p>
        </div>
        <NavLink to="/" end className={({ isActive }) => `rlink${isActive ? " active" : ""}`}>首页</NavLink>
        <NavLink to="/moitifs" className="rlink">母题查看</NavLink>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
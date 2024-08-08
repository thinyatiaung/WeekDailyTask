import React, { useState } from "react";
import { Button, Nav, NavItem, NavLink } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "@config/menus";
import Logo from '../assets/images/users/kbz-logo-big.png'

const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState<any>({});
  const showMobilemenu = () => {
    document.getElementById("sidebarArea")?.classList.toggle("showSidebar");
  };
  let location = useLocation();

  const toggleDropdown = (index: any) => {
    setDropdownOpen((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="p-3 pt-0">
      <div className="d-flex align-items-center justify-content-center">
      <img className="logo" src={Logo} />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-4">
        <Nav vertical className="sidebarNav">
          {SidebarData.map((navi: any, index: any) => (
            <NavItem key={index} className={
              location.pathname.includes(navi.to)
                ? "sidenav-bg sidenav-selected bg-whiteLight"
                : "sidenav-bg"
            }>
              <NavLink
                to={navi.to}
                tag={Link}
                className="nav-link text-secondary py-3"
                onClick={() => navi.subNav && toggleDropdown(index)}
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
                {navi.subNav && !dropdownOpen[index] &&(
                  <i className="i-custom-css bi bi-caret-down-fill"></i>
                )}
                {navi.subNav && dropdownOpen[index] && (
                  <i className="i-custom-css bi bi-caret-up-fill"></i>
                )}
              </NavLink>
              {dropdownOpen[index] &&
                navi.subNav?.map((item: any, subIndex: any) => (
                  <NavLink
                    to={item.to}
                    tag={Link}
                    key={subIndex}
                    className={
                      location.pathname === item.to
                        ? "bg-light text-primary nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                    // className="nav-link text-secondary py-2 ms-4"
                  >
                    <i className={item.icon}></i>
                    <span className="ms-3 d-inline-block">{item.title}</span>
                  </NavLink>
                ))}
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;

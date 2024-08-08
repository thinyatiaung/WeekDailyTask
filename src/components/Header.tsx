import React from "react";
import {
  Navbar,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import user1 from "@assets/images/users/user1.jpg";
import { useAuth } from "@store/useAuth";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { logout } = useAuth();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea")?.classList.toggle("showSidebar");
  };
  return (
    <Navbar color="primary" dark expand="md" className="bg-gradient">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
        Week Daily Task
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
           
            {/* <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>My Balance</DropdownItem>
            <DropdownItem>Inbox</DropdownItem> */}
            <DropdownItem href="login" onClick={()=>logout()}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
    </Navbar>
  );
};

export default Header;

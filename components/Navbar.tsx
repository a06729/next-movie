import naber_css from "../styles/navbar.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useRef, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faS, fas, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const asideRef = useRef<any>();
  const [open, setOpen] = useState(false);
  function openDrawer() {
    if (open) {
      enableScroll();
      setOpen(false);
    } else {
      ableScroll();
      setOpen(true);
    }
  }

  function asideItem() {
    return (
      <div>
        <div onClick={openDrawer} className="text-right mx-6">
          <FontAwesomeIcon className="text-3xl hover:text-blue-500" icon={faTimes}></FontAwesomeIcon>
        </div>
        <div className="flex justify-start items-center flex-row"> 
          <div className="flex items-center">
              <div className="mr-7 text-center">
                <FontAwesomeIcon icon={faHome} className="text-2xl"></FontAwesomeIcon>
              </div>
              <div>
                <Link href={"/"} passHref>
                  <a>
                    <h1 onClick={openDrawer} className="font-jua text-2xl ">메인페이지</h1>
                  </a>
                </Link>
              </div>
            </div>
        </div>
        <Link href={"/home"} passHref>
          <a>
            <div onClick={openDrawer} className="font-jua text-2xl mt-6">홈</div>
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <nav className="flex justify-between items-center my-4 ">
        <div onClick={openDrawer}>
          <FontAwesomeIcon
            className="text-3xl text-black hover:text-blue-300 ml-8"
            icon={faBars}
          />
        </div>
        {/* <div>
          <span>Logo</span>
        </div> */}
      </nav>
      {open ? (
        <div ref={asideRef} className={`${naber_css.navbar} bg-black/50 fixed inset-0 delay-100  duration-100 visible`}>
          <aside className={`${naber_css.navAside} ${naber_css.navbarOpen} `}>
            {asideItem()}
          </aside>
        </div>
      ) : (
        <div ref={asideRef} className={`${naber_css.navbar}  bg-black/50 fixed inset-0 delay-100  duration-100 invisible`}>
          <aside className={`${naber_css.navAside} ${naber_css.navbarHidden}`}>
            {asideItem()}
          </aside>
        </div>
      )}
    </div>
  );
}

function enableScroll(): void {
  const scrollY = document.body.style.top;
  document.body.style.cssText = "";
  window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
}
function ableScroll() {
  document.body.style.cssText = `
  position: fixed; 
  top: -${window.scrollY}px;
  overflow-y: scroll;
  width: 100%;`;
}

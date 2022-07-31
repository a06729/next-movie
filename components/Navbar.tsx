import naber_css from "../styles/navbar.module.css";
import {useRef, useState } from "react";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const asideRef = useRef<any>();
  const [open, setOpen] = useState(false);
  function openDrawer() {
    return new Promise(async()=>{
      if (open) {
        enableScroll();
        setOpen(open=>false);
      } else {
        ableScroll();
        setOpen(open=>true);
      }
    });

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
                  <a onClick={async ()=>{
                         await openDrawer();
                  }}>
                    <h1 className="font-jua text-2xl ">메인페이지</h1>
                  </a>
                </Link>
              </div>
            </div>
        </div>
        <Link href={"/home"} passHref>
          <a onClick={async ()=>{
                await openDrawer();
              }}>
            <div className="font-jua text-2xl mt-6">홈</div>
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <nav className="flex justify-between items-center my-4 ">
        <div onClick={openDrawer} className="rounded-full w-14 text-center hover:outline hover:border-blue-500 hover:outline-blue-200/50 ">
          <FontAwesomeIcon
            className="text-3xl text-black hover:text-blue-300 "
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

function enableScroll(){
  const scrollY = document.body.style.top;
  document.body.style.cssText = "";
  window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
}
function ableScroll(){
  document.body.style.cssText = `
  position: fixed; 
  top: -${window.scrollY}px;
  overflow-y: scroll;
  width: 100%;`;
}

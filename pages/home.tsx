import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import CircularProgressBar from "../components/CircularProgressBar";
import homeCss from "../styles/home.module.css";

export default function home(){
    return(
        <div>
            <h1 className={homeCss.test}>홈</h1>
            <CircularProgressBar ratingData={40}></CircularProgressBar>
            <Button className="bg-red-600 hover:bg-blue-400">테스트</Button>
        </div>
    );
}
import { Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef } from "react";
import CircularProgressBar from "../components/CircularProgressBar";
import homeCss from "../styles/home.module.css";

export default function home(){
    return(
        <div>
            <h1 className={homeCss.test}>홈</h1>
            <CircularProgressBar ratingData={40}></CircularProgressBar>
            <Button className=" hover:bg-blue-400">테스트</Button> 
            <div className="flex justify-center justify-center items-center">

            <div className="flex justify-center flex-col border rounded-3xl border-solid border-2 max-w-sm w-full hover:scale-105 hover:bg-hover-color/10 duration-300">
                <div className="flex justify-center items-center p-2">
                    <Image
                        className="rounded-2xl"
                        src={`https://image.tmdb.org/t/p/w500/bZLrpWM065h5bu1msUcPmLFsHBe.jpg`}
                        width={400}
                        height={400}
                        loading={'lazy'}
                    />

                </div>
                <div className="px-2 font-jua text-xl">
                    토르: 러브 앤 썬더
                </div>
                <div className="px-2 font-jua text-xl">
                    개봉일:2022-07-08
                </div>
            </div>
            <div className="flex justify-center flex-col border rounded-3xl border-solid border-2 max-w-sm w-full hover:scale-105 hover:bg-hover-color/10 duration-300">
                <div className="flex justify-center items-center p-2">
                    <Image
                        className="rounded-2xl"
                        src={`https://image.tmdb.org/t/p/w500/bZLrpWM065h5bu1msUcPmLFsHBe.jpg`}
                        width={400}
                        height={400}
                        loading={'lazy'}
                    />

                </div>
                <div className="px-2 font-jua text-xl">
                    토르: 러브 앤 썬더
                </div>
                <div className="px-2 font-jua text-xl">
                    개봉일:2022-07-08
                </div>
            </div>
            </div>

        </div>

    );
}
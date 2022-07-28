import { useEffect, useRef } from "react";
import circularCss from "../styles/circular.module.css";

export default function CircularProgressBar(popres:{ratingData:number}) {
    const circularProgressRef= useRef<any>();
    useEffect(()=>{  
        circularProgressRef.current.style.background=`conic-gradient(#7d2ae8 ${popres.ratingData * 3.6}deg, #ededed 0deg)`;
    },[]);
    return(
        <div>
            <div className={circularCss.container}>
                <div ref={circularProgressRef} className={circularCss.circular_progress}>
                    <span className={circularCss.progress_value}>{popres.ratingData}%</span>
                </div>
            </div>
        </div>
    );
}
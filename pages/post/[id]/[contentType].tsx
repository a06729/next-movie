import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import contentCss from "../../../styles/content.module.css";
import Image from "next/image";
import { url } from 'inspector';

interface contentDataType{
    adult:boolean;
    id:number;
    original_title:string;
    overview:string;
    poster_path:string;
    backdrop_path:string;
    release_date:string;
    vote_average:number;
}

export default function Post(){
    const router =useRouter();
    const [data, setData] = useState<contentDataType>();
    const [isLoading, setLoading] = useState(false);
    const {id,contentType}=router.query;
    console.log(`id:${id} contentType:${contentType}`);
    useEffect(()=>{
        fetch(`http://localhost:3000/api/movies/post/${id}`).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data);
            setData(data);
            setLoading(false);
        })
    },[])
    if(isLoading) return <p>로딩중</p>
    if (!data) return <p>No profile data</p>
    return (
        <div>
            <div className={contentCss.container}>
                <div className={contentCss.info_container}>
                    <div className={contentCss.info_div_img}>
                        <Image className={contentCss.info_div_img_postImag} src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${data?.poster_path}`} width={"500"} height={"700"} layout="fixed"></Image>
                    </div>
                    <div className={contentCss.info_data_container}>
                        <div className={contentCss.info_data_title}>
                            <h1>{data.original_title}</h1>
                        </div>
                        <div>
                            <span>{data.release_date}</span>
                        </div>
                        <div className={contentCss.info_data_overview}>
                            <p>{data.overview}</p>
                        </div>
                    </div>
                    <Image src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${data?.backdrop_path}`} style={{opacity:0.25}} width={"500"} height={"900"} alt="메인 배경 이미지" layout="fill" objectFit="cover" objectPosition="center"/>
                </div>
                {/* {backgroundImage:`url("https://image.tmdb.org/t/p/w500/${data?.backdrop_path}")`} */}
                {/* <div className={contentCss.backImg}>
                    <Image src={`https://image.tmdb.org/t/p/w500/${data?.backdrop_path}`} width={"1920"} height={"500"}></Image>
                </div> */}
            </div>
        </div>
    );
}

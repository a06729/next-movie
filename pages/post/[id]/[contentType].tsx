import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import contentCss from "../../../styles/content.module.css";
import Image from "next/image";
import ActorCarousel from "../../../components/ActorCarousel";
import { MovieActorType } from '../../../components/interface/ActorType';
import {contentTypes} from "../../../components/enum/contentType";
import {tvDetailType} from "../../../components/interface/TvType";
import CircularProgress from '../../../components/CircularProgress';
interface contentDataType{
    adult:boolean;
    id:number;
    original_title:string;
    title:string;
    overview:string;
    poster_path:string;
    backdrop_path:string;
    release_date:string;
    vote_average:number;
}

export default function Post(){
    const router =useRouter();
    //영화 데이터 state
    const [contentData, setContentData] = useState<contentDataType>();
    const [tvContentData,setTvContentData]=useState<tvDetailType>();
    const [actorData,setActorData]=useState<MovieActorType>();
    const [isLoading, setLoading] = useState(false);
    //id:영화아이디 contentType:영화인지 스트리밍인지
    const {id,contentType}=router.query;
    useEffect(()=>{
        if(!router.isReady) return;
        //https://next-movie-czgv9jwqn-a06729.vercel.app
        if(process.env.NODE_ENV=='production'){
            switch(contentType){
                case contentTypes.Movie:
                    Promise.all([
                        //영화 정보 api 호출
                        fetch(`https://next-movie-ebon.vercel.app/api/movies/post/${id}`).then((res)=>res.json()),
                        //영화 배 정보 호출
                        fetch(`https://next-movie-ebon.vercel.app/api/movies/${id}/credits`).then((res)=>res.json())
                    ]).then((data)=>{
                        //영화정보,배우정보
                        const [fetchContentData,ActorData]=data;
                        setContentData(fetchContentData);
                        setActorData(ActorData);
                        setLoading(false);
                    });
                    break;
                case contentTypes.Tv:
                    Promise.all([
                        //영화 정보 api 호출
                        fetch(`https://next-movie-ebon.vercel.app/api/tv/post/${id}`).then((res)=>res.json()),
                        fetch(`https://next-movie-ebon.vercel.app/api/tv/${id}/credits`).then((res)=>res.json())
                    ]).then((data)=>{
                        const [fetchContentData,ActorData]=data;
                        setTvContentData(fetchContentData);
                        setActorData(ActorData);
                        setLoading(false);
                    });
                    break;
            }

        }else{
            switch(contentType){
                case contentTypes.Movie:
                    Promise.all([
                        //영화 정보 api 호출
                        fetch(`http://localhost:3000/api/movies/post/${id}`).then((res)=>res.json()),
                        fetch(`http://localhost:3000/api/movies/${id}/credits`).then((res)=>res.json())
                    ]).then((data)=>{
                        const [fetchContentData,ActorData]=data;
                        console.log(fetchContentData);
                        setContentData(fetchContentData);
                        setActorData(ActorData);
                        setLoading(false);
                    });
                    break;
                case contentTypes.Tv:
                    Promise.all([
                        //영화 정보 api 호출
                        fetch(`http://localhost:3000/api/tv/post/${id}`).then((res)=>res.json()),
                        fetch(`http://localhost:3000/api/tv/${id}/credits`).then((res)=>res.json())
                    ]).then((data)=>{
                        const [fetchContentData,ActorData]=data;
                        console.log(fetchContentData);
                        setTvContentData(fetchContentData);
                        setActorData(ActorData);
                        setLoading(false);
                    });
                    break;
            }
        }
    },[router.isReady]);
    if(isLoading)<p>로딩중</p>
    if(!actorData) return <p>출연진 데이터</p>
    
    if(contentType==contentTypes.Movie){
        if (!contentData) return <p>No profile data</p>
        return (
            <div>
                <div className={contentCss.container}>
                    <div className={contentCss.info_container}>
                        <div className={contentCss.info_div_img}>
                            <Image className={contentCss.info_div_img_postImag} src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${contentData?.poster_path}`} width={"500"} height={"700"}></Image>
                        </div>
                        <div className={contentCss.info_data_container}>
                            <div className={contentCss.info_data_title}>
                                <h1>{contentData?.title}</h1>
                            </div>
                            <div className={contentCss.info_data_release}>
                                <span>개봉일:{contentData?.release_date}</span>
                            </div>
                            <div className={contentCss.info_data_overview}>
                                <p>개요</p>
                                <p>{contentData?.overview}</p>
                            </div>
                            <div className='flex justify-center items-center'>
                                <span className='font-jua text-text-white text-2xl '>평점</span>
                                <CircularProgress ratingData={Math.floor(contentData.vote_average*10)}></CircularProgress>
                            </div>
                        </div>
                        <Image src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${contentData?.backdrop_path}`} style={{opacity:0.25}} width={"500"} height={"900"} alt="메인 배경 이미지" layout="fill" objectFit="cover" objectPosition="center"/>
                    </div>
                </div>
                <div>
                    <ActorCarousel actorData={actorData}></ActorCarousel>
                </div>
            </div>
        );
    }else{
        let tvOverview;
        let tvBackdropPath;
        if (!tvContentData) return <p>No profile data</p>
        if(tvContentData?.overview===""){
            // console.log("개요 없습니다.");
            tvOverview="개요가 준비 되지 못했습니다. ";
        }else{
            // console.log("개요 있습니다.");
            tvOverview=tvContentData?.overview
        }
        if(tvContentData?.backdrop_path===null){
            tvBackdropPath=tvContentData.poster_path;
            // console.log(tvBackdropPath);
        }else{
            tvBackdropPath=tvContentData.backdrop_path;
            // console.log(tvBackdropPath)
        }
        return (
            <div>
                <div className={contentCss.container}>
                    <div className={contentCss.info_container}>
                        <div className={contentCss.info_div_img}>
                            <Image className={contentCss.info_div_img_postImag} src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tvContentData?.poster_path}`} width={"500"} height={"700"}></Image>
                        </div>
                        <div className={contentCss.info_data_container}>
                            <div className={contentCss.info_data_title}>
                                <h1>{tvContentData?.name}</h1>
                            </div>
                            <div className={contentCss.info_data_release}>
                                <span>방영일:{tvContentData?.first_air_date}</span>
                            </div>
                            <div className={contentCss.info_data_overview}>
                                <p>개요</p>
                                <p>{tvOverview}</p>
                            </div>
                            <div className='flex justify-center items-center'>
                                <span className='font-jua text-text-white text-2xl '>평점</span>
                                <CircularProgress ratingData={Math.floor(tvContentData.vote_average*10)}></CircularProgress>
                            </div>
                        </div>
                        <Image src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${tvBackdropPath}`} style={{opacity:0.25}} width={"500"} height={"900"} alt="메인 배경 이미지" layout="fill" objectFit="cover" objectPosition="center"/>
                    </div>
                </div>
                <div>
                    <ActorCarousel actorData={actorData}></ActorCarousel>
                </div>
            </div>
        );
    }


}

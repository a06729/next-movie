export interface tvType{
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
    name: string;
    release_date:string;
    results:{
        id: number;
        original_title: string;
        overview: string;
        poster_path: string;
        first_air_date: string;
        name: string;
        release_date:string;
    }[]
}

export interface tvDetailType{
    id:number;
    name:string;
    overview:string;
    backdrop_path:string;
    first_air_date:string;
    poster_path:string;
}
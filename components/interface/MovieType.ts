export interface MovieType {
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    title: string;
    release_date:string;
    results:{
        id: number;
        original_title: string;
        overview: string;
        poster_path: string;
        title: string;
        release_date:string;
    }[]
}

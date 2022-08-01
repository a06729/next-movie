export interface MovieType {
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    title: string;
    release_date:string;
    total_pages:number;
    results:[{
        id: number;
        original_title: string;
        overview: string;
        poster_path: string;
        title: string;
        release_date:string;
    }];
}

export interface nextMoveiType{
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    title: string;
    release_date:string;
}

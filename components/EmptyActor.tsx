import { faUserLargeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function EmptyActor(){
    return(
        <div className="flex justify-center items-center flex-col min-h-[200px]">
            <div>
                <FontAwesomeIcon className="text-6xl text-red-600" icon={faUserLargeSlash}></FontAwesomeIcon>
            </div>
            <h1 className="font-jua text-4xl mt-5">데이터 없음</h1>
        </div>
    );
}
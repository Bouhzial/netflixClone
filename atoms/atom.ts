import { DocumentData } from "firebase/firestore";
import { atom } from "recoil";
import { Movie } from "../typing";
export const modelstate = atom({
    key:'modelstate',
    default:false,
})
export const moviestate = atom<Movie|DocumentData|null>({
    key:'moviestate',
    default:null,
})
export const magentlink = atom(
    {key:'magentlink',
    default:'',}
) 
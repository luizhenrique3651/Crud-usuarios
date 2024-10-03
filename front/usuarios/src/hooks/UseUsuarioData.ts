import axios, { AxiosPromise } from "axios"
import { UsuarioData } from "../interface/UsuarioData";
import { useQuery } from "@tanstack/react-query";
const API_URL = 'http://localhost:8080';
const ENDPOINT = '/usuario'
const fetchData =async (): AxiosPromise<UsuarioData[]> => {
    const response = axios.get(API_URL+ENDPOINT);
    return response;
}

export function useUsuarioData(){
    const query = useQuery({
        queryFn : fetchData,
        queryKey : ['usuario-data'],
        retry : 2
    })

    return{
        ...query, 
        data: query.data?.data
    }
}
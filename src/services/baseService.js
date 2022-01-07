import Axios from "axios"
// import { DOMAIN, TOKEN } from "../util/settings/config"
import  { DOMAIN, TOKEN } from '../util/settings/config';

export class baseService {
    //put json về phía backend
    put = (url,model) => {
        return  Axios({
            url:`${DOMAIN}/${url}`,
            method:'PUT',
            data:model,
            headers: {'TokenCybersoft': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjYiLCJIZXRIYW5TdHJpbmciOiIzMS8wMy8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDg2ODQ4MDAwMDAiLCJuYmYiOjE2MTc1NTU2MDAsImV4cCI6MTY0ODgzMjQwMH0.x2aYBurEV6HW_u5m4Fhmr7bbp60q1hcW3_KcQ6nrySI', 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        }) 
    }

    post = (url,model) => {
        return Axios({
            url:`${DOMAIN}/${url}`,
            method:'POST',
            data:model,
            headers: {'TokenCybersoft': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjYiLCJIZXRIYW5TdHJpbmciOiIzMS8wMy8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDg2ODQ4MDAwMDAiLCJuYmYiOjE2MTc1NTU2MDAsImV4cCI6MTY0ODgzMjQwMH0.x2aYBurEV6HW_u5m4Fhmr7bbp60q1hcW3_KcQ6nrySI', 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        }) 
    }


    get = (url) => {
        return Axios({
            url:`${DOMAIN}/${url}`,
            method:'GET',
            headers: {'TokenCybersoft': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjYiLCJIZXRIYW5TdHJpbmciOiIzMS8wMy8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDg2ODQ4MDAwMDAiLCJuYmYiOjE2MTc1NTU2MDAsImV4cCI6MTY0ODgzMjQwMH0.x2aYBurEV6HW_u5m4Fhmr7bbp60q1hcW3_KcQ6nrySI', 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }

    delete = (url) => {
        return Axios({
            url:`${DOMAIN}/${url}`,
            method:'DELETE',
            headers: {'TokenCybersoft': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjYiLCJIZXRIYW5TdHJpbmciOiIzMS8wMy8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDg2ODQ4MDAwMDAiLCJuYmYiOjE2MTc1NTU2MDAsImV4cCI6MTY0ODgzMjQwMH0.x2aYBurEV6HW_u5m4Fhmr7bbp60q1hcW3_KcQ6nrySI', 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }
}
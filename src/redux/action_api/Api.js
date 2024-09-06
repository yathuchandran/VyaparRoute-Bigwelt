import axios from "axios";
import { baseUrlApi } from "../../config";
import { ADD_NEW_GROUP_FAILURE, ADD_NEW_GROUP_REQUEST, ADD_NEW_GROUP_SUCCSESS } from "../constant/AllConstant"


export const addGroupAction = (newGroup)=>async(dispatch)=>{
    const formData = new FormData();
  formData.append("group_name", newGroup);
console.log(newGroup,"newGroup");


    try {

        dispatch({type : ADD_NEW_GROUP_REQUEST})

        const {data} = await axios.post(`${baseUrlApi}groups/add/`, formData,{
            headers: {
              "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
              "Content-Type": "multipart/form-data",
            },
          });

        dispatch({
            type: ADD_NEW_GROUP_SUCCSESS,
            payload : data
        })
        
    } catch (error) {
        
        console.log(error);
        
        dispatch({
            type : ADD_NEW_GROUP_FAILURE,
            payload: error.response?.data?.message || error.message,
        })
    }

}
import { ADD_CUSTOMER_FAILURE, ADD_CUSTOMER_REQUEST, ADD_NEW_GROUP_FAILURE, ADD_NEW_GROUP_REQUEST, ADD_NEW_GROUP_SUCCSESS } from "../constant/AllConstant";


export const newGrpReducer = (state ={} ,action)=>{
    switch (action.type) {
        case ADD_NEW_GROUP_REQUEST:
            return{
                loading : true,
                ...state,
            }

        case ADD_NEW_GROUP_SUCCSESS:
            return{
                loading : false,
                isSucsess : action.payload,
                ...state
            }

        case ADD_NEW_GROUP_FAILURE:
            return{
                loading : false,
                error : action.payload
            }
            
           
            default:
                return state;
    }
}


export const addCustomer=(state={},action)=>{
    switch (action.type) {
        case ADD_CUSTOMER_REQUEST:
           return{
            loading:true,
            ...state,
           } 
           case ADD_NEW_GROUP_SUCCSESS:
            return{
                loading:false,
                isSucsess:action.payload,
                ...state
            }
            case ADD_CUSTOMER_FAILURE:
                return{
                    loading:false,
                    error:action.payload
                }
        default:
            return state;
    }

}


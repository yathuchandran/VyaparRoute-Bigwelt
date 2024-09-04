import {
  ADD_STAFF_FAILURE,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCSESS,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCSESS,
} from "../constant/productConstant";
import axios from "axios";

export const CreateProduct = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    // const config = {
    //   headers: { "Content-Type": "application/json" },
    // };

    const { data } = await axios.post(
      "https://vr.w4u.in/manage/api/add_products/add",
      formdata,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(data);

    dispatch({
      type: CREATE_PRODUCT_SUCCSESS,
      payload: data.status,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const AddStaffAction = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: ADD_STAFF_REQUEST });

    const { data } = await axios.post(
      "https://vr.w4u.in/manage/api/staff/add",
      formdata,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({
      type: ADD_STAFF_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_STAFF_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

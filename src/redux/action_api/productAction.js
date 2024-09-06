import {
  ADD_STAFF_FAILURE,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCSESS,
  ALL_CUSTOMER_FAILURE,
  ALL_CUSTOMER_REQUEST,
  ALL_CUSTOMER_SUCCSESS,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCSESS,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCSESS,
  STAFF_GROUP_FAILURE,
  STAFF_GROUP_REQUEST,
  STAFF_GROUP_SUCCSESS,
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

    console.log(data);

    dispatch({
      type: ADD_STAFF_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: ADD_STAFF_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const GetAllGroup = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_REQUEST });

    const { data } = await axios.get(
      "https://vr.w4u.in/manage/api/groups/all",

      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({
      type: FETCH_SUCCSESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: FETCH_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const addStaffGroup =
  (formdata, selectedGroups, grp_id) => async (dispatch) => {
    try {
      dispatch({ type: STAFF_GROUP_REQUEST });

      // Convert the array to a comma-separated string
      const group_name = selectedGroups.join(", ");

      const group = {
        group_name, // group_name is now a string
        s_name: formdata.staff_name,
        s_mobile: formdata.staff_mobile,
        group_id: grp_id,
        password,
      };

      console.log(group);

      const { data } = await axios.post(
        "https://vr.w4u.in/manage/api/staff/add",
        group,
        {
          headers: {
            "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch({
        type: STAFF_GROUP_SUCCSESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: STAFF_GROUP_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const allCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CUSTOMER_REQUEST });

    const { data } = await axios.get("https://vr.w4u.in/manage/api/users/all", {
      headers: {
        "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
      },
    });

    dispatch({
      type: ALL_CUSTOMER_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CUSTOMER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

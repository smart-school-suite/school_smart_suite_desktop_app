import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import { resetAllState } from "../../Slices/Asynslices/AuthSlice";
export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return useMutation({
         mutationFn:logout,
         onSuccess:() => {
            dispatch(resetAllState());
            navigate("/login-school-admin");
         }
    })
}
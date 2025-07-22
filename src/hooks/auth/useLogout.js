import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { logout } from "../../services/auth";
import { handleSetUserLogout } from "../../Slices/Asynslices/AuthSlice";
import { useNavigate } from "react-router-dom";
export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return useMutation({
         mutationFn:logout,
         onSuccess:() => {
            dispatch(handleSetUserLogout());
            navigate("/hero");
         }
    })
}
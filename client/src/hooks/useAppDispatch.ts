import { useDispatch } from "react-redux";
import { AppDispatch } from "stores/store";

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
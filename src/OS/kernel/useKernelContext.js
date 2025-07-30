import { useContext } from "react";
import { KernelContext } from "./KernelContext";

export default function useKernelContext(){
    return useContext(KernelContext);
}
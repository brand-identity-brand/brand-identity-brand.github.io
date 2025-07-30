import { useContext, createContext } from "react";
// import { KernelContext } from "./KernelContext";
export const KernelContext = createContext(null);
export default function useKernelContext(){
    return useContext(KernelContext);
}
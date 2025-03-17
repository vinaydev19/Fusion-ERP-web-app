import { getAllProducts } from "@/redux/productSlice"
import { PRODUCTS_API_END_POINT } from "@/utils/constants"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const useGetProducts = () => {
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${PRODUCTS_API_END_POINT}/get-all-product`, {
                    withCredentials: true,
                })
                console.log(res);
                dispatch(getAllProducts(res.data.data))
            } catch (error) {
                console.error("Error fetching products:", error);
                console.log(error);
            }
        }
        fetchProducts()
    }, [])
}

export default useGetProducts
import { useQuery } from "@tanstack/react-query"

const getAuthUser = async () => {
    try {
        const token = sessionStorage.getItem("github_key")
        if(token) {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                }
            }
    
            const res = await fetch("http://127.0.0.1:8000/auth/user/", requestOptions)
    
            if(res.ok) {
                const data = await res?.json()
                console.log(data)
                return data
            } else {
                console.error(res.statusText)
            }
        }
        else {
            return null
        }
        
    } catch (error) {
        console.error(error)
    }
}

export const useAuthUserQuery = () => {
    return useQuery(["user"], getAuthUser)
}
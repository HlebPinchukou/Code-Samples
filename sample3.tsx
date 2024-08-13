import type { AxiosInstance } from "axios"
import axios from "axios"

import { getGuestToken } from "shared/lib/helpers/getGuestToken"
import msGraphInstance from "shared/lib/msal/instance"

export const createAxiosInstance = (url: string): AxiosInstance => {
    const axiosInstance = axios.create({
        baseURL: url,
    })
    const token = getGuestToken()

    axiosInstance.interceptors.request.use(
        async (request) => {
            if (request.headers && !token) {
                const tokenSilent = await msGraphInstance.acquireToken()
                if (tokenSilent) request.headers.Authorization = Bearer ${tokenSilent.idToken}
                request.headers["Content-Type"] = "application/json"
            }

            return request
        },
        async (error) => {
            Promise.reject(error)
        },
    )

    return axiosInstance
}

    useEffect(() => {
        if (when) {
            setUnsaved(when)
        }

        return () => setUnsaved(false)
    }, [when])

    return {
        isUnsaved: state.isUnsaved,
        setUnsaved,
        openDialogHandler,
    }
}

export default useUnsaved

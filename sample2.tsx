import { useEffect } from "react"

import { useLeaveDialogContext } from "shared/context/leave-dialog"
import type { LeaveDialogOptions } from "shared/context/leave-dialog/LeaveDialogProvider"
import { useUnsavedContext } from "shared/context/unsaved"

interface UseUnsavedReturnProps {
    isUnsaved: boolean
    setUnsaved: (isUnsaved: boolean) => void
    openDialogHandler: (options: LeaveDialogOptions) => void
}

const useUnsaved = (when?: boolean): UseUnsavedReturnProps => {
    const { state, dispatch } = useUnsavedContext()
    const { openDialog } = useLeaveDialogContext()

    const setUnsaved = (isUnsaved: boolean): void => {
        dispatch({ type: "set", isUnsaved })
    }

    const openDialogHandler = (options: LeaveDialogOptions): void => {
        if (state.isUnsaved) {
            openDialog(options)
        } else {
            options.handleLeave()
        }
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

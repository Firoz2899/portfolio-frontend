export const getUnwantedStateStrArray = (...args: string[]) => {
    return args.reduce((prev: string[], curr: string) => {
        return [
            ...prev,
            `${curr}/executeQuery/pending`,
            `${curr}/executeQuery/fulfilled`,
            `${curr}/executeQuery/rejected`,
            `${curr}/executeMutation/pending`,
            `${curr}/executeMutation/fulfilled`,
            `${curr}/executeMutation/rejected`,
            `${curr}/internalSubscriptions/subscriptionsUpdated`,
            `${curr}/mutations/removeMutationResult`,
            `${curr}/config/middlewareRegistered`,
        ]
    }, [])
}
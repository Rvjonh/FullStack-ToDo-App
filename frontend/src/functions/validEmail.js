

export const ValidateEmail = (newEmail=null)=>{
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(newEmail)){
        return (true)
    }
    return (false)
}


export default function NoAcceptedInput({message='(Input Not Accepted)'}){
    return(
        <span className="fw-bold text-danger">{message}</span>
    )
}
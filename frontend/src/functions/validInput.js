

export function checkValidInput(str){
    if (str.match(" ")) {
        return false;
    }
    if (str.length <= 7 || str.length >= 21) {
        return false;
    }
    return true
}
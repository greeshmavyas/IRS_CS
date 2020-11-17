export const getName =function(){
    let firstName = localStorage.getItem("firstName");
    let lastName =  localStorage.getItem("lastName");
    firstName = !firstName ? "" : firstName
    lastName = !lastName ? "": lastName
    return firstName+" "+lastName
}
export const getUserName = function(){
    const userName = localStorage.getItem("userName");
    return userName || ""
}

export const getOrgOwnerId = function(){
    const orgOwnerId = localStorage.getItem("orgOwnerId");
    //TODO: change this code
    return orgOwnerId || "2"
}
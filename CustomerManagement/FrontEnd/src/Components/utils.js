export const getUserName = () => {
    return localStorage.getItem("userName");
}
/*export const getUserId = () => {
    return localStorage.getItem("userId");
}*/
export const getFirstName = ()=>{
    return localStorage.getItem("firstName") || "John";
}
export const getUserType = () => {
    return localStorage.getItem("userType");
}
export const getCustomerEmailId = ()=>{
    return localStorage.getItem("customerEmailId");
}

export const getCustomerName = () =>{
    return localStorage.getItem("customerName") || "John Muir";
}
export const getCustomerUserName = () =>{
    return localStorage.getItem("customerUserName") || "";
}
export const getCustomerId = ()=>{
    return localStorage.getItem("customerId") || ""
}
export const getOrganisationId = ()=>{
    return localStorage.getItem("organisationId") || "1"
}
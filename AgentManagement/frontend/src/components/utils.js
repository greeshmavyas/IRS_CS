export const getUserName = () => {
    return localStorage.getItem("userName");
}
export const getUserType = () => {
    return localStorage.getItem("userType");
}
export const getAgentEmailId = ()=>{
    return localStorage.getItem("customerEmailId");
}
export const getAgentId = ()=>{
    return localStorage.getItem("agentId") || ""
}
export const getOrganisationId = ()=>{
    return localStorage.getItem("organisationId") || "1"
}
export const getEmailId = () =>{
    return localStorage.getItem("emailId") || "";
}
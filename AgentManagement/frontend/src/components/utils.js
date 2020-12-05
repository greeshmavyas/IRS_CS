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

export const removeOrgId = (category) =>{
  console.log("in remove orgId")
  console.log(category);
  if(category){
    let arr = category.split("_");
    if(arr.length == 1){
      return arr[0];
    } else{
      var catStr = ""
      for(let i=1; i<arr.length; i++){
        catStr = catStr + arr[i] + " "
      }
    }
    //return (arr.length > 0 ? arr[1] : arr[0]);
    return catStr.trim()
   }
}
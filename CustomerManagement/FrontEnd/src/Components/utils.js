export const getUserId = () => {
  return localStorage.getItem("userId");
};
export const getEmailId = () => {
  return localStorage.getItem("emailId") || "";
};
export const getFirstName = () => {
  return localStorage.getItem("firstName") || "John";
};
export const getUserType = () => {
  return localStorage.getItem("userType");
};
/*export const getCustomerEmailId = () => {
  return localStorage.getItem("customerEmailId");
};*/

export const getCustomerName = () => {
  return localStorage.getItem("customerName") || "John Muir";
};
export const getCustomerUserName = () => {
  return localStorage.getItem("customerUserName") || "";
};
export const getCustomerId = () => {
  return localStorage.getItem("customerId") || "";
};
export const getCustomerOrgId = () => {
  return localStorage.getItem("customerOrgId") || "";
};


export const getName = function () {
  let firstName = localStorage.getItem("firstName");
  let lastName = localStorage.getItem("lastName");
  firstName = !firstName ? "" : firstName;
  lastName = !lastName ? "" : lastName;
  return firstName + " " + lastName;
};
export const getUserName = function () {
  const userName = localStorage.getItem("userName");
  return userName || "";
};

/*export const getOrgOwnerId = function () {
  const orgOwnerId = localStorage.getItem("orgOwnerId");
  //TODO: change this code
  return orgOwnerId || "2";
};*/

export const getOrgOwnerToken = function () {
  const orgOwnerToken = localStorage.getItem("token");
  return orgOwnerToken || "";
};

export const getOrganizationID = function () {
  const orgId = localStorage.getItem("orgId");
  return orgId || "";
};

export const getOrgCategories = function () {
  let orgCategories = localStorage.getItem("orgCategories");
  if (!orgCategories) orgCategories = [];
  else orgCategories = orgCategories.split(",");
  return orgCategories;
};

export const removeOrgId = (category) =>{
  console.log("in remove orgId")
  console.log(category);
  if(category){
    let arr = category.split("_");
    return (arr.length > 0 ? arr[1] : arr[0]);
  } else {
    return "";
  }
}

export const addOrgId= (category) =>{
  if(category){
    category = category.toLowerCase()
    return getOrganizationID()+"_"+category;
  } 
  return "";
}
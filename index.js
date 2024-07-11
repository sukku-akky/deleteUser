function handleFormSubmit(event) {
    event.preventDefault();
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/895edf11d5a947b5859e43030c623fb3/users",
      userDetails
    )
    .then((response) => displayUserOnScreen(response.data))
    .catch((error) => console.log(error));

  // Clearing the input fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/895edf11d5a947b5859e43030c623fb3/users")
      .then((response)=>{
        for(let i=0;i<response.data.length;i++){ 

            displayUserOnScreen(response.data[i]);

        }
      })
})

function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
  
    deleteBtn.addEventListener("click", function (event) {

       
        
      userList.removeChild(event.target.parentElement);
      localStorage.removeItem(userDetails.email);
      deleteUser(userDetails._id); 
    });
  
    editBtn.addEventListener("click", function (event) {
      userList.removeChild(event.target.parentElement);
      localStorage.removeItem(userDetails.email);
      document.getElementById("username").value = userDetails.username;
      document.getElementById("email").value = userDetails.email;
      document.getElementById("phone").value = userDetails.phone;
    });
  }

  function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/895edf11d5a947b5859e43030c623fb3/users/${userId}`)
      .then((response)=>{
        console.log(response)
      })
      .catch((err)=>{
        console.log(err);
      })
  }
  
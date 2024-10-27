function handleFormSubmit(event) {
  event.preventDefault();
  const siteDetails = {
    title: event.target.title.value,
    url: event.target.url.value,
  };

  axios
    .post(
      "https://crudcrud.com/api/37e08da5047c4919b15edb5508ee2601/sites",
      siteDetails
    )
    .then((response) => displayUserOnScreen(response.data))
    .catch((error) => console.log(error));

  // Clearing the input fields
  document.getElementById("title").value = "";
  document.getElementById("url").value = "";
}

function displayUserOnScreen(siteDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${siteDetails.title} - ${siteDetails.url}`
    )
  )

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  // Delete functionality
  deleteBtn.addEventListener("click", function () {
    userList.removeChild(userItem);
    axios
      .delete(
        `https://crudcrud.com/api/37e08da5047c4919b15edb5508ee2601/sites/${siteDetails._id}`
      )
      .then(() => console.log("User deleted from server"))
      .catch((error) => console.log("Error deleting user:", error));
  });

  // Edit functionality
  editBtn.addEventListener("click", function () {
    userList.removeChild(userItem);
    document.getElementById("title").value = siteDetails.title;
    document.getElementById("url").value = siteDetails.url;

    // Delete user from server for edit
    axios
      .delete(
        `https://crudcrud.com/api/37e08da5047c4919b15edb5508ee2601/sites/${siteDetails._id}`
      )
      .then(() => console.log("User deleted for edit"))
      .catch((error) => console.log("Error deleting user:", error));
  });
}

// Function for displaying all users on page load
document.addEventListener("DOMContentLoaded", refreshPage);

function refreshPage() {
  axios
    .get("https://crudcrud.com/api/37e08da5047c4919b15edb5508ee2601/sites")
    .then((response) => displayOnScreen(response.data))
    .catch((error) => console.log(error));
}

function displayOnScreen(data) {
  const uList = document.getElementsByClassName("uList")[0];
  uList.innerHTML = ""; // Clear existing items on the page

  for (let i = 0; i < data.length; i++) {
    const user = data[i];

    const receivedResponse = document.createElement("li");
    receivedResponse.textContent = `${user.title} - ${user.url}`;

    // Create and append delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    receivedResponse.appendChild(deleteBtn);

    // Create and append edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    receivedResponse.appendChild(editBtn);

    // Append the list item to the unordered list
    uList.appendChild(receivedResponse);

    // Add delete functionality
    deleteBtn.addEventListener("click", function () {
      uList.removeChild(receivedResponse); // Remove from UI
      axios
        .delete(`https://crudcrud.com/api/37e08da5047c4919b15edb5508ee2601/sites/${user._id}`)
        .then(() => console.log("User deleted from server"))
        .catch((error) => console.log("Error deleting user:", error));
    });

    // Edit button functionality
    editBtn.addEventListener("click", function () {
      document.getElementById("title").value = user.title;
      document.getElementById("url").value = user.url;
      
      uList.removeChild(receivedResponse); // Remove from UI
      axios
        .delete(`https://crudcrud.com/api/37e08da5047c4919b15edb5508ee2601/sites/${user._id}`)
        .then(() => console.log("User deleted for edit"))
        .catch((error) => console.log("Error deleting user:", error));
    });
  }
}

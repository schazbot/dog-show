const dogsUrl = "http://localhost:3000/dogs";
const dogsTable = document.querySelector("#table-body");
const submitButton = document.querySelector(".submit-btn");
const dogForm = document.querySelector("#dog-form");

//API
function getAllDogs() {
  return fetch(dogsUrl).then(resp => resp.json());
}

function updateDog(dog) {
  return fetch(`${dogsUrl}/${dog.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dog)
  }).then(resp => resp.json());
}

//DOM

function renderDog(dog) {
  const dogRow = document.createElement("tr");
  dogRow.id = `row-${dog.id}`;
  dogRow.innerHTML = `
    <td>${dog.name}</td> 
    <td>${dog.breed}</td>
    <td>${dog.sex}</td> 
    <td><button class="edit-btn">Edit</button></td>
    </tr>
    `;
  dogsTable.appendChild(dogRow);

  const dogFormListener = e => {
    e.preventDefault();
    dog.name = dogForm.querySelector("#nameForm").value;
    dog.breed = dogForm.querySelector("#breedForm").value;
    dog.sex = dogForm.querySelector("#sexForm").value;

    updateDog(dog).then(init);
    dogForm.removeEventListener("submit", dogFormListener);
  };
  dogRow.querySelector(".edit-btn").addEventListener("click", () => {
    dogForm.querySelector("#nameForm").value = dog.name;
    dogForm.querySelector("#breedForm").value = dog.breed;
    dogForm.querySelector("#sexForm").value = dog.sex;

    dogForm.addEventListener("submit", dogFormListener);
  });
}

function renderDogs(dogs) {
  dogsTable.innerHTML = "";
  dogs.forEach(dog => renderDog(dog));
}

function init() {
  getAllDogs().then(renderDogs);
}

init();

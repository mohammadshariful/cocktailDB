const getValue = (inputID) => {
  const inputField = document.getElementById(inputID);
  const inputValue = inputField.value;
  inputField.value = "";
  return inputValue;
};
// elements selects and assign the value on the variable
const errorOne = document.getElementById("error-one");
const errorTwo = document.getElementById("error-two");
const container = document.getElementById("container");
const body = document.querySelector("#show-modal");
const modalBody = document.querySelector("#modal-body");
// functionalities
const searchBtn = async () => {
  const inputText = getValue("search-input");
  container.textContent = "";
  if (inputText == "") {
    errorOne.innerText = "Input field cann't be empty";
  } else if (!isNaN(inputText)) {
    errorOne.innerText = "Input field cann't be number";
  } else {
    errorOne.innerText = "";
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.drinks);
  }
};
// display data
const displayData = (data) => {
  const container = document.getElementById("container");
  container.textContent = "";
  try {
    if (!Array.isArray(data)) {
      errorTwo.innerText = "Result not found";
    } else {
      errorTwo.innerText = "";

      data.forEach((data) => {
        const { idDrink, strDrinkThumb, strInstructions, strDrink } = data;

        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
    <div class="card h-100 bg-dark rounded" onclick = "cardShow(${idDrink})"  data-bs-toggle="modal"
      data-bs-target="#exampleModal">
       <img src="${strDrinkThumb}" class="card-img-top" alt="..." />
         <div class="card-body">
            <h5 class="card-title">${strDrink}</h5>
              <p class="card-text">
                 ${strInstructions.slice(0, 100)}
              </p>
          </div>
    </div>
    `;
        container.appendChild(div);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// card show

const cardShow = async (cardId) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cardId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPopUp(data.drinks);
};

const displayPopUp = (data) => {
  modalBody.textContent = "";
  data.forEach((data) => {
    const { idDrink, strDrinkThumb, strDrink, strGlass } = data;
    console.log(data);
    const div = document.createElement("div");
    div.innerHTML = `
     <div class = "container">
     <div class = "row">
      <div class ='col'>
       <img src="${strDrinkThumb}" class="card-img-top" alt="..." />
      </div>
      <div class ='col'>
      <table class="table">
     <thead>
    <tr>
      <th scope="col"> ID</th>
      <th scope="col"> Name</th>
      <th scope="col">strGlass</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">${idDrink}</th>
      <td>${strDrink}</td>
      <td>${strGlass}</td>
    </tr>
    
    
  </tbody>
</table>
      </div>
     </div>
     </div>
    `;
    modalBody.appendChild(div);
  });
};

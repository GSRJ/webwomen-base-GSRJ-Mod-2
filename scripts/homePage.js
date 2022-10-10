/* Desenvolva sua lógica aqui... */
function state(initialValue) {
  let value = initialValue;

  function getValue() {
    return value;
  }
  function setValue(newValue) {
    value = newValue;
  }
  return [getValue, setValue];
}

const [database, setDatabase] = state(jobsData);

const [jobSelected, setJobSelected] = state([]);

function jobDataAnalisys (){
    const  jobsLocalJson = localStorage.getItem("jobs")

    if(jobsLocalJson){
        const jobsLocal = JSON.parse(jobsLocalJson)
        return setJobSelected(jobsLocal)
    }
}

jobDataAnalisys()

function showJobs(jobsData = database()) {
  const container = document.querySelector("#jobsContainer");

  jobsData.forEach((element) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
        <li class="jobCard">
        <h2>${element.title}</h2>
        <span>
        <p>${element.enterprise}</p>
        <p>${element.location}</p>
        </span>
        <p class="jobCardDescription">${element.descrition}
        </p>
        <div>
        <button class="greyButton">${element.modalities[0]}</button>
        <button class="greyButton">${element.modalities[1]}</button>
        </div>
        <button class="purpleButton apply" id="${element.id}" onClick={addToSelectedJobs(${element.id})}>Candidatar</button>
        `
    );
  });
  return container;
}
showJobs();

let applyButtons = document.getElementsByClassName("apply");
for (i = 0; i < applyButtons.length; i++) {
  applyButtons[i].addEventListener("click", eventAdded);
}

function eventAdded(i) {
  console.log();
  let a = this.id;
  this.innerText = "Remover candidatura";
  this.setAttribute("onClick", `{removeToJobsSelected(${a})}`);
}

function addToSelectedJobs(id, jobsData = database()) {
  const jobsSelected = jobsData.find((el) => el.id === id);
  setJobSelected([...jobSelected(), jobsSelected]);


  const jobsJSON = JSON.stringify(jobSelected());

  localStorage.setItem("jobs", jobsJSON);

  return showJobsSelected();
}

function showJobsSelected(jobsData = jobSelected()) {
  const container = document.querySelector("#selectedJobs");

  container.innerHTML = "";

  jobsData = new Set(jobsData)
  console.log(jobsData)

  jobsData.forEach((element) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
        <li>
        <span class="selectedJobTitle">
          <h2>${element.title}</h2>
          <button id="${element.id}" class="trashButton" onCLick={removeToJobsSelected(${element.id})}>
            <img src="./assets/trashButton.svg" alt="botão de excluir"/>
          </button>
        </span>
        <span class="selectedJobEnterpriseLocation">
          <p>${element.enterprise}</p>
          <p>${element.location}</p>
        </span>
      </li>`
    );
  });
  return container;
}

showJobsSelected();

function removeToJobsSelected(id, jobsData = jobSelected()) {
  const findJob = jobsData.map((element) => {
    element.id === id;
  });

  const newJobSelected = [...jobsData];

  newJobSelected.splice(findJob, 1);

  setJobSelected(newJobSelected);

  const jobsJSON = JSON.stringify(jobSelected())
  localStorage.setItem("jobs",jobsJSON)
  location.reload()
  return showJobsSelected();
}



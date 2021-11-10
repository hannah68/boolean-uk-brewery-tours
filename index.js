let US_State = {
  selectStateInput: "",
  breweries: [],
  cities: [],
  filters: {
    type: "",
    city: [],
    search: ""
  },
  pagination:{
    row: 10,
    currentPage: 1
  }
};

const brewType = ['micro','brewpub','regional'];
const main = document.querySelector('main');

// empty main display======================
const emptyMain = () => {
  main.innerHTML = '';
}

// empty list display======================
const emptyList = () => {
  const breweriesList = document.querySelector('.breweries-list');
  const list = breweriesList.querySelectorAll('li');
  for(let i=0; i<list.length; i++){
    list[i].remove();
  }
}

// Display breewery list header (html)==================
const renderBreweryListHeader = () => {
  const h1 = document.createElement('h1');
  h1.innerText = 'List of Breweries';
  const header = document.createElement('header');
  header.classList.add('search-bar');
  header.innerHTML = `
  <form id="search-breweries-form" autocomplete="off">
    <label for="search-breweries"><h2>Search breweries:</h2></label>
    <input id="search-breweries" name="search-breweries" type="text" />
  </form>
  `
  const article = document.createElement('article');
  const breweriesList = document.createElement('ul');
  breweriesList.classList.add('breweries-list');
  article.appendChild(breweriesList);
  main.append(h1,header,article);
}

// set attributes function (html)=================
const setAttributesFn = (el, attrs) => {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
    }
}

// Display filter form (html)===================
const renderFormDisplay = () =>{
  const aside = document.createElement('aside');
  aside.classList.add('filters-section');
  main.append(aside);
  const title = document.createElement('h2');
  title.innerText = 'Filter By:';
  const form = document.createElement('form');
  let formObj = {
    id: 'filter-by-type-form',
    autocompete: 'off'
  }
  setAttributesFn(form,formObj);
  // create label
  const label = document.createElement('label');
  label.setAttribute('for', 'filter-by-type');
  // create h3
  const brewTitle = document.createElement('h3');
  brewTitle.innerText = 'Type of Brewery';
  label.appendChild(brewTitle);
  // create select
  const select = document.createElement('select');
  let selectObj = {
    id: 'filter-by-type',
    name: 'filter-by-type'
  }
  setAttributesFn(select,selectObj);
  // create options
  select.innerHTML = `
    <option value="">Select a type...</option>
    <option value="micro">Micro</option>
    <option value="regional">Regional</option>
    <option value="brewpub">Brewpub</option>
  `
  form.append(label,select);
  aside.append(title,form);
  renderCityHeaderDisplay(aside)
}

// Display filter header section(html)==================
const renderCityHeaderDisplay = (aside) => {
  const filterCityDiv = document.createElement('div');
  filterCityDiv.classList.add('filter-by-city-heading');
  const cityTitle = document.createElement('h3');
  cityTitle.innerText = 'Cities'
  const clearBtn = document.createElement('button');
  clearBtn.classList.add('clear-all-btn');
  clearBtn.innerText = 'clear all';
  filterCityDiv.append(cityTitle,clearBtn);
  const cityForm = document.createElement('form');
  cityForm.setAttribute('id', 'filter-by-city-form');
  aside.append(filterCityDiv,cityForm);
}

// update city form ===========================
const cityFormUpdate = (stateUpdate) => {
  const cityForm = document.querySelector('#filter-by-city-form');
  // create unique value
  const uniqueCity = [...new Set(stateUpdate.cities)];
  uniqueCity.map(city => {
    const input = document.createElement('input');
    const label = document.createElement('label');
    label.innerText = city;
    label.setAttribute('for', city);
    let inputObj ={
      type: 'checkbox',
      name: city,
      value:city
    }
    setAttributesFn(input,inputObj);
    cityForm.append(input,label);
  })
}

// update list =================================
const listUpdate = (stateUpdate) => {
  const listContainer = document.querySelector('.breweries-list');
  listContainer.innerHTML = stateUpdate.breweries.map(eachBrew => 
    `<li>
      <h2>${eachBrew.name}</h2>
      <div class="type">${eachBrew.brewery_type}</div>
      <section class="address">
          <h3>Address:</h3>
          <p>${eachBrew.street}</p>
          <p><strong>${eachBrew.city}, ${eachBrew.postal_code}</strong></p>
        </section>
        <section class="phone">
          <h3>Phone:</h3>
          <p>${eachBrew.phone ? '+' + eachBrew.phone : '-'}</p>
        </section>
        <section class="link">
          <a href="${eachBrew.website_url}" target="_blank">Visit Website</a>
        </section>
      </li>
  `).join('');
}


// add pagination======================================
const addPagination = (state) => {
  let breweriesArr = state.breweries;
  let rowsPerPage = state.pagination.row;
  setupPagination(breweriesArr,rowsPerPage,state);
}

// setup Pagination =======================================================
const setupPagination = (breweriesArr,rowsPerPage,state) =>{
  let pageCount = Math.ceil(breweriesArr.length/rowsPerPage);
  let buttonContainer = document.createElement('div');
  buttonContainer.classList.add('btn-container');
  main.append(buttonContainer);
  for(let i=1; i<pageCount + 1; i++){
    let btn = paginationButton(i,breweriesArr,state,rowsPerPage);
    buttonContainer.append(btn);
  }
}

// create pagination Button==============================================
const paginationButton = (page,breweriesArr,state,rowsPerPage) =>{
  let button = document.createElement('button');
  button.classList.add('btn');
  button.innerText = page;
  let currentPage = state.pagination.currentPage;
  if(currentPage === page){
    button.classList.add('active');
  }
  displayList(breweriesArr,currentPage,rowsPerPage);
  button.addEventListener('click', () => {
    currentPage = page
    displayList(breweriesArr,currentPage,rowsPerPage);
    let currentBtn = document.querySelector('.btn-container button.active');
    currentBtn.classList.remove('active');
    button.classList.add('active');
  })
  return button;
}

// display list after pagination=======================================
const displayList = (items,page,rowsPerPage) =>{
  page--;
  let start = rowsPerPage * page;
  let end = start + rowsPerPage;
  let paginatedItems = items.slice(start,end);
  let newState = {
    breweries: paginatedItems,
  };
  listUpdate(newState);
}

// show result of search=========================================
const showResultOfSearch = (stateUpdate,value) => {
  const filteredSearch = stateUpdate.breweries.filter(eachBrew => {
    if(eachBrew.city.toLowerCase() === value || eachBrew.name.toLowerCase() === value){
      emptyList();
      return eachBrew
    }
  })
  let newState = {
    breweries: filteredSearch, 
  };
  const btncontainer = document.querySelector('.btn-container')
  if(newState.breweries.length< 9){btncontainer.classList.add('hidden')}
  listUpdate(newState);
}

// get user search value==================================
const getSearchValue = (stateUpdate) => {
  const searchForm = document.querySelector('#search-breweries-form');
  const searchInput = searchForm.querySelector('#search-breweries');
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    emptyList();
    const searchValue = searchInput.value.toLowerCase();
    const newState = {search: searchValue};
    updateState(newState);
    showResultOfSearch(stateUpdate,searchValue)
    searchInput.value = '';
  })
}
  
// clear all filters==================================
const clearFilter = (stateUpdate,target) => {
  const clearBtn = document.querySelector('.clear-all-btn');
  clearBtn.addEventListener('click', () => {
    if(target){
      target.checked = false;
    }
    listUpdate(stateUpdate)
  })
}

// filter by city =====================================
let array =[]
const filterByCity = (valueCity,stateUpdate,target) => {
  const paginationBtn = document.querySelector('.btn-container');
  let city = array.map(el => el.city);
  let newState = {
    breweries: array,
    filters: {
      city: city
    }
  };
  stateUpdate.breweries.filter(brewType => {
    if(brewType.city === valueCity){
      array.push(brewType)
      emptyList();
      listUpdate(newState);
    }
    if(paginationBtn)paginationBtn.classList.add('hidden');
  })
  if(newState.breweries.length > 9){
    emptyList();
    addPagination({...stateUpdate, ...newState});
  }
  clearFilter(stateUpdate,target);
}

// remove unchecked item from list======================
function removeUncheckedValue(valueCity,stateUpdate){
  const paginationBtn = document.querySelector('.btn-container');
  const removedItems = array.filter(el => el.city === valueCity);
  const indexArray = removedItems.map(item => array.indexOf(item));
  
  array = array.filter(function(value, index) {
    return indexArray.indexOf(index) == -1;
  })
  let newState = {
    breweries: array,
  };
  listUpdate(newState);
  if(paginationBtn){
    paginationBtn.classList.add('hidden');
    paginationBtn.remove();
  }
  clearFilter(stateUpdate);
}

// listen to filter by city=============================
const listenToFilterByCity = (stateUpdate) => {
  var checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      emptyList();
      let target = e.target;
      let valueCity = e.target.value;
      if (e.target.checked) {
        filterByCity(valueCity,stateUpdate,target);
      }
      if(!e.target.checked){
        removeUncheckedValue(valueCity,stateUpdate);
      }
    });
  })
}

// filter by type data=====================================
const filterByType = (valueType,stateUpdate) => {
  const paginationBtn = document.querySelector('.btn-container');
  const brewTypeFilter = stateUpdate.breweries.filter(brewType => {
    return brewType.brewery_type === valueType
  });
  let newState = {
    breweries: brewTypeFilter,
    filters: {
      type: valueType
    }
  };
  emptyList();
  listUpdate(newState);
  if(paginationBtn){
    paginationBtn.classList.add('hidden');
    paginationBtn.remove();
  }
  if(newState.breweries.length > 9){
    emptyList();
    addPagination({...stateUpdate, ...newState});
  }
  clearFilter(stateUpdate);
}


// listen to filter by type========================
const listenToFilterByType = (stateUpdate) => {
  const selectType = document.getElementById('filter-by-type');
  selectType.addEventListener('change',e => {
    emptyList();
    let valueType = e.target.value;
    filterByType(valueType,stateUpdate);
  });
}

// render functions=====================
const renderFn = (state) => {
  renderBreweryListHeader();
  renderFormDisplay();

  if(state.breweries.length > 9){
    addPagination(state);
  }else{
    listUpdate(state);
  }
  cityFormUpdate(state);
  listenToFilterByType(state);
  listenToFilterByCity(state);
  getSearchValue(state)
}

// update state========================
const updateState = (newState) => {
  US_State = {...US_State, ...newState};
  console.log('updateed State:', US_State);
  
  if(main.innerHTML !== ''){
    emptyMain();
    renderFn(US_State);
  }else{
    renderFn(US_State);
  }
}

// create city array==============================
const createCityArr = (breweryArr) => {
  const cities = breweryArr.map(brew => {
    return brew.city
  });
  let newState = {cities: cities};
  updateState(newState);
}

// create brewery arr=========================
const createBreweryArr = (data) =>{
  const breweryArr = data.filter(typeOfBrew => {
    return brewType.includes(typeOfBrew.brewery_type)
  });
  let newState = {breweries: breweryArr};
  updateState(newState);
  createCityArr(breweryArr);
}

// clean data================================
const cleanData = (data) =>{
  createBreweryArr(data);
}

// get data from API===============================
const fetchDataForUser = (value) => {
  fetch(`https://api.openbrewerydb.org/breweries?by_state=${value}`)
    .then(res => res.json())
    .then(data => {
      cleanData(data, value);
    });
}

// Get user input================================
const getUserInput = () => {
  const form = document.querySelector('#select-state-form');
  const input = document.querySelector('#select-state');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let userValue = input.value.toLowerCase();
    const newState = {selectStateInput: userValue};
    updateState(newState);
    fetchDataForUser(userValue);
    input.value = '';
  })
}


// init app===========================
const init = () => {
  getUserInput();
}
init()
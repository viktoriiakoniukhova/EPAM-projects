const appRoot = document.getElementById('app-root');

let form = document.createElement('form');
appRoot.appendChild(form);

let heading = document.createElement('h2');
heading.innerHTML = 'Countries Search';
form.appendChild(heading);

let labelTOF = document.createElement('label');
labelTOF.innerHTML = 'Please choose type of search: ';
form.appendChild(labelTOF);

let fieldTOF = document.createElement('fieldset');
fieldTOF.setAttribute('name', 'type-of-search');
form.appendChild(fieldTOF);

let sByRegion = document.createElement('input');
sByRegion.setAttribute('type','radio');
sByRegion.setAttribute('name', 'choice');
sByRegion.setAttribute('id', 's-by-reg');
// sByRegion.onclick = clickedBR;
fieldTOF.appendChild(sByRegion);

let labelBR = document.createElement('label');
labelBR.setAttribute('id', 'by-reg');
labelBR.innerHTML = 'By region';
fieldTOF.appendChild(labelBR);

let linebreak = document.createElement('br');
fieldTOF.appendChild(linebreak);

let sByLang = document.createElement('input');
sByLang.setAttribute('type','radio');
sByLang.setAttribute('name', 'choice');
sByLang.setAttribute('id', 's-by-lang');
// sByLang.onclick = clickedBL;
fieldTOF.appendChild(sByLang);

let labelBL = document.createElement('label');
labelBL.innerHTML = 'By Language';
fieldTOF.appendChild(labelBL);

let labelSQ = document.createElement('label');
labelSQ.innerHTML = 'Please choose search query: ';
form.appendChild(labelSQ);

let fieldSQ = document.createElement('fieldset');
fieldSQ.setAttribute('name', 'search-query');
form.appendChild(fieldSQ);

let dropdown = document.createElement('select');
fieldSQ.appendChild(dropdown);

let divEl = document.createElement('div');
divEl.innerHTML = 'No items, please choose search query ';
form.appendChild(divEl);

if(!form.elements['choice'].checked){
    let opt = document.createElement('option');
    opt.value = '';
    opt.text = 'Select value';
    dropdown.appendChild(opt);
    dropdown.disabled = true;
    divEl.hidden = true;
}

const removeChildren = (value) => {
    while(value.firstChild){
        value.removeChild(value.lastChild);
    }
}

const createDefaultOption = () => {
    const defaultValue = document.createElement('option');
    defaultValue.innerText = 'Select value';
    dropdown.appendChild(defaultValue);
};
createDefaultOption();

sByRegion.onchange = () => {
    removeChildren(tContainer);
    checkDropdownValue();
    removeChildren(dropdown);
    createDefaultOption();
    dropdown.disabled = false;

    let regionsArr = externalService.getRegionsList();
    for(let i = 0; i < regionsArr.length; i++){
        let opt = document.createElement('option');
        opt.value = regionsArr[i];
        opt.text = regionsArr[i];
        dropdown.appendChild(opt);
    }
    return 0;
}

sByLang.onchange = () => {
    removeChildren(tContainer);
    checkDropdownValue();
    removeChildren(dropdown);
    createDefaultOption();
    dropdown.disabled = false;

    let langArr = externalService.getLanguagesList();
    for(let i = 0; i < langArr.length; i++){
        let opt = document.createElement('option');
        opt.value = langArr[i];
        opt.text = langArr[i];
        dropdown.appendChild(opt);
    }
    return 0;
}

const tContainer = document.createElement('div');
tContainer.setAttribute('class', 'tableContainer');
tContainer.setAttribute('id', 'tableContainer');

appRoot.appendChild(tContainer);

function createTable(data) {
    let table = document.createElement('table');
    form.appendChild(table);
    let thead = document.createElement('thead');
    table.appendChild(thead);

    let headList = ['Country Name', 'Flag', 'World Region', 'Area', 'Capital', 'Languages'];
    for (let i = 0; i < headList.length; i++) {
        let heading = document.createElement('th');
        heading.innerHTML = headList[i];
        thead.appendChild(heading);
    }
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (let i = 0; i < headList.length; i++) {
        let row = document.createElement('tr');
        for (let key in data[i]) {
            if(typeof data[i][key] === "object"){
                let objArray = [];

                for(let val in data[i][key]) {
                    objArray.push(data[i][key][val]);
                }
                let cell = row.insertCell();
                let text = document.createTextNode(objArray);
                cell.appendChild(text);
            } else {
                let cell = row.insertCell();
                let text = document.createTextNode(data[i][key]);
                cell.appendChild(text);
            }
        }
        tbody.appendChild(row);
    }
    tContainer.appendChild(table);
}

const checkDropdownValue = () => {
    if((dropdown.value === 'Select value' || dropdown.disabled)
        && (sByRegion.checked || sByLang.checked)){
        const noItems = document.createElement('h2');
        noItems.innerText = 'No items,please choose search query';
        tContainer.appendChild(noItems);

        return true;
    }

    return false;
}
const selectItem = () => {
    let selectedItems;
    if(sByRegion.checked){
        selectedItems = externalService.getCountryListByRegion(dropdown.value);
    } else if(sByLang.checked){
        selectedItems = externalService.getCountryListByLanguage(dropdown.value);
    }
    return selectedItems;
}

dropdown.onchange = () => {
    removeChildren(tContainer);

    if(checkDropdownValue()){
        return 0;
    } else{
        const selectedItems = selectItem();
        createTable(selectedItems);
    }
}

const bubbleSortByName = (array) => {
    const arrLength = array.length;
    for(let i = arrLength - 1; i >= 0; i--){
        for(let j = 1; j <= i; j++){
            if(array[j-1].name > array[j].name){
                let temp = array[j-1];
                array[j-1] = array[j];
                array[j] = temp;
            }
        }
    }

    return array;
}

const bubbleSortByArea = (array) => {
    const arrLength = array.length;
    for(let i = arrLength - 1; i >= 0; i--){
        for(let j = 1; j <= i; j++){
            if(array[j-1].area > array[j].area){
                let temp = array[j-1];
                array[j-1] = array[j];
                array[j] = temp;
            }
        }
    }

    return array;
}
/*
list of all regions
externalService.getRegionsList();
list of all languages
externalService.getLanguagesList();

get countries list by language
externalService.getCountryListByLanguage()
get countries list by region
externalService.getCountryListByRegion()
*/

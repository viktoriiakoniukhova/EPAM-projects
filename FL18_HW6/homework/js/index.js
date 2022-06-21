function visitLink(path) {
    let visit = localStorage.getItem(path) ? Number(localStorage.getItem(path)) : 0;
    visit += 1;
    localStorage.setItem(path, visit.toString());
}

function viewResults() {
    const content = document.querySelector('#content');

    let ul = document.createElement('ul');
    content.appendChild(ul);

    if(localStorage.getItem('Page1') !== null){
        let li1 = document.createElement('li');
        li1.innerHTML = 'You visited Page1 ' + localStorage.getItem('Page1') + ' time(s)';
        ul.append(li1);
    }

    if(localStorage.getItem('Page2') !== null){
        let li2 = document.createElement('li');
        li2.innerHTML = 'You visited Page2 ' + localStorage.getItem('Page2') + ' time(s)';
        ul.append(li2);
    }

    if(localStorage.getItem('Page3') !== null){
        let li3 = document.createElement('li');
        li3.innerHTML = 'You visited Page3 ' + localStorage.getItem('Page3') + ' time(s)';
        ul.append(li3);
    }

    localStorage.clear();
}

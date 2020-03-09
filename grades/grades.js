checkLoaded();

function checkLoaded() {
    if (window.jQuery) {
        findClasses();
    } else {
        setTimeout(()=>checkLoaded(), 50);
    }
}

function findClasses() {
    console.log('getting classes');
    let classes = [];
    let courses = document.querySelector('.courses').querySelectorAll('.course');
    const regex = /(id=[0-9]+)/g;
    let count = courses.length;
    for (course of courses) {
        const link = course.firstChild;
        const id = link.href.match(regex);
        let section = {link: link, grades: []};
        $.ajax({
            url: `https://culearn.carleton.ca/moodle/grade/report/user/index.php?${id}`,
            success: (result) => {
                const gradesPage = new DOMParser().parseFromString(result, "text/html");
                const gradesTable = gradesPage.querySelector('table');
                const rows = gradesTable.querySelectorAll('.user-grade > tbody > tr');
                for (let i = 0; i < rows.length-1; i++) {
                    let c = {}
                    const row = rows[i];
                    if (row.children[0].classList.contains('column-leader')) continue;
                    c.item = row.children[0].firstChild;
                    c.grade = row.children[1].innerText;
                    c.range = row.children[2].innerHTML;
                    section.grades.push(c);
                }
                classes.push(section);
            }
        }).then(()=>{
            count--;
            if (count === 0) {
                makeTable(classes);
            }
        });
    }
}

function makeTable(classes) {
    console.log(classes);
    let table = document.createElement('table');
    for (c of classes) {
        let row = document.createElement('tr');
        let header = document.createElement('th');
        header.setAttribute("colspan", "3");
        header.appendChild(c.link);
        row.appendChild(header);
        table.appendChild(row);
        for (let i = 0; i < c.grades.length; i++) {
            let row = document.createElement('tr');

            let cell = document.createElement('td');
            cell.appendChild(c.grades[i].item);
            row.appendChild(cell);

            cell = document.createElement('td');
            cell.innerText = c.grades[i].grade;
            row.appendChild(cell);

            cell = document.createElement('td');
            cell.innerText = c.grades[i].range;
            row.appendChild(cell);

            table.appendChild(row);
        }
    }
    document.getElementById('grades').parentNode.appendChild(table);
}
console.log("Mobile script run");
var fullObj;
mobileInit();

function mobileInit() {
    if (false) {
        tableOnClick(14);
    }
    else {
        VK.init(function () {
            // API initialization succeeded
            // Your code here
            console.log("Vk loaded");
            let real_height = 4000;
            VK.callMethod('resizeWindow', 1000, real_height);
            tableOnClick(14);
            //real_height = document.getElementById('page').clientHeight;
            //VK.callMethod('resizeWindow', 1000, real_height);
        }, function () {
            // API initialization failed
            // Can reload page here
            tableOnClick(14);
        }, '5.74');
    }
}

function tableOnClick(idClub) {
    //let url = 'http://fitnes-ptz.ru/mobile/widget.php';
    //let url = 'https://webapp.tsdames.lt/index.php?url=http://fitnes-ptz.ru/mobile/widget.php';
    let url2 = 'https://webapp.tsdames.lt/index.php?url=http://fitnes-ptz.ru/mobile/widget2.php';
    fetch(url2)
        .then((res) => {

            return res.json();
        })
        .then((out) => {
            fullObj = out;
            createTable(getClassesFromClub(out, idClub));
        })
        .catch(err => {
            throw err
        });
}

function getClassesFromClub(jsonObj, idClub) {
    let arrayOfClub = [];
    //console.log("hello form getClassesFromClub  " + jsonObj.schedule.length);
    for (let i = 0; i < jsonObj.schedule.length; i++) {
        let currObj = jsonObj.schedule[i];
        if (currObj.clubid == idClub) {
            arrayOfClub.push(currObj);

        }
    }
    //console.log(arrayOfClub.sort(compareByDay));
    return arrayOfClub;
}

/*function compareByDay(a, b) {
    if (a.day < b.day)
        return -1;
    if (a.day > b.day)
        return 1;
    return 0;
}*/
function compareByTime(a,b) {
    if (a.time < b.time)
        return -1;
    if (a.time > b.time)
        return 1;
    return 0;
}

function dayByDay(sortedArray) {
    let thisWeek = [];
    thisWeek.push(sortedArray[0]);
    for (let i = 1; i < sortedArray.length; i++) {
        if (thisWeek[i].day == sortedArray[i]) {
            thisWeek.push(sortedArray[i]);
        }
    }

}

function createTable(sortedArray) {
    let tbBody = document.getElementById("tablebody");
    console.log(sortedArray);
    let thisDay = [];

    for (let mainCounter = 1; mainCounter < sortedArray.length + 1; mainCounter++) {
        thisDay.push(sortedArray[mainCounter-1]);

        for (let i = mainCounter;i<sortedArray.length;i++){
            /*mainCounter = i;
            if (sortedArray[i].day == sortedArray[i-1].day){
                thisDay.push(sortedArray[i]);
            } else {
                break;
            }*/

            if (sortedArray[i].day != sortedArray[i-1].day){
                mainCounter = i;
                break;
            }
            thisDay.push(sortedArray[i]);

        }
        /*if (thisDay.length < 1) thisDay.push(sortedArray[mainCounter+1]);*/

        /*console.log(" this day lenght = " + thisDay.length);
        console.log(thisDay);*/

        thisDay.sort(compareByTime);
        for (let k =0;k<thisDay.length;k++) {
            //console.log(thisDay);
            let trNew = document.createElement("tr");

            let tdDay = document.createElement("td");
            tdDay.innerText = convertDay(thisDay[k].day);
            trNew.appendChild(tdDay);

            let tdTime = document.createElement("td");
            tdTime.innerText = thisDay[k].time;
            trNew.appendChild(tdTime);

            let tdClass = document.createElement("td");
            tdClass.innerText = thisDay[k].class + "\n" + thisDay[k].team;
            trNew.appendChild(tdClass);

            tbBody.appendChild(trNew);
        }
        thisDay =[];

    }
}

function convertDay(day) {
    switch (day) {
        case "1":
            return "Понедельник";
        case "2":
            return "Вторник";
        case "3":
            return "Среда";
        case "4":
            return "Четверг";
        case "5":
            return "Пятница";
        case "6":
            return "Суббота";
        case "7":
            return "Воскресенье";
    }
}

function buildTable(text, id, idClub) {
    let activeList = document.getElementsByClassName("active");
    activeList[0].classList.remove("active");
    document.getElementById("title").innerText = text;
    id.classList.add("active");
    clearTable();
    tableOnClick(idClub);
}

function clearTable() {
    document.getElementById("tablebody").innerHTML = "";
}
console.log("Desktop script run");
'use strict';
var fullObj;
//start point
desktopInit();

function desktopInit() {
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
            createTable(getClubs(out, idClub));
        })
        .catch(err => {
            throw err
        });
}

function createTable(sortedArray) {
    let tbBody = document.getElementById("tablebody");
    let thisWeek = [];

    for (let mainCounter = 1; mainCounter < sortedArray.length + 1; mainCounter++) {
        thisWeek.push(sortedArray[mainCounter - 1]);
        for (let i = mainCounter; i < sortedArray.length; i++) {
            mainCounter = i;
            if (sortedArray[i].time == sortedArray[i - 1].time) {
                thisWeek.push(sortedArray[i]);
            } else {
                break;
            }

        }

        let trNew = document.createElement("tr");
        trNew.style.maxWidth = "1000px";
        let text = "";
        let thisDayCounter = 0;
        for (let j = 0; j < 8; j++) {
            let td = document.createElement("td");

            if (j === 0) {
                let timeText = document.createElement("span");
                timeText.innerText = thisWeek[0].time;
                timeText.style.width = "8%";
                td.appendChild(timeText);
                td.style.width = "8%";
            } else {

                for (let k = 0; k < thisWeek.length; k++) {

                    if (thisWeek[k].day == j) {
                        if (thisDayCounter > 0) {
                            td.appendChild(document.createElement("hr"));
                        }
                        let classNameText = document.createElement("span");
                        classNameText.innerText = thisWeek[k].class + " \n";
                        td.appendChild(classNameText);

                        let teamName = document.createElement("b");
                        teamName.innerText = thisWeek[k].team + " ";
                        td.style.width = "13%";
                        td.appendChild(teamName);
                        thisDayCounter++;
                        continue;
                    }

                }
            }
            thisDayCounter = 0;
            text = "";
            trNew.appendChild(td)
        }
        tbBody.appendChild(trNew);
        thisWeek = [];
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

var getClubs = function (jsonObj, idClub) {
    let arrayOfClub = [], k = 0;
    console.log("hello form getClassesFromClub  " + jsonObj.schedule.length);
    for (let i = 0; i < jsonObj.schedule.length; i++) {
        let currObj = jsonObj.schedule[i];
        if (currObj.clubid == idClub) {
            arrayOfClub.push(currObj);
            k++;
        }
    }
    console.log(arrayOfClub.sort(compare));
    return arrayOfClub;
};

function compare(a, b) {
    if (a.time < b.time)
        return -1;
    if (a.time > b.time)
        return 1;
    return 0;
}
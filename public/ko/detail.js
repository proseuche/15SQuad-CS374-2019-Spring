$(document).ready(function() {

    // import offer detail
    let config = {
        apiKey: "AIzaSyAJYY0Az45sH0Sw6jAz3JvR4yjJBIMtbzU",
        authDomain: "squad-67b43.firebaseapp.com",
        databaseURL: "https://squad-67b43.firebaseio.com/",
    };
    firebase.initializeApp(config);
    let database = firebase.database();

    const detailtype = sessionStorage.getItem('detailtype');
    const detailid = sessionStorage.getItem('detailid');
    const databaseRef = detailtype + '/' + detailid;

    if(detailtype == 'Offers'){
        database.ref(databaseRef).once('value', function(snapshot){
            const offerOwner = snapshot.val().user;

            if (offerOwner !== "Me") {
                document.getElementById('name').innerHTML = "<i class=\"icon sign-in\"></i>" + offerOwner + "의 공유 제안";
            } else {
                document.getElementById('name').innerHTML = "<i class=\"icon sign-out\"></i>내 공유 제안";
            }

            let start_date = snapshot.val().start.split('-');
            document.getElementById('start_date').innerHTML = "<h3>" + start_date[0] + ". " + start_date[1] + ". " + start_date[2] + "</h3>";
            let end_date = snapshot.val().end.split('-');
            document.getElementById('end_date').innerHTML = "<h3>" + end_date[0] + ". " + end_date[1] + ". " + end_date[2] + "</h3>";

            let isPossible = snapshot.val().negotiation;
            const trueradio = document.getElementById('isNegoTrue');
            const falseradio = document.getElementById('isNegoFalse');
            if(isPossible === "true" || isPossible === true){
                trueradio.setAttribute('checked', "");
                falseradio.setAttribute('disabled', 'disabled');
            }
            else{
                falseradio.setAttribute('checked', "");
                trueradio.setAttribute('disabled', 'disabled');
            }

            let worktimes = document.getElementById('worktime');
            snapshot.child('time').forEach(function (data){
                let newtime = document.createElement('div');
                newtime.className = "inline fields";

                let blankField = document.createElement('div');
                blankField.className = "two wide field";
                newtime.appendChild(blankField);

                let daySelection = document.createElement('div');
                daySelection.className = "one wide field";
                daySelection.innerHTML = "<h3>" + weekEngKor(data.val().day) + ".</h3>";
                newtime.appendChild(daySelection);

                let startTimeSelection = document.createElement('div');
                startTimeSelection.className = "one wide field";
                startTimeSelection.innerHTML = "<h3>" + data.val().start + ".</h3>";
                newtime.appendChild(startTimeSelection);

                let timeUntil = document.createElement('div');
                timeUntil.className = "one field";
                timeUntil.innerHTML = "<h3>~</h3>";
                newtime.appendChild(timeUntil);

                let endTimeSelection = document.createElement('div');
                endTimeSelection.className = "one wide field";
                endTimeSelection.innerHTML = "<h3>" + data.val().end + ".</h3>";
                newtime.appendChild(endTimeSelection);

                worktimes.appendChild(newtime);
            });

            let userid = 'Me';
            // let userid = sessionStorage.getItem('userid');

            let buttonarea = document.getElementById('offerButtons');
            let firstButton = document.createElement('button');
            firstButton.className = "ui primary button";
            let buttonDiv = document.createElement('div');
            buttonDiv.className = "or";
            let secondButton = document.createElement('button');
            secondButton.className = "ui yellow button";

            if (userid === snapshot.val().user){
                firstButton.innerText = "삭제";
                firstButton.setAttribute('id', 'delete');
                secondButton.innerText = "수정";
                secondButton.setAttribute('id', 'modify');
            }
            else{
                firstButton.innerText = "수락";
                firstButton.setAttribute('id', 'accept');
                secondButton.innerText = "협상";
                secondButton.setAttribute('id', 'negotiate');
                if(isPossible === "false" || isPossible === false){
                    secondButton.className = "ui black button";
                }
            }

            buttonarea.appendChild(firstButton);
            buttonarea.appendChild(buttonDiv);
            buttonarea.appendChild(secondButton);

        }).then(function(){
            document.getElementById('loader').remove();
        });
    }
    else if(detailtype == 'Negotiations'){
        database.ref(databaseRef).once('value', function(snapshot){
            const offerOwner = snapshot.val().from;

            if (offerOwner !== "Me") {
                document.getElementById('name').innerHTML = "<i class=\"icon sign-in\"></i>" + offerOwner + " 가게에서 알바를 받아오는 협상";
            } else {
                document.getElementById('name').innerHTML = "<i class=\"icon sign-out\"></i>" + snapshot.val().to + " 가게에서 알바를 받아오는 협상";
            }

            let start_date = snapshot.val().start.split('-');
            document.getElementById('start_date').innerHTML = "<h3>" + start_date[0] + ". " + start_date[1] + ". " + start_date[2] + "</h3>";
            let end_date = snapshot.val().end.split('-');
            document.getElementById('end_date').innerHTML = "<h3>" + end_date[0] + ". " + end_date[1] + ". " + end_date[2] + "</h3>";

            let isPossible = snapshot.val().negotiation;
            const trueradio = document.getElementById('isNegoTrue');
            const falseradio = document.getElementById('isNegoFalse');
            if(isPossible === "true" || isPossible === true){
                trueradio.setAttribute('checked', "");
                falseradio.setAttribute('disabled', 'disabled');
            }
            else{
                falseradio.setAttribute('checked', "");
                trueradio.setAttribute('disabled', 'disabled');
            }

            let worktimes = document.getElementById('worktime');
            snapshot.child('time').forEach(function (data){
                let newtime = document.createElement('div');
                newtime.className = "inline fields";

                let blankField = document.createElement('div');
                blankField.className = "two wide field";
                newtime.appendChild(blankField);

                let daySelection = document.createElement('div');
                daySelection.className = "one wide field";
                daySelection.innerHTML = "<h3>" + weekEngKor(data.val().day) + ".</h3>";
                newtime.appendChild(daySelection);

                let startTimeSelection = document.createElement('div');
                startTimeSelection.className = "one wide field";
                startTimeSelection.innerHTML = "<h3>" + data.val().start + ".</h3>";
                newtime.appendChild(startTimeSelection);

                let timeUntil = document.createElement('div');
                timeUntil.className = "one field";
                timeUntil.innerHTML = "<h3>~</h3>";
                newtime.appendChild(timeUntil);

                let endTimeSelection = document.createElement('div');
                endTimeSelection.className = "one wide field";
                endTimeSelection.innerHTML = "<h3>" + data.val().end + ".</h3>";
                newtime.appendChild(endTimeSelection);

                worktimes.appendChild(newtime);
            });

            let userid = 'Me';
            // let userid = sessionStorage.getItem('userid');

            let mainform = document.getElementById('statusField');
            let statusHeader = document.createElement('h2');
            statusHeader.className = "yellow ui dividing header";
            statusHeader.innerText = "Status";
            mainform.appendChild(statusHeader);

            let statusField = document.createElement('div');
            statusField.className = "inline fields";

            let blankField = document.createElement('div');
            blankField.className = "two wide field";
            statusField.appendChild(blankField);

            let mainStatus = document.createElement('div');
            mainStatus.className = "ten wide field";
            if (snapshot.val().status === 'Negotiation Received' && snapshot.val().madeBy === 'Me'){
                mainStatus.innerHTML = "<h3>" + "협상 보냄" + "</h3>";
            }
            else{
                mainStatus.innerHTML = "<h3>" + statusEngKor(snapshot.val().status) + "</h3>";
            }
            statusField.appendChild(mainStatus);
            mainform.appendChild(statusField);

            let buttonarea = document.getElementById('offerButtons');
            let firstButton = document.createElement('button');
            firstButton.className = "ui primary button";
            let buttonDiv = document.createElement('div');
            buttonDiv.className = "or";
            let secondButton = document.createElement('button');
            secondButton.className = "ui yellow button";

            if (userid === snapshot.val().madeBy){
                firstButton.innerText = "삭제";
                firstButton.setAttribute('id', 'delete');
                secondButton.innerText = "수정";
                secondButton.setAttribute('id', 'modify');
            }
            else{
                firstButton.innerText = "수락";
                firstButton.setAttribute('id', 'accept');
                secondButton.innerText = "협상";
                secondButton.setAttribute('id', 'negotiate');
                if(isPossible === "false" || isPossible === false){
                    secondButton.className = "ui black button";
                }
            }

            buttonarea.appendChild(firstButton);
            buttonarea.appendChild(buttonDiv);
            buttonarea.appendChild(secondButton);

        }).then(function(){
            document.getElementById('loader').remove();
        });
    }
    else{
        location.href = '/ko/404.html';
    }

    // Section for Accept button
    $(document).on('click', "#accept", function(){
        let reallyaccept = confirm('이 제안을 수락하시겠습니까?');
        if(reallyaccept){
            alert('수락되었습니다.');
            location.href = "/ko/";
        }
        // Not implemented whole accept process yet.
    });

    // Section for Delete button
    $(document).on('click', "#delete", function(){
        let reallyaccept = confirm('이 제안을 삭제하시겠습니까?');
        if(reallyaccept){
            alert('삭제되었습니다.');
            location.href = "/ko/";
        }
        // Not implemented whole delete process yet.
    });

    // Section for Modification button
    $(document).on('click', "#modify", function(){
        if(sessionStorage.getItem('detailtype') === 'Offers'){
            sessionStorage.setItem('type', 'Modify');
        }
        else{
            sessionStorage.setItem('type', 'NegoModify');
        }
        location.href = '/ko/offer.html';
    });

    // Section for Negotiation button
    $(document).on('click', "#negotiate", function(){
        if(document.getElementById('negotiate').className !== "ui black button"){
            sessionStorage.setItem('type', 'Negotiate');
            location.href = '/ko/offer.html';
        }
        else{
            alert("협상이 불가능한 제안입니다.");
        }
    });
});
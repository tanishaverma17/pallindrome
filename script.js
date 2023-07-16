function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChar = listOfChars.reverse();

    var reverseStr = reverseListOfChar.join('');
    return reverseStr;
    //short form--> str.split('').reverse().join('')
}

function isPallindrome(str){
    var reverseString = reverseStr(str);
    if(str === reverseString){
        return true;
    }
    return false;
}
 
function dateToString(date){
    var dateStr = {day:'', month:'', year:''};

    if(date.day<10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month<10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date){
    var dateStr = dateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy   = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy   =  dateStr.month + dateStr.day +dateStr.year.slice(-2);
    var yymmdd   = dateStr.year.slice(-2)+ dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPallindromeForAllFormats(date){  
    var listOfPalindromes = getAllDateFormats(date);
    var flag = false;
    for(var i=0; i<listOfPalindromes.length; i++){
        if(isPallindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

function IsLeapYear(year){
    if(year%400 ===0){
        return true;
    }
    if(year%100=== 0){
        return false;
    }
    if(year%4 === 0){
        return true;
    }
    return false;
}

function GetNextDate(date){
    var day = date.day +1;
    var month = date.month;
    var year = date.year;
    var dayInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month ===2){
        //check for leap year
        if(IsLeapYear(year)){
            if(day>29){
                day =1;
                month++;
            }
        }
        else{
            if(day>28){
                day=1;
                month++;
            }
        }
    }
    else{
        if(day>dayInMonth[month-1]){
            day = 1
            month++;
        }
    }
    
    if(month >12){
        month = 1;
        year++;
    }

    return{
        day:day, month:month, year:year
    }
}

function GetNextPallindrome(date){
    var count =0;
    var nextDate = GetNextDate(date);
    while(1){
        count++;
        var isPallindrome = checkPallindromeForAllFormats(nextDate);
        if(isPallindrome){
            break;
        }
        nextDate = GetNextDate(nextDate);
    }
    return[count,nextDate];
}

function getPreviousDate(date){
    var day = date.day -1;
    var month = date.month;
    var year = date.year;
    var dayInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month ===2){
        //check for leap year
        if(IsLeapYear(year)){
            if(day>29){
                day =1;
                month++;
            }
        }
        else{
            if(day>28){
                day=1;
                month++;
            }
        }
    }
    else{
        if(day>dayInMonth[month-1]){
            day = 1
            month++;
        }
    }
    
    if(month >12){
        month = 1;
        year++;
    }

    return{
        day:day, month:month, year:year
    }
}

function getPrevPallindrome(date){
    var count =0;
    var nextDate = GetNextDate(date);
    while(1){
        count++;
        var isPallindrome = checkPallindromeForAllFormats(nextDate);
        if(isPallindrome){
            break;
        }
        nextDate = GetNextDate(nextDate);
    }
    return[count,nextDate];

}

var dateInputRef = document.querySelector('#input');
var showButton = document.querySelector("#show-btn");
var result = document.querySelector("#result");

function clickHandler(e){
    var bdayStr = dateInputRef.value;
    if(bdayStr !== ''){
        var listOfdate = bdayStr.split('-');
        var date = {
            day: Number(listOfdate[2]),
            month: Number(listOfdate[1]),
            year: Number(listOfdate[0])
        }
    }

    var isPallindrome = checkPallindromeForAllFormats(date);
    if(isPallindrome){
        result.innerText= "Yay! Your Bday is Pallindrome🎊";
    }
    else{
        var [ctr, NextDate] = GetNextPallindrome(date);
        result.innerText = "Your Bday is not a pallindrome. The next Pallindrome date is "+ NextDate.day + "-" + NextDate.month + "-" + NextDate.year + ". You missed it by " + ctr + "days";
    }
}

showButton.addEventListener("click", clickHandler);

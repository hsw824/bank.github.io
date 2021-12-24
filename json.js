const url = "https://raw.githubusercontent.com/jinsoooo49/team4-toyProject/master/json/bank.json";
const option = {
    method : "GET",
};
fetch(url,option)
.then((res)=>res.json())
.then(({bankList})=>makeComponents(bankList.reverse()));

const dateFormatter = (date, i) =>{
  const stdDate ="2021-10-03";
  if(stdDate === date){
    return '오늘';
  }else if(i === 1){
    return '어제';
  }else{
    return `${i}일 전`;
  }
};

const isIncomeColor = (income) => (income === "in" ?"#FF5F00":"#444444");

const addIncomeComma = (d) => {
  const price = addComma(d.price);
  const income = d.income === "in" ? "+" : "";
  return `${income} ${price}`;
};

const addComma = (i) =>{
  const price = i.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return price
}
const amountSameDay = (i, p) =>{
  if(i === "in") return parseInt(p)*-1;
  return parseInt(p);
};

const isIncomeText = (price) => (price < 0? "입금":"지출");

const makeComponents = (data) => {
  // DATE 중복제거
  const dateArr = data.reduce((acc, current) => {
    //만약 {date} 대신 date라고 넣는다면 {date: ~~~, history: ~~~~}의 객체로 전달됩니다 중괄호를 넣으면 바로 date의 value값을 불러올 수 있습니다
      if (acc.findIndex(({ date }) => date === current.date) === -1) {
          acc.push(current);
      }
      return acc;
  }, []);

  const targetUl = document.getElementsByClassName("detail-date-list")[0];
  const secondPage = document.getElementsByClassName("detail-date-list")[1];

  dateArr.forEach((e,i)=>{
    const dateItems = document.createElement('li');
    dateItems.setAttribute("class", "detail-date-item");
    
    
    const calculate = document.createElement('div');
    calculate.setAttribute('class','calculate');
    const dayTitle = document.createElement('span');
    dayTitle.setAttribute("class","day-title");
    dayTitle.innerText = dateFormatter(e.date, i);
    


    const dayAmount = document.createElement('span');
    dayAmount.setAttribute("class", "day-amount");

    calculate.appendChild(dayTitle);
    calculate.appendChild(dayAmount);
    dateItems.appendChild(calculate);

    const dayList = document.createElement("ul");
    dayList.setAttribute('class',"day-list");

    const sameDayData = data.filter((d)=>d.date===e.date);

    let dayAmountText = 0;

    sameDayData.forEach((d)=>{
      const dayContents = document.createElement("li");
      dayContents.setAttribute('class','day-content');

      const contentName = document.createElement("span");
      const contentMoney = document.createElement("span");
      contentName.setAttribute('class','day-content');
      contentMoney.setAttribute('class','content-money');

      contentMoney.style.color = isIncomeColor(d.income);

      contentName.innerText = d.history;
      contentMoney.innerText = addIncomeComma(d);

      dayContents.appendChild(contentName);
      dayContents.appendChild(contentMoney);

      dayList.appendChild(dayContents);

      dayAmountText += amountSameDay(d.income, d.price);
    });
    dayAmount.innerText = `${addComma(
        Math.abs(dayAmountText)
    )}원 ${isIncomeText(dayAmountText)}`;

    dateItems.appendChild(dayList);

    const nodeCopy = dateItems.cloneNode(true);
    secondPage.appendChild(nodeCopy);
    targetUl.appendChild(dateItems);
  })
};

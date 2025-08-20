
const usersObject ={
    user1:{username: 'qosai', password: 'pass1' },
    user2:{username:'ali',password:'pass2'},
    user3:{users:'hamzah',password:'pass3'}
};

// User Authentication
function login(){
    let name=document.getElementById('username').value;
    let pass=document.getElementById('password').value;

    if(!name){
        document.getElementById('message').innerHTML='username is required';
    return;
    }

    if(!pass){
        document.getElementById('message').innerHTML='password is required';
    return;
    }

    for(let key in usersObject){
        if(usersObject[key].username==name&&usersObject[key].password==pass){
            localStorage.setItem('lastuser',name);
           location.href='Dashboard.html';
        }else{
        document.getElementById('message').innerHTML='Invalid username or password';
        }
    } 
}


let income=document.getElementById('income');
let expenses=document.getElementById('expenses');
let balance=document.getElementById('balance');

income.textContent=localStorage.getItem('income')|| 0;
expenses.textContent=localStorage.getItem('expenses')|| 0;
balance.textContent=localStorage.getItem('balance')|| 0;

let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');


// Display summary of income, expenses, and net balance dynamically.
 document.getElementById('btnadd').addEventListener( 'click',function() {
 let selectedType = document.getElementById('type1').value;
 let amount = Number(document.getElementById('amount').value);
 let category = document.getElementById('categoryInput').value;
 let date= document.getElementById('date').value;
 let notes= document.getElementById('notes').value;
   
    if (  selectedType == 'expenses' && (amount + Number(localStorage.getItem('expenses') )) > Number(localStorage.getItem('income'))) {
        alert('You cannot add more because expenses are greater than income!');
        return;
    }

     if (selectedType == 'income') {
        let current = Number(localStorage.getItem('income')) || 0;
        let newIncome = current + amount;
        document.getElementById('income').textContent = newIncome;
        localStorage.setItem('income', newIncome);
    }
     
    if (selectedType == 'expenses') {
    let current = Number(localStorage.getItem('expenses')) || 0;
    let newExpenses = current + amount;
    document.getElementById('expenses').textContent = newExpenses;
    localStorage.setItem('expenses', newExpenses);
}

     if(!amount){
          document.getElementById('error').innerHTML=' Amount is required';
          return;
    }
      if(!date){
          document.getElementById('error').innerHTML=' Date is required';
          return;
    }

    let totalIncome = Number(document.getElementById('income').textContent) || 0;
    let totalExpenses = Number(document.getElementById('expenses').textContent) || 0;

    let netBalance = totalIncome - totalExpenses;
    document.getElementById('balance').textContent = netBalance;
    localStorage.setItem('balance', netBalance);

    transactions.push({
        type: selectedType,
        amount: amount,
        category: category,
        date: date,
        notes: notes
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    })

    // Transaction Table
    let table = document.createElement('table');
function createTable() {

    let body = document.body;
   
    let header = document.createElement('tr');
        let columns = ['Type', 'Amount', 'Category', 'Date', 'Notes'];
    for (let i = 0; i < columns.length; i++) {
        let th = document.createElement('th');
        th.textContent = columns[i];
        header.appendChild(th);
    }
    table.appendChild(header);

    for (let i = 0; i < transactions.length; i++) {
        let row = document.createElement('tr');
        let transaction = transactions[i];
        let values = [transaction.type, transaction.amount, transaction.category, transaction.date, transaction.notes];
        for (let j = 0; j < values.length; j++) {
            let td = document.createElement('td');
            td.textContent = values[j];
            row.appendChild(td);
        }
        table.appendChild(row);
    body.appendChild(table);

     // select category
let categorySelect = document.getElementById('category');

let exists = Array.from(categorySelect.options).some(opt => opt.value === values[2]);

if (!exists) {
  let opt = document.createElement('option');
  opt.textContent = values[2];
  opt.value = values[2]; 
  categorySelect.appendChild(opt);
}

}
    }

 createTable()

 //search function ,remove table 
document.getElementById('search').addEventListener("click",  () =>{
  let category = document.getElementById('category').value;
  let note     = document.getElementById('keyword').value;
  let fromDate = new Date(document.getElementById('fromDate').value).getTime();
  let toDate   = new Date(document.getElementById('toDate').value).getTime();

  let matects = [];
  for (let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    let tDate = new Date(transaction.date).getTime();

    if (category !== 'all' && transaction.category !== category) 
        continue;

    if (note && !String(transaction.notes).includes(note)) 
        continue;

    if (fromDate && tDate < fromDate) 
        continue;

    if (toDate && tDate > toDate)
        continue;
    if(category==='all'){
        matects.push(transaction)
        continue;
    }

    matects.push(transaction);
  }

  Array.from(table.children).slice(1).forEach(tr => tr.remove());

  for (let i = 0; i < matects.length; i++) {
    const row = document.createElement('tr');
    const values = [matects[i].type, matects[i].amount,matects[i].category,matects[i].date,matects[i].notes];

    for (let j = 0; j < values.length; j++) {
      const td = document.createElement('td');
      td.textContent = values[j] ;
      row.appendChild(td);
    }

    table.appendChild(row);
  }
});

function RandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function Chart1(){
const barColors = [];
     const category= []
     const amount= []
    for (let i = 0; i < transactions.length; i++) {
    let t = transactions[i];
    
    if(t.type=='expenses'){
     if(category.length==0) {  
        category.push(t.category)
        amount.push(t.amount)
        barColors.push(RandomColor)
        continue;
    }
    let index=category.indexOf(t.category)
    if(index===-1){
        category.push(t.category)
        amount.push(t.amount)
        barColors.push(RandomColor())

    }else{
        amount[index]+=t.amount
    }
      
    }
           
}

new Chart('myChart', {
  type: 'pie',
  data: {
    labels: category,
    datasets: [{
      backgroundColor: barColors,
      data: amount
    }]
  },
 
    options: {
    title: {
      display: true,
      text: 'spending trends'
    }
  }
});

}
  Chart1()


  //logoutbutton and clear localstorge
document.querySelector('#logout').addEventListener('click',()=>{
    localStorage.clear();
  location.href = 'login.html';
});


//darkmode
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

document.getElementById('darkmode').addEventListener('click',  () =>{
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

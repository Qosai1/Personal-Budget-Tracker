let income=document.getElementById('income');
let expenses=document.getElementById('expenses');
let balance=document.getElementById('balance');
 let table = document.createElement('table');
let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

const usersObject ={
    user1:{username: 'qosai', password: 'pass1' },
    user2:{username:'ali',password:'pass2'},
    user3:{users:'hamzah',password:'pass3'}
};

income.textContent=localStorage.getItem('income')|| 0;
expenses.textContent=localStorage.getItem('expenses')|| 0;
balance.textContent=localStorage.getItem('balance')|| 0;


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
 function logout(){
    localStorage.clear();
    location.href='login.html';
}

// Display summary of income, expenses, and net balance dynamically.
function calc() {
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
    let current = Number(document.getElementById('expenses').textContent) || 0;
    let newExpenses = current + amount;
    document.getElementById('expenses').textContent = newExpenses;
    localStorage.setItem('expenses', newExpenses);
}

    let totalIncome = Number(document.getElementById('income').textContent) || 0;
    let totalExpenses = Number(document.getElementById('expenses').textContent) || 0;

    let netBalance = totalIncome - totalExpenses;
    document.getElementById('balance').textContent = netBalance;
    localStorage.setItem('balance', netBalance);


    

    //  let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push({
        type: selectedType,
        amount: amount,
        category: category,
        date: date,
        notes: notes
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
}

    // Transaction Table

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
        // select gategory 
         let opt=document.createElement('option')
            opt.textContent=values[2]
            document.getElementById('category').appendChild(opt)
            
           const optval=document.createAttribute('value')
           optval.value=values[2]
           opt.setAttributeNode(optval)
        table.appendChild(row);
    }

    body.appendChild(table);
}
 createTable()

document.getElementById('search').addEventListener("click", function () {
  let category = document.getElementById('category').value;
  let note     = document.getElementById('keyword').value;
  let fromDate = new Date(document.getElementById('fromDate').value);
  let toDate   = new Date(document.getElementById('toDate').value);

  for (let i = 0; i < transactions.length; i++) {
    let t = transactions[i];
    let tDate = new Date(t.date);

    
    if (category !== 'all' && t.category !== category) continue;

   
    if (note && !String(t.notes).includes(note)) continue;

   
    if (fromDate && tDate < fromDate) continue;
    if (toDate && tDate > toDate) continue;

    console.log(t);
  }
});


function Cahrt(){
const barColors = ["red", "green","blue","orange","brown"];
     const xValues= []
     const yValues= []
    for (let i = 0; i < transactions.length; i++) {
    let t = transactions[i];
    
    if(t.type=='expenses'){
     if(xValues.length==0) {  
        xValues.push(t.category)
        yValues.push(t.amount)
    }
      
    }
           
}
new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
 
    options: {
    title: {
      display: true,
      text: "Expenses"
    }
  }
});

}
  Cahrt()
   
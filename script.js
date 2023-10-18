function showProfile(){
    document.getElementById('loading').style.display = "block";
    const image = document.querySelector('#image');
    image.src='assets/Img/anonymousImg.png'
    document.getElementById('first-name').textContent='';
    document.getElementById('last-name').textContent='';
    document.getElementById('email').textContent='';
    setTimeout(function(){
        fetch('https://reqres.in/api/users/2')
        .then(response => response.json())
        .then(data => {
            document.getElementById("loading").style.display = "none";
            image.src = data.data.avatar;
            document.getElementById('first-name').textContent=data.data.first_name;
            document.getElementById('last-name').textContent=data.data.last_name;
            document.getElementById('email').textContent=data.data.email;
        })
        .catch(error => console.error(error));
        showStock();
    },1500)   
}


const perPage = 10;
let currentPage =1;
let totalPage;
let input = "";
function showStock(){
    setInterval(function(){
        const searchInput = document.getElementById('searchInput');
        fetch('http://13.212.255.177/api/priceData/technical-test')
        .then(response=>response.json())
        .then(data=>{
            data.sort((a,b) => a.Symbol.localeCompare(b.Symbol));
            const filteredData = data.filter(item => item.Symbol.startsWith(searchInput.value.toUpperCase()));
            if(input!= searchInput.value){
                currentPage=1;
            }
            input = searchInput.value;
            totalPage = Math.ceil(filteredData.length/perPage)
            updateTable(filteredData); 
        })
        .catch(error => console.error(error));
    },500)
}

function updateTable(data) {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const tableBody = document.querySelector('#stock-data tbody');
    
    // Clear the table rows
    tableBody.innerHTML = '';
    
    // Add the rows for the current page
    for (let i = startIndex; i < endIndex && i < data.length; i++) {
      const row = document.createElement('tr');
      const symbolCell = document.createElement('td');
      symbolCell.innerText = data[i].Symbol;
      const nameCell = document.createElement('td');
      nameCell.innerText = parseFloat(data[i].Bid).toFixed(2);
      const priceCell = document.createElement('td');
      priceCell.innerText = parseFloat(data[i].Ask).toFixed(2);
      const changeCell = document.createElement('td');
      changeCell.innerText = parseFloat(data[i].DailyChange).toFixed(2);
      const pg = document.getElementById('pg-number');
      pg.innerText=currentPage;

      row.appendChild(symbolCell);
      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(changeCell);
      tableBody.appendChild(row);
    }
}

function prevPage(){
    if(currentPage>1){
        currentPage--;
    }
}

function nextPage(){
    if(currentPage<totalPage){
        currentPage++;
    }
}



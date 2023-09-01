function displayTable(){
  const tbody = document.querySelector("tbody");
  let n = document.getElementById('number').value
  displayNumbers(n)

  function displayNumbers(n){
    var i=1
    const vList = document.getElementById('list')
    while(i<=10){
      let tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${i}</td>
            <td>${n}</td>
          `;
          tbody.appendChild(tr);
      i++
    }
    document.getElementById("idProcess").innerHTML = "Please wait 5 seconds, processing..."
    number.focus()
      setTimeout(function(){
        number.value = ""
        document.getElementById("idText").innerHTML = ""
        document.getElementById("idProcess").innerHTML = ""
        document.getElementById("list").innerHTML = ""
        document.querySelector(".divTable").innerHTML = ""
      },5000)
    }
  }
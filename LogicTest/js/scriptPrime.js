function checkPrime(){
  let n = document.getElementById('number').value
  if(primeYesNo(n)){
    printPrimeNumbers(n)
  }else{
    number.focus()
    setTimeout(function(){
      number.value = ""
      document.getElementById("idText").innerHTML = ""
    },2000)
  }
  function primeYesNo(n){
    // If number (<= 1) is NOT ok
    if(n <= 1){
      document.getElementById("idText").innerHTML = "Number "+n+" is NOT Prime"
      return false	
    }
    // If number (= 2 or = 3) it's ok
    if(n <= 3){
      document.getElementById("idText").innerHTML = "Number "+n+" is Prime"
      return true
    }
    // If number divide (2 and 3) is NOT ok
    if(n % 2 == 0 || n % 3 == 0){
      document.getElementById("idText").innerHTML = "Number "+n+" is NOT Prime"
      return false
    }
    // Verify all numbers
    for(let i = 5; i * i <= n; i += 6){
      if(n % i == 0 || n % (i + 2) == 0){
        document.getElementById("idText").innerHTML = "Number "+n+" is NOT Prime"
        return false
      }
    }
    document.getElementById("idText").innerHTML = "Number "+n+" is Prime"
    return true
  }

  function verifyPrimeYesNo(n){
    if(n <= 1){
      return false	
    }
    if(n <= 3){
      return true
    }
    if(n % 2 == 0 || n % 3 == 0){
      return false
    }
    for(let i = 5; i * i <= n; i += 6){
      if(n % i == 0 || n % (i + 2) == 0){
        return false
      }
    }
    return true
  }

  function printPrimeNumbers(n){
    var i=1
    const vList = document.getElementById('list')
    while(i<=10){
      if(verifyPrimeYesNo(n)){
        if(i<10){
          vList.innerHTML+="0"+i+" - "+n+"<br>"
        }else{
          vList.innerHTML+=i+" - "+n+"<br>"					
        }
        i++
      }
      n++
    }
    document.getElementById("idProcess").innerHTML = "Please wait 10 seconds, processing..."
    number.focus()
    setTimeout(function(){
      number.value = ""
      document.getElementById("idText").innerHTML = ""
      document.getElementById("idProcess").innerHTML = ""
      document.getElementById("list").innerHTML = ""
    },10000)
  }
}
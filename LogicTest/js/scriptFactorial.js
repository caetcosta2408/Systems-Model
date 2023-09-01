function calculateFactorial(){
  let vNumber = document.getElementById('number').value
  let vAcm = vNumber
  let vCtrl = vNumber
  if(vNumber == 0){
    vAcm = 1
  }else{
    while(vCtrl > 2){
      vCtrl--
      vAcm *= vCtrl
    }				
  }
  document.getElementById("idText").innerHTML = "The Factorial of the number "+vNumber+" is "+vAcm
  document.getElementById("idProcess").innerHTML = "Please wait, processing..."
  number.focus()
  setTimeout(function(){
    number.value = ""
    document.getElementById("idText").innerHTML = ""
    document.getElementById("idProcess").innerHTML = ""
  },5000)
}
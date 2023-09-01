function clickNumber(vNum){
  var vNumber = document.getElementById('result').innerHTML
  document.getElementById('result').innerHTML = vNumber + vNum
}
function calcMatch(){
  var vNumber = document.getElementById('result').innerHTML
  if(vNumber){
    document.getElementById('result').innerHTML = eval(vNumber).toFixed(2)
  }
}
function clean(){
  document.getElementById('result').innerHTML = ""
}
function bck(){
  var vNumber = document.getElementById('result').innerHTML
  document.getElementById('result').innerHTML = vNumber.substring(0, vNumber.length -1)	
}
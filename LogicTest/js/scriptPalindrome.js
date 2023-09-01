function checkPalindrome(){
  document.getElementById('idProcess').innerHTML = "Please wait, processing..."

  let txt = document.getElementById('idString').value
  let txtNew = txt.replace(/[^a-zA-Z0-9]/g,'').toLowerCase()
  let txtLen = txtNew.length
  let halfLen = Math.floor( txtLen / 2)

  for(var i = 0; i < halfLen; i++){
    if(txtNew[i] !== txtNew[txtLen-1-i]){
      document.getElementById('idText').innerHTML = "Word: "+txt+" is NOT a Palindrome"
    }else{
      document.getElementById('idText').innerHTML = "Word: "+txt+" is a Palindrome"
    }			
  }
  idString.focus()
  setTimeout(function(){
    idString.value = ""
    document.getElementById('idText').innerHTML = ""
    document.getElementById('idProcess').innerHTML = ""
  },5000)
}
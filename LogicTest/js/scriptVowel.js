function countVowels() {
  var text = document.getElementById("idString").value

  //Verify vowels in Brazil and USA
  const vowels = text.match(/[aeiouáéíóúâêôãõà]/gi)
  const count = vowels.length

  document.getElementById("idText").innerHTML = "Number of vowels: " + count
  document.getElementById("idProcess").innerHTML = "Please wait, processing..."
  
  idString.focus()
  setTimeout(function(){
    idString.value = ""
    document.getElementById("idText").innerHTML = ""
    document.getElementById("idProcess").innerHTML = ""
  },5000)
}
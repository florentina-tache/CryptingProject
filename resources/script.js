function decrypt(){
        if(document.getElementById("cryptedText").innerHTML != ""){
            document.getElementsByClassName("decryptedText")[0].style.display = "block";
            document.getElementsByClassName("decryptedText")[1].style.display = "block";
        }
    document.getElementById("decryptedText2").innerHTML = decryptedText2;
    document.getElementById("decryptedText").innerHTML = decryptedText;
}

function displayInfo(){
    if(document.getElementsByClassName("playfair")[0].style.display == "block"){
    document.getElementsByClassName("playfair")[0].style.display = "none";
    document.getElementsByClassName("bifid")[0].style.display = "none";

    document.getElementsByTagName("i").style="color:red";
   // document.getElementsByTagName("i")[0].classList.remove('fa fa-chevron-circle-down fa-2x');
   // document.getElementsByTagName("i")[0].classList.add('fa fa-chevron-circle-up fa-2x');

    }
    else{
        document.getElementsByClassName("playfair")[0].style.display = "block";
        document.getElementsByClassName("bifid")[0].style.display = "block";

      // document.getElementsByTagName("i")[0].classList.remove('fa fa-chevron-circle-up fa-2x');
     //document.getElementsByTagName("i")[0].classList.add('fa fa-chevron-circle-down fa-2x');

    }

    document.getElementById("arrow").className= (document.getElementById("arrow").className=="fa fa-chevron-circle-up fa-2x") ? "fa fa-chevron-circle-down fa-2x" : "fa fa-chevron-circle-up fa-2x";

}
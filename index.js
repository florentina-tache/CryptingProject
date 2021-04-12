const express = require('express');
const app = express();
const formidable = require('formidable');

app.use('/resources', express.static('resources'));

app.set('view engine', 'ejs');





app.get('/', function(req, res){
    var word = "";
    var key = "";

    var cryptedText= "";
    var cryptedText2= "";
    var decryptedText= "";
    var decryptedText2= "";
    const fs = require('fs');
    let inputFileContent = fs.readFileSync('./file.txt', 'utf-8');
    inputFileContent = inputFileContent.split("\r\n");
    word = inputFileContent[0];
    key = inputFileContent[1];
    
    res.render('index', {word:word, key:key, cryptedText:cryptedText, cryptedText2:cryptedText2, decryptedText:decryptedText, decryptedText2:decryptedText2});
    });

    var polybiusSquare1 = [];
var polybiusSquare2 = [];


function sliceArray(arr){
    var chunkSize = 2;
    var tempArray = [];
    var chunk;

    for (let i = 0; i < arr.length-1; i += chunkSize) {
        chunk = arr.slice(i, i + chunkSize);
        tempArray.push(chunk);
    }

    return tempArray;
}


function deleteChar(string, index) {
    return string.substring(0, index) + string.substring(index + 1);
  }

function buildingPolybiusSquare(key){

    for(let i=0; i < key.length - 1; i++){
        key = key.replace("j","i");
    }

    for(let i=key.length - 1; i > 0; i--){
        for(let j=i-1; j >= 0; j--){
            if( key[i] == key[j]){
            key = deleteChar(key, i);
            }
        }
    }

    var alphabet = "abcdefghiklmnopqrstuvwxyz";

    var polybiusSquare = []
    for(let i=0; i < 5; i++) {
        polybiusSquare[i] = new Array(5);
    }

    for(let i=0; i < 5; i++){
        for(let j=0; j < 5; j++){
            if(key.length > i*5 + j){
                polybiusSquare[i][j] = key[i*5+j];
                alphabet = alphabet.replace(key[i*5+j],"");
            }
            else{
                polybiusSquare[i][j] = alphabet[i*5+j-key.length];
            }
            
        }
    }
    //console.log(polybiusSquare);
    return polybiusSquare;
}

function cryptingPlayfair(word, key){
    if(word.length % 2 == 1){
        word = word.concat("z");
        //console.log(word);
    }

    var slicedArray = sliceArray(word);

    polybiusSquare1 = buildingPolybiusSquare(key);

    var firstLetterI, firstLetterJ, secondLetterI, secondLetterJ;
    var criptedArray = [];
    for(let k=0; k < slicedArray.length; k++){
        for(let i=0; i < 5; i++){
            for(let j=0; j < 5; j++){
                    if(slicedArray[k][0] == polybiusSquare1[i][j]){
                        firstLetterI = i;
                        firstLetterJ = j;
                    }

                    if(slicedArray[k][1] == polybiusSquare1[i][j]){
                        secondLetterI = i;
                        secondLetterJ = j;
                    }
            }
        }
        if(firstLetterJ == secondLetterJ){ //same column
            if(firstLetterI+1 < 5){
                criptedArray.push(polybiusSquare1[firstLetterI+1][firstLetterJ]);
            }
            else{
                criptedArray.push(polybiusSquare1[0][firstLetterJ]);
            }

            if(secondLetterI+1 < 5){
                criptedArray.push(polybiusSquare1[secondLetterI+1][secondLetterJ]);
            }
            else{
                criptedArray.push(polybiusSquare1[0][secondLetterJ]);
            }
        }
        else if(firstLetterI == secondLetterI){ //same row
            if(firstLetterJ+1 < 5){
                criptedArray.push(polybiusSquare1[firstLetterI][firstLetterJ+1]);
            }
            else{
                criptedArray.push(polybiusSquare1[firstLetterI][0]);
            }

            if(secondLetterJ+1 < 5){
                criptedArray.push(polybiusSquare1[secondLetterI][secondLetterJ+1]);
            }
            else{
                criptedArray.push(polybiusSquare1[secondLetterI][0]);
            }
        }
        else{
            criptedArray.push(polybiusSquare1[firstLetterI][secondLetterJ]);
            criptedArray.push(polybiusSquare1[secondLetterI][firstLetterJ]);
        }
    }

    criptedArray = criptedArray.join('');
    return criptedArray;
}

function decryptingPlayfair(cryptedText, key){
    var slicedArray = sliceArray(cryptedText);
    var firstLetterI, firstLetterJ, secondLetterI, secondLetterJ;
    var decriptedArray = [];
    for(let k=0; k < slicedArray.length; k++){
        for(let i=0; i < 5; i++){
            for(let j=0; j < 5; j++){
                    if(slicedArray[k][0] == polybiusSquare1[i][j]){
                        firstLetterI = i;
                        firstLetterJ = j;
                    }

                    if(slicedArray[k][1] == polybiusSquare1[i][j]){
                        secondLetterI = i;
                        secondLetterJ = j;
                    }
            }
        }
        if(firstLetterJ == secondLetterJ){ //same column
            if(firstLetterI-1 >= 0){
                decriptedArray.push(polybiusSquare1[firstLetterI-1][firstLetterJ]);
            }
            else{
                decriptedArray.push(polybiusSquare1[4][firstLetterJ]);
            }

            if(secondLetterI-1 >= 0 ){
                decriptedArray.push(polybiusSquare1[secondLetterI-1][secondLetterJ]);
            }
            else{
                decriptedArray.push(polybiusSquare1[4][secondLetterJ]);
            }
        }
        else if(firstLetterI == secondLetterI){ //same row
            if(firstLetterJ-1 >= 0){
                decriptedArray.push(polybiusSquare1[firstLetterI][firstLetterJ-1]);
            }
            else{
                decriptedArray.push(polybiusSquare1[firstLetterI][4]);
            }

            if(secondLetterJ-1 >= 0){
                decriptedArray.push(polybiusSquare1[secondLetterI][secondLetterJ-1]);
            }
            else{
                decriptedArray.push(polybiusSquare1[secondLetterI][4]);
            }
        }
        else{
            decriptedArray.push(polybiusSquare1[firstLetterI][secondLetterJ]);
            decriptedArray.push(polybiusSquare1[secondLetterI][firstLetterJ]);
        }
    }

    decriptedArray = decriptedArray.join('');
    return decriptedArray;
}

function cryptingBifidStandard(text){
    polybiusSquare2 = buildingPolybiusSquare("bgwkzqpndsioaxefclumthyvr");
    var criptedArray = [];
    var encryptionRow1 = [], encryptionRow2 = [];
    for(let k=0; k < text.length; k++){
        for(let i=0; i < 5; i++){
            for(let j=0; j < 5; j++){
                if(text[k] == polybiusSquare2[i][j]){
                    encryptionRow1.push(i);
                    encryptionRow2.push(j);
                }
            }
        }
    }

    var slicedEncryptionRow1 = sliceArray(encryptionRow1);
    var slicedEncryptionRow2 = sliceArray(encryptionRow2);

    for(let i=0; i < slicedEncryptionRow1.length; i++){
        criptedArray.push(polybiusSquare2[slicedEncryptionRow1[i][0]][slicedEncryptionRow1[i][1]])
    }

    for(let i=0; i < slicedEncryptionRow2.length; i++){
        criptedArray.push(polybiusSquare2[slicedEncryptionRow2[i][0]][slicedEncryptionRow2[i][1]])
    }

    criptedArray = criptedArray.join('');
    return criptedArray;
}

function decryptingBifidStandard(text){
    var decriptedArray = [];
    var encryptionRow1 = [], encryptionRow2 = [], encryptionRow = [];
    for(let k=0; k < text.length; k++){
        for(let i=0; i < 5; i++){
            for(let j=0; j < 5; j++){
                if(text[k] == polybiusSquare2[i][j]){
                    if( k < parseInt(text.length/2)){
                        encryptionRow1.push(i);
                        encryptionRow1.push(j);
                    }
                    else{
                        encryptionRow2.push(i);
                        encryptionRow2.push(j);
                    }
                }
            }
        }
    }

    for(let i=0; i < encryptionRow1.length; i++){
        encryptionRow.push(encryptionRow1[i]);
        encryptionRow.push(encryptionRow2[i]);
    }
    
    var slicedEncryptionRow = sliceArray(encryptionRow);

    for(let i=0; i < slicedEncryptionRow.length; i++){
        decriptedArray.push(polybiusSquare2[slicedEncryptionRow[i][0]][slicedEncryptionRow[i][1]])
    }

    decriptedArray = decriptedArray.join('');
    return decriptedArray;
}

    function cryptAndDecrypt(word, key){
        var cryptedText = cryptingPlayfair(word, key);
        console.log(cryptedText);
    
        var cryptedText2 = cryptingBifidStandard(cryptedText);
        console.log(cryptedText2);
    
        var decryptedText2 = decryptingBifidStandard(cryptedText2);
        console.log(decryptedText2);
    
        var decryptedText = decryptingPlayfair(decryptedText2, key);
        console.log(decryptedText);
    
        return [cryptedText, cryptedText2, decryptedText2, decryptedText];
    }
    

    function writeInFile(cryptedText, cryptedText2, decryptedText2, decryptedText){
        var fs = require('fs');
        var stream = fs.createWriteStream("out_file.txt");
        stream.once('open', function(fd) {
        stream.write("First encryption: ");
        stream.write(cryptedText);
        stream.write("\nSecond encryption: ");
        stream.write(cryptedText2);
        stream.write("\nSecond decryption: ");
        stream.write(decryptedText2);
        stream.write("\nFirst decryption: ");
        stream.write(decryptedText);
        stream.end();
    });
    }

    app.post("/getinput",function(req, res){
        var formular= formidable.IncomingForm();
    
        formular.parse(req, function(err, campuriText){
            console.log(campuriText.inputText);
            console.log(campuriText.key);
            var texts = [];
            texts = cryptAndDecrypt(campuriText.inputText,campuriText.key);
            var cryptedText= texts[0];
            var cryptedText2= texts[1];
            var decryptedText2= texts[2];
            var decryptedText= texts[3];
            writeInFile(cryptedText, cryptedText2, decryptedText2, decryptedText);
            res.render('index', {word:campuriText.inputText, key:campuriText.key, cryptedText:cryptedText, cryptedText2:cryptedText2, decryptedText2:decryptedText2, decryptedText:decryptedText});
        })
    
    });

app.listen(8080);
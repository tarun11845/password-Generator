const slider=document.querySelector("#slider");
const passwordLenDisplay=document.querySelector("#passLen");
const DisplayPassword=document.querySelector(".displayPassword");
const copyBtn= document.querySelector(".copyButton");
const copyMsg= document.querySelector(".copyMessage");
const UpperCaseCheck= document.querySelector("#upper");
const LowerCaseCheck= document.querySelector("#lower");
const NumberCheck= document.querySelector("#number");
const SymbolCheck= document.querySelector("#symbol");
const passwordIndicator= document.querySelector(".circle");
const generateBtn= document.querySelector(".PasswordGen");

let allcheckBox = document.querySelectorAll("input[type=checkbox]");

let password="";
let passwordlength=10;
 let symbol="~!@#$%^&*()-+={}[]\|?/,<>."
let checkBoxCount=0
setIndicator("#ccc")
// set password length
 function handleSlider(){
    slider.value=passwordlength;
    passwordLenDisplay.innerText=passwordlength;
    const min=slider.min;
    const max=slider.max;
    slider.style.backgroundSize= ((passwordlength-min)*100/(max-min)) +"% 100%"


 }
 handleSlider();


 function setIndicator(color){
     passwordIndicator.style.backgroundColor=color;
     //shadow
     passwordIndicator.style.boxShadow=`0px 0px 12px 1px ${color}`;

 }

 function getRandomInteger(min,max)
 {
    let Random=Math.floor(Math.random()*(max-min))+min; 
    return Random;
 }

 function generateRandomNumber(){
    return getRandomInteger(0,9);

 }
 function generateRandomlowerCase(){
       return String.fromCharCode( getRandomInteger(97,123));

 }

  function generateRandomUpperCase(){
       return String.fromCharCode( getRandomInteger(65,91));

 }
   function generateRandomSymbol(){
      
       return symbol[getRandomInteger(0,symbol.length)];

 }

 function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(UpperCaseCheck.checked) hasUpper=true;
    if(LowerCaseCheck.checked) hasLower=true;
    if(NumberCheck.checked) hasNum=true;
    if(SymbolCheck.checked) hasSym=true;

    if(hasUpper&& hasLower &&(hasNum||hasSym) && passwordlength>=8)
     {
        setIndicator("#0f0");
     }    
     else if((hasLower||hasUpper)&& (hasNum||hasSym)&& passwordlength>=6)
     {
        setIndicator("#ff0");
     }
     else{
        setIndicator("#f00")
     }


 }

 async function copyContent()
 {
   try{
      await  navigator.clipboard.writeText(DisplayPassword.value);
      copyMsg.innerText="copied";
   }
   catch(e)
   {
       copyMsg.innerText="Failed";
   }
   copyMsg.classList.add("active");

   setTimeout(()=>{
      copyMsg.classList.remove("active")
   },2000);
 }   

 slider.addEventListener("input",(e)=>{
      passwordlength=e.target.value;
      handleSlider();
 })

copyBtn.addEventListener("click",()=>{
   if(DisplayPassword.value)
   {
      copyContent();  
   } 
})
function handleCheckBoxChange(){
     checkBoxCount=0;
  allcheckBox.forEach((checkbox) =>{
    if(checkbox.checked){
         checkBoxCount++;
    }

  }) ;
  // special
  if(passwordlength<checkBoxCount){
        passwordlength=checkBoxCount;
         handleSlider();  
      }
   
  
}
allcheckBox.forEach((checkbox)=>{
   checkbox.addEventListener("change",handleCheckBoxChange)
})

function sufflePassword(sufflePassword){
   // fishher Yates Method
   for(let i=sufflePassword.length-1;i>0;i--)
   {
      const j=Math.floor(Math.random()*(i+1));
      const temp=sufflePassword[i];
      sufflePassword[i]=sufflePassword[j];
      sufflePassword[j]=temp;
   }
   let str="";
   sufflePassword.forEach((el)=>(str+=el));
   return str;

}

generateBtn.addEventListener("click",()=>{
   console.log("starting the Journey");
   if(checkBoxCount==0)
       return;

   if(passwordlength<checkBoxCount)
   {
        passwordlength=checkBoxCount;
         handleSlider(); 
   }
   password="";
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(UpperCaseCheck.checked) hasUpper=true;
    if(LowerCaseCheck.checked) hasLower=true;
    if(NumberCheck.checked) hasNum=true;
    if(SymbolCheck.checked) hasSym=true;

    let len=passwordlength;
    let funArr=[];

    if(hasUpper)
    {
       funArr.push(generateRandomUpperCase);
    }
    
    if(hasLower)
    {
       funArr.push(generateRandomlowerCase);
    }

    if(hasNum)
    {
       funArr.push(generateRandomNumber);
    }

    if(hasSym)
    {
       funArr.push(generateRandomSymbol);
    }

// compulsury
for(let i=0;i<funArr.length;i++)
{
   password+=funArr[i]();
   len--;
}   
console.log("compulsury addition done");    
while(len)
{
     let RandomIndex=getRandomInteger(0,funArr.length);
     password+=funArr[RandomIndex]();
     len--;
} 
//password suffelling
password=sufflePassword(Array.from(password));

console.log("Generated password-");
DisplayPassword.value=password;
console.log(DisplayPassword.value);

calcStrength();


})
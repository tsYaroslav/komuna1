'use strict'

// class MemberProto {
// 	constructor(salary){
// 		salary = this.salary;
// 	}
// }

// let member1 = new MemberProto(),
// 	member2 = new MemberProto(),
//  	member3 = new MemberProto(),
// 	member4 = new MemberProto();

// let objArr = [member1, member2, member3, member4];

function toPay(salaryArrValues, salaryArrSum, billsValuesArrey, billsArreySum){
	let toPayArr = [],
		toPayArrProcent = []; 
	for(let i = 0; i < salaryArrValues.length; i++){
		toPayArrProcent[i] = (100 * salaryArrValues[i]) / salaryArrSum; 
		toPayArr[i] = billsArreySum / 100 * toPayArrProcent[i];
	}
	return {toPayArr: toPayArr, toPayArrProcent: toPayArrProcent};
}

let popup = document.querySelector(".member-popup"),
	popupBill = document.querySelector(".bill-popup"),	
	members = document.querySelector(".members"),
	cancel = document.querySelector(".cancel"),
	okForEdit = document.querySelector(".ok-for-edit"),
	okForAdd = document.querySelector(".ok-for-add"),
	addMemberBtn = document.querySelector(".add-member"),
	bills = document.querySelector(".bills"),
	addBillBtn = document.querySelector(".add-bill"),
	okBill = document.querySelector(".ok-bill");

let removeMemberAll = document.querySelectorAll(".remove-member"),
	active = document.querySelector(".active");


// CHECKING IF INPUTS ARE EMPTY 
function inputCheking(input1, input2, inputCaption1, inputCaption2) {
	let errorMessage = document.querySelector(".popup.opened .error-message");
	let inputErrorN = 'Please, enter ' + inputCaption1,
		inputErrorS = 'Please, enter ' + inputCaption2;
	if(!input1) {
		errorMessage.innerHTML = inputErrorN;
		errorMessage.classList.add("blink", "show");
		setTimeout(()=>errorMessage.classList.remove("blink"), 1000);
		return false;
	} else if(!input2) {
		errorMessage.innerHTML = inputErrorS;
		errorMessage.classList.add("blink", "show");
		setTimeout(()=>errorMessage.classList.remove("blink"), 1000);
		return false;
	} else {
		setTimeout(()=>errorMessage.classList.remove("show"), 500);
	}
	return true;
}	

// ADD MEMBER BUTTON
addMemberBtn.addEventListener("click", (e) => {
	// let member5 = new MemberProto();
	popup.classList.add("opened");
    let member = document.querySelector('.members');
	removeMemberAll = document.querySelectorAll(".remove-member");	
	popup.querySelector(".popup-name").value = "";
	popup.querySelector(".popup-salary").value = "";
	popup.querySelector(".ok-for-edit").classList.remove("btn-active");
	popup.querySelector(".ok-for-add").classList.add("btn-active");
	let mlInputs = popup.querySelectorAll(".ml-input");
		mlInputs.forEach((elem) => {
			elem.previousElementSibling.classList.remove("focused");
	});
});

// ADD BILL BUTTON
addBillBtn.addEventListener("click", (e) => {
	popupBill.classList.add("opened");
	popupBill.querySelector(".popup-bill-name").value = "";
	popupBill.querySelector(".popup-bill-summ").value = "";
	let mlInputsBill = popupBill.querySelectorAll(".ml-input");
		mlInputsBill.forEach((elem) => {
			elem.previousElementSibling.classList.remove("focused");
	});
});

// MEMBER: REMOVE
members.addEventListener("click", (e) => {
	let thiss = e.target;
	if(thiss.className === "remove-member"){
		let thiss = e.target;
		let MemberId = +(e.target.closest(".member").id);
		thiss.closest(".member").remove();
		let membersLength = document.querySelectorAll(".member").length;
		if(membersLength < 2) {
			document.querySelector(".members-ww .more-w").classList.remove("show");
		}
	} 
});

// BILL: REMOVE
bills.addEventListener("click", (e) => {
	if(e.target.className === "remove-bill"){
		e.target.closest(".input-w").remove();
		let billsLength = document.querySelectorAll(".bills-ww .input-w").length;
		if(billsLength < 2) {
			document.querySelector(".bills-ww .more-w").classList.remove("show");
		}
	} 
});

// CANCEL & ESC 
let cancelFunc = () => {
	let active = document.querySelectorAll(".active");
	active.forEach((elem) => {
		elem.classList.remove("active");
	});
	let errorMessageC = document.querySelector(".popup.opened .error-message");
	errorMessageC.classList.remove("show");
}

// CANCEL BUTTON
document.body.addEventListener("click", (e) => {
	if(e.target.className === "cancel" || e.target.classList.contains("opened", "popup")) {
		cancelFunc();		
		e.target.closest(".popup").classList.remove("opened");
	}
});

// ESC KEYPRESS
document.addEventListener('keydown', (e) => {
	if (e.keyCode == 27) {
		cancelFunc();
		let popups = document.querySelectorAll(".popup");
		popups.forEach((elem) => {
			elem.classList.remove("opened");
		});
	}
});

// EDIT
members.addEventListener("click", (e) => {
	if(e.target.className === "edit"){
		popup.classList.add("opened");
		let memberName = e.target.closest(".member").dataset.name;
		popup.querySelector(".popup-name").value = memberName;	
		let memberSalary = e.target.closest(".member").dataset.salary;
		popup.querySelector(".popup-salary").value = memberSalary;	
		e.target.closest(".member").classList.add("active");
		popup.querySelector(".ok-for-edit").classList.add("btn-active");
		popup.querySelector(".ok-for-add").classList.remove("btn-active");
		let mlInputs = popup.querySelectorAll(".ml-input");
		mlInputs.forEach((elem) => {
			if(elem.value){
				elem.previousElementSibling.classList.add("focused");
			}
		});			
	} 
});

let newMemberName, newMemberSalary;

// OK FOR ADD MEMBER
okForAdd.addEventListener("click", (e) => {
	newMemberName = popup.querySelector(".popup-name").value;
	newMemberSalary = popup.querySelector(".popup-salary").value;
	let str = `
	    <div class="member" data-name="${newMemberName}" data-salary="${newMemberSalary}">
	      <span class="edit"></span>
	      <div class="m-name-w">
	        <span class="m-name">${newMemberName}</span>
	        <span class="remove-member"></span>             
	        <div>
	          <span class="m-procent">0</span>
	        </div>            
	        <div>
	          <span class="m-topay">0</span>
	          <span>uah</span>
	        </div> 
	      </div>
	      <div class="bar-w">
	        <div class="bar"></div>
	      </div>     
	    </div>
    `;
	if(!inputCheking(newMemberName,newMemberSalary,"member's name.", "member's salary.")) return false;
	members.insertAdjacentHTML ("beforeEnd", str);		
	popup.classList.remove("opened");
	let membersLength = document.querySelectorAll(".member").length;
	if(membersLength > 1) {
		document.querySelector(".members-ww .more-w").classList.add("show");
	}
});

// OK FOR EDIT
okForEdit.addEventListener("click", (e) => {
	let active = document.querySelector(".active");
	newMemberName = popup.querySelector(".popup-name").value;
	newMemberSalary = popup.querySelector(".popup-salary").value;
	active.dataset.name = newMemberName;
	active.dataset.salary = newMemberSalary;
	active.querySelector(".m-name").textContent = newMemberName;
	if(!inputCheking(newMemberName,newMemberSalary,"member's name.", "member's salary.")) return false;
	popup.classList.remove("opened");
	active.classList.remove("active");
});

// OK FOR ADD BILL
okBill.addEventListener("click", (e) => {
    let newBillName = popupBill.querySelector(".popup-bill-name").value;
	let popupBillSumm = popupBill.querySelector(".popup-bill-summ").value;
    let newBillSumm = popupBill.querySelector(".popup-bill-summ").value;    
    if(!inputCheking(newBillName,newBillSumm, "bill's name.", "bill's amount.")) return false;
	let strBill = `
		<div class="input-w">
	        <p class="ml-label focused">${newBillName}</p>    
	        <input type="number" value="${newBillSumm}" class="bill ml-input">
	        <span class="remove-bill"></span>
  		</div>
    `;
	bills.insertAdjacentHTML ("beforeEnd", strBill);	
	popupBill.classList.remove("opened");	
	let membersLength = document.querySelectorAll(".input-w").length;
	if(membersLength > 1) {
		document.querySelector(".bills-ww .more-w").classList.add("show");
	}
});



// FOCUSED
document.body.addEventListener("focusin", (e) => {
	if(e.target.classList.contains("ml-input")){
		let mlLable = e.target.previousElementSibling;
			mlLable.classList.add("focused");
	}
});

// UNFOCUSED
document.body.addEventListener("focusout", (e) => {
	if(e.target.classList.contains("ml-input")){
		let mlLable = e.target.previousElementSibling;
		if(!e.target.value){
			mlLable.classList.remove("focused");
		}
	}
});

// MORE/LESS BUTTONS
document.body.addEventListener('click', (e) =>  {
	if(e.target.classList.contains("more")) {
		let thiss = e.target;
		thiss.classList.toggle("more-active");
		thiss.closest(".button-w").previousElementSibling.classList.toggle("more-opened");
			if(thiss.classList.contains("more-active")) {
				thiss.textContent = "Less";
			} else {thiss.textContent = "More";}
	}
});

// CALCULATE
let wrapper = document.querySelector(".wrapper");
wrapper.addEventListener('click', (e) =>  {
	if(e.target.classList.contains("calculate")) {
		let billsValuesArr = [], 
			salaryArrValues = [];
		let salaryArrSum = 0,
			billsArrSum = 0;
		let procentArr = [];

		let bars =	document.querySelectorAll(".bar");

		let billsArr = document.querySelectorAll(".bill");
		let memberArr = document.querySelectorAll(".member");
		let mTopayArr = document.querySelectorAll(".m-topay");
		let mTopayArrProcent = document.querySelectorAll(".m-procent");
		for(let i = 0; i < billsArr.length; i ++){
			// Pushing bills values into the Arr
			billsValuesArr[i] = +billsArr[i].value;
			// Summing bills values
			billsArrSum += billsValuesArr[i];
		}
		for (let i = 0; i < memberArr.length; i++) {
			// Pushing salary values into the Arr
			salaryArrValues[i] = +memberArr[i].dataset.salary;
			// Summing salary values
			salaryArrSum += salaryArrValues[i];
		}

		let topayArr = toPay(salaryArrValues, salaryArrSum, billsValuesArr, billsArrSum);
		for(let i = 0; i < memberArr.length; i++){
			mTopayArr[i].innerHTML = topayArr.toPayArr[i].toFixed(0);
			mTopayArrProcent[i].innerHTML = ("(" + topayArr.toPayArrProcent[i].toFixed(0) + "%)");
			bars[i].style.width = (topayArr.toPayArrProcent[i].toFixed(0) + "%");
		}
		document.querySelector(".members-w").classList.add("more-opened");
		document.querySelector(".members-ww .more").classList.add("more-active")
		document.querySelector(".members-ww .more").textContent = "Less";
	}
});

/* SCROLL TO TOP */
document.querySelector(".wrapper").addEventListener('click', (e) => {
	if(e.target.classList.contains("calculate")) {
		window.scrollTo({
		    top: 0,
		    behavior: "smooth"
		});
	}
});


'use strict'

/* dark mode */
if(Number(localStorage.darkMode) === 1) {
	body.classList.add("dark-mode");
	document.querySelector('#darkmode-switch').setAttribute("checked", "checked");
}
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
		toPayArrProcent[i] = ((100 * salaryArrValues[i]) / salaryArrSum).toFixed(0); 
		toPayArr[i] = (billsArreySum / 100 * toPayArrProcent[i]).toFixed(1);
	}
	return {toPayArr: toPayArr, toPayArrProcent: toPayArrProcent};
}

let popup = document.querySelector(".member-popup"),
	popupBill = document.querySelector(".bill-popup"),
	popupAbout = document.querySelector(".about-popup"),	
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
		setTimeout(() => errorMessage.classList.remove("blink"), 1000);
		return false;
	} else if(!input2) {
		errorMessage.innerHTML = inputErrorS;
		errorMessage.classList.add("blink", "show");
		setTimeout(() => errorMessage.classList.remove("blink"), 1000);
		return false;
	} else {
		setTimeout(()=>errorMessage.classList.remove("show"), 500);
	}
	return true;
}	

// ADD MEMBER BUTTON
addMemberBtn.addEventListener("click", e => {
	// let member5 = new MemberProto();
	popup.querySelector("h2").textContent = "Add new member";
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
addBillBtn.addEventListener("click", e => {
	popupBill.classList.add("opened");
	popupBill.querySelector(".popup-bill-name").value = "";
	popupBill.querySelector(".popup-bill-summ").value = "";
	let mlInputsBill = popupBill.querySelectorAll(".ml-input");
		mlInputsBill.forEach(elem => {
			elem.previousElementSibling.classList.remove("focused");
	});
});

// MEMBER: REMOVE
members.addEventListener("click", e => {
	let thiss = e.target;
	if(thiss.className === "remove-member"){
		thiss.closest(".member").remove();
		let membersLength = document.querySelectorAll(".member").length;
		if(membersLength < 2) {
			document.querySelector(".members-ww .more-w").classList.remove("show");
		}
	} 
});

// BILL: REMOVE
bills.addEventListener("click", e => {
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
	active.forEach(elem => {
		elem.classList.remove("active");
	});
	let errorMessageC = document.querySelector(".popup.opened .error-message");
	errorMessageC.classList.remove("show");
}

// CANCEL BUTTON
document.body.addEventListener("click", e => {
	let thiss = e.target;		
	if(thiss.className === "cancel" || thiss.classList.contains("opened", "popup")) {
		cancelFunc();		
		e.target.closest(".popup").classList.remove("opened");
	}
});

// ESC KEYPRESS
document.addEventListener('keydown', e => {
	if (e.keyCode == 27) {
		cancelFunc();
		let popups = document.querySelectorAll(".popup");
		popups.forEach((elem) => {
			elem.classList.remove("opened");
		});
	}
});

// EDIT
members.addEventListener("click", e => {
	if(e.target.className === "edit"){
		popup.classList.add("opened");
		popup.querySelector("h2").textContent = "Edit member info";
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
okForAdd.addEventListener("click", e => {
	newMemberName = popup.querySelector(".popup-name").value;
	newMemberSalary = popup.querySelector(".popup-salary").value;
	let str = `
	    <div class="member" data-name="${newMemberName}" data-salary="${newMemberSalary}">
	      <span class="edit">
			<svg class="gear">
              <use xlink:href="app/img/sprite.svg#gear"></use>
            </svg>
	      </span>
	      <div class="m-name-w">
	        <span class="m-name">${newMemberName}</span>
	        <span class="remove-member"></span>             
	        <div>
	          <span class="m-procent">(0%)</span>
	        </div>            
	        <div>
	          <span class="m-topay">0</span>
	          <span>$</span>
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
okForEdit.addEventListener("click", e => {
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
okBill.addEventListener("click", e => {
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
document.body.addEventListener("focusin", e => {
	if(e.target.classList.contains("ml-input")){
		let mlLable = e.target.previousElementSibling;
			mlLable.classList.add("focused");
	}
});

// UNFOCUSED
document.body.addEventListener("focusout", e => {
	if(e.target.classList.contains("ml-input")){
		let mlLable = e.target.previousElementSibling;
		if(!e.target.value){
			mlLable.classList.remove("focused");
		}
	}
});

// MORE/LESS BUTTONS
document.body.addEventListener('click', e =>  {
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
let wrapper = document.querySelector("body");
wrapper.addEventListener('click', e =>  {
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
			mTopayArr[i].innerHTML = topayArr.toPayArr[i];
			mTopayArrProcent[i].innerHTML = ("(" + topayArr.toPayArrProcent[i] + "%)");
			bars[i].style.width = (topayArr.toPayArrProcent[i] + "%");
		}
		document.querySelector(".members-w").classList.add("more-opened");
		document.querySelector(".members-ww .more").classList.add("more-active")
		document.querySelector(".members-ww .more").textContent = "Less";
		localStorageData(topayArr.toPayArr, topayArr.toPayArrProcent);
	}
});

/* LOCAL STORAGE */
function localStorageData(topayArr, toPayArrProcent){
	/* Geathering all member data and saving to the localstorage */
	let	memberAll = document.querySelectorAll(".member");
	let mNamesArr = [],
		mSalariesArr = [];
	for(let i = 0; i < memberAll.length; i++){
		mNamesArr[i] = memberAll[i].dataset.name;
		mSalariesArr[i] = memberAll[i].dataset.salary;
	}
	let mObj = {
		mn: mNamesArr,
		ms: mSalariesArr,
		mp: toPayArrProcent,
		mtp: topayArr
	};
	localStorage.mNames = JSON.stringify({mNamesP: mObj});

	/* Geathering all bills data and saving to the localstorage */
	let billAll = document.querySelectorAll(".bills .input-w");
	let billNames = [];
	let billValues = [];
	for(let i = 0; i < billAll.length; i++){
		billNames[i] = billAll[i].querySelector(".ml-label").textContent;
		billValues[i] = billAll[i].querySelector(".ml-input").value;
	}
	let bObj = {
		bn: billNames,
		bv: billValues
	};
	localStorage.bNames = JSON.stringify({bNamesP: bObj});
}

window.onload = () => {
	(function (){
		// if(Number(localStorage.darkMode) === 1) {
		// 	body.classList.add("dark-mode");
		// 	document.querySelector('#darkmode-switch').setAttribute("checked", "checked");
		// }
		// preloader
		document.body.classList.add('loaded-hiding');
		window.setTimeout(function () {
		  document.body.classList.add('loaded');
		  document.body.classList.remove('loaded-hiding');
		}, 500);
		
		// Reading members from locastorage data and inserting it to html 
		let lsMobj = JSON.parse(localStorage.mNames);
		members.innerHTML = "";	
		for(let i = 0; i < (lsMobj.mNamesP.mn).length; i++){
			let str = `
				<div class="member" data-name="${lsMobj.mNamesP.mn[i]}" data-salary="${lsMobj.mNamesP.ms[i]}">
				  <span class="edit">
				    <svg class="gear">
                      <use xlink:href="app/img/sprite.svg#gear"></use>
                    </svg>
                  </span>
				  <div class="m-name-w">
				    <span class="m-name">${lsMobj.mNamesP.mn[i]}</span>
				    <span class="remove-member"></span>             
				    <div>
				      <span class="m-procent">(${(lsMobj.mNamesP.mp[i])}%)</span>
				    </div>            
				    <div>
				      <span class="m-topay">${(lsMobj.mNamesP.mtp[i])}</span>
				      <span>$</span>
				    </div> 
				  </div>
				  <div class="bar-w">
				    <div class="bar" style="width: ${(lsMobj.mNamesP.mp[i])}%"></div>
				  </div>     
				</div>
			`;
		  members.insertAdjacentHTML ("beforeEnd", str);	
		}

		// Reading bills from locastorage data and inserting it to html
		let lsBobj =  JSON.parse(localStorage.bNames);
		bills.innerHTML = "";	
		for(let i = 0; i < (lsBobj.bNamesP.bn).length; i++){
			let strBill = `
				<div class="input-w">
			        <p class="ml-label focused">${lsBobj.bNamesP.bn[i]}</p>    
			        <input type="number" value="${lsBobj.bNamesP.bv[i]}" class="bill ml-input">
			        <span class="remove-bill"></span>
		  		</div>
		    `;
			bills.insertAdjacentHTML ("beforeEnd", strBill);			
		}
	}());

};

/* DARK MODE */
const logo = document.querySelector(".logo");
logo.addEventListener('click', () => {
	popupAbout.classList.add("opened");
});

const darkMode = document.querySelector("#darkmode-switch");
darkMode.addEventListener('click', () => {
	body.classList.toggle("dark-mode");
	if(body.classList.contains("dark-mode")){
		localStorage.darkMode = 1;
	} else {
		localStorage.darkMode = 0;
	}
});



/* TOOLTIP */
logo.addEventListener('mouseover', () => {
	document.querySelector(".tooltip").classList.add("visible");
});
logo.addEventListener('mouseleave', () => {
	document.querySelector(".tooltip").classList.remove("visible");
});


/* SCROLL TO TOP */

// For mobile using native scrollbar and scroll to top
// if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
// 	document.querySelector("body").addEventListener('click', (e) => {
// 		if(e.target.classList.contains("calculate")) {
// 			window.scrollTo({
// 			    top: 0,
// 			    behavior: "smooth"
// 			});
// 		}
// 	});
// } 
// For desktop using custom scrollbar and scroll to top
// else {
// 	let scrollbar = Scrollbar.init(document.querySelector('.wrapper'),{
// 		damping: 0.1,
// 		alwaysShowTracks: true
// 	});
// 	document.querySelector("body").addEventListener('click', e => {
// 		if(e.target.classList.contains("calculate")) {
// 			scrollbar.scrollTo(0, 0, 250);
// 		}
// 	}); 
// }

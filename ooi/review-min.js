function review_page_load_complete(){$_GET=getParams(),document.querySelectorAll("input[name='rate']").forEach((e=>{e.addEventListener("change",(function(e){document.querySelector("input[name='rating']").value=e.target.value}))})),document.getElementById("star5").click(),checkExistAndInvoke("review-button",(function(e){e.addEventListener("click",(function(e){e.preventDefault(),post()}))}))}function post(){var e=!0,t=document.querySelectorAll(".form-control");for(const n in t)if(Object.hasOwnProperty.call(t,n)){const a=t[n];validate(a.name)?a.classList.remove("is-invalid"):(a.classList.add("is-invalid"),e=!1)}if(!e)return;var n={};for(const e in t)if(Object.hasOwnProperty.call(t,e)){const a=t[e];n[a.name]=a.value}let a="default";"undefined"!=typeof product?a=product:$_GET.product&&(a=$_GET.product),n.product=a;let o="en";"undefined"!=typeof lang?o=lang:$_GET.lang&&(o=$_GET.lang),n.lang=o;var r=JSON.stringify(n),s=new XMLHttpRequest;s.open("POST",`${API}/review`),s.onreadystatechange=function(){4==s.readyState&&200==s.status&&checkExistAndInvoke("messageModal",(function(e){var t=new bootstrap.Modal(e);if(200==s.status)e.addEventListener("hidden.bs.modal",(function(e){checkExistAndInvoke("frmReview",(function(e){e.reset()})),document.forms[0].classList.remove("was-validated"),checkExistAndInvoke("star5",(function(e){e.click()}))})),t.show();else if(500==s.status&&s.response){resp=JSON.parse(s.response);var n=resp.message;alert("Request failed.  Returned status of "+n)}}))},s.setRequestHeader("Content-Type","application/json;charset=UTF-8"),s.send(r)}function validate(e){var t=document.forms.frmReview[e].value;if(null==t||""==t)return!1;if("email"==e){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)}return"rating"!=e||!(t<1||t>5)}window.attachEvent?window.attachEvent("onload",review_page_load_complete):window.addEventListener?window.addEventListener("load",review_page_load_complete,!1):document.addEventListener("load",review_page_load_complete,!1);
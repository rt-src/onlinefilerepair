Array.prototype.last||(Array.prototype.last=function(){return this[this.length-1]});const BaseUrl="https://online-file-repair.com",API="https://api.onlinefile.repair",debug=!1;function get(e){return new Promise((function(t,n){var r=new XMLHttpRequest;r.open("GET",e,!0),r.addEventListener("load",(function(){r.status<400?t(r.responseText):n(r)})),r.addEventListener("error",(function(){n(new Error("Network error"))})),r.send(null)}))}function getParams(){for(var e=[],t=window.location.search.substr(1).split("&"),n=0;n<t.length;n++){var r=t[n].split("=");e[decodeURIComponent(r[0]).toLowerCase()]=decodeURIComponent(r[1])}return e}function checkExistAndInvoke(e,t){var n=document.getElementById(e);n&&t(n)}$_GET=[],"undefined"!=typeof baseUrl?nextBasePage=baseUrl:nextBasePage=BaseUrl;
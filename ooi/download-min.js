function loadDownloadPageInfo(e){getDownloadInfo(e)}function result_page_load_complete(){if($_GET=getParams(),$_GET&&$_GET.order_id)debug,getCustomIdByOrderId($_GET.order_id);else if($_GET&&$_GET.customid)sessionStorage.setItem("online-file-fix.com.lastcustomid",$_GET.customid),loadDownloadPageInfo($_GET.customid);else{const e=sessionStorage.getItem("online-file-fix.com.lastcustomid");e&&(window.location.href+=`?customid=${e}`)}}function getDownloadInfo(e){"undefined"!=typeof debug&&debug;var o=new XMLHttpRequest;o.open("GET",`${API}/files/download/info/${e}`,!0),o.onreadystatechange=function(){4==o.readyState&&200==o.status&&o.response&&(resp=JSON.parse(o.response),"undefined"!=typeof debug&&debug,resp&&resp.count>0&&(checkExistAndInvoke("download-div",(e=>{e.removeAttribute("hidden")})),checkExistAndInvoke("download-url",(o=>{o.href=`${API}/Files/download/${e}?token=${resp.token}`}))))},o.onload=function(){4==o.readyState&&200!=o.status&&(o.responseText.includes("not payed")?window.location=nextBasePage+"/payment.html?customid="+e:o.responseText.includes("was deleted")&&(window.location=nextBasePage+"/deleted-file.html"))},o.send()}function getCustomIdByOrderId(e){debug;var o=new XMLHttpRequest;o.open("GET",`${API}/payment/getcustomid?orderId=${e}`,!0),o.onreadystatechange=function(){4==o.readyState&&200==o.status&&o.response&&(resp=JSON.parse(o.response),debug,resp&&resp.success&&loadDownloadPageInfo(resp.customId))},o.send()}$_GET=[],window.attachEvent?window.attachEvent("onload",result_page_load_complete):window.addEventListener?window.addEventListener("load",result_page_load_complete,!1):document.addEventListener("load",result_page_load_complete,!1);
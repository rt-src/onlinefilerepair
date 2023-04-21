const allowedExt=["ai","pdf","rtf","doc","docx","dot","dotx","xsl","xls","xlt","xlsx","xlsm","xltm","xltx","xlam","dbf","ppt","pptx","mpp","dbx","psd","ost","pst","dwg","cdr","mdb","accdb"];Dropzone.autoDiscover=!1;var isEmailValid=!1,isFileValid=!1;function validateEmail(){var e=!0,n="",t=document.getElementById("Email").value;t&&0!=t.length||(e=!1,n="Empty email");return/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(String(t).toLowerCase())||(e=!1,n="Incorrect email"),isEmailValid=e,{ok:e,failMessage:n}}function validateFile(e){var n=!0,t="";e&&0!=e.size||(n=!1,t="Empty file");var i=e.name.split(".").last();return-1==allowedExt.indexOf(i.toLowerCase())&&(n=!1,t="Not Allowed type"),isFileValid=n,{ok:n,failMessage:t}}function inputEmail(e){"undefined"!=typeof debug&&debug;validateEmail();isEmailValid&&isFileValid?checkExistAndInvoke("submit_file",(function(e){e.disabled=!1})):checkExistAndInvoke("submit_file",(function(e){e.disabled=!0}))}var myDropzone=new Dropzone("#uploader",{url:`${API}/files/upload`,paramName:"file",chunking:!0,timeout:18e4,chunkSize:26214400,parallelChunkUploads:!0,retryChunks:!0,maxFiles:1,clickable:".fileinput-button",autoProcessQueue:!1,init:function(){dzClosure=this,checkExistAndInvoke("submit_file",(function(e){e.addEventListener("click",(function(n){"undefined"!=typeof debug&&debug;validateEmail();n.preventDefault(),n.stopPropagation(),isEmailValid&&isFileValid?dzClosure.processQueue():(e.disabled=!0,"undefined"!=typeof debug&&debug)}))})),checkExistAndInvoke("Email",(function(e){e.addEventListener("change",inputEmail),e.addEventListener("input",inputEmail),e.addEventListener("propertychange",inputEmail)}))},addedfile:function(...e){"undefined"!=typeof debug&&debug},accept:function(e,n){"undefined"!=typeof debug&&debug;var t=validateFile(e);t.ok?checkExistAndInvoke("check",(function(e){e.removeAttribute("hidden")})):checkExistAndInvoke("check",(function(e){e.setAttribute("hidden",!0)})),isEmailValid&&isFileValid?(checkExistAndInvoke("submit_file",(function(e){e.disabled=!1})),n()):(checkExistAndInvoke("submit_file",(function(e){e.disabled=!0})),n(t.failMessage))},params:function(e,n,t){return t?{_chunkNumber:t.index,_uuid:t.file.upload.uuid}:{_chunkNumber:0,_uuid:e[0].upload.uuid}},sending:function(e,n,t){"undefined"!=typeof debug&&debug,checkExistAndInvoke("offline",(function(e){e.setAttribute("hidden",!0)})),checkExistAndInvoke("step_1",(function(e){e.setAttribute("hidden",!0)})),checkExistAndInvoke("step_2",(function(e){e.removeAttribute("hidden")})),checkExistAndInvoke("progress-text",(function(e){e.innerText="Uploading file"})),checkExistAndInvoke("s1",(function(e){e.classList.add("d-none","d-lg-block")})),checkExistAndInvoke("s2",(function(e){e.classList.remove("d-none","d-lg-block")})),checkExistAndInvoke("sl2",(function(e){e.classList.add("active")})),checkExistAndInvoke("c2",(function(e){e.classList.add("active")}))},uploadprogress:function(e,n,t){"undefined"!=typeof debug&&debug,100!=n&&setRepairProgress(n)},success:function(e){"undefined"!=typeof debug&&debug,sendComplete(e)},complete:function(...e){"undefined"!=typeof debug&&debug,myDropzone.removeAllFiles(!0)},dictDefaultMessage:""});function setRepairProgress(e){const n=Math.floor(e);checkExistAndInvoke("progress-bar",(function(e){e.style.width=n+"%"})),checkExistAndInvoke("result-progress",(function(e){e.innerText=n+"%"}))}function sendComplete(e){"undefined"!=typeof debug&&debug;var n=document.getElementById("Email").value;let t="en";"undefined"!=typeof lang&&(t=lang);var i=new FormData;i.append("_uuid",e.upload.uuid),i.append("_filename",e.name),i.append("_totalChunkCount",e.upload.totalChunkCount),i.append("_email",n),i.append("_lang",t),i.append("_connectionId",connection.connectionId);var o=new XMLHttpRequest;o.open("POST",`${API}/files/finished`),o.onreadystatechange=function(){4==o.readyState&&200==o.status&&o.response&&(resp=JSON.parse(o.response),"undefined"!=typeof debug&&debug,checkExistAndInvoke("progress-text",(function(e){e.innerText="Repairing file"})))},o.send(i)}document.getElementsByClassName("dz-button")[0].hidden=!0;const connection=(new signalR.HubConnectionBuilder).withUrl(`${API}/repair_hub`).configureLogging(signalR.LogLevel.Information).withAutomaticReconnect().build();async function start(){try{await connection.start({withCredentials:!1})}catch(e){setTimeout(start,5e3)}}connection.on("FileProcessInfo",(function(e){if(fileRepairInfo=JSON.parse(e),"undefined"!=typeof debug&&debug,fileRepairInfo&&(setRepairProgress(fileRepairInfo.percent),checkExistAndInvoke("progress-text",(function(e){e.innerText=fileRepairInfo.state})),fileRepairInfo.complete))if(fileRepairInfo.success){"undefined"!=typeof debug&&debug,connection.onclose=null,connection.stop();let e="result.html";"undefined"!=typeof resultUrl&&(e=resultUrl),window.location=nextBasePage+"/"+e+"?customid="+fileRepairInfo.customId}else checkExistAndInvoke("step_2_percent",(function(e){e.setAttribute("hidden",!0)})),checkExistAndInvoke("step_2_progress",(function(e){e.setAttribute("hidden",!0)})),checkExistAndInvoke("step_2_text",(function(e){e.setAttribute("hidden",!0)})),checkExistAndInvoke("step_2_fail_data",(function(e){e.removeAttribute("hidden")})),checkExistAndInvoke("step_2_fail_again",(function(e){e.removeAttribute("hidden")})),checkExistAndInvoke("offline",(function(e){e.setAttribute("hidden",!0)}))})),connection.onclose(start),start();
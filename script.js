// All profiles below are fictional demo records. Do not replace with real personal/health data.
const donors = [
 {id:"LL-1042",name:"Aarav Mehta",blood:"O+",area:"Indiranagar",available:true,verified:true,expires:"2026-12-05",lastUpdated:"Today"},
 {id:"LL-1088",name:"Diya Nair",blood:"A+",area:"Whitefield",available:true,verified:true,expires:"2026-11-28",lastUpdated:"Today"},
 {id:"LL-1120",name:"Kabir Rao",blood:"B+",area:"Bengaluru North",available:false,verified:false,expires:"2026-11-20",lastUpdated:"Yesterday"},
 {id:"LL-1156",name:"Mira Shah",blood:"AB+",area:"Koramangala",available:true,verified:true,expires:"2026-12-02",lastUpdated:"Today"},
 {id:"LL-1191",name:"Ishaan Das",blood:"O-",area:"Jayanagar",available:true,verified:false,expires:"2026-11-30",lastUpdated:"Today"},
 {id:"LL-1214",name:"Anaya Iyer",blood:"B-",area:"Rajajinagar",available:true,verified:true,expires:"2026-12-01",lastUpdated:"Today"},
 {id:"LL-1260",name:"Rehan Khan",blood:"A-",area:"Electronic City",available:false,verified:true,expires:"2026-11-22",lastUpdated:"2 days ago"},
 {id:"LL-1293",name:"Tara Menon",blood:"AB-",area:"Indiranagar",available:true,verified:true,expires:"2026-12-04",lastUpdated:"Today"},
 {id:"LL-1327",name:"Vivaan Joshi",blood:"O+",area:"Whitefield",available:true,verified:false,expires:"2026-11-27",lastUpdated:"Today"},
 {id:"LL-1361",name:"Sana Ali",blood:"A+",area:"Koramangala",available:false,verified:true,expires:"2026-11-19",lastUpdated:"Yesterday"},
 {id:"LL-1405",name:"Neil Thomas",blood:"B+",area:"Jayanagar",available:true,verified:true,expires:"2026-12-03",lastUpdated:"Today"},
 {id:"LL-1449",name:"Kiara Sen",blood:"O-",area:"Bengaluru North",available:true,verified:true,expires:"2026-12-06",lastUpdated:"Today"}
];
const $ = id => document.getElementById(id);
let activeDonor = null;
let filtered = [...donors];

function render(){
 const blood=$("bloodGroup").value, area=$("location").value, status=$("availability").value;
 filtered=donors.filter(d=>(!blood||d.blood===blood)&&(!area||d.area===area)&&(status==="all"||(status==="available"?d.available:!d.available)));
 const sort=$("sortBy").value;
 if(sort==="name") filtered.sort((a,b)=>a.name.localeCompare(b.name));
 if(sort==="area") filtered.sort((a,b)=>a.area.localeCompare(b.area));
 if(sort==="match") filtered.sort((a,b)=>(Number(b.available)-Number(a.available))||(Number(b.verified)-Number(a.verified)));
 $("resultCount").textContent=`${filtered.length} donor${filtered.length===1?"":"s"}`;
 $("donorGrid").innerHTML=filtered.map(d=>card(d)).join("");
 $("emptyState").hidden=filtered.length!==0;
 $("donorGrid").hidden=filtered.length===0;
 $("matchNotice").hidden=!blood;
 if(blood){
   const count=filtered.filter(d=>d.available).length;
   $("matchNotice").textContent=`Showing ${filtered.length} profile(s) with blood group ${blood}${area?` in ${area}`:""}; ${count} currently marked available in this demo. This is a directory filter, not medical compatibility confirmation.`;
 }
}
function card(d){
 return `<article class="donor-card"><div class="card-top"><div class="blood-badge">${d.blood}</div><span class="status ${d.available?"":"off"}">${d.available?"● Available":"○ Unavailable"}</span></div><h3>${d.name}</h3><div class="donor-id">${d.id}</div><div class="donor-meta"><span>⌖ ${d.area}</span><span>◷ Updated ${d.lastUpdated}</span></div><div class="card-bottom"><span class="${d.verified?"verified":"unverified"}">${d.verified?"✓ Profile marked verified":"◇ Not verified"}</span><button class="view-btn" data-id="${d.id}">View match →</button></div></article>`;
}
function showDonor(id){
 activeDonor=donors.find(d=>d.id===id); if(!activeDonor)return;
 const d=activeDonor, blood=$("bloodGroup").value, area=$("location").value;
 const criteria=[`Blood group: ${d.blood}${blood?` — ${d.blood===blood?"matches your filter":"does not match your selected filter"}`:" — shown because no blood group filter is selected"}`,`Location: ${d.area}${area?` — ${d.area===area?"matches your filter":"does not match your selected area"}`:" — no area filter selected"}`,`Availability: ${d.available?"marked available":"marked unavailable"} in this sample profile`,`Profile status: ${d.verified?"marked verified (demo flag)":"not verified"}`,`Sample listing expiry: ${new Date(d.expires+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}`];
 $("modalContent").innerHTML=`<div class="modal-profile"><div class="blood-badge">${d.blood}</div><div><h2 id="modalName">${d.name}</h2><p>${d.id} · ${d.area}</p></div></div><p class="modal-copy">Review why this sample profile appears in the directory. These criteria are for demonstration only and do not establish medical suitability.</p><div class="criteria"><h4>Match criteria & profile details</h4><ul>${criteria.map(c=>`<li>${c}</li>`).join("")}</ul></div>${d.available?`<form class="request-form" id="requestForm"><h3>Send a simulated contact request</h3><p class="modal-copy">Use fictional requester details only. No message is sent to a real person.</p><label for="requester">Your display name</label><input id="requester" maxlength="40" required placeholder="e.g. Demo requester"><label for="reason">Short request note</label><textarea id="reason" maxlength="180" required placeholder="Please contact me regarding a blood donation request..."></textarea><button class="primary-btn" type="submit">Submit demo request →</button></form>`:`<p class="modal-copy"><strong>This profile is marked unavailable.</strong> You can inspect the criteria, but the contact-request action is disabled for this sample record.</p>`}<p class="modal-foot">Privacy: no phone number, email address, or real health information is stored or displayed. A real implementation would require consent, authentication, secure storage, and verification.</p>`;
 $("donorModal").hidden=false;
 const form=$("requestForm"); if(form)form.addEventListener("submit",submitRequest);
}
function submitRequest(e){
 e.preventDefault(); const requester=$("requester").value.trim(), reason=$("reason").value.trim();
 if(!requester||!reason)return;
 const requestId="REQ-"+Math.random().toString(36).slice(2,8).toUpperCase();
 $("modalContent").innerHTML=`<div class="request-success"><div class="success-icon">✓</div><h2>Request simulated!</h2><p>Your demo contact request for <strong>${activeDonor.name}</strong> has been recorded in this page session. No real donor was contacted.</p><div class="request-id">${requestId}</div><p>Requester: ${escapeHtml(requester)}<br>Donor ID: ${activeDonor.id}</p><button class="primary-btn" id="doneBtn">Back to directory</button></div>`;
 $("doneBtn").addEventListener("click",closeModal);
 showToast("Demo request submitted successfully");
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function closeModal(){$("donorModal").hidden=true;activeDonor=null;}
let toastTimer;
function showToast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2600);}
function reset(){ $("bloodGroup").value="";$("location").value="";$("availability").value="all";$("sortBy").value="match";render(); }
$("searchBtn").addEventListener("click",render);
["bloodGroup","location","availability","sortBy"].forEach(id=>$(id).addEventListener("change",render));
$("resetBtn").addEventListener("click",reset);$("emptyReset").addEventListener("click",reset);
$("donorGrid").addEventListener("click",e=>{const btn=e.target.closest("[data-id]");if(btn)showDonor(btn.dataset.id);});
$("closeModal").addEventListener("click",closeModal);
$("donorModal").addEventListener("click",e=>{if(e.target===$("donorModal"))closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
$("stat-total").textContent=donors.length;$("stat-available").textContent=donors.filter(d=>d.available).length;
render();

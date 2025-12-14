const WEBHOOK_URL = "https://discord.com/api/webhooks/1449459284709740545/xWFvYHVzlY9_Sq6VV5xqoRCL1nJw2cMneuEHbL33AW5-zdErKChgWl-Ct5KRHBJ_0v5_";

const cursor=document.querySelector(".cursor");
document.addEventListener("mousemove",e=>{
  cursor.style.left=e.clientX+"px";
  cursor.style.top=e.clientY+"px";
});

/* PARTICLES */
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
resize();addEventListener("resize",resize);
const particles=Array.from({length:120},()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  dx:(Math.random()-.5)*.6,
  dy:(Math.random()-.5)*.6
}));
(function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="rgba(255,0,0,.7)";
  particles.forEach(p=>{
    p.x+=p.dx;p.y+=p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
    ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill();
  });
  requestAnimationFrame(animate);
})();

/* CHECKOUT */
let selectedItem={};

function hideAll(){
  document.querySelectorAll(".q-group").forEach(q=>{
    q.style.display="none";
    q.querySelectorAll("input,textarea,select").forEach(i=>i.value="");
  });
}

function openCheckout(name,price,info){
  selectedItem={name,price};
  hideAll();
  document.getElementById("checkoutTitle").innerText=name;
  document.getElementById("checkoutInfo").innerText=info;

  if(name==="Discord Bot") q("q-discord");
  if(name==="Programming Service") q("q-programming");
  if(name==="Full Time Hire") q("q-fulltime");
  if(name==="Part Time Hire") q("q-parttime");

  document.getElementById("checkout").classList.add("show");
}
function closeCheckout(){
  document.getElementById("checkout").classList.remove("show");
}
function q(id){document.getElementById(id).style.display="block"}

async function submitOrder(){
  const discord=discordInput.value;
  if(!discord)return alert("Discord required");

  let fields=[{name:"Discord",value:discord}];

  document.getElementById("itemName").value=selectedItem.name;
  document.getElementById("itemAmount").value=selectedItem.price;
  document.getElementById("paypalCustom").value=discord;
  document.getElementById("paypalForm").submit();
}

import "./style.css";

type Preset={name:string;width:number;height:number};
const presets:Preset[]=[
{name:"Instagram Post",width:1080,height:1080},{name:"Instagram Portrait",width:1080,height:1350},
{name:"Instagram Story",width:1080,height:1920},{name:"YouTube Thumbnail",width:1280,height:720},
{name:"TikTok",width:1080,height:1920},{name:"Facebook Post",width:1200,height:630}
];

const app=document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML=`
<header><div class="brand">MEDIA<span>ALAT</span></div><div class="top-actions">
<button id="open">Buka Foto</button><button id="download" disabled>Unduh PNG</button></div></header>
<main>
<aside class="sidebar">
<section><h3>Ukuran</h3><select id="preset"><option value="">Pilih preset</option>${presets.map(p=>`<option value="${p.width}x${p.height}">${p.name} — ${p.width}×${p.height}</option>`).join("")}</select>
<div class="row"><input id="width" type="number" placeholder="Lebar"><input id="height" type="number" placeholder="Tinggi"></div>
<button class="secondary" id="applySize">Terapkan ukuran</button></section>
<section><h3>Transformasi</h3><div class="grid">
<button class="tool" id="left">↶ Putar</button><button class="tool" id="right">↷ Putar</button>
<button class="tool" id="flipX">↔ Balik X</button><button class="tool" id="flipY">↕ Balik Y</button>
</div></section>
<section><h3>Filter</h3><label>Kecerahan <input id="brightness" type="range" min="0" max="200" value="100"></label>
<label>Kontras <input id="contrast" type="range" min="0" max="200" value="100"></label>
<label>Saturasi <input id="saturation" type="range" min="0" max="200" value="100"></label>
<label>Grayscale <input id="gray" type="range" min="0" max="100" value="0"></label>
<button class="secondary" id="reset">Reset</button></section>
</aside>
<section class="workspace"><div class="empty" id="empty"><div class="drop-icon">＋</div><h2>Masukkan foto untuk mulai</h2><p>Seret foto ke sini atau klik tombol Buka Foto.</p><input id="file" type="file" accept="image/*" hidden><button id="choose">Pilih Foto</button></div>
<div class="canvas-wrap" id="canvasWrap" hidden><canvas id="canvas"></canvas></div></section>
<aside class="rightbar"><section><h3>Alat</h3><button class="action" id="crop">Crop Tengah</button><button class="action" id="text">Tambah Teks</button></section>
<section><h3>Ekspor</h3><label>Format<select id="format"><option value="png">PNG</option><option value="jpeg">JPG</option></select></label><label>Kualitas<input id="quality" type="range" min="50" max="100" value="92"></label></section>
<div class="hint">Semua proses gambar dilakukan di browser.</div></aside>
</main>`;

const canvas=document.querySelector<HTMLCanvasElement>("#canvas")!,ctx=canvas.getContext("2d")!;
const fileInput=document.querySelector<HTMLInputElement>("#file")!;
let source:HTMLImageElement|null=null,rotation=0,flipX=1,flipY=1,filter={brightness:100,contrast:100,saturation:100,gray:0};
let textItems:{text:string,x:number,y:number,size:number}[]=[];

function draw(){
 if(!source)return;
 const rad=rotation*Math.PI/180;
 const swap=Math.abs(rotation)%180===90;
 const w=source.naturalWidth,h=source.naturalHeight;
 canvas.width=swap?h:w; canvas.height=swap?w:h;
 ctx.save();ctx.translate(canvas.width/2,canvas.height/2);ctx.rotate(rad);ctx.scale(flipX,flipY);
 ctx.filter=`brightness(${filter.brightness}%) contrast(${filter.contrast}%) saturate(${filter.saturation}%) grayscale(${filter.gray}%)`;
 ctx.drawImage(source,-w/2,-h/2);ctx.restore();ctx.filter="none";
 for(const t of textItems){ctx.font=`bold ${t.size}px Arial`;ctx.fillStyle="#fff";ctx.strokeStyle="#000";ctx.lineWidth=5;ctx.strokeText(t.text,t.x,t.y);ctx.fillText(t.text,t.x,t.y)}
}

function load(file:File){const url=URL.createObjectURL(file);const img=new Image();img.onload=()=>{source=img;rotation=0;flipX=flipY=1;textItems=[];document.querySelector("#empty")?.setAttribute("hidden","true");document.querySelector("#canvasWrap")?.removeAttribute("hidden");document.querySelector<HTMLButtonElement>("#download")!.disabled=false;draw();URL.revokeObjectURL(url)};img.src=url}
fileInput.onchange=()=>{if(fileInput.files?.[0])load(fileInput.files[0])};
document.querySelector("#choose")!.addEventListener("click",()=>fileInput.click());
document.querySelector("#open")!.addEventListener("click",()=>fileInput.click());
document.querySelector("#left")!.addEventListener("click",()=>{rotation=(rotation+270)%360;draw()});
document.querySelector("#right")!.addEventListener("click",()=>{rotation=(rotation+90)%360;draw()});
document.querySelector("#flipX")!.addEventListener("click",()=>{flipX*=-1;draw()});
document.querySelector("#flipY")!.addEventListener("click",()=>{flipY*=-1;draw()});
for(const id of ["brightness","contrast","saturation","gray"])document.querySelector<HTMLInputElement>("#"+id)!.oninput=e=>{filter={...filter,[id]:Number((e.target as HTMLInputElement).value)};draw()};
document.querySelector("#reset")!.addEventListener("click",()=>{filter={brightness:100,contrast:100,saturation:100,gray:0};for(const [k,v] of Object.entries(filter))document.querySelector<HTMLInputElement>("#"+k)!.value=String(v);draw()});
document.querySelector("#preset")!.addEventListener("change",e=>{const v=(e.target as HTMLSelectElement).value;if(v){const [w,h]=v.split("x");document.querySelector<HTMLInputElement>("#width")!.value=w;document.querySelector<HTMLInputElement>("#height")!.value=h}});
document.querySelector("#applySize")!.addEventListener("click",()=>{const w=Number(document.querySelector<HTMLInputElement>("#width")!.value),h=Number(document.querySelector<HTMLInputElement>("#height")!.value);if(!source||!w||!h)return;const tmp=document.createElement("canvas");tmp.width=w;tmp.height=h;const t=tmp.getContext("2d")!;t.drawImage(canvas,0,0,w,h);const img=new Image();img.onload=()=>{source=img;rotation=0;flipX=flipY=1;draw()};img.src=tmp.toDataURL("image/png")});
document.querySelector("#crop")!.addEventListener("click",()=>{if(!source)return;const s=Math.min(canvas.width,canvas.height);const tmp=document.createElement("canvas");tmp.width=s;tmp.height=s;tmp.getContext("2d")!.drawImage(canvas,(canvas.width-s)/2,(canvas.height-s)/2,s,s,0,0,s,s);const img=new Image();img.onload=()=>{source=img;draw()};img.src=tmp.toDataURL("image/png")});
document.querySelector("#text")!.addEventListener("click",()=>{if(!source)return;const value=prompt("Teks yang ingin ditambahkan:");if(value)textItems.push({text:value,x:canvas.width*.08,y:canvas.height*.15,size:Math.max(32,canvas.width*.06)});draw()});
document.querySelector("#download")!.addEventListener("click",()=>{if(!source)return;const format=(document.querySelector("#format") as HTMLSelectElement).value;const quality=Number((document.querySelector("#quality") as HTMLInputElement).value)/100;const a=document.createElement("a");a.download=`media-alat-${Date.now()}.${format}`;a.href=canvas.toDataURL(format==="jpeg"?"image/jpeg":"image/png",quality);a.click()});
for(const ev of ["dragover","drop"])document.querySelector(".workspace")!.addEventListener(ev,e=>e.preventDefault());
document.querySelector(".workspace")!.addEventListener("drop",e=>{const f=(e as DragEvent).dataTransfer?.files[0];if(f?.type.startsWith("image/"))load(f)});

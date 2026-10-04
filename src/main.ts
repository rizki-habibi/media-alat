import "./style.css";

type Preset={name:string;width:number;height:number};
type FilterState={brightness:number;contrast:number;saturation:number;gray:number};
type Asset={id:number;kind:"sticker"|"logo";src:string;x:number;y:number;width:number;height:number;rotation:number};

const presets:Preset[]=[
{name:"Instagram Post",width:1080,height:1080},{name:"Instagram Portrait",width:1080,height:1350},
{name:"Instagram Story",width:1080,height:1920},{name:"YouTube Thumbnail",width:1280,height:720},
{name:"TikTok",width:1080,height:1920},{name:"Facebook Post",width:1200,height:630}
];

const app=document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML=[
'<header><div class="brand">MEDIA<span>ALAT</span></div><div class="top-actions"><button id="open">Buka Foto</button><button id="download" disabled>Unduh</button></div></header>',
'<main><aside class="sidebar">',
'<section><h3>Ukuran Kanvas</h3><select id="preset"><option value="">Preset</option>'+presets.map(p=>'<option value="'+p.width+'x'+p.height+'">'+p.name+" — "+p.width+"×"+p.height+"</option>").join("")+'</select>',
'<div class="row"><input id="width" type="number" placeholder="Lebar"><input id="height" type="number" placeholder="Tinggi"></div><button class="secondary" id="applySize">Terapkan Custom</button></section>',
'<section><h3>Transformasi</h3><div class="grid"><button class="tool" id="left">↶ Putar</button><button class="tool" id="right">↷ Putar</button><button class="tool" id="flipX">↔ Balik X</button><button class="tool" id="flipY">↕ Balik Y</button></div></section>',
'<section><h3>Filter Foto</h3><label>Kecerahan <input id="brightness" type="range" min="0" max="200" value="100"></label><label>Kontras <input id="contrast" type="range" min="0" max="200" value="100"></label><label>Saturasi <input id="saturation" type="range" min="0" max="200" value="100"></label><label>Grayscale <input id="gray" type="range" min="0" max="100" value="0"></label><button class="secondary" id="reset">Reset Filter</button></section>',
'<section><h3>Stiker</h3><div class="sticker-grid"><button class="sticker" data-sticker="★">★</button><button class="sticker" data-sticker="♥">♥</button><button class="sticker" data-sticker="⚡">⚡</button><button class="sticker" data-sticker="✦">✦</button><button class="sticker" data-sticker="☀">☀</button><button class="sticker" data-sticker="✿">✿</button></div><button class="secondary" id="stickerUpload">Tambah Stiker</button></section>',
'</aside><section class="workspace" id="workspace"><div class="empty" id="empty"><div class="drop-icon">＋</div><h2>Masukkan foto untuk mulai</h2><p>Seret foto ke sini atau pilih foto.</p><button id="choose">Pilih Foto</button></div><div class="canvas-wrap" id="canvasWrap" hidden><canvas id="canvas"></canvas></div></section>',
'<aside class="rightbar"><section><h3>Elemen</h3><button class="action" id="crop">Crop Tengah</button><button class="action" id="text">Tambah Teks</button><button class="action" id="logo">Tambah Logo</button><button class="action" id="removeAsset">Hapus Elemen Terakhir</button></section><section><h3>Ekspor</h3><label>Format<select id="format"><option value="png">PNG</option><option value="jpeg">JPG</option><option value="webp">WebP</option></select></label><label>Kualitas<input id="quality" type="range" min="50" max="100" value="92"></label></section><div class="hint">Editor berjalan di browser. Foto, logo, dan stiker dapat digabung lalu diekspor menjadi satu gambar.</div></aside></main>'
].join("");

const canvas=document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx=canvas.getContext("2d")!;
const fileInput=document.createElement("input");
fileInput.type="file";fileInput.accept="image/*";fileInput.hidden=true;document.body.appendChild(fileInput);

let source:HTMLImageElement|null=null;
let rotation=0,flipX=1,flipY=1;
let filter:FilterState={brightness:100,contrast:100,saturation:100,gray:0};
let textItems:{text:string;x:number;y:number;size:number}[]=[];
let assets:Asset[]=[];
let nextAssetId=1;

function fitSize(w:number,h:number,max:number){const s=Math.min(1,max/Math.max(w,h));return{width:w*s,height:h*s}}

function draw(){
 if(!source)return;
 const rad=rotation*Math.PI/180,swap=Math.abs(rotation)%180===90;
 const w=source.naturalWidth,h=source.naturalHeight;
 canvas.width=swap?h:w;canvas.height=swap?w:h;
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.save();ctx.translate(canvas.width/2,canvas.height/2);ctx.rotate(rad);ctx.scale(flipX,flipY);
 ctx.filter="brightness("+filter.brightness+"%) contrast("+filter.contrast+"%) saturate("+filter.saturation+"%) grayscale("+filter.gray+"%)";
 ctx.drawImage(source,-w/2,-h/2);ctx.restore();ctx.filter="none";
 for(const a of assets){
   const img=new Image();
   img.onload=()=>{ctx.save();ctx.translate(a.x,a.y);ctx.rotate(a.rotation*Math.PI/180);ctx.drawImage(img,-a.width/2,-a.height/2,a.width,a.height);ctx.restore()};
   img.src=a.src;
 }
 for(const t of textItems){
   ctx.font="bold "+t.size+"px Arial";ctx.textAlign="left";ctx.textBaseline="middle";
   ctx.lineWidth=Math.max(4,t.size*.08);ctx.strokeStyle="#000";ctx.fillStyle="#fff";
   ctx.strokeText(t.text,t.x,t.y);ctx.fillText(t.text,t.x,t.y);
 }
}

function load(file:File){
 if(!file.type.startsWith("image/"))return;
 const url=URL.createObjectURL(file),img=new Image();
 img.onload=()=>{source=img;rotation=0;flipX=flipY=1;textItems=[];assets=[];document.querySelector("#empty")?.setAttribute("hidden","true");document.querySelector("#canvasWrap")?.removeAttribute("hidden");document.querySelector<HTMLButtonElement>("#download")!.disabled=false;draw();URL.revokeObjectURL(url)};
 img.src=url;
}

fileInput.onchange=()=>{if(fileInput.files?.[0])load(fileInput.files[0])};
document.querySelector("#choose")!.addEventListener("click",()=>fileInput.click());
document.querySelector("#open")!.addEventListener("click",()=>fileInput.click());

function addAsset(src:string,kind:"sticker"|"logo"){
 if(!source)return;
 const img=new Image();
 img.onload=()=>{const size=fitSize(img.naturalWidth,img.naturalHeight,Math.min(canvas.width,canvas.height)*.28);assets.push({id:nextAssetId++,kind,src,x:canvas.width/2,y:canvas.height/2,width:size.width,height:size.height,rotation:0});draw()};
 img.src=src;
}

document.querySelectorAll<HTMLButtonElement>(".sticker").forEach(btn=>btn.onclick=()=>{
 const value=btn.dataset.sticker!;
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><text x="256" y="300" text-anchor="middle" font-size="330" font-family="Arial">'+value+"</text></svg>";
 addAsset("data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg),"sticker");
});

document.querySelector("#stickerUpload")!.addEventListener("click",()=>fileInput.click());
document.querySelector("#logo")!.addEventListener("click",()=>fileInput.click());
document.querySelector("#removeAsset")!.addEventListener("click",()=>{assets.pop();draw()});

document.querySelector("#left")!.addEventListener("click",()=>{rotation=(rotation+270)%360;draw()});
document.querySelector("#right")!.addEventListener("click",()=>{rotation=(rotation+90)%360;draw()});
document.querySelector("#flipX")!.addEventListener("click",()=>{flipX*=-1;draw()});
document.querySelector("#flipY")!.addEventListener("click",()=>{flipY*=-1;draw()});

for(const id of ["brightness","contrast","saturation","gray"] as const)document.querySelector<HTMLInputElement>("#"+id)!.oninput=e=>{filter={...filter,[id]:Number((e.target as HTMLInputElement).value)};draw()};
document.querySelector("#reset")!.addEventListener("click",()=>{filter={brightness:100,contrast:100,saturation:100,gray:0};for(const [k,v] of Object.entries(filter))document.querySelector<HTMLInputElement>("#"+k)!.value=String(v);draw()});

document.querySelector("#preset")!.addEventListener("change",e=>{const v=(e.target as HTMLSelectElement).value;if(v){const [w,h]=v.split("x");document.querySelector<HTMLInputElement>("#width")!.value=w;document.querySelector<HTMLInputElement>("#height")!.value=h}});
document.querySelector("#applySize")!.addEventListener("click",()=>{
 const w=Number(document.querySelector<HTMLInputElement>("#width")!.value),h=Number(document.querySelector<HTMLInputElement>("#height")!.value);
 if(!source||w<1||h<1)return;
 const tmp=document.createElement("canvas");tmp.width=w;tmp.height=h;tmp.getContext("2d")!.drawImage(canvas,0,0,w,h);
 const img=new Image();img.onload=()=>{source=img;rotation=0;flipX=flipY=1;draw()};img.src=tmp.toDataURL("image/png");
});

document.querySelector("#crop")!.addEventListener("click",()=>{
 if(!source)return;const s=Math.min(canvas.width,canvas.height),tmp=document.createElement("canvas");tmp.width=s;tmp.height=s;
 tmp.getContext("2d")!.drawImage(canvas,(canvas.width-s)/2,(canvas.height-s)/2,s,s,0,0,s,s);
 const img=new Image();img.onload=()=>{source=img;assets=[];draw()};img.src=tmp.toDataURL("image/png");
});
document.querySelector("#text")!.addEventListener("click",()=>{
 if(!source)return;const value=prompt("Teks yang ingin ditambahkan:");
 if(value)textItems.push({text:value,x:canvas.width*.08,y:canvas.height*.15,size:Math.max(32,canvas.width*.06)});draw();
});

document.querySelector("#download")!.addEventListener("click",()=>{
 if(!source)return;
 const format=(document.querySelector("#format") as HTMLSelectElement).value;
 const quality=Number((document.querySelector("#quality") as HTMLInputElement).value)/100;
 const a=document.createElement("a");a.download="media-alat-"+Date.now()+"."+(format==="jpeg"?"jpg":format);a.href=canvas.toDataURL("image/"+format,quality);a.click();
});

const workspace=document.querySelector("#workspace")!;
workspace.addEventListener("dragover",e=>e.preventDefault());
workspace.addEventListener("drop",e=>{e.preventDefault();const f=(e as DragEvent).dataTransfer?.files[0];if(f)load(f)});

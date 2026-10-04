import "./style.css";

type FilterState={brightness:number;contrast:number;saturation:number;gray:number};
type Ratio={name:string;label:string;w:number;h:number};

const ratios:Ratio[]=[
 {name:"Kotak",label:"1 : 1",w:1,h:1},{name:"Potret",label:"4 : 5",w:4,h:5},
 {name:"Lanskap",label:"16 : 9",w:16,h:9},{name:"Story",label:"9 : 16",w:9,h:16},
 {name:"Klasik",label:"4 : 3",w:4,h:3},{name:"Foto",label:"3 : 2",w:3,h:2}
];

const app=document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML=`
<header><div class="brand">MEDIA<span>ALAT</span></div><div class="top-actions"><button id="open">Buka Foto</button><button id="cropTop">Potong</button><button id="download" disabled>Unduh</button></div></header>
<main><aside class="sidebar">
<section><h3>Kanvas</h3><button class="size-trigger" id="openSize">Pilih Ukuran</button><div class="size-readout" id="sizeReadout">Ukuran asli</div></section>
<section><h3>Transformasi</h3><div class="grid"><button class="tool" id="left">Putar kiri</button><button class="tool" id="right">Putar kanan</button><button class="tool" id="flipX">Balik X</button><button class="tool" id="flipY">Balik Y</button></div></section>
<section><h3>Filter</h3><label>Kecerahan <input id="brightness" type="range" min="0" max="200" value="100"></label><label>Kontras <input id="contrast" type="range" min="0" max="200" value="100"></label><label>Saturasi <input id="saturation" type="range" min="0" max="200" value="100"></label><label>Grayscale <input id="gray" type="range" min="0" max="100" value="0"></label><button class="secondary" id="reset">Reset Filter</button></section>
<section><h3>Stiker</h3><div class="sticker-grid"><button class="sticker" data-sticker="★">★</button><button class="sticker" data-sticker="♥">♥</button><button class="sticker" data-sticker="⚡">⚡</button><button class="sticker" data-sticker="✦">✦</button><button class="sticker" data-sticker="☀">☀</button><button class="sticker" data-sticker="✿">✿</button></div><button class="secondary" id="stickerUpload">Tambah Stiker/Gambar</button></section>
</aside>
<section class="workspace" id="workspace"><div class="empty" id="empty"><div class="drop-icon">＋</div><h2>Masukkan foto untuk mulai</h2><p>Seret foto ke sini atau pilih foto.</p><button id="choose">Pilih Foto</button></div><div class="canvas-wrap" id="canvasWrap" hidden><canvas id="canvas"></canvas></div></section>
<aside class="rightbar"><section><h3>Elemen</h3><button class="action" id="text">Tambah Teks</button><button class="action" id="logo">Tambah Logo</button><button class="action" id="removeAsset">Hapus Elemen</button></section><section><h3>Ekspor</h3><label>Format<select id="format"><option value="png">PNG</option><option value="jpeg">JPG</option><option value="webp">WebP</option></select></label><label>Kualitas<input id="quality" type="range" min="50" max="100" value="92"></label></section><div class="hint">Semua proses foto dilakukan langsung di browser.</div></aside></main>
<div class="modal-backdrop" id="sizeModal" hidden><div class="size-modal"><div class="modal-head"><div><strong>Pilih ukuran</strong><span>Foto akan dipotong otomatis tanpa diregangkan.</span></div><button class="close" id="closeSize">Tutup</button></div><div class="ratio-grid">${ratios.map((r,i)=>`<button class="ratio-card" data-ratio="${i}"><span class="ratio-preview ratio-${r.name.toLowerCase()}"></span><strong>${r.name}</strong><small>${r.label}</small></button>`).join("")}<button class="ratio-card custom-card" id="customRatio"><span class="custom-plus">+</span><strong>Ukuran custom</strong><small>Lebar × tinggi</small></button></div><div class="custom-fields" id="customFields" hidden><input id="customW" type="number" min="1" placeholder="Lebar px"><input id="customH" type="number" min="1" placeholder="Tinggi px"><button id="applyCustom">Terapkan</button></div></div></div>
`;

const canvas=document.querySelector<HTMLCanvasElement>("#canvas")!,ctx=canvas.getContext("2d")!;
const photoInput=document.createElement("input"),assetInput=document.createElement("input");
for(const input of [photoInput,assetInput]){input.type="file";input.accept="image/*";input.hidden=true;document.body.appendChild(input)}
let source:HTMLImageElement|null=null,rotation=0,flipX=1,flipY=1;
let filter:FilterState={brightness:100,contrast:100,saturation:100,gray:0};
let ratio:number|null=null,customSize:{w:number;h:number}|null=null;
let assets:{src:string;x:number;y:number;width:number;height:number;rotation:number}[]=[];
let texts:{text:string;x:number;y:number;size:number}[]=[];

function showSize(w:number,h:number){document.querySelector("#sizeReadout")!.textContent=w+" × "+h+" px";}

function cropDimensions():{w:number;h:number}{
 if(!source)return{w:1,h:1};
 if(customSize)return customSize;
 const r=ratio;if(!r)return{w:source.naturalWidth,h:source.naturalHeight};
 const max=1800;let w=max,h=Math.round(max*r);
 if(r<1){h=max;w=Math.round(max*r)}
 return{w,h};
}

function draw(){
 if(!source)return;
 const out=cropDimensions(),cw=out.w,ch=out.h;
 canvas.width=cw;canvas.height=ch;ctx.clearRect(0,0,cw,ch);
 const rad=rotation*Math.PI/180,sw=Math.abs(rotation)%180===90;
 const iw=source.naturalWidth,ih=source.naturalHeight;
 ctx.save();ctx.translate(cw/2,ch/2);ctx.rotate(rad);ctx.scale(flipX,flipY);
 ctx.filter=`brightness(${filter.brightness}%) contrast(${filter.contrast}%) saturate(${filter.saturation}%) grayscale(${filter.gray}%)`;
 const scale=Math.max(cw/(sw?ih:iw),ch/(sw?iw:ih));
 ctx.drawImage(source,-iw*scale/2,-ih*scale/2,iw*scale,ih*scale);ctx.restore();ctx.filter="none";
 for(const a of assets){const img=new Image();img.onload=()=>{ctx.save();ctx.translate(a.x,a.y);ctx.rotate(a.rotation*Math.PI/180);ctx.drawImage(img,-a.width/2,-a.height/2,a.width,a.height);ctx.restore()};img.src=a.src}
 for(const t of texts){ctx.font="bold "+t.size+"px Arial";ctx.textAlign="left";ctx.textBaseline="middle";ctx.lineWidth=Math.max(4,t.size*.08);ctx.strokeStyle="#000";ctx.fillStyle="#fff";ctx.strokeText(t.text,t.x,t.y);ctx.fillText(t.text,t.x,t.y)}
}

function load(file:File){
 if(!file.type.startsWith("image/"))return;
 const url=URL.createObjectURL(file),img=new Image();
 img.onload=()=>{source=img;rotation=0;flipX=flipY=1;ratio=null;customSize=null;assets=[];texts=[];document.querySelector("#empty")?.setAttribute("hidden","true");document.querySelector("#canvasWrap")?.removeAttribute("hidden");document.querySelector<HTMLButtonElement>("#download")!.disabled=false;showSize(img.naturalWidth,img.naturalHeight);draw();URL.revokeObjectURL(url)};img.src=url;
}
photoInput.onchange=()=>{if(photoInput.files?.[0])load(photoInput.files[0])};
document.querySelector("#choose")!.addEventListener("click",()=>photoInput.click());
document.querySelector("#open")!.addEventListener("click",()=>photoInput.click());

function openSize(){document.querySelector<HTMLElement>("#sizeModal")!.hidden=false}
function closeSize(){document.querySelector<HTMLElement>("#sizeModal")!.hidden=true}
document.querySelector("#openSize")!.addEventListener("click",openSize);
document.querySelector("#cropTop")!.addEventListener("click",openSize);
document.querySelector("#closeSize")!.addEventListener("click",closeSize);
document.querySelector("#sizeModal")!.addEventListener("click",e=>{if(e.target===document.querySelector("#sizeModal"))closeSize()});

document.querySelectorAll<HTMLButtonElement>(".ratio-card[data-ratio]").forEach(btn=>btn.onclick=()=>{
 if(!source)return;
 const r=ratios[Number(btn.dataset.ratio)];ratio=r.w/r.h;customSize=null;
 const dims=cropDimensions();showSize(dims.w,dims.h);draw();closeSize();
});
document.querySelector("#customRatio")!.addEventListener("click",()=>document.querySelector("#customFields")!.toggleAttribute("hidden"));
document.querySelector("#applyCustom")!.addEventListener("click",()=>{
 const w=Number((document.querySelector("#customW") as HTMLInputElement).value),h=Number((document.querySelector("#customH") as HTMLInputElement).value);
 if(w>0&&h>0){customSize={w,h};ratio=null;showSize(w,h);draw();closeSize()}
});

document.querySelector("#left")!.addEventListener("click",()=>{rotation=(rotation+270)%360;draw()});
document.querySelector("#right")!.addEventListener("click",()=>{rotation=(rotation+90)%360;draw()});
document.querySelector("#flipX")!.addEventListener("click",()=>{flipX*=-1;draw()});
document.querySelector("#flipY")!.addEventListener("click",()=>{flipY*=-1;draw()});
for(const id of ["brightness","contrast","saturation","gray"] as const)document.querySelector<HTMLInputElement>("#"+id)!.oninput=e=>{filter={...filter,[id]:Number((e.target as HTMLInputElement).value)};draw()};
document.querySelector("#reset")!.addEventListener("click",()=>{filter={brightness:100,contrast:100,saturation:100,gray:0};for(const [k,v] of Object.entries(filter))document.querySelector<HTMLInputElement>("#"+k)!.value=String(v);draw()});

function addAsset(src:string){if(!source)return;const img=new Image();img.onload=()=>{const s=Math.min(canvas.width,canvas.height)*.28,scale=Math.min(1,s/Math.max(img.naturalWidth,img.naturalHeight));assets.push({src,x:canvas.width/2,y:canvas.height/2,width:img.naturalWidth*scale,height:img.naturalHeight*scale,rotation:0});draw()};img.src=src}
assetInput.onchange=()=>{if(assetInput.files?.[0]){const f=assetInput.files[0],u=URL.createObjectURL(f);addAsset(u);assetInput.value=""}};
document.querySelector("#stickerUpload")!.addEventListener("click",()=>assetInput.click());
document.querySelector("#logo")!.addEventListener("click",()=>assetInput.click());
document.querySelectorAll<HTMLButtonElement>(".sticker").forEach(b=>b.onclick=()=>{const v=b.dataset.sticker!,svg=`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><text x="256" y="300" text-anchor="middle" font-size="330" font-family="Arial">${v}</text></svg>`;addAsset("data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg))});
document.querySelector("#removeAsset")!.addEventListener("click",()=>{assets.pop();draw()});
document.querySelector("#text")!.addEventListener("click",()=>{if(!source)return;const value=prompt("Teks yang ingin ditambahkan:");if(value)texts.push({text:value,x:canvas.width*.08,y:canvas.height*.15,size:Math.max(32,canvas.width*.06)});draw()});

document.querySelector("#download")!.addEventListener("click",()=>{if(!source)return;const f=(document.querySelector("#format") as HTMLSelectElement).value,q=Number((document.querySelector("#quality") as HTMLInputElement).value)/100,a=document.createElement("a");a.download="media-alat-"+Date.now()+"."+(f==="jpeg"?"jpg":f);a.href=canvas.toDataURL("image/"+f,q);a.click()});
const workspace=document.querySelector("#workspace")!;
workspace.addEventListener("dragover",e=>e.preventDefault());
workspace.addEventListener("drop",e=>{e.preventDefault();const f=(e as DragEvent).dataTransfer?.files[0];if(f)load(f)});

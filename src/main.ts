import "./style.css";

type FilterState={brightness:number;contrast:number;saturation:number;gray:number};
type Profile={id:string;platform:string;purpose:string;width:number;height:number;note:string};

const profiles:Profile[]=[
{id:"ig-feed-portrait",platform:"Instagram",purpose:"Feed — Potret",width:1080,height:1350,note:"4:5 • foto feed portrait"},
{id:"ig-feed-square",platform:"Instagram",purpose:"Feed — Kotak",width:1080,height:1080,note:"1:1 • foto feed kotak"},
{id:"ig-story",platform:"Instagram",purpose:"Story",width:1080,height:1920,note:"9:16 • story layar penuh"},
{id:"ig-reels",platform:"Instagram",purpose:"Reels",width:1080,height:1920,note:"9:16 • video/kreatif vertikal"},
{id:"youtube-thumb",platform:"YouTube",purpose:"Thumbnail Video",width:3840,height:2160,note:"16:9 • thumbnail video"},
{id:"youtube-video",platform:"YouTube",purpose:"Video Full HD",width:1920,height:1080,note:"16:9 • video 1080p"},
{id:"youtube-video-hd",platform:"YouTube",purpose:"Video HD",width:1280,height:720,note:"16:9 • video 720p"},
{id:"youtube-shorts",platform:"YouTube",purpose:"Thumbnail Shorts",width:2160,height:3840,note:"9:16 • thumbnail Shorts"},
{id:"youtube-shorts-video",platform:"YouTube",purpose:"Shorts Vertikal",width:1080,height:1920,note:"9:16 • konten Shorts"},
{id:"x-landscape",platform:"X",purpose:"Post — Lanskap",width:1920,height:1080,note:"16:9 • media landscape"},
{id:"x-square",platform:"X",purpose:"Post — Kotak",width:1080,height:1080,note:"1:1 • media kotak"},
{id:"x-portrait",platform:"X",purpose:"Post — Potret",width:1440,height:1800,note:"4:5 • media portrait"},
{id:"x-portrait-23",platform:"X",purpose:"Post — Potret 2:3",width:1080,height:1620,note:"2:3 • media portrait"},
{id:"x-wide",platform:"X",purpose:"Creative Wide",width:2064,height:1080,note:"1.91:1 • creative landscape"},
{id:"x-vertical",platform:"X",purpose:"Creative Vertikal",width:1080,height:1920,note:"9:16 • konten vertikal"},
{id:"tiktok-vertical",platform:"TikTok",purpose:"Vertikal",width:1080,height:1920,note:"9:16 • konten utama"},
{id:"tiktok-min-vertical",platform:"TikTok",purpose:"Vertikal Minimum",width:720,height:1280,note:"9:16 • ukuran minimum"},
{id:"tiktok-square",platform:"TikTok",purpose:"Kotak",width:640,height:640,note:"1:1 • kreatif kotak minimum"},
{id:"tiktok-horizontal",platform:"TikTok",purpose:"Horizontal",width:1280,height:720,note:"16:9 • kreatif landscape"},
{id:"pinterest-pin",platform:"Pinterest",purpose:"Pin Standar",width:1000,height:1500,note:"2:3 • ukuran rekomendasi Pin"},
{id:"pinterest-square",platform:"Pinterest",purpose:"Pin Kotak",width:1000,height:1000,note:"1:1 • gambar kotak"},
{id:"pinterest-vertical",platform:"Pinterest",purpose:"Konten Vertikal",width:1080,height:1920,note:"9:16 • konten vertikal"},
{id:"linkedin-landscape",platform:"LinkedIn",purpose:"Single Image — Lanskap",width:1200,height:628,note:"1.91:1 • post/iklan landscape"},
{id:"linkedin-square",platform:"LinkedIn",purpose:"Single Image — Kotak",width:1200,height:1200,note:"1:1 • post/iklan kotak"},
{id:"linkedin-portrait",platform:"LinkedIn",purpose:"Single Image — Potret",width:720,height:900,note:"4:5 • post/iklan portrait"},
{id:"facebook-reels",platform:"Facebook",purpose:"Reels / Story",width:1080,height:1920,note:"9:16 • konten vertikal"},
{id:"facebook-feed",platform:"Facebook",purpose:"Feed — Lanskap",width:1200,height:630,note:"1.91:1 • feed landscape"},
{id:"facebook-square",platform:"Facebook",purpose:"Feed — Kotak",width:1080,height:1080,note:"1:1 • feed kotak"},
{id:"facebook-portrait",platform:"Facebook",purpose:"Feed — Potret",width:1080,height:1350,note:"4:5 • feed portrait"},
{id:"whatsapp-status",platform:"WhatsApp",purpose:"Status",width:1080,height:1920,note:"9:16 • status layar penuh"},
{id:"whatsapp-square",platform:"WhatsApp",purpose:"Gambar Chat",width:1080,height:1080,note:"1:1 • gambar percakapan"},
{id:"threads-portrait",platform:"Threads",purpose:"Posting — Potret",width:1080,height:1350,note:"4:5 • posting portrait"},
{id:"threads-square",platform:"Threads",purpose:"Posting — Kotak",width:1080,height:1080,note:"1:1 • posting kotak"},
{id:"threads-vertical",platform:"Threads",purpose:"Konten Vertikal",width:1080,height:1920,note:"9:16 • media vertikal"}
];

const app=document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML=`
<div class="login-screen" id="loginScreen">
  <div class="comic-bg" aria-hidden="true">
    <span class="speed speed-1"></span><span class="speed speed-2"></span><span class="speed speed-3"></span>
    <span class="burst burst-1"></span><span class="burst burst-2"></span>
    <span class="comic-dot dot-1"></span><span class="comic-dot dot-2"></span><span class="comic-dot dot-3"></span>
  </div>
  <div class="comic-layout">
    <aside class="comic-panel comic-panel-left" aria-hidden="true">
      <div class="comic-caption">MEDIA</div>
      <div class="comic-title">ALAT!</div>
      <div class="comic-stamp">EDIT<br>CREATE<br>SHARE</div>
      <div class="comic-scribble">WOW!</div>
    </aside>
    <section class="login-card">
      <div class="comic-topline"><span></span><b>EDISI KHUSUS</b><span></span></div>
      <div class="login-brand"><span>MEDIA</span><strong>ALAT</strong></div>
      <div class="login-kicker">DIGITAL COMIC PHOTO EDITOR</div>
      <div class="hero-badge">PANEL #01</div>
      <h1>Siap masuk<br><em>ke dunia kreatif?</em></h1>
      <p class="login-copy">Buka ruang kerja kamu dan lanjutkan halaman desain yang terakhir dikerjakan.</p>
      <form id="loginForm">
        <label class="comic-label">KATA SANDI
          <div class="password-wrap">
            <input id="loginPassword" type="password" autocomplete="current-password" placeholder="Masukkan kata sandi" />
            <button type="button" id="togglePassword" class="eye-btn" aria-label="Tampilkan kata sandi">LIHAT</button>
          </div>
        </label>
        <button type="submit" class="login-submit"><span>MASUK</span><b>→</b></button>
        <div class="login-error" id="loginError"></div>
      </form>
      <div class="login-note"><span class="dot"></span> Ruang kerja siap memulihkan draft terakhir.</div>
    </section>
    <aside class="comic-panel comic-panel-right" aria-hidden="true">
      <div class="speech">LET'S<br>CREATE!</div>
      <div class="burst-word">GO!</div>
      <div class="halftone-card">CREATIVE<br>MODE</div>
    </aside>
  </div>
  <div class="comic-footer" aria-hidden="true"><span>MEDIA ALAT</span><b>STUDIO DIGITAL</b><span>NO. 001</span></div>
</div>
<header>
  <div class="brand">MEDIA<span>ALAT</span><small>EDITOR FOTO</small></div>
  <div class="top-actions">
    <button class="top-btn primary" id="open">Buka Foto</button>
    <button class="top-btn" id="cropTop">Pilih Ukuran</button>
    <button class="top-btn" id="save" disabled>Simpan</button>
    <button class="top-btn primary" id="download" disabled>Unduh</button>
  </div>
</header>
<nav class="toolbar" aria-label="Alat editor">
  <div class="tool-group">
    <span class="toolbar-title">Kanvas</span>
    <button class="tool-pill" id="openSize">Ukuran</button>
    <span class="size-readout" id="sizeReadout">Ukuran asli</span>
  </div>
  <div class="tool-group">
    <span class="toolbar-title">Posisi</span>
    <div class="arrow-pad">
      <button class="arrow-btn" id="up" title="Geser ke atas" aria-label="Geser ke atas">↑</button>
      <button class="arrow-btn" id="leftMove" title="Geser ke kiri" aria-label="Geser ke kiri">←</button>
      <button class="arrow-btn center" id="centerMove" title="Kembalikan ke tengah" aria-label="Kembalikan ke tengah">•</button>
      <button class="arrow-btn" id="rightMove" title="Geser ke kanan" aria-label="Geser ke kanan">→</button>
      <button class="arrow-btn" id="down" title="Geser ke bawah" aria-label="Geser ke bawah">↓</button>
    </div>
  </div>
  <div class="tool-group compact">
    <span class="toolbar-title">Putar</span>
    <button class="icon-btn" id="left" title="Putar kiri" aria-label="Putar kiri">↶</button>
    <button class="icon-btn" id="right" title="Putar kanan" aria-label="Putar kanan">↷</button>
  </div>
  <div class="tool-group compact">
    <span class="toolbar-title">Balik</span>
    <button class="icon-btn" id="flipX" title="Balik horizontal" aria-label="Balik horizontal">↔</button>
    <button class="icon-btn" id="flipY" title="Balik vertikal" aria-label="Balik vertikal">↕</button>
  </div>
  <details class="tool-dropdown">
    <summary>Filter</summary>
    <div class="dropdown-panel filter-panel">
      <label>Kecerahan<input id="brightness" type="range" min="0" max="200" value="100"></label>
      <label>Kontras<input id="contrast" type="range" min="0" max="200" value="100"></label>
      <label>Saturasi<input id="saturation" type="range" min="0" max="200" value="100"></label>
      <label>Grayscale<input id="gray" type="range" min="0" max="100" value="0"></label>
      <button class="secondary" id="reset">Reset filter</button>
    </div>
  </details>
  <details class="tool-dropdown">
    <summary>Stiker</summary>
    <div class="dropdown-panel sticker-panel">
      <p class="section-note">Ambil bagian dari foto/logo lalu jadikan stiker gambar.</p>
      <button class="secondary" id="stickerFromComponent">Ambil komponen</button>
      <button class="secondary" id="stickerUpload">Tambah gambar</button>
      <div class="sticker-status" id="stickerStatus">Belum ada komponen.</div>
    </div>
  </details>
  <details class="tool-dropdown">
    <summary>Elemen</summary>
    <div class="dropdown-panel">
      <button class="secondary" id="text">Tambah teks</button>
      <button class="secondary" id="logo">Tambah logo</button>
      <button class="secondary" id="removeAsset">Hapus elemen</button>
    </div>
  </details>
  <details class="tool-dropdown export-dropdown">
    <summary>Ekspor</summary>
    <div class="dropdown-panel">
      <label>Format<select id="format"><option value="png">PNG</option><option value="jpeg">JPG</option><option value="webp">WebP</option></select></label>
      <label>Kualitas<input id="quality" type="range" min="50" max="100" value="92"></label>
    </div>
  </details>
  <button class="tool-pill" id="originalSize">Asli</button>
</nav>
<main>
  <section class="workspace" id="workspace">
    <div class="canvas-stage">
      <div class="empty" id="empty">
        <div class="drop-icon">＋</div>
        <h2>Masukkan foto untuk mulai</h2>
        <p>Seret foto ke area ini atau pilih foto.</p>
        <button class="choose-btn" id="choose">Pilih Foto</button>
      </div>
      <div class="canvas-wrap" id="canvasWrap" hidden><canvas id="canvas"></canvas></div>
    </div>
    <div class="workspace-hint">Seret foto ke sini • Gunakan panah untuk mengatur posisi • Ukuran dapat dipilih kapan saja</div>
  </section>
</main>
<div class="modal-backdrop" id="sizeModal" hidden><div class="size-modal">
<div class="modal-head"><div><strong>Ukuran untuk publikasi</strong><span>Pilih platform dan tujuan. Jika belum yakin, tutup saja — foto tetap memakai ukuran aslinya.</span></div><div class="modal-head-actions"><button type="button" class="original-modal" id="originalModal">Ukuran asli</button><button type="button" class="close" id="closeSize">Tutup</button></div></div>
<input class="profile-search" id="profileSearch" type="search" placeholder="Cari platform, tujuan, atau ukuran...">
<div class="platform-tabs" id="platformTabs"></div><div class="profile-grid" id="profileGrid"></div>
<div class="custom-fields" id="customFields"><input id="customW" type="number" min="1" placeholder="Lebar px"><input id="customH" type="number" min="1" placeholder="Tinggi px"><button id="applyCustom">Ukuran custom</button></div>
</div></div>`;

const canvas=document.querySelector<HTMLCanvasElement>("#canvas")!,ctx=canvas.getContext("2d")!;
const photoInput=document.createElement("input"),assetInput=document.createElement("input");
for(const input of [photoInput,assetInput]){input.type="file";input.accept="image/*";input.hidden=true;document.body.appendChild(input)}
let source:HTMLImageElement|null=null,rotation=0,flipX=1,flipY=1,panX=0,panY=0;
let filter:FilterState={brightness:100,contrast:100,saturation:100,gray:0};
let selectedProfile:Profile|null=null,customSize:{w:number;h:number}|null=null;
let assets:{src:string;x:number;y:number;width:number;height:number;rotation:number}[]=[];
let componentSelection:{x:number;y:number;w:number;h:number}|null=null;
let selectingComponent=false;
let texts:{text:string;x:number;y:number;size:number}[]=[];
const platforms=[...new Set(profiles.map(p=>p.platform))];
const SUPABASE_URL="https://rjoncaudkgsszhzgmwcx.supabase.co";
const SUPABASE_KEY="sb_publishable_zu_I8iFv6LxoWcRjFzoWFA_t_tutDqJ";
const ownerKey=localStorage.getItem("media-alat-owner")||crypto.randomUUID();
localStorage.setItem("media-alat-owner",ownerKey);
const AUTH_KEY="media-alat-auth";
const PASSWORD_HASH="15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225";
function setupLogin(){
 const screen=document.querySelector<HTMLElement>("#loginScreen")!;
 const form=document.querySelector<HTMLFormElement>("#loginForm")!;
 const input=document.querySelector<HTMLInputElement>("#loginPassword")!;
 const error=document.querySelector<HTMLElement>("#loginError")!;
 screen.hidden=localStorage.getItem(AUTH_KEY)==="1";
 form.addEventListener("submit",async e=>{
  e.preventDefault();
  const bytes=new TextEncoder().encode(input.value);
  const digest=await crypto.subtle.digest("SHA-256",bytes);
  const hash=Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,"0")).join("");
  if(hash===PASSWORD_HASH){localStorage.setItem(AUTH_KEY,"1");screen.hidden=true;error.textContent="";void restoreDraft()}
  else{error.textContent="Password salah. Coba lagi.";input.select()}
 });
}
setupLogin();
const togglePassword=document.querySelector<HTMLButtonElement>("#togglePassword");
const passwordInput=document.querySelector<HTMLInputElement>("#loginPassword");
togglePassword?.addEventListener("click",()=>{
 if(!passwordInput)return;
 const visible=passwordInput.type==="text";
 passwordInput.type=visible?"password":"text";
 togglePassword.textContent=visible?"LIHAT":"SEMBUNYI";
 togglePassword.setAttribute("aria-label",visible?"Tampilkan kata sandi":"Sembunyikan kata sandi");
});

const DRAFT_DB="media-alat-draft";
let sourceDataUrl="";
let draftTimer:number|undefined;
function draftDb():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const req=indexedDB.open(DRAFT_DB,1);req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains("drafts"))req.result.createObjectStore("drafts");};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
async function saveDraftLocal(){
 if(!source||!sourceDataUrl)return;
 try{
  const db=await draftDb();
  const data={sourceDataUrl,rotation,flipX,flipY,panX,panY,filter,selectedProfileId:selectedProfile?.id||null,customSize,assets,texts,format:(document.querySelector("#format") as HTMLSelectElement)?.value||"png",quality:Number((document.querySelector("#quality") as HTMLInputElement)?.value||92)};
  await new Promise<void>((resolve,reject)=>{const tx=db.transaction("drafts","readwrite");tx.objectStore("drafts").put(data,"current");tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});
  db.close();
 }catch(e){console.warn("Draft lokal gagal disimpan",e)}
}
function scheduleDraft(){window.clearTimeout(draftTimer);draftTimer=window.setTimeout(()=>void saveDraftLocal(),450)}
async function getDraft():Promise<any|null>{
 try{const db=await draftDb();const value=await new Promise<any>((resolve,reject)=>{const tx=db.transaction("drafts","readonly");const req=tx.objectStore("drafts").get("current");req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>reject(req.error)});db.close();return value}catch(e){console.warn("Draft lokal gagal dibaca",e);return null}
}
async function restoreDraft(){
 const draft=await getDraft();if(!draft?.sourceDataUrl)return;
 const img=new Image();
 img.onload=()=>{
  source=img;sourceDataUrl=draft.sourceDataUrl;rotation=Number(draft.rotation||0);flipX=Number(draft.flipX||1);flipY=Number(draft.flipY||1);panX=Number(draft.panX||0);panY=Number(draft.panY||0);
  filter={brightness:Number(draft.filter?.brightness??100),contrast:Number(draft.filter?.contrast??100),saturation:Number(draft.filter?.saturation??100),gray:Number(draft.filter?.gray??0)};
  selectedProfile=profiles.find(p=>p.id===draft.selectedProfileId)||null;customSize=draft.customSize||null;assets=Array.isArray(draft.assets)?draft.assets:[];texts=Array.isArray(draft.texts)?draft.texts:[];
  const f=document.querySelector<HTMLSelectElement>("#format"),q=document.querySelector<HTMLInputElement>("#quality");if(f&&draft.format)f.value=draft.format;if(q&&draft.quality)q.value=String(draft.quality);
  document.querySelector("#empty")?.setAttribute("hidden","true");document.querySelector("#canvasWrap")?.removeAttribute("hidden");document.querySelector<HTMLButtonElement>("#download")!.disabled=false;document.querySelector<HTMLButtonElement>("#save")!.disabled=false;
  const out=cropDimensions();showSize(out.w,out.h,selectedProfile?.purpose||(customSize?"Ukuran custom":"Ukuran asli"));draw();
 };
 img.src=draft.sourceDataUrl;
}

function showSize(w:number,h:number,label="Ukuran custom"){document.querySelector("#sizeReadout")!.textContent=label+" • "+w+" × "+h+" px"}
function cropDimensions():{w:number;h:number}{
 if(!source)return{w:1,h:1};
 if(customSize)return customSize;
 if(selectedProfile)return{w:selectedProfile.width,h:selectedProfile.height};
 return{w:source.naturalWidth,h:source.naturalHeight};
}
async function saveProject(){
 if(!source)return;
 const name=prompt("Nama proyek:",selectedProfile?.purpose||"Proyek Media Alat");
 if(!name)return;
 const out=cropDimensions();
 const payload={name,width:out.w,height:out.h,platform:selectedProfile?.platform||null,purpose:selectedProfile?.purpose||null,profile_id:selectedProfile?.id||null,owner_key:ownerKey,state:{rotation,flipX,flipY,panX,panY,filter}};
 const response=await fetch(SUPABASE_URL+"/rest/v1/media_projects",{method:"POST",headers:{"apikey":SUPABASE_KEY,"Authorization":"Bearer "+SUPABASE_KEY,"Content-Type":"application/json","Prefer":"return=minimal","x-media-owner":ownerKey},body:JSON.stringify(payload)});
 if(!response.ok){alert("Gagal menyimpan proyek ke Supabase.");return;}
 alert("Proyek tersimpan di Supabase.");
}
function canvasPoint(e:MouseEvent){const rect=canvas.getBoundingClientRect();return{x:(e.clientX-rect.left)*(canvas.width/rect.width),y:(e.clientY-rect.top)*(canvas.height/rect.height)}}
function updateStickerStatus(message:string){const el=document.querySelector("#stickerStatus");if(el)el.textContent=message}
function drawSelectionOverlay(){if(!componentSelection)return;ctx.save();ctx.strokeStyle="#8b3dff";ctx.lineWidth=Math.max(2,canvas.width/500);ctx.setLineDash([8,6]);ctx.strokeRect(componentSelection.x,componentSelection.y,componentSelection.w,componentSelection.h);ctx.fillStyle="#8b3dff22";ctx.fillRect(componentSelection.x,componentSelection.y,componentSelection.w,componentSelection.h);ctx.restore()}
function makeComponentSticker(){if(!source||!componentSelection)return;const s=componentSelection;const temp=document.createElement("canvas");temp.width=Math.max(1,Math.round(s.w));temp.height=Math.max(1,Math.round(s.h));const tc=temp.getContext("2d")!;tc.drawImage(canvas,s.x,s.y,s.w,s.h,0,0,temp.width,temp.height);const src=temp.toDataURL("image/png");const img=new Image();img.onload=()=>{const max=Math.min(canvas.width,canvas.height)*.32;const scale=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));assets.push({src,x:canvas.width/2,y:canvas.height/2,width:img.naturalWidth*scale,height:img.naturalHeight*scale,rotation:0});componentSelection=null;selectingComponent=false;updateStickerStatus("Komponen berhasil dibuat menjadi stiker gambar.");draw()};img.src=src}
function draw(){
 if(!source)return;
 const out=cropDimensions(),cw=out.w,ch=out.h;canvas.width=cw;canvas.height=ch;ctx.clearRect(0,0,cw,ch);
 const rad=rotation*Math.PI/180,sw=Math.abs(rotation)%180===90,iw=source.naturalWidth,ih=source.naturalHeight;
 ctx.save();ctx.translate(cw/2+panX,ch/2+panY);ctx.rotate(rad);ctx.scale(flipX,flipY);
 ctx.filter=`brightness(${filter.brightness}%) contrast(${filter.contrast}%) saturate(${filter.saturation}%) grayscale(${filter.gray}%)`;
 const scale=Math.max(cw/(sw?ih:iw),ch/(sw?iw:ih));ctx.drawImage(source,-iw*scale/2,-ih*scale/2,iw*scale,ih*scale);ctx.restore();ctx.filter="none";
 for(const a of assets){const img=new Image();img.onload=()=>{ctx.save();ctx.translate(a.x,a.y);ctx.rotate(a.rotation*Math.PI/180);ctx.drawImage(img,-a.width/2,-a.height/2,a.width,a.height);ctx.restore()};img.src=a.src}
 for(const t of texts){ctx.font="bold "+t.size+"px Arial";ctx.textAlign="left";ctx.textBaseline="middle";ctx.lineWidth=Math.max(4,t.size*.08);ctx.strokeStyle="#000";ctx.fillStyle="#fff";ctx.strokeText(t.text,t.x,t.y);ctx.fillText(t.text,t.x,t.y)}
}
function load(file:File){
 if(!file.type.startsWith("image/"))return;
 const reader=new FileReader();
 reader.onload=()=>{
  if(typeof reader.result!=="string")return;
  const img=new Image();
  img.onload=()=>{
   source=img;sourceDataUrl=reader.result as string;rotation=0;flipX=flipY=1;panX=panY=0;selectedProfile=null;customSize=null;assets=[];texts=[];componentSelection=null;selectingComponent=false;
   document.querySelector("#empty")?.setAttribute("hidden","true");document.querySelector("#canvasWrap")?.removeAttribute("hidden");document.querySelector<HTMLButtonElement>("#download")!.disabled=false;document.querySelector<HTMLButtonElement>("#save")!.disabled=false;showSize(img.naturalWidth,img.naturalHeight,"Ukuran asli");draw();
  };
  img.src=reader.result as string;
 };
 reader.readAsDataURL(file);
}
photoInput.onchange=()=>{if(photoInput.files?.[0])load(photoInput.files[0])};
document.querySelector("#choose")!.addEventListener("click",()=>photoInput.click());document.querySelector("#open")!.addEventListener("click",()=>photoInput.click());

const modal=document.querySelector<HTMLElement>("#sizeModal")!,tabs=document.querySelector("#platformTabs")!,grid=document.querySelector("#profileGrid")!;
function profileCard(p:Profile){
 return `<button class="profile-card" data-id="${p.id}"><span class="profile-preview" style="aspect-ratio:${p.width}/${p.height}"></span><span><strong>${p.purpose}</strong><small>${p.width} × ${p.height} px</small><small>${p.note}</small></span></button>`;
}
function bindProfileCards(){
 grid.querySelectorAll<HTMLButtonElement>(".profile-card").forEach(b=>b.onclick=()=>{
  const p=profiles.find(x=>x.id===b.dataset.id)!;
  selectedProfile=p;customSize=null;showSize(p.width,p.height,p.purpose);draw();modal.hidden=true;
 });
}
function renderProfiles(platform=platforms[0],query=""){
 const q=query.trim().toLowerCase();
 tabs.innerHTML=`<button type="button" class="platform-tab all-tab ${platform==="__all__"?"active":""}" data-platform="__all__">Semua</button>`+
  platforms.map(p=>`<button type="button" class="platform-tab ${p===platform?"active":""}" data-platform="${p}">${p}</button>`).join("");
 const list=platform==="__all__"
  ? profiles.filter(p=>!q || `${p.platform} ${p.purpose} ${p.width}x${p.height} ${p.note}`.toLowerCase().includes(q))
  : profiles.filter(p=>p.platform===platform && (!q || `${p.platform} ${p.purpose} ${p.width}x${p.height} ${p.note}`.toLowerCase().includes(q)));
 grid.innerHTML=list.length?list.map(profileCard).join(""):`<div class="profile-empty">Ukuran tidak ditemukan. Pilih platform lain atau hapus pencarian.</div>`;
 bindProfileCards();
 tabs.querySelectorAll<HTMLButtonElement>(".platform-tab").forEach(b=>b.onclick=()=>{
  const next=b.dataset.platform||"__all__";
  renderProfiles(next, "");
  const input=document.querySelector<HTMLInputElement>("#profileSearch")!;
  input.value="";
 });
}
function renderAllMatches(query=""){
 renderProfiles("__all__",query);
}
function openSize(){
 const input=document.querySelector<HTMLInputElement>("#profileSearch")!;
 input.value="";
 renderProfiles("__all__");
 modal.hidden=false;
 requestAnimationFrame(()=>input.focus());
}
function closeSize(){
 modal.hidden=true;
}
document.querySelector("#openSize")!.addEventListener("click",openSize);document.querySelector("#originalSize")!.addEventListener("click",()=>{if(source){selectedProfile=null;customSize=null;showSize(source.naturalWidth,source.naturalHeight,"Ukuran asli");draw()}});document.querySelector("#originalModal")!.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();if(source){selectedProfile=null;customSize=null;showSize(source.naturalWidth,source.naturalHeight,"Ukuran asli");draw();}closeSize()});document.querySelector("#profileSearch")!.addEventListener("input",e=>{const q=(e.target as HTMLInputElement).value;const active=tabs.querySelector<HTMLButtonElement>(".platform-tab.active")?.dataset.platform||"__all__";renderProfiles(active,q);});document.querySelector("#cropTop")!.addEventListener("click",openSize);document.querySelector("#closeSize")!.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();closeSize()});modal.addEventListener("click",e=>{if(e.target===modal)closeSize()});
document.querySelector("#applyCustom")!.addEventListener("click",()=>{const w=Number((document.querySelector("#customW") as HTMLInputElement).value),h=Number((document.querySelector("#customH") as HTMLInputElement).value);if(w>0&&h>0){customSize={w,h};selectedProfile=null;showSize(w,h);draw();closeSize()}});

document.querySelector("#left")!.addEventListener("click",()=>{rotation=(rotation+270)%360;draw()});document.querySelector("#right")!.addEventListener("click",()=>{rotation=(rotation+90)%360;draw()});document.querySelector("#flipX")!.addEventListener("click",()=>{flipX*=-1;draw()});document.querySelector("#flipY")!.addEventListener("click",()=>{flipY*=-1;draw()});
const nudge=(dx:number,dy:number)=>{if(!source)return;const step=Math.max(4,Math.round(Math.min(canvas.width,canvas.height)*.015));panX+=dx*step;panY+=dy*step;draw()};
document.querySelector("#up")!.addEventListener("click",()=>nudge(0,-1));document.querySelector("#down")!.addEventListener("click",()=>nudge(0,1));document.querySelector("#leftMove")!.addEventListener("click",()=>nudge(-1,0));document.querySelector("#rightMove")!.addEventListener("click",()=>nudge(1,0));document.querySelector("#centerMove")!.addEventListener("click",()=>{panX=panY=0;draw()});
for(const id of ["brightness","contrast","saturation","gray"] as const)document.querySelector<HTMLInputElement>("#"+id)!.oninput=e=>{filter={...filter,[id]:Number((e.target as HTMLInputElement).value)};draw()};
document.querySelector("#reset")!.addEventListener("click",()=>{filter={brightness:100,contrast:100,saturation:100,gray:0};for(const [k,v] of Object.entries(filter))document.querySelector<HTMLInputElement>("#"+k)!.value=String(v);draw()});

function addAsset(src:string){if(!source)return;const img=new Image();img.onload=()=>{const s=Math.min(canvas.width,canvas.height)*.28,scale=Math.min(1,s/Math.max(img.naturalWidth,img.naturalHeight));assets.push({src,x:canvas.width/2,y:canvas.height/2,width:img.naturalWidth*scale,height:img.naturalHeight*scale,rotation:0});draw()};img.src=src}
assetInput.onchange=()=>{if(assetInput.files?.[0]){const u=URL.createObjectURL(assetInput.files[0]);addAsset(u);assetInput.value=""}};
document.querySelector("#stickerUpload")!.addEventListener("click",()=>assetInput.click());document.querySelector("#logo")!.addEventListener("click",()=>assetInput.click());
document.querySelector("#removeAsset")!.addEventListener("click",()=>{assets.pop();draw()});document.querySelector("#text")!.addEventListener("click",()=>{if(!source)return;const value=prompt("Teks yang ingin ditambahkan:");if(value)texts.push({text:value,x:canvas.width*.08,y:canvas.height*.15,size:Math.max(32,canvas.width*.06)});draw()});
document.querySelector("#save")!.addEventListener("click",()=>void saveProject());
document.querySelector("#download")!.addEventListener("click",()=>{if(!source)return;const f=(document.querySelector("#format") as HTMLSelectElement).value,q=Number((document.querySelector("#quality") as HTMLInputElement).value)/100,a=document.createElement("a");a.download="media-alat-"+Date.now()+"."+(f==="jpeg"?"jpg":f);a.href=canvas.toDataURL("image/"+f,q);a.click()});
const workspace=document.querySelector("#workspace")!;
let selectionStart:{x:number;y:number}|null=null;
canvas.addEventListener("mousedown",e=>{if(!selectingComponent||!source)return;selectionStart=canvasPoint(e);componentSelection={x:selectionStart.x,y:selectionStart.y,w:0,h:0};draw()});
canvas.addEventListener("mousemove",e=>{if(!selectingComponent||!selectionStart)return;const p=canvasPoint(e);componentSelection={x:Math.min(selectionStart.x,p.x),y:Math.min(selectionStart.y,p.y),w:Math.abs(p.x-selectionStart.x),h:Math.abs(p.y-selectionStart.y)};draw()});
canvas.addEventListener("mouseup",()=>{if(!selectingComponent||!componentSelection)return;selectionStart=null;if(componentSelection.w<4||componentSelection.h<4){componentSelection=null;updateStickerStatus("Area terlalu kecil. Pilih area komponen yang lebih besar.");draw();return}makeComponentSticker()});
document.querySelector("#stickerFromComponent")!.addEventListener("click",()=>{if(!source){alert("Masukkan foto atau logo terlebih dahulu.");return}selectingComponent=true;componentSelection=null;selectionStart=null;updateStickerStatus("Mode pilih aktif: seret kotak di atas komponen yang ingin dijadikan stiker.");draw()});
workspace.addEventListener("dragover",e=>e.preventDefault());workspace.addEventListener("drop",e=>{e.preventDefault();const f=(e as DragEvent).dataTransfer?.files[0];if(f)load(f)});

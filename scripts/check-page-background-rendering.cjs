/* eslint-disable @typescript-eslint/no-require-imports -- Node-only rendering regression checks. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript'),React=require('react'),crypto=require('node:crypto');
const {renderToStaticMarkup}=require('react-dom/server');
let content=null;
function load(file){const record={exports:{}};const r=name=>{
 if(name==='@/sanity/content')return {getHomePage:async()=>content,getAboutPage:async()=>content,getContactPage:async()=>content,getBoardsPage:async()=>content,getCustomPage:async()=>content,pageImage:(_image,fallback)=>_image?.asset?._ref?'/uploaded-photo.jpg':fallback};
 if(name==='@/lib/square')return {getProducts:async()=>[{id:'board'}]};
 if(name==='@/lib/fonts')return {eurostileExtended:{className:'font'},eurostileRegular:{className:'font'}};
 if(name.startsWith('@/components/'))return new Proxy({}, {get:(_,key)=>props=>React.createElement('div',{'data-component':key,'data-custom-card':props.includeCustomBoard?'yes':undefined})});
 if(name==='next/image')return {__esModule:true,default:props=>{const imageProps={...props};delete imageProps.fill;delete imageProps.preload;return React.createElement('img',imageProps)}};
 return require(name);
};vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,{require:r,module:record,exports:record.exports});return record.exports;}
const routes={home:'src/app/page.tsx',about:'src/app/about/page.tsx',contact:'src/app/contact/page.tsx',boards:'src/app/surfboards/page.tsx',custom:'src/app/custom/page.tsx'};
const recording=process.argv.includes('--record-baselines');
const baselineFile='scripts/fixtures/cms-page-baselines.json';
const baselines=recording?{}:JSON.parse(fs.readFileSync(baselineFile,'utf8'));
const hash=html=>crypto.createHash('sha256').update(html).digest('hex');
async function main(){for(const [name,file] of Object.entries(routes)){
 const old=recording?load(`/private/tmp/ibd-cms-audit/${name}-before.tsx`):null,current=load(file);
 if(recording)baselines[name]=[];
 let scenarioIndex=0;
 for(const value of [null,{}, {heading:'Saved heading',title:'Saved title',catalogHeading:'Saved catalog',image:{asset:{_ref:'image-test'}},backgroundImage:{asset:{_ref:'image-test'}},seo:{title:'Saved SEO',description:'Saved description'},seoTitle:'Flat SEO',seoDescription:'Flat description',showCustomBoard:false}]){
 content=value;
 if(recording)baselines[name].push({htmlHash:hash(renderToStaticMarkup(await old.default())),metadata:JSON.parse(JSON.stringify(await old.generateMetadata()))});
 const expected=baselines[name][scenarioIndex++];
 assert.equal(hash(renderToStaticMarkup(await current.default())),expected.htmlHash,`${name}: background-unset HTML changed`);
 assert.deepEqual(JSON.parse(JSON.stringify(await current.generateMetadata())),expected.metadata,`${name}: metadata changed`);
 }
 content={};const originalBackground=renderToStaticMarkup(await current.default());
 for(const hex of ['#ffffff','#0c0a09','#ddd']){
   content={pageBackground:{hex}};
   assert.equal(renderToStaticMarkup(await current.default()),originalBackground,`${name}: retired color still changes the background`);
   content={pageBackground:{hex},image:{asset:{_ref:'image-test'}},backgroundImage:{asset:{_ref:'image-test'}}};
   const html=renderToStaticMarkup(await current.default());
   if(['home','custom','boards'].includes(name))assert(html.includes('/uploaded-photo.jpg'),`${name}: image setting no longer works`);
 }
 console.log(`PASS ${name}: unchanged default/saved HTML and SEO; retired colors ignored; image settings preserved.`);
}
 if(recording){fs.mkdirSync('scripts/fixtures',{recursive:true});fs.writeFileSync(baselineFile,JSON.stringify(baselines,null,2)+'\n');}
}
main().catch(e=>{console.error(e.message);process.exitCode=1});

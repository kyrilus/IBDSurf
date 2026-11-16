/* eslint-disable @typescript-eslint/no-require-imports -- Node-only schema audit uses the TypeScript compiler without importing Studio UI. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const req=require('node:module').createRequire(path.resolve(__dirname,'../../package.json'));
const ts=req('typescript');const root=path.resolve(__dirname,'../../../studio-ibdesigns/schemaTypes');
const cache=new Map();
function load(file){file=path.resolve(file);if(cache.has(file))return cache.get(file).exports;const m={exports:{}};cache.set(file,m);const r=name=>name==='sanity'?{defineType:x=>x,defineField:x=>x,defineArrayMember:x=>x,ALL_FIELDS_GROUP:{name:'all-fields',title:'All fields'}}:name.startsWith('@sanity/icons/')?{DocumentIcon:'__DOCUMENT_ICON__'}:name.startsWith('.')?load(path.resolve(path.dirname(file),name+(path.extname(name)?'':'.ts'))):req(name);vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText,{require:r,module:m,exports:m.exports,console,Set,Map},{filename:file});return m.exports;}
module.exports={load,root,schemas:()=>load(path.join(root,'index.ts')).schemaTypes};
if(require.main===module){const schemas=module.exports.schemas();console.log(JSON.stringify(schemas,(key,value)=>typeof value==='function'?{functionSource:value.toString()}:value,2));}

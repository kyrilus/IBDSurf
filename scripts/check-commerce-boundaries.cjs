/* eslint-disable @typescript-eslint/no-require-imports -- Node-only regression checks. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
function load(file){const record={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{module:record,exports:record.exports});return record.exports;}
const {matchesPriceRange,isCategoryMode}=load('src/lib/catalog-filters.ts');
assert(matchesPriceRange(999.99,{maxPrice:1000}));assert(!matchesPriceRange(1000,{maxPrice:1000}));assert(matchesPriceRange(1000,{minPrice:1000}));assert(!matchesPriceRange(1499,{minPrice:1500}));assert(isCategoryMode('available'));assert(!isCategoryMode('invalid'));
const {customRequestBody}=load('src/lib/custom-form.ts');
const data=new FormData();data.set('field-current','Point breaks');data.set('field-removed','Removed answer');
const body=customRequestBody([{_key:'current',label:'Preferred Waves',inputType:'text'}],data);
assert.equal(body,'Preferred Waves: Point breaks');assert.equal(customRequestBody([],data),'');
console.log('PASS: price boundaries and category modes; custom-form added/removed fields; no checkout or email request sent.');

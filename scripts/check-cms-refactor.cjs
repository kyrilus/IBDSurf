/* eslint-disable @typescript-eslint/no-require-imports -- Node-only verification script. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {schemas} = require('./lib/load-studio-schemas.cjs');
const before = require('../docs/sanity-fields-before.json');
const after = schemas();
const pages = new Set(['homePage','boardsPage','customPage','aboutPage','contactPage']);
const normalize = value => JSON.parse(JSON.stringify(value, (key,value) => typeof value === 'function' ? {functionSource:value.toString()} : value));
function fieldsAt(fields, prefix='') {
  const result = new Map();
  for (const field of fields ?? []) {
    const key=prefix ? `${prefix}.${field.name}` : field.name;
    result.set(key,field);
    for (const [k,v] of fieldsAt(field.fields,key)) result.set(k,v);
    for (const member of field.of ?? []) for (const [k,v] of fieldsAt(member.fields,`${key}[]`)) result.set(k,v);
  }
  return result;
}
for (const oldDoc of before) {
  const doc=after.find(d=>d.name===oldDoc.name);assert(doc,`Missing ${oldDoc.name}`);
  const previous=fieldsAt(oldDoc.fields),current=fieldsAt(doc.fields);
  for(const [path,oldField] of previous) {
    const field=current.get(path);assert(field,`Deleted ${doc.name}.${path}`);
    for(const key of ['name','type','initialValue','validation','hidden','readOnly']) assert.deepEqual(normalize(field[key] ?? null),oldField[key] ?? null,`Changed ${doc.name}.${path}.${key}`);
  }
  for(const [path] of current) if(!previous.has(path)) assert(pages.has(doc.name)&&path==='pageBackground',`Unexpected new field ${doc.name}.${path}`);
  const groups=doc.groups.filter(g=>!g.hidden);
  assert.equal(groups[0].default,true);
  if(pages.has(doc.name))assert.equal(groups[0].title,'General');
  for(const group of groups)assert(doc.fields.some(f=>f.hidden!==true&&(Array.isArray(f.group)?f.group.includes(group.name):f.group===group.name)),`Empty ${doc.name}.${group.name}`);
  for(const field of doc.fields.filter(f=>f.hidden!==true)) {
    assert(groups.some(g=>g.name===field.group),`Ungrouped ${doc.name}.${field.name}`);
    assert(field.description,`Missing explanation ${doc.name}.${field.name}`);
  }
  if(pages.has(doc.name))assert.equal(doc.fields.find(f=>f.name==='pageBackground').hidden,true);
}
assert.equal(after.length,9);
const queries=fs.readFileSync('src/sanity/queries.ts','utf8');
assert(!queries.includes('pageBackground'), 'Retired colors must not be queried');
console.log('PASS: all nine editors preserve fields and groups; legacy page colors are hidden and not queried.');

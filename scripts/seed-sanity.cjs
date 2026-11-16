/* eslint-disable @typescript-eslint/no-require-imports -- Sanity exec uses this CommonJS script with the sibling Studio's dependencies. */
// Run from the sibling Studio with: sanity exec ../ian-blackmore-designs/scripts/seed-sanity.cjs --with-user-token
const {createRequire} = require('node:module');
const {readFileSync, createReadStream} = require('node:fs');
const {resolve} = require('node:path');
const studioRequire = createRequire(resolve(process.cwd(), 'package.json'));
const {getCliClient} = studioRequire('sanity/cli');
const client = getCliClient({apiVersion: '2026-11-11'});

async function main() {
  const documents = JSON.parse(readFileSync(resolve(__dirname, 'sanity-initial-content.json'), 'utf8'));
  const images = {
    homePage: ['board-rails.jpg', 'Surfboard rails'],
    aboutPage: ['background-sample.png', 'Ian Blackmore Designs'],
    contactPage: ['hero/board-noses.png', 'Ian Blackmore Designs contact'],
  };
  for (const document of documents) {
    const existing = await client.fetch('*[_id in $ids][0]._id', {ids: [document._id, document._type]});
    if (existing) {
      console.log(`Keeping existing ${document._type}`);
      continue;
    }
    const [file, alt] = images[document._type];
    const asset = await client.assets.upload('image', createReadStream(resolve(__dirname, '../public/images', file)), {filename: file.split('/').pop()});
    document.image = {_type: 'image', alt, asset: {_type: 'reference', _ref: asset._id}};
    await client.createIfNotExists(document);
    console.log(`Created draft ${document._type}`);
  }
}
main().catch((error) => {console.error(error.message); process.exitCode = 1;});

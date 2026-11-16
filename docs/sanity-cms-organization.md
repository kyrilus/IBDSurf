# IBD Sanity CMS organization audit and implementation

**Subsequent update:** Page Background color controls were removed at the user’s request. Existing background image controls and the original site styling remain. Saved color values are kept hidden for compatibility and are no longer queried or applied. The background-color implementation and verification notes below record the original refactor; they are historical. The current `sanity-fields-after.json` inventory and `npm run cms:check` reflect the removal.

## Result

Reviewed every registered document, its nested objects, query projections, and frontend usage. Studio v6.23.0 now uses native groups with the first relevant tab selected by default. Stored names, type names, document IDs, field validation, defaults, hidden conditions, keys, and references are preserved. No content migration or dataset writes were performed in this refactor.

The original field definitions remain in the existing schema files. `schemaTypes/editorLayouts.ts` centralizes editor-facing names, descriptions, and tab assignments; `editorLayout.ts` applies that presentation metadata and adds the single shared page color field. This keeps presentation changes separate from stored data.

## Editors, tabs, and fields

Parent groups also contain every nested field beneath the listed object or array. Existing hidden compatibility/accessibility fields remain hidden; they are listed separately below.

### Home (`homePage`)

| Tab | Visible fields |
| --- | --- |
| General | Page Heading (`catalogHeading`); Page Background (`pageBackground`); Page Background Image (`image`); Search Results (SEO) (`seo`) |
| Hero | Hero Logo (`heroLogo`) |
| Board Collection | Show Custom Board Card (`showCustomBoard`) |

Hidden fields retained: `title`.

### About (`aboutPage`)

| Tab | Visible fields |
| --- | --- |
| General | Page Heading (`title`); Page Background (`pageBackground`); Search Results (SEO) (`seo`) |
| Story & Content | Introductory Text (`eyebrow`); Story Heading (`heading`); Story Text (`body`); Story Image (`image`) |

### Contact (`contactPage`)

| Tab | Visible fields |
| --- | --- |
| General | Page Heading (`title`); Page Background (`pageBackground`); Search Results (SEO) (`seo`) |
| Page Content | Show Introductory Text (`showEyebrow`); Introductory Text (`eyebrow`); Show Content Heading (`showHeading`); Content Heading (`heading`); Contact Message (`body`); Contact Image (`image`) |
| Contact Information | Show Email (`showEmail`); Email Address (`email`); Show Phone (`showPhone`); Phone Number (`phone`); Show Address (`showAddress`); Address (`location`) |
| Social Links | Show Instagram (`showInstagram`); Instagram Link (`instagramUrl`) |

### Footer (`footer`)

| Tab | Visible fields |
| --- | --- |
| Branding | Brand Logo (`brandLogo`); Company Name (`brandName`); Company Description (`description`); Copyright Name (`copyrightName`) |
| Navigation Links | Footer Heading 1 (`shopHeading`); Footer Links 1 (`shopLinks`); Footer Heading 2 (`brandHeading`); Footer Links 2 (`brandLinks`); Legal & Information Links (`legalLinks`) |
| Social Links | Footer Heading 3 (`followHeading`); Instagram Link (`instagramUrl`) |

### Header (`header`)

| Tab | Visible fields |
| --- | --- |
| Branding | Desktop Company Name Header (`brandName`); Mobile Company Name Header - Line 1 (`mobileLineOne`); Mobile Company Name Header - Line 2 (`mobileLineTwo`); Header & Menu Logo (`lightLogo`) |

Hidden fields retained: `homeLabel`, `darkLogo`.

### Menu (`menu`)

| Tab | Visible fields |
| --- | --- |
| General | Menu Heading (`heading`); Show Menu Heading (`showHeading`) |
| Navigation Links | Navigation Links (`links`) |

Hidden fields retained: `title`, `openLabel`, `closeLabel`.

### Shopping Cart (`shoppingCart`)

| Tab | Visible fields |
| --- | --- |
| General | Cart Heading (`title`) |
| Cart Content | Empty Cart Heading (`emptyHeading`); Empty Cart Message (`emptyDescription`); Empty Cart Illustration (`emptyImage`); Subtotal Label (`subtotalLabel`); Remove Item Label (`removeLabel`) |
| Buttons & Checkout | Empty Cart Button Text (`browseLabel`); Empty Cart Button Link (`browseHref`); Checkout Note (`checkoutNote`); Checkout Button Text (`checkoutLabel`); Checkout Button Loading Text (`checkoutLoadingLabel`) |

Hidden fields retained: `openLabel`, `closeLabel`.

### Boards (`boardsPage`)

| Tab | Visible fields |
| --- | --- |
| General | Page Heading (`heading`); Page Background (`pageBackground`); Page Background Image (`backgroundImage`); SEO Title (`seoTitle`); SEO Description (`seoDescription`) |
| Board Collection | Filter Label (`filterLabel`); Show Board-Type Filters (`showCategoryFilters`); Board-Type Filters (`categoryFilters`); Show Price Filter (`showPriceFilter`); Price Filter Label (`priceLabel`); All Prices Label (`anyPriceLabel`); Price Ranges (`priceRanges`); Show Custom Board Card (`showCustomBoard`); No Results Message (`emptyMessage`) |

### Custom (`customPage`)

| Tab | Visible fields |
| --- | --- |
| General | Page Heading (`heading`); Page Background (`pageBackground`); Page Background Image (`backgroundImage`); SEO Title (`seoTitle`); SEO Description (`seoDescription`) |
| Custom Request Form | Form Fields (`formFields`); Submit Button Text (`submitLabel`); Submit Button Note (`submitNote`) |
| Side Modal | Contact Email (`contactEmail`); Sidebar Text (`formCopy`) |

Hidden fields retained: `boardTypes`, `experienceLevels`, `formCopy.nameLabel`, `formCopy.emailLabel`, `formCopy.phoneLabel`, `formCopy.boardTypeLabel`, `formCopy.boardTypePlaceholder`, `formCopy.dimensionsLabel`, `formCopy.dimensionsPlaceholder`, `formCopy.experienceLabel`, `formCopy.experiencePlaceholder`, `formCopy.detailsLabel`, `formCopy.detailsPlaceholder`, `formCopy.submitLabel`, `formCopy.submitNote`.

## Audit findings and decisions

- **Background colors:** none of the five page editors previously had a color field or picker. Home, Boards, and Custom already had background image controls; About and Contact had content images, which are not page backgrounds. Added only `pageBackground` to those five page types, using the official `@sanity/color-input` 6.1.10 plugin compatible with Sanity 6. No background controls were added to Header, Menu, Shopping Cart, or Footer.
- **Background defaults:** when `pageBackground` is absent or invalid, original markup/backgrounds are preserved. About, Contact, and image-free Boards retain the dark grid (#0c0a09 in dark mode; existing light styles retained). Home retains board-rails photography and the existing black overlay; Custom retains board-noses photography. Selected photos sit above the color. Removing the photo exposes a selected color; when both are empty, original photo fallbacks return. Home’s intentional black overlay remains.
- **Readability:** explicit color-only pages select readable light/dark utility styling and matching native form-control color schemes within that page. Header, footer, cart, menu, and other pages keep their current styling. Pages with photos keep the original photo text treatment.
- **General tabs:** page-wide headings, background settings and existing SEO fields are grouped first. SEO remains nested on Home/About/Contact and flat on Boards/Custom; flat fields use a native SEO fieldset inside General. No duplicate SEO settings were introduced.
- **Actual page structure:** Home displays the existing Square catalog, so its tab is Board Collection rather than implying a new featured-product selector. Boards filter/display controls share Board Collection. Custom retains Custom Request Form and Side Modal. About keeps its image with Story & Content. Contact has no form, so no empty Contact Form tab was created.
- **Site-wide controls:** Header has branding fields only, so Branding is its only tab. Menu has General and Navigation Links. Shopping Cart has General, Cart Content, and Buttons & Checkout. Footer combines company copy with Branding and keeps Navigation Links and Social Links. There are no empty Appearance, Advanced, gallery, or buttons tabs.
- **Unused/legacy fields:** Home `title` is unused by the website and remains hidden. Header home label and hidden light-background logo support accessibility/compatibility; menu/cart hidden labels support screen readers. Custom’s hidden fixed-form fields and old submit text remain compatibility fallbacks. Nothing was deleted.
- **SEO/social sharing:** per-page sharing-image controls do not exist. The site inherits `/og-image.jpg` from the root layout. This remains unchanged rather than adding unrequested duplicate controls. Browser/search title fallbacks remain Home/site default, About/“About Us”, Contact/“Contact”, Boards/“Surfboards”, and Custom/heading then “Custom Surfboards”. Clearing some text/image fields intentionally still invokes their existing fallback; this refactor does not change that behavior.
- **Commerce:** Square still supplies products, prices, availability, checkout and payment handling. Navigation keys/order and all existing link destinations remain content-owned. No Square or checkout code was changed.
- **Reusable objects:** original inline image/alt, SEO, Portable Text body, navigation/footer links, category filters, price ranges, custom form fields, and sidebar-text objects remain registered through their parent schemas. Color input adds the vendor `color`, `hslaColor`, `hsvaColor`, and `rgbaColor` objects. No custom Studio input components were added beyond the official color plugin.

## Field label changes (display labels only)

| Editor | Stored path | Before | After |
| --- | --- | --- | --- |
| Home | `catalogHeading` | Catalog Heading | Page Heading |
| Home | `image.alt` | Alternative text | Image Description |
| Home | `seo` | SEO | Search Results (SEO) |
| Home | `seo.title` | Title | SEO Title |
| Home | `seo.description` | Description | SEO Description |
| Home | `heroLogo` | Hero logo | Hero Logo |
| Home | `heroLogo.alt` | Alternative text | Alternative Text |
| Home | `showCustomBoard` | Show custom board | Show Custom Board Card |
| About | `title` | Title | Page Heading |
| About | `seo` | SEO | Search Results (SEO) |
| About | `seo.title` | Title | SEO Title |
| About | `seo.description` | Description | SEO Description |
| About | `eyebrow` | Eyebrow | Introductory Text |
| About | `heading` | Heading | Story Heading |
| About | `body` | Body | Story Text |
| About | `image` | Image | Story Image |
| About | `image.alt` | Alternative text | Alternative Text |
| Contact | `title` | Title | Page Heading |
| Contact | `seo` | SEO | Search Results (SEO) |
| Contact | `seo.title` | Title | SEO Title |
| Contact | `seo.description` | Description | SEO Description |
| Contact | `showEyebrow` | Show eyebrow | Show Introductory Text |
| Contact | `eyebrow` | Eyebrow | Introductory Text |
| Contact | `showHeading` | Show heading | Show Content Heading |
| Contact | `heading` | Heading | Content Heading |
| Contact | `body` | Body | Contact Message |
| Contact | `image` | Image | Contact Image |
| Contact | `image.alt` | Alternative text | Alternative Text |
| Contact | `showEmail` | Show email | Show Email |
| Contact | `email` | Email | Email Address |
| Contact | `showPhone` | Show phone | Show Phone |
| Contact | `phone` | Phone | Phone Number |
| Contact | `showAddress` | Show address | Show Address |
| Contact | `instagramUrl` | Instagram URL | Instagram Link |
| Footer | `brandLogo` | Brand logo | Brand Logo |
| Footer | `brandLogo.alt` | Alternative text | Alternative Text |
| Footer | `brandName` | Brand Name | Company Name |
| Footer | `description` | Description | Company Description |
| Footer | `shopLinks` | Shop Links | Footer Links 1 |
| Footer | `shopLinks[].label` | Label | Link Text |
| Footer | `shopLinks[].href` | Link destination | Link Destination |
| Footer | `brandLinks` | Brand Links | Footer Links 2 |
| Footer | `brandLinks[].label` | Label | Link Text |
| Footer | `brandLinks[].href` | Link destination | Link Destination |
| Footer | `legalLinks` | Legal Links | Legal & Information Links |
| Footer | `legalLinks[].label` | Label | Link Text |
| Footer | `legalLinks[].href` | Link destination | Link Destination |
| Footer | `instagramUrl` | Instagram URL | Instagram Link |
| Header | `lightLogo` | Logo for dark backgrounds | Header & Menu Logo |
| Menu | `heading` | Menu heading | Menu Heading |
| Menu | `showHeading` | Show menu heading | Show Menu Heading |
| Menu | `links` | Links | Navigation Links |
| Menu | `links[].label` | Label | Link Text |
| Menu | `links[].href` | Link destination | Link Destination |
| Shopping Cart | `title` | Cart heading | Cart Heading |
| Shopping Cart | `emptyHeading` | Empty Heading | Empty Cart Heading |
| Shopping Cart | `emptyDescription` | Empty Description | Empty Cart Message |
| Shopping Cart | `emptyImage` | Empty cart illustration | Empty Cart Illustration |
| Shopping Cart | `browseLabel` | Empty Cart Button Label | Empty Cart Button Text |
| Shopping Cart | `checkoutLabel` | Checkout Button Label | Checkout Button Text |
| Shopping Cart | `checkoutLoadingLabel` | Checkout Button Loading Label | Checkout Button Loading Text |
| Boards | `heading` | Heading | Page Heading |
| Boards | `seoTitle` | SEO title | SEO Title |
| Boards | `seoDescription` | SEO description | SEO Description |
| Boards | `showCategoryFilters` | Show Category Filters | Show Board-Type Filters |
| Boards | `categoryFilters` | Category Filters | Board-Type Filters |
| Boards | `categoryFilters[].label` | Label | Button Text |
| Boards | `categoryFilters[].mode` | Mode | Boards to Show |
| Boards | `priceLabel` | Price Label | Price Filter Label |
| Boards | `anyPriceLabel` | Any Price Label | All Prices Label |
| Boards | `priceRanges[].label` | Label | Option Text |
| Boards | `priceRanges[].minPrice` | Min Price | Minimum Price |
| Boards | `priceRanges[].maxPrice` | Max Price | Maximum Price |
| Boards | `showCustomBoard` | Show custom-order card | Show Custom Board Card |
| Boards | `emptyMessage` | Empty Message | No Results Message |
| Custom | `heading` | Page heading | Page Heading |
| Custom | `seoTitle` | SEO title | SEO Title |
| Custom | `seoDescription` | SEO description | SEO Description |
| Custom | `formFields` | Form fields | Form Fields |
| Custom | `formFields[].label` | Label | Field Label |
| Custom | `formFields[].inputType` | Field type | Field Type |
| Custom | `formFields[].placeholder` | Placeholder | Placeholder Text |
| Custom | `formFields[].required` | Required field | Required Field |
| Custom | `formFields[].fullWidth` | Full width (both columns) | Full Width |
| Custom | `formFields[].options` | Dropdown choices | Dropdown Choices |
| Custom | `submitLabel` | Submit Button Label | Submit Button Text |
| Custom | `formCopy` | Sidebar text | Sidebar Text |
| Custom | `formCopy.copyEmailLabel` | Copy Email Button Label | Copy Email Button Text |
| Custom | `formCopy.emailButtonLabel` | Email Button Label | Email Button Text |

## Descriptions added or improved

| Editor | Stored path | Current explanation |
| --- | --- | --- |
| Home | `catalogHeading` | The main heading above the homepage board collection. |
| Home | `pageBackground` | Changes the background color of this page. |
| Home | `image` | An image behind this page. It appears above the Page Background color. Clear the image to show only the selected color; leave both empty to keep the original background. |
| Home | `image.alt` | A description kept with this background image in the CMS. The website treats the background as decorative. |
| Home | `seo` | Browser-tab and search-result text. Empty fields keep the current website defaults. |
| Home | `seo.title` | The browser-tab and search-result title. Leave empty to keep the current default. |
| Home | `seo.description` | A short summary for search results. Leave empty to keep the current default. |
| Home | `heroLogo` | The large logo above the homepage board collection. Use a transparent image. Leave empty to keep the original IBD logo. |
| Home | `heroLogo.alt` | A short description for people using screen readers. Describe the image rather than its filename. |
| Home | `showCustomBoard` | Show the custom-order card alongside the boards on the homepage. |
| About | `title` | The main heading displayed at the top of this page. |
| About | `pageBackground` | Changes the background color of this page. |
| About | `seo` | Browser-tab and search-result text. Empty fields keep the current website defaults. |
| About | `seo.title` | The browser-tab and search-result title. Leave empty to keep the current default. |
| About | `seo.description` | A short summary for search results. Leave empty to keep the current default. |
| About | `eyebrow` | The small line above the story heading, such as the company name. |
| About | `heading` | The heading beside the About page image. |
| About | `body` | The paragraphs and formatted text below the story heading. |
| About | `image` | The image beside the story. Use crop and hotspot controls to choose its focus. |
| About | `image.alt` | A short description for people using screen readers. Describe the image rather than its filename. |
| Contact | `title` | The main heading displayed at the top of this page. |
| Contact | `pageBackground` | Changes the background color of this page. |
| Contact | `seo` | Browser-tab and search-result text. Empty fields keep the current website defaults. |
| Contact | `seo.title` | The browser-tab and search-result title. Leave empty to keep the current default. |
| Contact | `seo.description` | A short summary for search results. Leave empty to keep the current default. |
| Contact | `showEyebrow` | Display the small introductory line above the contact-section heading. |
| Contact | `eyebrow` | The small line above the contact-section heading. |
| Contact | `showHeading` | Display the heading beside the Contact page image. This does not hide the page heading at the top. |
| Contact | `heading` | The heading above the contact message and contact details. |
| Contact | `body` | The paragraphs below the contact-section heading. |
| Contact | `image` | The image beside the contact message and contact details. |
| Contact | `image.alt` | A short description for people using screen readers. Describe the image rather than its filename. |
| Contact | `showEmail` | Display the email address in the contact details. |
| Contact | `email` | The email address visitors can click to open their email app. |
| Contact | `showPhone` | Display the phone number in the contact details. |
| Contact | `phone` | The phone number displayed on this page. |
| Contact | `showAddress` | Display the address in the contact details. |
| Contact | `location` | The address displayed on this page. |
| Contact | `showInstagram` | Display the Instagram link in the contact details. |
| Contact | `instagramUrl` | The Instagram profile visitors open when they click Instagram. |
| Footer | `brandLogo` | The logo on the left side of the footer. Use a transparent, light-colored image for the dark background. |
| Footer | `brandLogo.alt` | A short description for people using screen readers. Describe the image rather than its filename. |
| Footer | `brandName` | The company name beside the footer logo. |
| Footer | `description` | The short description below the company name. |
| Footer | `copyrightName` | The name after the copyright symbol and year. The current year is added automatically. |
| Footer | `shopHeading` | The heading above the first column of footer links. |
| Footer | `shopLinks` | Links under Footer Heading 1. Drag to change their order. |
| Footer | `shopLinks[].label` | The text visitors see for this link. |
| Footer | `shopLinks[].href` | The page or website visitors open when they click this link. Use /contact for a site page or a full https:// address. |
| Footer | `brandHeading` | The heading above the second column of footer links. |
| Footer | `brandLinks` | Links under Footer Heading 2. Drag to change their order. |
| Footer | `brandLinks[].label` | The text visitors see for this link. |
| Footer | `brandLinks[].href` | The page or website visitors open when they click this link. Use /contact for a site page or a full https:// address. |
| Footer | `legalLinks` | The policy and information links in the bottom row of the footer. Drag to change their order. |
| Footer | `legalLinks[].label` | The text visitors see for this link. |
| Footer | `legalLinks[].href` | The page or website visitors open when they click this link. Use /contact for a site page or a full https:// address. |
| Footer | `followHeading` | The heading above the Instagram icon. |
| Footer | `instagramUrl` | The Instagram profile visitors open from the footer icon. |
| Header | `brandName` | Company name shown at the top of the homepage on wider screens before the logo appears on scroll. |
| Header | `mobileLineOne` | First line of the company name on smaller screens at the top of the homepage. |
| Header | `mobileLineTwo` | Second line of the company name on smaller screens at the top of the homepage. |
| Header | `lightLogo` | The logo used in the header and navigation-menu footer against dark backgrounds. Use a transparent, light-colored logo. |
| Header | `darkLogo` | Choose an image from the media library or upload a replacement. Existing images remain selected until changed. |
| Menu | `heading` | The heading at the top right of the slide-out navigation menu. |
| Menu | `showHeading` | Turn this on to display the heading in the website’s navigation menu. |
| Menu | `links` | Drag to reorder the links in the slide-out menu. Add, rename, or remove links here. |
| Menu | `links[].label` | The text visitors see for this link. |
| Menu | `links[].href` | The page or website visitors open when they click this link. Use /contact for a site page or a full https:// address. |
| Shopping Cart | `title` | The heading at the top of the cart slide-out. |
| Shopping Cart | `emptyHeading` | The heading displayed when the cart contains no boards. |
| Shopping Cart | `emptyDescription` | The explanatory text beneath the empty-cart heading. |
| Shopping Cart | `emptyImage` | The artwork above the empty-cart message. Leave empty to use the original illustration. |
| Shopping Cart | `subtotalLabel` | The label beside the calculated cart subtotal. |
| Shopping Cart | `removeLabel` | The text on each cart item’s remove button. |
| Shopping Cart | `browseLabel` | The button text below the empty-cart message. |
| Shopping Cart | `browseHref` | The page or website visitors open from the empty-cart button. |
| Shopping Cart | `checkoutNote` | The message above the checkout button, such as how taxes and shipping are calculated. |
| Shopping Cart | `checkoutLabel` | The text on the button that starts Square checkout. |
| Shopping Cart | `checkoutLoadingLabel` | The button text shown while the website prepares Square checkout. |
| Boards | `heading` | The main heading displayed at the top of this page. |
| Boards | `pageBackground` | Changes the background color of this page. |
| Boards | `backgroundImage` | An image behind this page. It appears above the Page Background color. Clear the image to show only the selected color; leave both empty to keep the original background. |
| Boards | `seoTitle` | The browser-tab and search-result title. Leave empty to use Surfboards. |
| Boards | `seoDescription` | A short summary for search results. Leave empty to keep the current default. |
| Boards | `filterLabel` | The label beside the board-type filter buttons. |
| Boards | `showCategoryFilters` | Display the buttons visitors use to choose All, Available, or Custom boards. |
| Boards | `categoryFilters` | Drag to reorder the filter buttons. Rename or remove buttons here; Square still supplies board availability. |
| Boards | `categoryFilters[].label` | Text visitors see on this filter button. |
| Boards | `categoryFilters[].mode` | Choose all boards, boards available in Square, or the custom-order card. |
| Boards | `showPriceFilter` | Display the price-range dropdown above the board collection. |
| Boards | `priceLabel` | The label beside the price dropdown. |
| Boards | `anyPriceLabel` | The dropdown option that shows every price. |
| Boards | `priceRanges` | The choices in the price dropdown. Minimum prices are included; maximum prices are excluded. Prices use the catalog currency (currently USD). |
| Boards | `priceRanges[].label` | Text visitors see for this price range. |
| Boards | `priceRanges[].minPrice` | Include boards at or above this price. Leave empty for no lower limit. |
| Boards | `priceRanges[].maxPrice` | Include boards below this price. Leave empty for no upper limit. |
| Boards | `showCustomBoard` | Display the custom-order card in the board collection when no price range is selected. |
| Boards | `emptyMessage` | Shown when no boards match the selected filters. |
| Custom | `heading` | The main heading displayed at the top of this page. |
| Custom | `pageBackground` | Changes the background color of this page. |
| Custom | `backgroundImage` | An image behind this page. It appears above the Page Background color. Clear the image to show only the selected color; leave both empty to keep the original background. |
| Custom | `seoTitle` | The browser-tab and search-result title. Leave empty to use the page heading. |
| Custom | `seoDescription` | A short summary for search results. Leave empty to keep the current default. |
| Custom | `formFields` | Add, remove, or drag fields into order. Fields use two columns on larger screens; Full Width spans both. An empty list hides all inputs. |
| Custom | `formFields[].label` | Text displayed above this form input and beside its answer in the inquiry email. |
| Custom | `formFields[].inputType` | Choose text, email, phone, number, long text, or a dropdown. |
| Custom | `formFields[].placeholder` | An example or prompt shown while this input is empty. |
| Custom | `formFields[].required` | Customers must complete this field before opening their inquiry email. |
| Custom | `formFields[].fullWidth` | Make this field span both form columns. Other fields use one column. |
| Custom | `formFields[].options` | Add or reorder the choices customers can select in this dropdown. |
| Custom | `submitLabel` | Text on the button that opens the customer’s email app with the request ready to review and send. |
| Custom | `submitNote` | The explanatory text immediately below the submit button. |
| Custom | `contactEmail` | Receives custom requests and appears in the contact panel beside the form. |
| Custom | `formCopy` | Text and buttons in the contact panel beside the form. |
| Custom | `formCopy.sidebarHeading` | The heading above the direct-email contact details. |
| Custom | `formCopy.sidebarDescription` | The explanation below the contact-panel heading. |
| Custom | `formCopy.copyEmailLabel` | Text on the button that copies the contact email address. |
| Custom | `formCopy.emailButtonLabel` | Text on the link that opens a new email to the contact address. |
| Custom | `formCopy.emailCopiedMessage` | Confirmation shown after the email address is copied. |

## Frontend field usage

| Editor | Where queried/rendered |
| --- | --- |
| Home | HOME_PAGE_QUERY → homepage: catalogHeading, background photo, hero logo, showCustomBoard; seo controls metadata; hidden title unused. |
| Boards | BOARDS_PAGE_QUERY → /surfboards and SurfboardCatalog: heading, background, filter visibility/order/modes, price ranges, custom card and empty message; flat SEO controls metadata. |
| Custom | CUSTOM_PAGE_QUERY → /custom and CustomBoardRequestForm: heading, background, editable inputs, submit text, email and sidebar; legacy formCopy remains fallback; flat SEO controls metadata. |
| About | ABOUT_PAGE_QUERY → /about: title, story eyebrow/heading/body/image; nested SEO controls metadata. |
| Contact | CONTACT_PAGE_QUERY → /contact: title, content image/eyebrow/heading/body, visibility switches, email/phone/address/Instagram; nested SEO controls metadata. |
| Header | HEADER_QUERY → SiteHeader → Header/HamburgerMenu: desktop/mobile branding, current logo and hidden accessibility/legacy fields. |
| Menu | MENU_QUERY → SiteHeader → HamburgerMenu/Navigation: heading, visibility, ordered links and hidden accessibility labels. |
| Shopping Cart | SHOPPING_CART_QUERY → SiteHeader → CartDrawer/CartItem: heading, empty illustration/messages, links and button labels, subtotal/remove labels; transaction logic unchanged. |
| Footer | FOOTER_QUERY → Footer: branding/logo/copy, three section headings, ordered links, Instagram and copyright name. |

All five page queries additionally fetch `pageBackground{hex}`. `src/lib/page-background.ts` validates the opaque hex value, determines optional page tone, and returns container-only styles. The original field names/projections and metadata functions remain intact.

## Verification and practical limits

- PASS: registered schemas and all pre-existing nested fields compare against the before inventory; names/types/validations/defaults/hidden/read-only settings are unchanged. Every visible field has a group and description; every group has visible fields.
- PASS: Sanity’s schema validator reports no errors across all nine documents and their nested definitions.
- PASS: Studio TypeScript checks using installed TypeScript 6 and the standalone Studio production build, including the official color plugin.
- PASS: website lint, TypeScript and production build.
- PASS: render regression tests for five pages compare pre-refactor HTML hashes and SEO output with no new background values, with empty records and representative saved content.
- PASS: all five page color paths, invalid/missing defaults, short/long hex colors, contrast, native-control color scheme, uploaded-image precedence and photo fallback behavior.
- PASS: existing dynamic form/email field checks and price-range boundary checks; no transaction or message was sent.
- Read-only dataset fingerprints recorded 10 draft/published documents. Nine fingerprints were unchanged. Menu was updated concurrently while the user was testing Studio; no document was removed and no content changes were reverted. This implementation performed no dataset writes.
- Browser inspection confirmed the live Custom tabs/fields, Boards General/background/SEO controls, and Menu General/navigation tabs. The remaining editor schemas were covered by exhaustive schema checks and the successful Studio build; uninterrupted interactive checks of all nine editors were not completed because Chrome was in concurrent use. No editor values were changed for browser testing.
- Remote schema deployment was attempted with the installed CLI, but its workspace-extraction step stalled without an outcome; it was cancelled. Local Studio and website sources/builds are ready. Publishing a hosted Studio or deploying the website is outside this change and was not performed.
- Studio build warns that no appId is configured for fine-grained auto-update selection; current auto-update behavior is preserved. Installing the official color plugin reported 25 moderate and 2 high dependency advisories in the Studio dependency tree. No broad dependency remediation was attempted as part of this CMS refactor.

## Complete inventory and maintenance

- `sanity-fields-before.json` records every original field, type, title, description, default, validation source, group/fieldset, conditional hidden function and array preview.
- `sanity-fields-after.json` records the same effective definitions after the refactor, including the five new optional colors.
- Edit Studio presentation in `../studio-ibdesigns/schemaTypes/editorLayouts.ts`; existing schema modules remain the source of stored field definitions and validation. Color/plugin registration is in the Studio configuration.
- Run `npm run cms:check`, `npm run lint`, and `npm run build`. The schema checker expects the sibling Studio at its existing location.
- Run `npm run sanity:typegen` after subsequent query/schema changes. During this audit the CLI workspace loader was unreliable; types were generated using Sanity’s schema compiler and TypeGen engine directly from the real definitions, with color fields read from the installed official plugin.
- Official color picker setup: https://www.sanity.io/plugins/color-input.

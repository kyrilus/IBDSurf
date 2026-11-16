import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`*[_type == "homePage" && _id == "homePage"][0]{title, catalogHeading, showCustomBoard, image, heroLogo{alt, "url":asset->url, "dimensions":asset->metadata.dimensions}, seo}`);
export const ABOUT_PAGE_QUERY = defineQuery(`*[_type == "aboutPage" && _id == "aboutPage"][0]{title, eyebrow, heading, body, image, seo}`);
export const CONTACT_PAGE_QUERY = defineQuery(`*[_type == "contactPage" && _id == "contactPage"][0]{title, eyebrow, showEyebrow, heading, showHeading, body, image, email, showEmail, phone, showPhone, location, showAddress, instagramUrl, showInstagram, seo}`);

export const FOOTER_QUERY = defineQuery(`*[_type == "footer" && _id == "footer"][0]{brandName, brandLogo{alt, "url":asset->url, "dimensions":asset->metadata.dimensions}, description, shopHeading, shopLinks[]{_key,label,href}, brandHeading, brandLinks[]{_key,label,href}, followHeading, instagramUrl, copyrightName, legalLinks[]{_key,label,href}}`);

export const HEADER_QUERY = defineQuery(`*[_type == "header" && _id == "header"][0]{brandName, mobileLineOne, mobileLineTwo, homeLabel, "lightLogoUrl":lightLogo.asset->url, "darkLogoUrl":darkLogo.asset->url}`);
export const MENU_QUERY = defineQuery(`*[_type == "menu" && _id == "menu"][0]{title, openLabel, closeLabel, heading, showHeading, links[]{_key,label,href}}`);
export const SHOPPING_CART_QUERY = defineQuery(`*[_type == "shoppingCart" && _id == "shoppingCart"][0]{title, openLabel, closeLabel, emptyHeading, emptyDescription, "emptyImageUrl":emptyImage.asset->url, browseLabel, browseHref, subtotalLabel, checkoutNote, checkoutLabel, checkoutLoadingLabel, removeLabel}`);

export const BOARDS_PAGE_QUERY = defineQuery(`*[_type == "boardsPage" && _id == "boardsPage"][0]{heading,backgroundImage,seoTitle,seoDescription,filterLabel,showCategoryFilters,categoryFilters[]{_key,label,mode},showPriceFilter,priceLabel,anyPriceLabel,priceRanges[]{_key,label,minPrice,maxPrice},showCustomBoard,emptyMessage}`);

export const CUSTOM_PAGE_QUERY = defineQuery(`*[_type == "customPage" && _id == "customPage"][0]{heading,backgroundImage,contactEmail,submitLabel,submitNote,formFields[]{_key,label,inputType,placeholder,required,fullWidth,options},formCopy,boardTypes,experienceLevels,seoTitle,seoDescription}`);

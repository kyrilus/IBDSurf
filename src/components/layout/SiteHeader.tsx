import { getHeader, getMenu, getShoppingCart } from "@/sanity/content";
import { Header } from "./Header";

export async function SiteHeader() {
  const [content, menu, cart] = await Promise.all([getHeader(), getMenu(), getShoppingCart()]);
  return <Header content={content} menu={menu} cart={cart} />;
}

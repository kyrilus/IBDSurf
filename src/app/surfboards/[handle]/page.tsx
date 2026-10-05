import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BoardDetails } from "@/components/products/BoardDetails";
import { getProductByHandle, getProducts } from "@/lib/shopify";

type SurfboardPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export async function generateStaticParams() {
  const boards = await getProducts();

  return boards.map((board) => ({
    handle: board.handle,
  }));
}

export async function generateMetadata({
  params,
}: SurfboardPageProps): Promise<Metadata> {
  const { handle } = await params;
  const board = await getProductByHandle(handle);

  if (!board) {
    return {
      title: "Surfboard Not Found",
    };
  }

  return {
    title: board.title,
    description: board.description,
  };
}

export default async function SurfboardDetailPage({ params }: SurfboardPageProps) {
  const { handle } = await params;
  const board = await getProductByHandle(handle);

  if (!board) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <BoardDetails board={board} />
    </div>
  );
}

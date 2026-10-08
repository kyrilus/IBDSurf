import type { Metadata } from "next";
import Image from "next/image";
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
    <div className="relative isolate overflow-hidden bg-black">
      <Image
        src="/images/Board Details/razor-blade.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover opacity-70"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <BoardDetails board={board} />
      </div>
    </div>
  );
}

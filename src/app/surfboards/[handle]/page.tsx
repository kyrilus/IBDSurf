import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BoardDetails } from "@/components/products/BoardDetails";
import { getProductByHandle, getProducts } from "@/lib/square";

type SurfboardPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

const productBackgrounds: Record<string, string> = {
  "mean machine": "/images/Board Details/razor-blade.png",
  "micro machine": "/images/planar.png",
  "middle weight": "/images/license-plate.png",
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

  const backgroundImage = productBackgrounds[board.title.trim().toLowerCase()];

  return (
    <div className="surfboard-line-grid product-detail-grid overflow-hidden bg-white dark:bg-stone-950">
      <div>
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none object-cover opacity-15"
            aria-hidden="true"
          />
        ) : null}
        <div className="relative z-10 mx-auto max-w-[90rem] px-6 py-16 lg:px-8">
          <BoardDetails board={board} />
        </div>
      </div>
    </div>
  );
}

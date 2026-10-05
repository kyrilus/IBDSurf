export type BoardDimensions = {
  length: string;
  width: string;
  thickness: string;
  volume?: string;
};

export type BoardVariant = {
  id: string;
  title: string;
  available: boolean;
};

export type Board = {
  id: string;
  handle: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  dimensions: BoardDimensions;
  image: string;
  available: boolean;
  featured: boolean;
  tags: string[];
  variants: BoardVariant[];
};

export const boards: Board[] = [
  {
    id: "gid://shopify/Product/temporary-twin-fin",
    handle: "twin-fin",
    title: "Twin Fin",
    price: 925,
    currency: "USD",
    description:
      "Fast, loose twin-fin designed for clean points, playful beach breaks, and surfers who want speed without overthinking the line.",
    dimensions: {
      length: "5'10\"",
      width: "20 1/2\"",
      thickness: "2 1/2\"",
      volume: "33L",
    },
    image: "/images/placeholders/twin-fin.svg",
    available: true,
    featured: true,
    tags: ["Fish", "Twin Fin", "Small Wave"],
    variants: [],
  },
  {
    id: "gid://shopify/Product/temporary-mid-length",
    handle: "mid-length",
    title: "Mid Length",
    price: 1050,
    currency: "USD",
    description:
      "A trim-forward mid length with paddle power, smooth rail engagement, and enough curve to fit into everyday California surf.",
    dimensions: {
      length: "7'0\"",
      width: "21 3/4\"",
      thickness: "2 7/8\"",
      volume: "48L",
    },
    image: "/images/placeholders/mid-length.svg",
    available: true,
    featured: true,
    tags: ["Mid Length", "Single Fin", "Glide"],
    variants: [],
  },
  {
    id: "gid://shopify/Product/temporary-performance-shortboard",
    handle: "performance-shortboard",
    title: "Performance Shortboard",
    price: 975,
    currency: "USD",
    description:
      "A responsive shortboard for committed surfing, built with refined rails, reliable drive, and speed through critical sections.",
    dimensions: {
      length: "6'0\"",
      width: "19\"",
      thickness: "2 7/16\"",
      volume: "30L",
    },
    image: "/images/placeholders/performance-shortboard.svg",
    available: false,
    featured: true,
    tags: ["Shortboard", "Thruster", "Performance"],
    variants: [],
  },
  {
    id: "gid://shopify/Product/temporary-step-up",
    handle: "step-up",
    title: "Step Up",
    price: 1100,
    currency: "USD",
    description:
      "A dependable step up shaped for bigger days, with added rail line, controlled rocker, and confidence when the ocean has more push.",
    dimensions: {
      length: "6'8\"",
      width: "19 3/4\"",
      thickness: "2 5/8\"",
      volume: "38L",
    },
    image: "/images/placeholders/step-up.svg",
    available: true,
    featured: false,
    tags: ["Step Up", "Round Pin", "Good Waves"],
    variants: [],
  },
];

export function getFeaturedBoards() {
  return boards.filter((board) => board.featured);
}

export function getBoardByHandle(handle: string) {
  return boards.find((board) => board.handle === handle);
}

import ProductFilters from "@/components/store/browse-page/filters";
import ProductSort from "@/components/store/browse-page/sort";
import ProductCard from "@/components/store/cards/product/product-card";
import Header from "@/components/store/layout/header/header";
import { FiltersQueryType } from "@/lib/types";
import { getProducts } from "@/queries/product";
import { getFilteredSizes } from "@/queries/size";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: FiltersQueryType;
}) {
  const {
    category,
    offer,
    search,
    size,
    sort,
    subCategory,
    maxPrice,
    minPrice,
    color,
  } = searchParams;
  const products_data = await getProducts(
    {
      search,
      minPrice: Number(minPrice) || 0,
      maxPrice: Number(maxPrice) || Number.MAX_SAFE_INTEGER,
      category,
      subCategory,
      offer,
      size: Array.isArray(size)
        ? size
        : size
        ? [size] // Convert single size string to array
        : undefined, // If no size, keep it undefined
      color: Array.isArray(color)
        ? color
        : color
        ? [color] // Convert single color string to array
        : undefined, // If no color, keep it undefined
    },
    sort
  );
  const { products } = products_data;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Header />
      </div>

      {/* Filters Sidebar */}
      <div className="fixed top-[124px] lg:top-16 left-2 md:left-4 pt-4 h-[calc(100vh-64px)] overflow-auto scrollbar">
        <ProductFilters queries={searchParams} />
      </div>
      {/* Main Content */}
      <div className="ml-[190px] md:ml-[220px] pt-[140px] lg:pt-20">
        {/* Sort Section */}
        <div className="sticky top-[64px] z-10 px-4 py-2 flex items-center">
          <ProductSort />
        </div>

        {/* Product List */}
        <div className="mt-4 px-4 w-full overflow-y-auto max-h-[calc(100vh-155px)] pb-28 scrollbar flex flex-wrap">
          {products.map((product, i) => (
            <ProductCard key={product.id + product.slug} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

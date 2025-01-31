"use client";
import Pagination from "@/components/store/shared/pagination";
import ProductList from "@/components/store/shared/product-list";
import { getProductsByIds } from "@/queries/product";
import { useEffect, useState } from "react";

export default function ProfileHistoryPage({
  params,
}: {
  params: { page: string };
}) {
  const [products, setProducts] = useState<any>([]);
  const [page, setPage] = useState<number>(Number(params.page) || 1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [laoding, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch history from localStorage
    const fetchHistory = async () => {
      const historyString = localStorage.getItem("productHistory");
      if (!historyString) {
        setProducts([]);
        return;
      }

      try {
        setLoading(true);

        const productHistory = JSON.parse(historyString);
        const page = Number(params.page);

        // Fetch products by ids
        const res = await getProductsByIds(productHistory, page);
        setProducts(res.products);
        setTotalPages(res.totalPages);
        setLoading(false);
      } catch (error) {
        setProducts([]);
        setLoading(false);
      }
    };
    setLoading(false);

    fetchHistory();
  }, [params.page]);
  return (
    <div className="bg-white py-4 px-6">
      <h1 className="text-lg mb-3 font-bold">Your product view history</h1>
      {laoding ? (
        <div>loading...</div>
      ) : products.length > 0 ? (
        <div className="pb-16">
          <ProductList products={products} />
          <div className="mt-2">
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        </div>
      ) : (
        <div>No products</div>
      )}
    </div>
  );
}
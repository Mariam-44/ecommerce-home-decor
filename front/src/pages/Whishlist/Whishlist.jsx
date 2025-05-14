import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../../components/context/Wishlist.context"; // Import WishlistContext
import WishlistItem from "../../components/WhishItem/WhislistItem"; // WishlistItem component to render each product

export default function Wishlist() {
  const { getWishlist, wishlistInfo } = useContext(WishlistContext);

  useEffect(() => {
    getWishlist(); // Fetch wishlist products on mount
  }, []);

  useEffect(() => {
    console.log("Wishlist Info Debug:", wishlistInfo);
  }, [wishlistInfo]);

  // Show a loading state until wishlistInfo is available
  if (!wishlistInfo) {
    return (
      <div className="text-center mt-10">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <section className="mt-24">
        <h1 className="text-center text-5xl">Wishlist</h1>
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-4 mt-10">
            <div className="col-span-12">
              <table className="table-auto w-full border-none border-spacing-0" style={{ tableLayout: "fixed" }}>
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2">Price</th>
                    <th></th>
                    <th></th>
                    {/* Align the Action header to the end */}
                    <th className="pe-20 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistInfo.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center p-4">
                        Your wishlist is empty.
                      </td>
                    </tr>
                  ) : (
                    wishlistInfo.map((product) => (
                      <tr
                        key={product.productId}
                        className="bg-gray-50 border hover:bg-gray-100"
                      >
                        <WishlistItem productInfo={product} />
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

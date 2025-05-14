import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../components/context/Cart.context";
import CartItem from "../../components/CartItem/CartItem";

export default function Cart() {
  const { getCartProduct, cartInfo } = useContext(CartContext);

  useEffect(() => {
    getCartProduct(); // Fetch cart products on mount
  }, []);

  useEffect(() => {
    console.log("Cart Info Debug:", cartInfo);
  }, [cartInfo]);

  // Show a loading state until cartInfo is available
  if (!cartInfo) {
    return (
      <div className="text-center mt-10">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <section className="mt-24">
        <h1 className="text-center text-5xl">Cart</h1>
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-4 mt-10">
            <div className="col-span-8">
              <table className="table-auto w-full border-none border-spacing-0">
                <thead className="border">
                  <tr className="bg-gray-100">
                    <th className="p-2"></th>
                    <th className="p-2"></th>
                    <th className="p-2">Product</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {cartInfo.totalItems === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center p-4">
                        Your cart is empty.
                      </td>
                    </tr>
                  ) : (
                    cartInfo.cartProducts.map((product) => (
                      <tr key={product.productId} className="bg-white border">
                        <CartItem productInfo={product} />
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="col-span-4">
              <div className="border">
                <h2 className="border py-2 bg-gray-100 font-bold pl-4">
                  Cart Totals
                </h2>
                <div className="p-5">
                  <div className="flex space-x-28 border-b py-2 pl-1">
                    <span>Total</span>
                    <span>
                      ${cartInfo.cartProducts.reduce(
                        (total, product) => total + product.totalPrice,
                        0
                      )}
                    </span>
                  </div>

                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      className="checkout-button block w-full text-center py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 cursor-pointer"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

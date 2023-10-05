import { Link, Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Welcome({ products, ...props }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        cart: [],
    });

    let getTotal = 0;
    data.cart.forEach((item) => {
        getTotal += item.price * item.quantity;
    });

    function addCart(product) {
        const { id, name, price } = product;
        const cartCopy = [...data.cart];
        console.log(cartCopy);
        const item = cartCopy.find((item) => item.id === id);
        if (item) {
            item.quantity++;
        } else {
            cartCopy.push({ id, name, price, quantity: 1 });
        }
        setData("cart", cartCopy);
    }
    function removeCart(product) {
        const { id, name, price } = product;
        setCart((cart) => {
            const cartCopy = [...cart];
            const item = cartCopy.find((item) => item.id === id);
            if (item && item.quantity > 0) {
                item.quantity--;
            }
            return cartCopy;
        });
    }
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center  selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
                    {props.auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="py-12">
                    <div className=" mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <h2 className="text-lg font-medium text-gray-900">
                                Lista Prodotti
                            </h2>
                            <table className="w-full text-center mt-6">
                                <thead className="bg-slate-200">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Descrizione</th>
                                        <th>Prezzo</th>
                                        <th>Immagine</th>
                                        <th>Azioni</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="border-b"
                                        >
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <img
                                                    className="h-12 mx-auto"
                                                    src={product.image}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        removeCart(product)
                                                    }
                                                >
                                                    -
                                                </button>
                                                {product.total}
                                                <button
                                                    onClick={() =>
                                                        addCart(product)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 w-[400px] fixed left-0 top-0 bottom-0">
                    <h1 className="text-center">Carrello</h1>
                    <ul>
                        {data.cart.map((item) => (
                            <li key={item.id}>
                                {item.name} {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <h2>Totale: {getTotal}</h2>
                    {getTotal && (
                        <button onClick={() => post(route("orders.store"))}>
                            acquista
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

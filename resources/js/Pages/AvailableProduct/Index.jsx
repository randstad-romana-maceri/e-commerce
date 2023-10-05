import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link } from "@inertiajs/react";

import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";

import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, products }) {
    console.log(products);
    const { delete: destroy } = useForm({});

    function cancella(id) {
        if (confirm(`Sei sicuro di cancellare il prodotto con id ${id}?`)) {
            destroy(route("products.destroy", id));
        }
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Available Products
                    </h2>
                    <Link href={route("available-products.create")}>
                        <PrimaryButton>
                            Aggiungi Prodotto in vendita
                        </PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h2 className="text-lg font-medium text-gray-900">
                            Lista Prodotti
                        </h2>
                        <table className="w-full text-center mt-6">
                            <thead className="bg-slate-200">
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Nome Fornitore</th>
                                    <th>Totale acquistato</th>
                                    <th>Totale venduto</th>
                                    <th>Totale in magazzino</th>
                                    <th>Totale in vendita</th>
                                    <th>Azioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b">
                                        <td>{product.id}</td>
                                        <td>
                                            {product.buy_order.product.name}
                                        </td>
                                        <td>{product.buy_order.company}</td>
                                        <td>{product.buy_order.quantity}</td>
                                        <td>
                                            {product.quantity -
                                                product.quantitySold}
                                        </td>
                                        <td>
                                            {product.buy_order.quantity -
                                                (product.quantity -
                                                    product.quantitySold)}
                                        </td>
                                        <td>{product.quantity}</td>

                                        <td className="flex h-full items-center justify-center gap-2 p-4">
                                            <Link
                                                href={route(
                                                    "available-products.edit",
                                                    product.id
                                                )}
                                            >
                                                <BsFillPencilFill size={20} />
                                            </Link>
                                            <BsFillTrash3Fill
                                                onClick={() =>
                                                    cancella(product.id)
                                                }
                                                size={20}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

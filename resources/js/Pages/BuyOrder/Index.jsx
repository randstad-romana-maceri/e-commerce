import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link } from "@inertiajs/react";

import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";

import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, buyOrders }) {
    console.log(buyOrders);
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
                        Buy Orders
                    </h2>
                    <Link href={route("buy-orders.create")}>
                        <PrimaryButton>Aggiungi Ordine</PrimaryButton>
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
                                    <th>Nome Fornitore</th>
                                    <th>Nome Prodotto</th>
                                    <th>Totale acquistato</th>
                                    <th>Prezzo unitario</th>
                                    <th>Importo</th>
                                    <th>Documento</th>
                                    <th>Azioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {buyOrders.map((buyOrder) => (
                                    <tr key={buyOrder.id} className="border-b">
                                        <td>{buyOrder.id}</td>
                                        <td>{buyOrder.company}</td>
                                        <td>{buyOrder.product.name}</td>
                                        <td>{buyOrder.quantity}</td>
                                        <td>{buyOrder.unit_price} €</td>
                                        <td>
                                            {(
                                                buyOrder.unit_price *
                                                buyOrder.quantity
                                            ).toFixed(2)}{" "}
                                            €
                                        </td>
                                        <td>{buyOrder.document}</td>
                                        <td className="flex h-full items-center justify-center gap-2 p-4">
                                            <Link
                                                href={route(
                                                    "products.edit",
                                                    buyOrder.id
                                                )}
                                            >
                                                <BsFillPencilFill size={20} />
                                            </Link>
                                            <BsFillTrash3Fill
                                                onClick={() =>
                                                    cancella(buyOrder.id)
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

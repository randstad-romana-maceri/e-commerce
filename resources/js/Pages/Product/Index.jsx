import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link } from "@inertiajs/react";

import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";

import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, products }) {
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
                        Products
                    </h2>
                    <Link href={route("products.create")}>
                        <PrimaryButton>Crea Prodotto</PrimaryButton>
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
                                    <th>Descrizione</th>
                                    <th>Prezzo</th>
                                    <th>Immagine</th>
                                    <th>Azioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b">
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
                                        <td className="flex h-full items-center justify-center gap-2 p-4">
                                            <Link
                                                href={route(
                                                    "products.edit",
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

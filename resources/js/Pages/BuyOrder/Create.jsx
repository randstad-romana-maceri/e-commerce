import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Select from "react-select";

export default function Create({ auth, products }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: null,
        company: "",
        quantity: 0,
        unit_price: 0,
        document: "",
    });

    const options = products.map((product) => ({
        value: product.id,
        label: product.name,
    }));

    function handleOnChange(event) {
        if (event.label) {
            setData("product_id", event.value);
        } else {
            setData(
                event.target.name,
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value
            );
        }
    }

    function submit(e) {
        e.preventDefault();

        post(route("buy-orders.store"));
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crea Prodotti
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h2 className="text-lg font-medium text-gray-900">
                            Inserisci un nuovo ordine
                        </h2>

                        <form onSubmit={submit} className="mt-6">
                            <div>
                                <InputLabel
                                    htmlFor="company"
                                    value="Nome Azienda"
                                />

                                <TextInput
                                    id="company"
                                    name="company"
                                    value={data.company}
                                    className="mt-1 block w-full"
                                    autoComplete="company"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                    required
                                />

                                <InputError
                                    message={errors.company}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="product_id"
                                    value="Prodotto"
                                />
                                <Select
                                    onChange={handleOnChange}
                                    options={options}
                                />

                                <InputError
                                    message={errors.product_id}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="quantity"
                                    value="Quantità"
                                />

                                <TextInput
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    value={data.quantity}
                                    className="mt-1 block w-full"
                                    autoComplete="quantity"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                    required
                                />

                                <InputError
                                    message={errors.quantity}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="unit_price"
                                    value="Prezzo unitario"
                                />

                                <TextInput
                                    id="unit_price"
                                    name="unit_price"
                                    type="number"
                                    value={data.unit_price}
                                    className="mt-1 block w-full"
                                    autoComplete="unit_price"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                    required
                                />

                                <InputError
                                    message={errors.unit_price}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="document"
                                    value="Link Documento"
                                />

                                <TextInput
                                    id="document"
                                    name="document"
                                    value={data.document}
                                    className="mt-1 block w-full"
                                    autoComplete="document"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                    required
                                />

                                <InputError
                                    message={errors.document}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-6">
                                <PrimaryButton
                                    className="ml-4"
                                    disabled={processing}
                                >
                                    Crea
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

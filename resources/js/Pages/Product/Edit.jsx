import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, product }) {
    const { id, name, description, price, image } = product;

    const { data, setData, put, processing, errors, reset } = useForm({
        name,
        description,
        price,
        image,
    });

    function handleOnChange(event) {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    }

    function submit(e) {
        e.preventDefault();

        put(route("products.update", id));
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Modifica Prodotto: {name}
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h2 className="text-lg font-medium text-gray-900">
                            Modifica il prodotto
                        </h2>

                        <form onSubmit={submit} className="mt-6">
                            <div>
                                <InputLabel htmlFor="name" value="Nome" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="description"
                                    value="Descrizione"
                                />

                                <TextInput
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    autoComplete="description"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                    required
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="price" value="Prezzo" />

                                <TextInput
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={data.price}
                                    className="mt-1 block w-full"
                                    autoComplete="price"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                    required
                                />

                                <InputError
                                    message={errors.price}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="image"
                                    value="Link Immagine"
                                />

                                <TextInput
                                    id="image"
                                    name="image"
                                    value={data.image}
                                    className="mt-1 block w-full"
                                    autoComplete="image"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                    required
                                />

                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-6">
                                <PrimaryButton
                                    className="ml-4"
                                    disabled={processing}
                                >
                                    Modifica
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

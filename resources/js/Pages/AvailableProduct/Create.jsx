import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Select from "react-select";

export default function Create({ auth, buyOrders }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        buy_order_id: null,
        quantity: 1,
        priority: 0,
    });

    const maxQuantity = buyOrders.find(
        (buyOrder) => buyOrder.id === data.buy_order_id
    )?.quantity;

    console.log(maxQuantity);

    const options = buyOrders.map((product) => ({
        value: product.id,
        label: product.company,
    }));

    function handleOnChange(event) {
        if (event.label) {
            setData("buy_order_id", event.value);
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

        post(route("available-products.store"));
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
                            Inserisci un nuovo prodotto in vendita
                        </h2>

                        <form onSubmit={submit} className="mt-6">
                            <div>
                                <InputLabel
                                    htmlFor="buy_order_id"
                                    value="Ordine"
                                />
                                <Select
                                    onChange={handleOnChange}
                                    options={options}
                                />

                                <InputError
                                    message={errors.buy_order_id}
                                    className="mt-2"
                                />
                            </div>
                            {data.buy_order_id && (
                                <div>
                                    <InputLabel
                                        htmlFor="quantity"
                                        value={`Quantità ${maxQuantity}`}
                                    />

                                    <TextInput
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        value={data.quantity}
                                        className="mt-1 block w-full"
                                        autoComplete="quantity"
                                        isFocused={true}
                                        max={maxQuantity}
                                        onChange={handleOnChange}
                                        required
                                    />

                                    <InputError
                                        message={errors.quantity}
                                        className="mt-2"
                                    />
                                </div>
                            )}
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

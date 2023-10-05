import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, availableProduct }) {
    const { id, quantity } = availableProduct;
    const { data, setData, put, processing, errors, reset } = useForm({
        id,
        newQuantity: quantity,
    });
    function handleOnChange(event) {
        console.log(event.target.value);
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    }

    function submit(e) {
        e.preventDefault();

        put(route("available-products.update", id));
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Modifica Prodotti in vendita: {id}
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h2 className="text-lg font-medium text-gray-900">
                            Modifica prodotto in vendita
                        </h2>
                        <p>
                            Totale disponibili in magazzino:{" "}
                            {availableProduct.buy_order.quantity -
                                availableProduct.quantitySold}
                        </p>
                        <p>Totale attualmente in vendita: {data.newQuantity}</p>

                        <form onSubmit={submit} className="mt-6">
                            <div>
                                <InputLabel
                                    htmlFor="newQuantity"
                                    value="Quantità"
                                />

                                <TextInput
                                    id="newQuantity"
                                    name="newQuantity"
                                    type="number"
                                    value={data.newQuantity}
                                    className="mt-1 block w-full"
                                    autoComplete="newQuantity"
                                    min={0}
                                    max={
                                        availableProduct.buy_order.quantity -
                                        availableProduct.quantitySold
                                    }
                                    isFocused={true}
                                    onChange={handleOnChange}
                                    required
                                />

                                <InputError
                                    message={errors.name}
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

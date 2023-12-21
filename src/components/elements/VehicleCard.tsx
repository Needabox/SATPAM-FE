import React, { ReactElement } from "react";
import { useState } from 'react'
import Modal from "./Modal";
import logo from "../../assets/satpam-logo.svg"
import qrcode from "../../assets/qrcode.svg"

import { ITicket } from "../../interfaces/ITicket";
import { TicketService } from "../../services/TicketService";
// import ModalButton from "./ModalButton";

interface IState {
    tickets: ITicket[],
}

interface ITransaction {
    tickets: ITicket[],
}

type VehicleCardProps = {
    title: string,
    image: string
}

const VehicleCard = ({ title, image }: VehicleCardProps): ReactElement => {

    const [state, setState] = useState<IState>({
        tickets: [] as ITicket[],
    });
    const [transaction, setTransaction] = useState<ITransaction>({
        tickets: [] as ITicket[],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [vehicleType, setVehicleType] = useState<String>("Motor");

    const license_platRef = React.useRef<HTMLInputElement>(null);
    const card_numberRef = React.useRef<HTMLInputElement>(null);
    const balanceRef = React.useRef<HTMLInputElement>(null);

    const createTicket = async (event: any) => {

        event.preventDefault();

        const license_plat = license_platRef.current?.value;
        const card_number = card_numberRef.current?.value;

        switch (vehicleType) {
            case "Motor": {
                var vehicle = 2;
                break;
            }
            case "Mobil": {
                var vehicle = 1;
                break;
            }
            default: {
                var vehicle = 2;
                break;
            }
        }
        const payload = {
            "vehicle_type": vehicle,
            "card_number": card_number,
            "license_plate": license_plat
        }

        try {
            setIsLoading(true);
            const response = await TicketService.getTickets(payload);
            setState({ tickets: [response.data] });
            setIsOpen(false);
            setIsOpenCreateSuccess(true);
            console.log(response.data);
        } catch (error: any) {
            setErr(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const payTicket = async (event: any) => {
        event.preventDefault();

        const license_plat = license_platRef.current?.value;
        const card_number = card_numberRef.current?.value;
        const balance = balanceRef.current?.value;
        switch (vehicleType) {
            case "Motor": {
                var vehicle = 2;
                break;
            }
            case "Mobil": {
                var vehicle = 1;
                break;
            }
            default: {
                var vehicle = 2;
                break;
            }
        }
        const payload = {
            "vehicle_type": vehicle,
            "card_number": card_number,
            "license_plate": license_plat,
            "balance": Number(balance)
        }

        console.log(payload);

        try {
            setIsLoading(true);
            const response = await TicketService.payTicket(payload);
            setTransaction({ tickets: [response.data] });
            setIsOpenPayment(false);
            setIsOpenPaymentSuccess(true);
        } catch (error: any) {
            setErr(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenCreateSuccess, setIsOpenCreateSuccess] = useState<boolean>(false);
    const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
    const [isOpenPaymentSuccess, setIsOpenPaymentSuccess] = useState<boolean>(false);
    // useEffect(() => {
    //     if (isOpen) {
    //         createTicket();
    //     }
    // }, [isOpen]);

    return (
        <>
            <div className="rounded-lg border border-gray-300 px-5 py-2 flex flex-col justify-between gap-2 w-full">
                <div className="card-header flex items-center py-2 text-xl">
                    {title}
                </div>
                <div className="card-content flex justify-center">
                    <img src={image} alt="" width="100" />
                </div>
                <div className="card-footer flex flex-col justify-center items-center gap-2 py-2">
                    <button onClick={async () => { setIsOpen(true), setVehicleType(title) }} className="bg-blue-900 py-2 px-10 rounded-lg text-center text-white text-sm font-light">Print Ticket</button>
                    <button onClick={async () => { setIsOpenPayment(true), setVehicleType(title) }} className="bg-green-600 py-2 px-10 rounded-lg text-center text-white text-sm font-light">Bayar</button>
                </div>
            </div>

            {/* Create Ticket Section */}
            <Modal modalTitle={logo} isOpen={isOpen} handleCancelAction={() => setIsOpen(false)} handleConfirmAction={() => alert('berhasil')}>
                <form onSubmit={createTicket}>
                    <div className="flex flex-col gap-2">
                        <div className="mb-3">
                            <label htmlFor="license_plate" className="block text-sm font-medium leading-6 text-gray-900">
                                Plat Nomor Kendaraan
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="license_plate"
                                    ref={license_platRef}
                                    id="license_plate"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="card_number" className="block text-sm font-medium leading-6 text-gray-900">
                                Nomor Kartu Pembayaran
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="card_number"
                                    ref={card_numberRef}
                                    id="card_number"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <button className="inline-flex justify-center rounded-md bg-blue-900 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800" type="submit">
                                Print Ticket
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
            <Modal modalTitle={logo} modalFooter="Tutup" isOpen={isOpenCreateSuccess} handleCancelAction={() => setIsOpen(false)} handleConfirmAction={() => setIsOpenCreateSuccess(false)}>
                {isLoading && <div>Loading...</div>}
                {err && <div>{err}</div>}
                {
                    state && state.tickets.map((ticket) => (
                        <div key={ticket.card_number} className="grid grid-rows-12 gap-4">
                            <div className="grid grid-cols-12">
                                <div className="col-span-4">
                                    <h6>Tanggal</h6>
                                </div>
                                <div className="col-span-8">
                                    <p>{ticket.created_at}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-4">
                                    <h6>Kendaraan</h6>
                                </div>
                                <div className="col-span-8">
                                    <p>{ticket.vehicle_type}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-4">
                                    <h6>Jam Masuk</h6>
                                </div>
                                <div className="col-span-8">
                                    <p className="font-bold border-b border-b-gray-400 w-max">{ticket.entry_date}</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col mt-4 gap-2">
                                <img src={qrcode} alt="" width="150" />
                                <span className="text-xs">PARKING TICKET NUMBER</span>
                                <h6 className="text-2xl font-bold">{ticket.code}</h6>
                            </div>
                        </div>
                    ))
                }
            </Modal>


            {/* Payment Section */}
            <Modal modalTitle={logo} isOpen={isOpenPayment} handleCancelAction={() => setIsOpenPayment(false)} handleConfirmAction={() => alert('berhasil')}>
                <form onSubmit={payTicket}>
                    <div className="flex flex-col gap-2">
                        <div className="mb-3">
                            <label htmlFor="license_plate" className="block text-sm font-medium leading-6 text-gray-900">
                                Plat Nomor Kendaraan
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="license_plate"
                                    ref={license_platRef}
                                    id="license_plate"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="card_number" className="block text-sm font-medium leading-6 text-gray-900">
                                Nomor Kartu Pembayaran
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="card_number"
                                    ref={card_numberRef}
                                    id="card_number"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="balance" className="block text-sm font-medium leading-6 text-gray-900">
                                Saldo
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="balance"
                                    ref={balanceRef}
                                    id="balance"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <button className="inline-flex justify-center rounded-md bg-blue-900 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800" type="submit">
                                Proses Pembayaran
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
            <Modal modalTitle={logo} modalFooter="Tutup" isOpen={isOpenPaymentSuccess} handleCancelAction={() => setIsOpen(false)} handleConfirmAction={() => setIsOpenPaymentSuccess(false)}>
                {isLoading && <div>Loading...</div>}
                {err && <div>{err}</div>}
                {
                    transaction && transaction.tickets.map((ticket) => (
                        <div key={ticket.parking.card_number} className="grid grid-rows-12 gap-4">
                            <div className="grid grid-cols-12">
                                <div className="col-span-4">
                                    <h6>Status</h6>
                                </div>
                                <div className="col-span-8">
                                    <p>{ticket.status_label}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-4">
                                    <h6>Biaya</h6>
                                </div>
                                <div className="col-span-8">
                                    <p>{ticket.amount}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-4">
                                    <h6>Tanggal Pembayaran</h6>
                                </div>
                                <div className="col-span-8">
                                    <p className="font-bold border-b border-b-gray-400 w-max">{ticket.payment_date}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Modal>
        </>
    )
}

export default VehicleCard
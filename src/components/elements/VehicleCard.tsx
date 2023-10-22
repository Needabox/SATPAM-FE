import { ReactElement } from "react";
import { useState } from 'react'
import Modal from "./Modal";
import logo from "../../assets/satpam-logo.svg"
import qrcode from "../../assets/qrcode.svg"

type VehicleCardProps = {
    title: string,
    image: string
}

const VehicleCard = ({title, image}: VehicleCardProps): ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [vehicleType, setVehicleType] = useState<String>("Motor");
    return (
        <>
            <div className="rounded-lg border border-gray-300 px-5 py-2 flex flex-col justify-between gap-2 w-full">
                <div className="card-header flex items-center py-2 text-xl">
                    {title}
                </div>
                <div className="card-content flex justify-center">
                    <img src={image} alt="" width="100" />
                </div>
                <div className="card-footer flex justify-center items-center py-2">
                    <button onClick={() => {setIsOpen(true), setVehicleType(title)}} className="bg-blue-900 py-2 px-10 rounded-lg text-center text-white text-sm font-light">Print Ticket</button>
                </div>
            </div>
            <Modal modalTitle={logo} isOpen={isOpen} handleCancelAction={() => setIsOpen(false)} handleConfirmAction={() => alert('Helo')}>
                <div className="grid grid-rows-12 gap-4">
                    <div className="grid grid-cols-12">
                        <div className="col-span-4">
                            <h6>Tanggal</h6>
                        </div>
                        <div className="col-span-8">
                            <p>26/10/2023</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-4">
                            <h6>Kendaraan</h6>
                        </div>
                        <div className="col-span-8">
                            <p>{vehicleType}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-4">
                            <h6>Jam Masuk</h6>
                        </div>
                        <div className="col-span-8">
                            <p className="font-bold border-b border-b-gray-400 w-max">09:20</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-col mt-4 gap-2">
                        <img src={qrcode} alt="" width="150" />
                        <span className="text-xs">PARKING TICKET NUMBER</span>
                        <h6 className="text-2xl font-bold">#4129183</h6>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default VehicleCard
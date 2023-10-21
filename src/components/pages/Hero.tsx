import { ReactElement } from "react";
import logo from "../../assets/satpam-logo.svg"
import VehicleCard from "../elements/VehicleCard";
import bike from "../../assets/bike.svg"
import car from "../../assets/car.svg"


const Hero = (): ReactElement => {
    return (
        <>
            <div className="flex gap-10">
                <div className="flex flex-col justify-between w-6/12">
                    <div>
                        <h1 className="text-3xl mb-5">Smart <span className="text-blue-900">Parking</span> Management</h1>
                        <p className="font-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's t of the printing and typesetting industry.</p>
                    </div>
                    <div>
                        <img src={logo} alt="" width="150" />
                    </div>
                </div>
                <div className="flex gap-5 w-6/12">
                    <VehicleCard title="Mobil" image={car} />
                    <VehicleCard title="Motor" image={bike} />
                </div>
            </div>
        </>
    )
}

export default Hero
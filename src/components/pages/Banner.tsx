import { ReactElement } from "react";
import gedung from "../../assets/gedung-spiral.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Card from "../elements/Card";

const Banner = (): ReactElement => {
    return (
        <div className="relative w-100 mb-10">
            <img src={gedung} />
            <Card className="z-10 absolute left-7 top-7 py-4 px-6 justify-center items-center">
                <FontAwesomeIcon className="me-2 text-sm" icon={faLocationDot} />
                <h6 className="m-0 font-light text-sm">UNJ Spiral Parking</h6>
            </Card>
            <Card className="z-10 absolute right-10 -top-8">
                <div className="px-4 py-3 flex flex-col">
                    <h6 className="font-bold">Senin</h6>
                    <p className="m-0 font-light">28 Oktober 2023</p>
                </div>
                <div className="py-3 px-8 bg-yellow-500 flex justify-center items-center text-white rounded-lg">
                    <h1 className="text-2xl">09:28</h1>
                </div>
            </Card>
        </div>
    )
}

export default Banner
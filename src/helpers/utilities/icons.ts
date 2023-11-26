import touristBus from "../../assets/images/bus/bus (1).png";
import regularBus from "../../assets/images/bus/bus (2).png";
import truck from "../../assets/images/truck/delivery-truck.png";
import taxi from "../../assets/images/taxi/taxi (1).png";
import auto from "../../assets/images/car/car-repair.png";

const vehicleIcons = [
    { id: 1, icon: truck },
    { id: 2, icon: touristBus },
    { id: 3, icon: regularBus },
    { id: 4, icon: taxi },
    { id: 5, icon: auto },
]

export const getIcon = (index: number) => {
    const iconObj = vehicleIcons[index];

    if (!iconObj) {
        console.error(`Icon not found for index ${index}`);
    }

    return iconObj?.icon;
}
export type ITicket = {
    code: number;
    entry_date: string;
    exit_date: string;
    vehicle_type: number;
    vehicle_type_label: string;
    card_number: string;
    license_plate: string;
    status: number;
    status_label: string;
    created_at: string;
    payment_date: string;
    amount: number;
    updated_at: string;
    parking: {
        card_number: string;
    }
};
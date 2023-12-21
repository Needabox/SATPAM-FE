export class TicketService {
    private static URL: string = 'http://127.0.0.1:8000/v1';

    public static async getTickets(payload: any): Promise<any> {

        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        const response = await fetch(`${this.URL}/parking`, settings);
        const items = await response.json();
        return items;
    }

    public static async payTicket(payload: any): Promise<any> {

        // return JSON.stringify(payload);

        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        const response = await fetch(`${this.URL}/parking/out`, settings);
        const items = await response.json();
        return items;
    }

}   
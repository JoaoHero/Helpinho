export interface Donor {
    donorAvatar: string;
    donorName: string;
    donorId: number;
    amount: number
}

export interface Helpinho {
    result: any;
    error: boolean
    userId: string,
    helpinhoId: string
    userName: string,
    userEmail: string,
    title: string,
    description: string,
    category: string,
    image: string,
    value: string,
    donatedValue: number,
    donors: Donor[];
}
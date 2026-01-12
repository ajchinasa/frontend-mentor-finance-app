export interface SummaryItem {
    label: string;
    count: number;
    amount: number;
};

const SummaryItemData : SummaryItem[] = [
    { label: "Paid Bills", count: 4, amount: 190.00,},
    { label: "Total Upcoming", count: 4, amount: 194.98,},
    { label: "Due Soon", count: 4, amount: 59.98,},
] 

export default SummaryItemData;
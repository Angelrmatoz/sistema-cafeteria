/**
 * Datos de transacciones de muestra para la página de historial
 * Utilizado para simular las transacciones realizadas en el sistema
 */

export const sampleTransactions = [
    {
        id: "TXN-001",
        userId: "USR-12345",
        date: "2024-01-15",
        time: "14:30:00",
        amount: 45.5,
        status: "completed",
        products: [
            { name: "Café Americano", quantity: 2, price: 15.0 },
            { name: "Sandwich Club", quantity: 1, price: 15.5 },
        ],
    },
    {
        id: "TXN-002",
        userId: "USR-67890",
        date: "2024-01-15",
        time: "15:45:00",
        amount: 28.0,
        status: "completed",
        products: [
            { name: "Café Latte", quantity: 1, price: 18.0 },
            { name: "Brownie", quantity: 1, price: 10.0 },
        ],
    },
    {
        id: "TXN-003",
        userId: "USR-11111",
        date: "2024-01-14",
        time: "09:15:00",
        amount: 22.5,
        status: "completed",
        products: [
            { name: "Café Americano", quantity: 1, price: 15.0 },
            { name: "Croissant", quantity: 1, price: 7.5 },
        ],
    },
    {
        id: "TXN-004",
        userId: "USR-22222",
        date: "2024-01-14",
        time: "11:20:00",
        amount: 0.0,
        status: "failed",
        products: [{ name: "Café Cappuccino", quantity: 1, price: 20.0 }],
    },
    {
        id: "TXN-005",
        userId: "USR-12345",
        date: "2024-01-13",
        time: "16:10:00",
        amount: 35.0,
        status: "completed",
        products: [
            { name: "Café Mocha", quantity: 1, price: 22.0 },
            { name: "Muffin", quantity: 1, price: 13.0 },
        ],
    },
];

export default sampleTransactions;

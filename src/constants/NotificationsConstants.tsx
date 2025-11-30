

export const NotificationConst = [
    {   
        id:1,
        type: 'reminder', 
        name: "Profile Reminder", 
        description: 'Please Update your qualification and licence expiration Date',
        iconBg: "bg-blue-300",
        date: new Date(), 
        img: '',
        status:'Appointments'
    },
    {
         id:2,
        type: 'appointment', 
        name: "John Deo", 
        description: 'Please Update your qualification and licence expiration Date',
       iconBg: "bg-blue-300",
       date: new Date(),
        img: '',
         status:'Appointments'
    },
        {
            id:3,
        type: 'message', 
        name: "Dr.Kiran Menon(oncology)",
        description: 'Please Update your qualification and licence expiration Date',
        iconBg: "bg-blue-300",
        date: new Date(), 
         status:'Chat',
        img: ''
    },
    {
        id:4,
        type: 'reminder', 
        name: "Profile Reminder", 
        description: 'Please Update your qualification and licence expiration Date',
        iconBg: "bg-blue-300",
        date: new Date("2025-11-11"), 
        img: '',
         status:'Appointments'
    },
    {
        id:5,
        type: 'appointment', 
        name: "John Deo", 
        description: 'Please Update your qualification and licence expiration Date',
       iconBg: "bg-blue-300",
       date:new Date("2025-11-11"),
        img: '',
         status:'Appointments'
    },
        {
            id:6,
        type: 'message', 
        name: "Dr.Kiran Menon(oncology)",
        description: 'Please Update your qualification and licence expiration Date',
        iconBg: "bg-blue-300",
        date: new Date("2025-11-11"), 
        img: '',
         status:'App'
    },

];
export const notifTabs = [
        { id: "all", label: "All" },
        { id: "appointments", label: "Appointments" },
        { id: "chat", label: "Chat" },
        { id: "app", label: "App" },
    ];
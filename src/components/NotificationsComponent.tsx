import { Avatar, Button, CardContent, Icon } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NotificationConst,notifTabs } from '../constants/NotificationsConstants';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import NotificationsOffRoundedIcon from '@mui/icons-material/NotificationsOffRounded';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
const NotificationsComponent: React.FC = () => {
    
    const [active, setActive] = useState("all");

    const handleTabclick = (id: string) => {
        setActive(id);
        //   dispatch(setTab(id));
    }

    const handleAcceptToggle = (i: any) => {
        console.log("i value", i)
    }
    const getInitials = (name: string) => {
        const parts = name.trim().split(" ");
        return parts.length === 1
            ? parts[0].charAt(0).toUpperCase()
            : (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    };

    const getColorForName = (name: string) => {
        const colors = ["#C1EAC5", "#C1EAE8", "#C1CCEA", "#FBE9AE", "#e1919cff", "#D9C1EA", "#C1EAE8"];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <>
            <h3 className="p-4">Notifications</h3>
            <div className="flex items-center gap-2 px-2 py-1 rounded-full">
                {notifTabs.map((t) => (
                    <Button
                        key={t.id}
                        onClick={() => handleTabclick(t.id)}
                        disableElevation
                        sx={{
                            textTransform: "none",
                            borderRadius: "999px",
                            padding: "6px 16px",
                            fontWeight: 600,
                            backgroundColor: active === t.id ? "#111" : "transparent",
                            color: active === t.id ? "#fff" : "#4b5563",
                            boxShadow:
                                active === t.id ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
                        }}
                    >
                        <span>{t.label}</span>

                    </Button>
                ))}
            </div>
            <div className="flex justify-between p-4 w-full">
                <div className="text-gray-500">Today</div>
                <div className="text-gray-500">Clear All</div>
            </div>
            <div>
                <CardContent className="flex flex-col mb-4 gap-[9px] p-0 rounded-[10px] bg-white shadow-sm flex-1">
                    {NotificationConst.map((p: any, i: number) => (
                        <div
                            key={i}
                            className=" rounded-[16px] flex items-center justify-between gap-[16px] p-[10px_12px] bg-gray-50 hover:shadow transition"
                        >
                            <div className="flex items-center gap-3">
                                {p.img || (p.type === 'reminder' || p.type === 'message') ? (
                                    p.type === 'reminder' &&
                                    <Avatar sx={{
                                        bgcolor: '#f01944ff',
                                        color: "#000",
                                        fontWeight: 600,
                                        fontSize: "16px",
                                    }}>
                                        <AccessAlarmRoundedIcon fontSize="small" />
                                    </Avatar>
                                    ||
                                    p.type === 'message' &&
                                    <Avatar sx={{
                                        bgcolor: "#8fc4f0ff",
                                        color: "#000",
                                        fontWeight: 600,
                                        fontSize: "16px",
                                    }}>
                                        <MapsUgcRoundedIcon fontSize="small" />
                                    </Avatar>
                                    || <div className={`w-8 h-8 ${p.iconBg} rounded-full flex items-center justify-center`}>
                                        {p.img}
                                    </div>
                                ) : (
                                    <Avatar
                                        sx={{
                                            bgcolor: getColorForName(p.name),
                                            color: "gray",
                                            fontWeight: 600,
                                            fontSize: "16px",
                                        }}
                                    >
                                        {getInitials(p.name)}
                                    </Avatar>
                                )}
                                <div>
                                    <span className="font-medium">{p.name} : </span>
                                    <span className="text-xs text-gray-500">
                                        {p.description}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    size="small"
                                    onClick={() => handleAcceptToggle(i)}
                                    className={`!min-w-0 !p-2 !rounded-md !w-8 !h-8 flex items-center justify-center border transition
                                            ? "!bg-green-400 !text-white !border-green-600"
                                            : "!bg-gray-100 !text-gray-500 !border-gray-300"
                                        }`}
                                >
                                    <MoreHorizIcon fontSize="small" color="primary" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>

            </div>
        </>
    )
}

export default NotificationsComponent;
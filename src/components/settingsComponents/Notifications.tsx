import React, { useState } from "react";
import Title from "../Title";
import ToggleRow from "./ToggleRow";
import {
  DEFAULT_ALERTS,
  DEFAULT_CHANNELS,
  ALERT_LABELS,
  CHANNEL_LABELS,
} from "../../utils/NotificationsConstants";
import { areAllEnabled, toggleAll } from "../../services/notificationsServices";
import { AlertsState, ChannelsState } from "../../interfaces/notificationsInterface";

const Notifications: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertsState>(DEFAULT_ALERTS);
  const [channels, setChannels] = useState<ChannelsState>(DEFAULT_CHANNELS);

  const allAlertsOn = areAllEnabled(alerts);
  const allChannelsOn = areAllEnabled(channels);

  return (
    <div className="bg-white">
      <Title text="Notifications" />

      <div className="mt-6 rounded-xl border border-gray-200 overflow-hidden">
        <ToggleRow
          variant="header"
          label="Notifications & Alerts"
          checked={allAlertsOn}
          onChange={(value) =>
            setAlerts(
              toggleAll<AlertsState>(value, [
                "appointment",
                "patient",
                "system",
                "care",
              ])
            )}/>
        {Object.entries(ALERT_LABELS).map(([key, label]) => (
          <ToggleRow
            key={key}
            label={label}
            checked={alerts[key as keyof AlertsState]}
            onChange={(v) =>
              setAlerts({ ...alerts, [key]: v })
            } />
        ))}
        <ToggleRow
          variant="header"
          label="Notification Channel"
          checked={allChannelsOn}
          onChange={(value) =>
            setChannels(
              toggleAll<ChannelsState>(value, [
                "email",
                "sms",
                "app",
              ])
            )}/>
        {Object.entries(CHANNEL_LABELS).map(([key, label]) => (
          <ToggleRow
            key={key}
            label={label}
            checked={channels[key as keyof ChannelsState]}
            onChange={(v) =>
              setChannels({ ...channels, [key]: v })
            } />
        ))}
      </div>
    </div>
  );
};

export default Notifications;

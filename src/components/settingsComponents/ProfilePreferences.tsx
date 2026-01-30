import React, { useState } from "react";
import Title from "../Title";
import CustomDropdown from "./CustomDropdown";
import {
  PROFILE_VISIBILITY_OPTIONS,
  LANGUAGE_OPTIONS,
  TIMEZONE_OPTIONS,
  DASHBOARD_VIEW_OPTIONS,
} from "../../utils/PreferencesConstants";
import { PreferencesFormData } from "../../interfaces/preferencesInterface";

const ProfilePreferences: React.FC = () => {
  const [formData, setFormData] = useState<PreferencesFormData>({
    profileVisibility: "all",
    preferredLanguage: "",
    timeZone: "",
    dashboardView: "",
  });

  return (
    <div className="bg-white">
      <Title text="Profile & Preferences" />

      <div className="rounded-xl border border-gray-100 mt-4 p-4 sm:p-6 md:p-10">
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-3">Profile Visibility</p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            {PROFILE_VISIBILITY_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex gap-3 items-center text-sm text-gray-700 cursor-pointer py-2"
              >
                <input
                  type="radio"
                  name="visibility"
                  value={opt.value}
                  checked={formData.profileVisibility === opt.value}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      profileVisibility: opt.value as any,
                    })
                  }
                  className="accent-blue-600 w-4 h-4"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
          <CustomDropdown
            label="Preferred Language"
            options={LANGUAGE_OPTIONS}
            onChange={(val) =>
              setFormData({ ...formData, preferredLanguage: val })
            }
          />

          <CustomDropdown
            label="Time Zone"
            options={TIMEZONE_OPTIONS}
            onChange={(val) =>
              setFormData({ ...formData, timeZone: val })
            }
          />

          <CustomDropdown
            label="Default Dashboard View"
            options={DASHBOARD_VIEW_OPTIONS}
            onChange={(val) =>
              setFormData({ ...formData, dashboardView: val })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePreferences;

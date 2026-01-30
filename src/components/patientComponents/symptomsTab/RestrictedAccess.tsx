import React from "react";

const RestrictedAccess: React.FC = () => {
    return (
        <div className="bg-white border rounded-xl overflow-hidden">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-white border-b h-14">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase border-r">Recorded on</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase border-r">symptoms</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase border-r">Recorded By</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase border-r">Severity</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase border-r">Associated Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td colSpan={5} className="py-24">
                            <div className="flex flex-col items-center justify-cenetr text-center">
                                <img src="images/u_lock-alt.svg" alt="lock" className="w-10 h-10 mb-4" />
                                <p className="text-lg font-semibold test-gray-900">Restricted Access!</p>
                                <p className="text-sm text-gray-500 max-w-md mt-2">
                                    Access to the complete symptom history of this patient is limited due to privacy settings. Only authorized doctors 
                                                                         view the full details.
                                </p>
                                <button type="button"
                                    className="mt-6 px-8 py-2 bg-blue-500 text-white text-sm font-medium rounded-xl hover:bg-blue-600 transition">
                                    Request Access
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RestrictedAccess;
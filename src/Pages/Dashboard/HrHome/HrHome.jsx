import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const HrHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [requests, setRequests] = useState([]);
    const [topRequestedItems, setTopRequestedItems] = useState([]);
    const [pieData, setPieData] = useState({
        labels: ['Returnable', 'Non-Returnable'],
        datasets: [
            {
                data: [0, 0],
                backgroundColor: ['#4CAF50', '#FF5733'],
                borderColor: ['#388E3C', '#C0392B'],
                borderWidth: 1,
            },
        ],
    });
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/hr-request/${user.email}`)
                .then((res) => {
                    const pendingRequests = res.data.filter(
                        (request) =>
                            request.status &&
                            request.status.toLowerCase() === 'pending'
                    );
                    setRequests(pendingRequests);

                    const requestCounts = pendingRequests.reduce(
                        (acc, request) => {
                            acc[request.assetName] =
                                (acc[request.assetName] || 0) + 1;
                            return acc;
                        },
                        {}
                    );

                    const sortedItems = Object.entries(requestCounts)
                        .map(([assetName, count]) => ({
                            assetName,
                            count,
                        }))
                        .sort((a, b) => b.count - a.count);

                    setTopRequestedItems(sortedItems.slice(0, 4));

                    const returnable = pendingRequests.filter(
                        (request) =>
                            request.assetType &&
                            request.assetType.toLowerCase() === 'returnable'
                    ).length;

                    const nonReturnable = pendingRequests.filter(
                        (request) =>
                            request.assetType &&
                            request.assetType.toLowerCase() === 'non-returnable'
                    ).length;

                    setPieData({
                        labels: ['Returnable', 'Non-Returnable'],
                        datasets: [
                            {
                                data: [returnable, nonReturnable],
                                backgroundColor: ['#4CAF50', '#FF5733'],
                                borderColor: ['#388E3C', '#C0392B'],
                                borderWidth: 1,
                            },
                        ],
                    });
                })
                .catch((err) =>
                    console.error('Error fetching requests:', err)
                );
        }
    }, [user?.email, axiosSecure]);

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-black mb-6 py-5 border-b-4 border-[#2596be] text-center">
                𝑯𝒓-𝑴𝒂𝒏𝒂𝒈𝒆𝒓 𝑫𝒂𝒔𝒉𝒃𝒐𝒂𝒓𝒅
            </h1>

            {/* Top Most Requested Items এবং Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                <div className="col-span-1">
                    <h2 className="text-xl font-semibold text-[#2596be] mb-4">
                        Top Most Requested Items
                    </h2>
                    <div className="space-y-2">
                        {topRequestedItems.length === 0 ? (
                            <p className="text-gray-500">
                                No top requested items yet.
                            </p>
                        ) : (
                            topRequestedItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
                                >
                                    <p className="font-medium text-gray-700">
                                        {item.assetName}
                                    </p>
                                    <p className="text-gray-600">
                                        Requests: {item.count}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="col-span-1">
                    <h2 className="text-xl font-semibold text-[#2596be] mb-4">
                        Returnable vs Non-Returnable Items
                    </h2>
                    <div>
                        <Pie data={pieData} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                <div className="col-span-1">
                    <h2 className="text-xl font-semibold text-[#2596be] mb-4">
                        Select a Date
                    </h2>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="rounded-lg shadow-md border border-gray-200"
                    />
                </div>

                <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-[#2596be] mb-4">
                        Selected Date Information
                    </h2>
                    <p className="text-gray-600 mb-2">
                        <strong>Date:</strong> {date.toDateString()}
                    </p>
                    <p className="text-gray-600">
                        Add more details about the selected date here, such as events or tasks.
                    </p>
                </div>
            </div>

            <h2 className="text-3xl text-center font-bold mb-5 text-black">
            𝑷𝒆𝒏𝒅𝒊𝒏𝒈 𝑹𝒆𝒒𝒖𝒆𝒔𝒕
            </h2>
            <div className="overflow-x-auto shadow-md rounded-lg border border-[#2596be]">
                <table className="table-auto w-full text-left bg-white">
                    <thead className="bg-[#2596be] text-white text-sm uppercase">
                        <tr>
                            <th className="px-4 py-3 border">#</th>
                            <th className="px-4 py-3 border">Requester</th>
                            <th className="px-4 py-3 border">Asset</th>
                            <th className="px-4 py-3 border">Type</th>
                            <th className="px-4 py-3 border">Status</th>
                            <th className="px-4 py-3 border">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center text-gray-500 py-4"
                                >
                                    No pending requests available.
                                </td>
                            </tr>
                        ) : (
                            requests.map((request, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 0
                                            ? 'bg-gray-50'
                                            : 'bg-white'
                                    } hover:bg-gray-100`}
                                >
                                    <td className="px-4 py-3 border text-sm">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-3 border text-sm">
                                        {request.requesterName} (
                                        {request.requesterEmail})
                                    </td>
                                    <td className="px-4 py-3 border text-sm">
                                        {request.assetName}
                                    </td>
                                    <td className="px-4 py-3 border text-sm">
                                        {request.assetType}
                                    </td>
                                    <td className="px-4 py-3 border text-sm">
                                        {request.status}
                                    </td>
                                    <td className="px-4 py-3 border text-sm">
                                        {request.notes || 'N/A'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HrHome;

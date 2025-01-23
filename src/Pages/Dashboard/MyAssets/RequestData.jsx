import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const RequestData = ({ requestData, refetch }) => {
  const { productName, productType, requestDate, approvalDate, status, _id } = requestData;
  const axiosSecure = useAxiosSecure();

  // Cancel request function with confirmation
  const handleCancelRequest = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this request? This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'No, Keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/request/${_id}`);
          refetch(); // Trigger refetch after canceling the request
          Swal.fire({
            icon: 'success',
            title: 'Request Canceled',
            text: 'The asset request has been successfully canceled!',
          });
        } catch (error) {
          console.error("Error canceling the request:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error canceling the request. Please try again.',
          });
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Action Canceled',
          text: 'Your request has not been canceled.',
        });
      }
    });
  };

  // Print details
  const handlePrint = () => {
    const content = document.getElementById(`request-${_id}`);
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(content.innerHTML);
    printWindow.document.write('<footer>Printed on: ' + new Date().toLocaleString() + '</footer>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  // Return asset
  const handleReturn = () => {
    console.log(`Asset ${_id} returned`);
    // Implement your logic for returning the asset here
  };

  return (
    <div className="border p-4 mb-4 shadow-lg rounded" id={`request-${_id}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Asset Name</th>
              <th className="border p-2 text-left">Asset Type</th>
              <th className="border p-2 text-left">Request Date</th>
              <th className="border p-2 text-left">Approval Date</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">{productName}</td>
              <td className="border p-2">{productType}</td>
              <td className="border p-2">{requestDate}</td>
              <td className="border p-2">{approvalDate || 'Pending'}</td>
              <td className="border p-2">{status}</td>
              <td className="border p-2 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                {status === 'Pending' && (
                  <button
                    onClick={handleCancelRequest}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                )}
                {status === 'Approved' && (
                  <>
                    <button
                      onClick={handlePrint}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Print
                    </button>
                    {productType === 'Returnable' && (
                      <button
                        onClick={handleReturn}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Return
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestData;

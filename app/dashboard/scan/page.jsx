"use client"
import TeamDetails from '@components/TeamDetails'
import { Html5QrcodeScanner } from 'html5-qrcode'
import React, { useEffect, useState } from 'react'

function Scanner() {
  const [paymentStatus, setPaymentStatus] = useState(false)
  const [detailsConfirmed, setDetailsConfirmed] = useState(false)
  const [teamId, setTeamId] = useState(null)
  const [qrData, setQrData] = useState(null)
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 300,
        height: 300,
      },
      fps: 5,
    })

    scanner.render(onScanSuccess, onScanError)

    async function onScanSuccess(qrCodeMessage) {
      scanner.clear()
      setTeamId(qrCodeMessage);
      const response = await fetch(`/api/payment?teamid=${qrCodeMessage}`);
      const data = await response.json();
      setQrData(data.team);
      setPaymentStatus(data.team.payment);
    }

    function onScanError(err) {
      console.warn(err)
    }
  }, [])

  const submitHandler = async () => {
    // const adminId = await );
    console.log(JSON.parse(localStorage.getItem('session')).user.id)
    const adminId = JSON.parse(localStorage.getItem('session')).user.id;
    await fetch("/api/payment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamId, paymentStatus, adminId }),
    })
  }

  return (
    <>
      <div className='flex items-center justify-center'>
        {detailsConfirmed ?

          <>
            <div className='h-screen  -ml-32 flex justify-center flex-col gap-6'>
              {/* Past Event */}
              {/* <div className="flex items-center">
                  <input disabled checked type="checkbox" value="" className="w-8 h-8 accent-green-600  rounded  " />
                  <label className="ml-8 font-extrabold text-3xl text-green-600 ">Payment</label>
                </div> */}
              {/* Ongoing Event */}
              <div className="flex items-center mb-4">
                <input type="checkbox" defaultChecked={paymentStatus} className="w-8 h-8 accent-red-600 rounded" onChange={() => setPaymentStatus((prev) => !prev)} />
                <label className="ml-8 font-extrabold text-3xl text-red-600">Payment</label>
              </div>
              {/* Future Event */}
              <div className="flex items-center mb-4">
                <input disabled id="disabled-checkbox" type="checkbox" value="" className="w-8 h-8 accent-purple-600  rounded  " />
                <label className="ml-8 font-extrabold text-3xl text-purple-400 ">Attendance</label>
              </div>
              <div className="flex items-center mb-4">
                <input disabled id="disabled-checkbox" type="checkbox" value="" className="w-8 h-8 accent-teal-600  rounded  " />
                <label className="ml-8 font-extrabold text-3xl text-teal-400 ">1st Round</label>
              </div>
              <div className="flex items-center mb-4">
                <input disabled id="disabled-checkbox" type="checkbox" value="" className="w-8 h-8 accent-yellow-600  rounded  " />
                <label className="ml-8 font-extrabold text-3xl text-yellow-400 ">2nd Round</label>
              </div>
              <div className="flex items-center mb-4">
                <input disabled id="disabled-checkbox" type="checkbox" value="" className="w-8 h-8 accent-orange-600  rounded  " />
                <label className="ml-8 font-extrabold text-3xl text-orange-400 ">3rd Round</label>
              </div>
              <div className="flex items-center mb-6">
                <input disabled id="disabled-checkbox" type="checkbox" value="" className="w-8 h-8 accent-black-600  rounded  " />
                <label className="ml-8 font-extrabold text-3xl text-black-400 ">4th Round</label>
              </div>
              <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={submitHandler}>
                Verified and Submit
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </button>
            </div>
          </>
          : <>
            {
              teamId ?
                <>
                  {
                    qrData ?
                      <div className='h-screen -ml-32 flex items-center justify-center flex-col gap-5'>
                        < TeamDetails props={qrData} />
                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => setDetailsConfirmed(true)}>
                          Verified and Proceed
                          <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                          </svg>
                        </button>
                      </div> :
                      <>
                        <div className='text-center'>
                          <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      </>
                  }
                </> :
                <div id='reader' className='w-1/2'></div>
            }
          </>
        }
      </div>
    </>
  )
}

export default Scanner
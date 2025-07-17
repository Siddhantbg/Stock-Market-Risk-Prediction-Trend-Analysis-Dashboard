import React, { useState } from 'react';
import Pay from '../components/Pay';
import Request from './Request';
import Reqpay from '../components/Reqpay';



const Payements = () => {
    const [active, setActive] = useState("upi");

    const toggleHandler = (paymentType) => {
        setActive(paymentType);
    }

    return (
        <div className='flex flex-col bg-gradient-to-b from-[#1a1a1a] to-black w-full text-white min-h-screen'>
            <div className='max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12'>
                <h1 className="text-3xl font-bold text-center mb-8 text-gradient">Crypto to UPI Transfer</h1>
                <div className='flex gap-4 mb-8'>
                    <button 
                        onClick={() => toggleHandler("upi")} 
                        className={`flex-1 py-4 px-8 rounded-xl border-2 text-lg font-semibold shadow-lg transition-all duration-300 ${
                            active === "upi" 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent' 
                            : 'bg-[#2d2d2d] border-gray-600 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white hover:border-transparent'
                        }`}
                    >
                        UPI Payment
                    </button>
                    <button 
                        onClick={() => toggleHandler("metamask")} 
                        className={`flex-1 py-4 px-8 rounded-xl border-2 text-lg font-semibold shadow-lg transition-all duration-300 ${
                            active === "metamask" 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent' 
                            : 'bg-[#2d2d2d] border-gray-600 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white hover:border-transparent'
                        }`}
                    >
                        Money Requests
                    </button>
                </div>
                <div className='w-full bg-[#1c1c1c] rounded-2xl shadow-xl border border-gray-800 p-1'>
                    {active === "upi" && <Pay />}
                    {active === "metamask" && <Request />}
                </div>
            </div>
        </div>
    )
}

export default Payements;

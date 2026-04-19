import React from 'react';

const RealExample = () => {
    return (
        <section id="real-example" className="py-32 px-8 bg-white pt-32 pb-16">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#2D2D2D]">
                        A Real-World Example
                    </h2>
                    <p className="text-lg text-neutral-500 mt-4">Here's how a typical $10,000 job is broken down and paid out.</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                        <h3 className="text-2xl font-bold text-[#2D2D2D]">Total Job Cost</h3>
                        <span className="text-3xl font-extrabold text-[#2D2D2D]">$10,000</span>
                    </div>
                    <ul className="space-y-6">
                        <li className="flex items-center justify-between">
                            <div>
                                <h4 className="text-xl font-bold text-[#2D2D2D]">Deposit (25%)</h4>
                                <p className="text-neutral-500">Paid upfront before work begins. This covers your initial material costs.</p>
                            </div>
                            <span className="text-xl font-bold text-green-600">$2,500</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <div>
                                <h4 className="text-xl font-bold text-[#2D2D2D]">Mid-Project (50%)</h4>
                                <p className="text-neutral-500">Released after the main structure is complete and approved by the homeowner.</p>
                            </div>
                            <span className="text-xl font-bold text-green-600">$5,000</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <div>
                                <h4 className="text-xl font-bold text-[#2D2D2D]">Final Payment (25%)</h4>
                                <p className="text-neutral-500">The final amount is paid once the job is 100% complete and the customer is satisfied.</p>
                            </div>
                            <span className="text-xl font-bold text-green-600">$2,500</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default RealExample;

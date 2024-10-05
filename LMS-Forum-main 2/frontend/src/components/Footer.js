
import React from 'react';

function Footer() {
    return (
        <>
            <footer className="py-8 text-white bg-[#7b46d4] rounded-bl-[25px] rounded-br-[25px]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
                        {/* About Us Column */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold">About us</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:underline">Our story</a></li>
                                <li><a href="#" className="hover:underline">Blog</a></li>
                            </ul>
                        </div>

                        {/* Course Column */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold">Course</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:underline">Past papers</a></li>
                                <li><a href="#" className="hover:underline">Lectures</a></li>
                                <li><a href="#" className="hover:underline">Revision</a></li>
                                <li><a href="#" className="hover:underline">Tutes</a></li>
                            </ul>
                        </div>

                        {/* Support Column */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold">Support</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:underline">Contact us</a></li>
                                <li><a href="#" className="hover:underline">Forum</a></li>
                                <li><a href="#" className="hover:underline">FAQ</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Copyright Statement */}
            <div className="py-4 bg-white">
                <p className="text-sm text-center text-gray-800">&copy; 2024 Saumika Senanayake. All rights reserved.</p>
            </div>
        </>
    );
}

export default Footer;

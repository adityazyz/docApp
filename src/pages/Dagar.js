      {/* // doc sidebar  */}
    //   {router.pathname.includes("/doctor/") && <DocSidebar/>}
      {/* // patient sidebar  */}
    //   {router.pathname.includes("/patient/") && <PtSidebar/>}

import DocSidebar from '../../components/DocSidebar';
import PtSidebar from '../../components/PtSidebar';
import React, { useState, useEffect } from 'react';

const Dagar = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [showFooter, setShowFooter] = useState(false);

    const handleScroll = () => {
        const sidebar = document.getElementById('sidebar');
        const home = document.getElementById('home');

        if (sidebar && home) {
            const sidebarRect = sidebar.getBoundingClientRect();
            const homeRect = home.getBoundingClientRect();

            if (window.scrollY >= homeRect.top - 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }

            if (
                homeRect.bottom >= sidebarRect.bottom &&
                homeRect.bottom <= sidebarRect.bottom + 20
            ) {
                setShowFooter(true); // Show footer when height matches
            } else {
                setShowFooter(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="flex flex-col h-[200vh]">
            <div className="flex gap-10">
                <div
                    id="sidebar"
                    className={`w-1/4 p-4 ${isSticky ? 'sticky top-[-15px]' : ''}`}
                    style={{
                        height: '125vh',
                        backgroundColor: '#000', // Add your desired color here
                    }}
                >
                    {/* // sidebar content  */}
                    <PtSidebar/>
                </div>
                <div
                    id="home"
                    className={`w-3/4 p-4 ${isSticky ? 'ml-1/4' : ''}`}
                    style={{
                        height: '250vh',
                        backgroundColor: '#ff2', // Add your desired color here
                    }}
                >
                    {/* Home component content */}
                </div>
            </div>

            <div className={`transition-opacity duration-500 ${showFooter ? 'opacity-100' : 'opacity-0'}`}>
                <footer
                    className="w-full p-4 h-[50vh]"
                    style={{
                        backgroundColor: '#000', // Add your desired color here
                    }}
                >
                    {/* Footer content */}
                </footer>
            </div>
        </div>
    );
};

export default Dagar;




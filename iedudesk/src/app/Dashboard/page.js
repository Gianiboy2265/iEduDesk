"use client";
import { useState, useEffect } from "react";
import { account } from "../appwrite";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(5); // For demo purposes
  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
        setLoading(false);
      } catch (error) {
        console.error("Not logged in", error);
        window.location.href = "/";
        setLoading(false);
      }
    };
    
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const toggleNotifications = () => {
    setNotificationCount(0); 
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen"> {/* Changed: flex-col to flex, removed background */}
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-slate-900 shadow-md hidden md:block">
        {/* iEduDesk text - styled to align with header height */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-slate-700"> {/* Changed: classes for alignment and border */}
          <span className="text-2xl font-bold text-gray-900 dark:text-white">iEduDesk</span>
        </div>
        
        <div className="px-4 py-4"> {/* Changed: Added py-4 for padding */}
          <nav className="space-y-1">
            <a 
              href="#" 
              className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-600 dark:text-white rounded-md"
            >
              <svg 
                className="mr-3 h-5 w-5" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              Dashboard
            </a>

            <a 
              href="#" 
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md"
            >
              <svg 
                className="mr-3 h-5 w-5" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {/* Replaced SVG path for Courses icon */}
                <path d="M9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6C15 7.65685 13.6569 9 12 9C10.3431 9 9 7.65685 9 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12C14.7614 12 17 9.76142 17 7L17.0001 6.9137C17.0001 6.9137 17 6.9137 17 6.9137C17.5304 6.9137 18 6.44411 18 5.9137C18 5.38329 17.5304 4.9137 17 4.9137" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12C9.23858 12 7 9.76142 7 7L6.99991 6.9137C6.99991 6.9137 7 6.9137 7 6.9137C6.46957 6.9137 6 6.44411 6 5.9137C6 5.38329 6.46957 4.9137 7 4.9137" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 21V12C5 10.5997 5 9.89956 5.21799 9.30699C5.40973 8.79893 5.79893 8.40973 6.30699 8.21799C6.89956 8 7.59972 8 9 8H15C16.4003 8 17.1004 8 17.693 8.21799C18.2011 8.40973 18.5903 8.79893 18.782 9.30699C19 9.89956 19 10.5997 19 12V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Courses
            </a>

            <a 
              href="#" 
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md"
            >
              <svg 
                className="mr-3 h-5 w-5" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              Calendar
            </a>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md"
            >
              <svg 
                className="mr-3 h-5 w-5" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Wrapper (Header + Content) */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-slate-900"> {/* Added: Wrapper for header and main, with background */}
        {/* Top Navigation Bar */}
        <header className="bg-white dark:bg-slate-900 shadow-md">
          <div className="px-4 sm:px-6 lg:px-8"> {/* Changed: Removed max-w-7xl and mx-auto */}
            {/* Changed to justify-end and items-center. Bell and Avatar are direct children. */}
            <div className="flex justify-end items-center h-16">
              {/* Right aligned notification bell and avatar */}
              <div className="flex items-center"> {/* Container for bell and avatar if needed, or place them directly */}
                <div className="relative mr-4">
                  <button 
                    onClick={toggleNotifications}
                    className="p-1 rounded-full text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg 
                      className="h-6 w-6" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                      />
                    </svg>
                  </button>
                  
                  {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <button className="flex items-center focus:outline-none">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-medium">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m0 0A7.5 7.5 0 1012 6.253v11.494z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-slate-400 truncate">Total Courses</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">12</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-slate-400 truncate">Completed Assignments</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">8</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                    stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-slate-400 truncate">Upcoming Deadlines</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">3</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">Recent Activity</h2>
            <div className="mt-4 bg-white dark:bg-slate-800 shadow rounded-lg">
              <ul className="divide-y divide-gray-200 dark:divide-slate-700">
                {[1, 2, 3, 4, 5].map((item) => (
                  <li key={item} className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-700"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          Activity {item}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-slate-400 truncate">
                          Placeholder description for activity {item}
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500 dark:text-white">
                          New
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
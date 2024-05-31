  import React from 'react';
  import { Link } from 'react-router-dom';

  const AdminDashboard = () => {
    return (
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto py-4 px-8 flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <Link to="/admin/logout" className="text-blue-500 hover:underline">Logout</Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto py-8 px-8">
          {/* Quick Links */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/admin/users" className="bg-white shadow-md rounded-md py-4 px-6 block hover:bg-gray-50 transition duration-300">
                Manage Users
              </Link>
              <Link to="/admin/products" className="bg-white shadow-md rounded-md py-4 px-6 block hover:bg-gray-50 transition duration-300">
                Manage Products
              </Link>
              {/* Add more quick links as needed */}
            </div>
          </section>

          {/* Statistics */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Example statistics */}
              <div className="bg-white shadow-md rounded-md py-4 px-6">
                <h3 className="text-sm font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold">123</p>
              </div>
              <div className="bg-white shadow-md rounded-md py-4 px-6">
                <h3 className="text-sm font-semibold mb-2">Total Products</h3>
                <p className="text-3xl font-bold">456</p>
              </div>
              {/* Add more statistics as needed */}
            </div>
          </section>
        </main>
      </div>
    );
  };

  export default AdminDashboard;

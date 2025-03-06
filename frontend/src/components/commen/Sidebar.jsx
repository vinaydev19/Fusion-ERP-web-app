import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdInventory, MdSell, MdMenu, MdClose } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { FaFileInvoice } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { GoProjectTemplate } from "react-icons/go";
import { GrAnalytics } from "react-icons/gr";
import { BiSolidPurchaseTag } from "react-icons/bi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      title: "Inventory",
      icon: <MdInventory />,
      path: "/dashboard/product-inventory",
    },
    { title: "Sales", icon: <MdSell />, path: "/dashboard/sales" },
    {
      title: "Finance",
      icon: <GiMoneyStack />,
      path: "/dashboard/financial-transactions",
    },
    {
      title: "Invoices",
      icon: <FaFileInvoice />,
      path: "/dashboard/invoice-generator",
    },
    {
      title: "Employees",
      icon: <IoMdPeople />,
      path: "/dashboard/employees-management",
    },
    {
      title: "Delivery",
      icon: <CiDeliveryTruck />,
      path: "/dashboard/deliveries",
    },
    {
      title: "Customers",
      icon: <TbBrandGoogleAnalytics />,
      path: "/dashboard/customer-management",
    },
    {
      title: "Purchase",
      icon: <BiSolidPurchaseTag />,
      path: "/dashboard/purchase-Orders",
    },
  ];

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } p-5`}
    >
      <div className="flex items-center justify-between mb-6">
        {isOpen && <h1 className="text-2xl font-bold">Fusion ERP</h1>}
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      <nav className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-all"
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

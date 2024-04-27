import AdminNavbar from "@/components/admin-navbar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <AdminNavbar />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};

export default AdminLayout;

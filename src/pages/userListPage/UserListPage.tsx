import React, { useState, useEffect } from "react";
import Pagination from "../../components/pagination/Pagination.tsx";
import { fetchUsers } from "../../services/api.ts";
import { User } from "../../types/user.ts";
import UserTableUI from "../../components/userTableUi/UserTableUi.tsx";

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const limit = 5; 
  const totalUsers = 10;

  useEffect(() => {
    let retries = 3;

    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      while (retries > 0) {
        try {
          const data = await fetchUsers(page, limit);
          setUsers(data);
          setLoading(false);
          return;
        } catch (err) {
          retries -= 1;
          if (retries === 0) {
            setError("Failed to load users after multiple attempts.");
            setLoading(false);
          }
        }
      }
    };

    fetchUserData();
  }, [page]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  const totalPages = Math.ceil(totalUsers / limit); 
  return (
    <div>
      <UserTableUI users={users} />
      <Pagination 
        currentPage={page} 
        totalPages={totalPages}
        onPageChange={setPage} 
      />
    </div>
  );
};

export default UserListPage;

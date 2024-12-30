import React from 'react';
import { Table, ScrollArea } from "@radix-ui/themes";
import { User } from "../../types/user";
import { Mail, Phone, Globe, MapPin, Building2 } from "lucide-react";
import { useLocation } from "wouter";

interface UserTableProps {
  users: any;
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [, setLocation] = useLocation();

  const handleRowClick = (user: User) => {
    setLocation(`/users/${user.id}`);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl w-full">
      <ScrollArea className='w-full'>
        <div className="overflow-hidden rounded-xl shadow-xl border border-gray-200 w-full">
          <Table.Root variant="surface" className="w-full">
            <Table.Header className="bg-gradient-to-r from-blue-500 to-indigo-600">
              <Table.Row>
                <Table.ColumnHeaderCell className="px-6 py-4 text-white font-semibold">ID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="px-6 py-4 text-white font-semibold">Full Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="px-6 py-4 text-white font-semibold">Username</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="px-6 py-4 text-white font-semibold">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" data-testid="Mail" />
                    Email
                  </div>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="px-6 py-4 text-white font-semibold">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" data-testid="MapPin" />
                    Address
                  </div>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="px-6 py-4 text-white font-semibold">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" data-testid="Phone" />
                    Phone
                  </div>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="px-6 py-4 text-white font-semibold">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" data-testid="Building2" />
                    Company
                  </div>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="px-6 py-4 text-white font-semibold">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" data-testid="Globe" />
                    Website
                  </div>
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users?.map((user: any) => (
                <Table.Row 
                  key={user.id} 
                  onClick={() => handleRowClick(user)} 
                  className="cursor-pointer hover:bg-blue-50/50 transition-colors duration-200"
                >
                  <Table.Cell className="px-6 py-4">
                    <span className="font-semibold text-blue-600">#{user.id}</span>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4 font-medium">{user.name}</Table.Cell>
                  <Table.Cell className="px-6 py-4 text-gray-600">@{user.username}</Table.Cell>
                  <Table.Cell className="px-6 py-4 text-gray-600">{user.email}</Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <div className="text-gray-600">
                      <div>{user?.address?.street},</div>
                      <div className="text-sm text-gray-500">
                        {user?.address?.city}, {user?.address?.zipcode}
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4 text-gray-600">{user.phone}</Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <div className="text-gray-600">
                      <div>{user.company.name}</div>
                      <div className="text-sm text-gray-500 italic truncate max-w-[200px]">
                        {user.company.catchPhrase}
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <a 
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {user.website}
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserTable;

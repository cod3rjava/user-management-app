import React, { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { User } from "../../types/user.ts";
import { fetchUserDetails } from "../../services/api.ts";
import { Container, Card, Text, Button, Badge } from "@radix-ui/themes";
import { Building2, Mail, Globe, Phone, MapPin, ArrowLeft } from "lucide-react";

const UserDetailsPage = () => {
  const [, params] = useRoute("/users/:id");
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!params?.id) return;
      
      try {
        const data = await fetchUserDetails(Number(params.id));
        setUser(data);
      } catch (err) {
        setError("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [params?.id]);

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <Text className="text-red-500 text-xl mb-4">{error}</Text>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <Container className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-12 relative">
            <Button
              onClick={() => setLocation("/")}
              className="absolute top-4 left-4 text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex flex-col items-center relative z-10">
              <div className="w-16 h-16 bg-sky-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
                {user?.name ? getInitials(user.name) : ""}
              </div>
              <Text className="text-3xl font-bold text-white mb-2">{user?.name}</Text>
              <Badge className="font-bold text-white">{user?.username}</Badge>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Text className="text-xl font-semibold mb-4">Contact Details</Text>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <Text className="text-gray-600">{user?.email}</Text>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <Text className="text-gray-600">{user?.phone}</Text>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <Text className="text-gray-600">{user?.website}</Text>
                  </div>
                </div>
              </Card>

              {/* Address Info */}
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Text className="text-xl font-semibold mb-4">Address</Text>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <Text className="text-gray-600">{user?.address?.street}</Text>
                    <Text className="text-gray-600">{user?.address?.city}</Text>
                    <Text className="text-gray-600">{user?.address?.zipcode}</Text>
                  </div>
                </div>
              </Card>
            </div>

            {/* Company Info */}
            <Card className="mt-8 p-6 hover:shadow-lg transition-shadow">
              <Text className="text-xl font-semibold mb-4">Company</Text>
              <div className="flex items-start space-x-3">
                <Building2 className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <Text className="text-gray-800 font-medium">{user?.company?.name}</Text>
                  <Text className="text-gray-600 italic mt-2">
                    "{user?.company?.catchPhrase}"
                  </Text>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserDetailsPage;
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Mail, Phone, MapPin, Calendar, User, Edit } from "lucide-react";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Card className="w-full">
          <CardHeader className="relative">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-t-lg" />
            <div className="relative pt-16 px-6 flex flex-col items-center">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg" />
                <AvatarFallback>BC</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4 text-2xl font-bold">Blood Care User</CardTitle>
              <p className="text-muted-foreground">Regular Donor</p>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="donations">Donation History</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-red-500" />
                        <Label>Full Name</Label>
                      </div>
                      <Input value="Blood Care User" readOnly />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="h-4 w-4 text-red-500" />
                        <Label>Email</Label>
                      </div>
                      <Input value="donor@bloodcare.org" readOnly />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="h-4 w-4 text-red-500" />
                        <Label>Phone</Label>
                      </div>
                      <Input value="+1 234 567 890" readOnly />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <Label>Blood Type</Label>
                      </div>
                      <Input value="O+" readOnly />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <Label>Location</Label>
                      </div>
                      <Input value="New York, USA" readOnly />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-red-500" />
                        <Label>Member Since</Label>
                      </div>
                      <Input value="January 2024" readOnly />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="donations" className="mt-6">
                <div className="rounded-lg border">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Recent Donations</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      {[
                        { date: "March 15, 2024", location: "Central Hospital", type: "Whole Blood" },
                        { date: "December 10, 2023", location: "City Blood Bank", type: "Plasma" },
                        { date: "September 5, 2023", location: "Medical Center", type: "Platelets" },
                      ].map((donation, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium">{donation.location}</p>
                            <p className="text-sm text-muted-foreground">{donation.type}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{donation.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, MapPin, Phone, Mail, Clock } from "lucide-react";
import { UserProfileDropdown } from "@/components/UserProfileDropdown";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold text-gray-800">Blood Care</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-red-500 transition-colors">Home</Link>
              <Link to="/blog" className="text-gray-700 hover:text-red-500 transition-colors">Blog</Link>
              <Link to="/about" className="text-gray-700 hover:text-red-500 transition-colors">About Us</Link>
              <Link to="/blood-request" className="text-gray-700 hover:text-red-500 transition-colors">Blood Request</Link>
              {!isAuthenticated ? (
                <>
                  <Link to="/register" className="text-gray-700 hover:text-red-500 transition-colors">Register Now</Link>
                  <Link to="/login">
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                      Login
                    </Button>
                  </Link>
                </>
              ) : (
                <UserProfileDropdown />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-6xl font-bold text-gray-800 leading-tight">
                  EVERY
                  <br />
                  <span className="text-red-500">DROP</span>
                  <br />
                  COUNTS
                </h1>
                <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                  Join our life-saving community and make a difference. Every donation can save up to three lives.
                  Be a hero today.
                </p>
              </div>
              <div className="flex space-x-4">
                <Link to="/register">
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg">
                    Join Now
                  </Button>
                </Link>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 text-lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-red-100 to-pink-200 rounded-3xl flex items-center justify-center">
                <Heart className="h-32 w-32 text-red-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How Blood Care Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Register</h3>
              <p className="text-gray-600">
                Sign up and become part of our life-saving community
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Donors</h3>
              <p className="text-gray-600">
                Connect with nearby donors when you need blood
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Lives</h3>
              <p className="text-gray-600">
                Make a difference by donating blood and saving lives
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-red-500 mb-3" />
              <h4 className="font-semibold mb-2">Emergency Hotline</h4>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-red-500 mb-3" />
              <h4 className="font-semibold mb-2">Email Support</h4>
              <p className="text-gray-600">help@bloodcare.org</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-red-500 mb-3" />
              <h4 className="font-semibold mb-2">24/7 Support</h4>
              <p className="text-gray-600">Always available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-red-500" />
            <span className="text-xl font-bold">Blood Care</span>
          </div>
          <p className="text-gray-400">
            Every drop counts - Join our life-saving community
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

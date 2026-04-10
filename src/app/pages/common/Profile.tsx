import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Edit,
} from "lucide-react";

export function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your profile information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-4xl font-bold mb-4">
                JD
              </div>
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-muted-foreground">CS2021001</p>
              <p className="text-sm text-muted-foreground mt-1">
                Computer Science • 3rd Year
              </p>

              <div className="w-full mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overall GPA</span>
                  <span className="font-semibold">3.8/4.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attendance</span>
                  <span className="font-semibold">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Credits Earned</span>
                  <span className="font-semibold">120/160</span>
                </div>
              </div>

              <Button variant="primary" className="w-full mt-6">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input defaultValue="John Doe" className="pl-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Roll Number
                  </label>
                  <Input defaultValue="CS2021001" disabled />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      defaultValue="john.doe@college.edu"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      defaultValue="+1 234 567 8900"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <textarea
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-input-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={3}
                    defaultValue="123 Main Street, Apartment 4B, Springfield, IL 62701"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="date"
                      defaultValue="2002-05-15"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Blood Group
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg border border-input bg-input-background focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">Computer Science & Engineering</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <BookOpen className="w-5 h-5 text-secondary" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Program</p>
                  <p className="font-medium">Bachelor of Technology (B.Tech)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Calendar className="w-5 h-5 text-accent" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Year of Admission
                  </p>
                  <p className="font-medium">2021</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Expected Graduation
                  </p>
                  <p className="font-medium">2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact Name
                </label>
                <Input defaultValue="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Relationship
                </label>
                <Input defaultValue="Mother" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <Input type="tel" defaultValue="+1 234 567 8901" />
              </div>
              <Button variant="outline" className="w-full">
                Update Emergency Contact
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

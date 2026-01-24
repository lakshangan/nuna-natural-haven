import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Loader2,
  CheckCircle,
  X
} from "lucide-react";
import { toast } from "sonner";

// 🔥 Make sure THIS is correct!
const GOOGLE_SHEET_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwDv2pcTI7lzUuZWcxp5PEGAGVEKUITWRVCMhSNojYHLYG0LzHgYz6QMwYzldlA4SK9Ew/exec";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 🔥 DEBUG: This will tell us if form is submitting
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔥 FORM SUBMITTED");

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      console.log("🚀 SENDING REQUEST TO:", GOOGLE_SHEET_WEB_APP_URL);
      console.log("📦 DATA:", formData);

      const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("✅ FETCH COMPLETED:", response);

      toast.success("Message sent successfully!");
      setShowSuccessModal(true);

      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setShowSuccessModal(false), 3000);
    } catch (err) {
      console.error("❌ FETCH ERROR:", err);
      toast.error("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  // 🔥 DEBUG: Check input changes
  const handleChange = (e: any) => {
    console.log("✏️ INPUT CHANGED:", e.target.name, e.target.value);

    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="relative z-10 bg-background shadow-2xl pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-[1180px]">

          <div className="text-center space-y-4 mb-16 animate-reveal">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question? We’d love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">

            {/* 🔥 FORM SECTION */}
            <div className="animate-reveal">
              <form
                onSubmit={(e) => {
                  console.log("🟢 onSubmit TRIGGERED");
                  handleSubmit(e);
                }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    type="email"
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    required
                  />
                </div>

                {/* 🔥 Add debug onClick */}
                <Button
                  type="submit"
                  onClick={() => console.log("🟡 BUTTON CLICKED")}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

          </div>

          {/* SUCCESS MODAL */}
          {showSuccessModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4 animate-pop">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <p className="text-lg font-semibold">Message Sent!</p>
                <button onClick={() => setShowSuccessModal(false)}>
                  <X />
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
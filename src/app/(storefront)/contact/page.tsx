'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      toast.error('Please fill in required fields');
      return;
    }
    setSubmitted(true);
    toast.success('Thank you! Our support team will get in touch shortly.');
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="badge bg-teal-50 text-teal-700 text-xs uppercase tracking-wider font-bold">
            Customer Support & Store Outlets
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Get in Touch with Byte Tech BD
          </h1>
          <p className="text-sm text-slate-500">
            Have questions about laptop specifications, warranty, or custom gaming PC quotations? Our expert team is ready to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-navy-950 pb-2 border-b border-slate-100">
                Store Contacts & Outlet
              </h2>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <strong className="text-navy-950 block">Dhaka Showroom & Hub</strong>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Level 4, Multiplan Center, New Elephant Road, Dhaka-1205, Bangladesh.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <strong className="text-navy-950 block">Hotline & WhatsApp Support</strong>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">
                      +880 1700-000000 / +880 1900-000000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <strong className="text-navy-950 block">Email Inquiries</strong>
                    <p className="text-xs text-slate-500 mt-0.5">
                      sales@bytetechbd.com / support@bytetechbd.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <strong className="text-navy-950 block">Operating Hours</strong>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Saturday – Thursday: 10:00 AM – 8:30 PM (Friday: Closed)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Banner */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white shadow-md space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2">
                <MessageSquare size={18} /> Need an instant quote?
              </h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Connect directly with our technicians on WhatsApp for fast product photos, testing videos, and custom PC part lists.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/8801700000000"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-4 py-2 bg-white text-emerald-800 text-xs font-bold rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
                >
                  Chat on WhatsApp →
                </a>
              </div>
            </div>
          </div>

          {/* Contact / Quotation Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
            <h2 className="text-xl font-black text-navy-950 mb-2">
              Send us a Message or Custom PC Request
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill in your details below and an engineer will contact you with specs and prices.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
                <CheckCircle2 size={40} className="text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-950">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. We will get back to you at {formData.phone} shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
                  }}
                  className="btn-outline text-xs mt-3 bg-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Mahfuzur Rahman"
                      className="input-field text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="01XXXXXXXXX"
                      className="input-field text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="input-field text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="input-field text-sm"
                    >
                      <option value="">Select subject...</option>
                      <option value="Laptop Inquiry">Laptop Inquiry</option>
                      <option value="Custom PC Build Quote">Custom PC Build Quote</option>
                      <option value="Used Laptop Condition Check">Used Laptop Condition Check</option>
                      <option value="Warranty / Replacement">Warranty / Replacement</option>
                      <option value="Corporate / Bulk Order">Corporate / Bulk Order</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Requirements / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the laptop model, your preferred budget, or the specific PC specifications you need..."
                    className="input-field text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-teal-500/20"
                >
                  <Send size={16} />
                  <span>Send Message to Byte Tech BD</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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

            {/* Quick WhatsApp & Social Channels */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white shadow-md space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <MessageSquare size={18} /> Need an instant quote or video?
                </h3>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Connect directly with our technicians on WhatsApp for fast product photos, testing videos, and custom PC part lists.
                </p>
                <div className="pt-1">
                  <a
                    href="https://wa.me/8801700000000"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-emerald-800 text-xs font-bold rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
                  >
                    <span>Chat on WhatsApp</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-3 border-t border-emerald-500/40">
                <span className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider block mb-2">
                  Official Social Pages
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://facebook.com/bytetechbd"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-800/60 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook Page</span>
                  </a>

                  <a
                    href="https://instagram.com/bytetechbd"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-800/60 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram Profile</span>
                  </a>
                </div>
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

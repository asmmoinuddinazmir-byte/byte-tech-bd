'use client';

import { useState } from 'react';
import { adminUpdateSettings } from '@/lib/actions/admin';
import { Save, Store, Truck, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  initialSettings: Record<string, string>;
}

export function SettingsClient({ initialSettings }: Props) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminUpdateSettings(settings);
      toast.success('Store settings saved successfully!');
    } catch (err) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="max-w-3xl bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
      {/* Delivery Charges Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
          <Truck size={16} className="text-teal-500" />
          <span>Bangladesh Delivery Charges</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Inside Dhaka (৳ BDT)
            </label>
            <input
              type="number"
              value={settings.delivery_charge_dhaka || '80'}
              onChange={(e) => handleChange('delivery_charge_dhaka', e.target.value)}
              className="input-field text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Outside Dhaka (৳ BDT)
            </label>
            <input
              type="number"
              value={settings.delivery_charge_outside || '150'}
              onChange={(e) => handleChange('delivery_charge_outside', e.target.value)}
              className="input-field text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Free Delivery Over (৳ BDT)
            </label>
            <input
              type="number"
              value={settings.free_delivery_threshold || '10000'}
              onChange={(e) => handleChange('free_delivery_threshold', e.target.value)}
              className="input-field text-sm font-mono"
            />
          </div>
        </div>
      </div>

      {/* Store Identity */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
          <Store size={16} className="text-teal-500" />
          <span>Store Information & Hotlines</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Store Name
            </label>
            <input
              type="text"
              value={settings.store_name || 'Byte Tech BD'}
              onChange={(e) => handleChange('store_name', e.target.value)}
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Support Phone / WhatsApp
            </label>
            <input
              type="text"
              value={settings.store_phone || '+880 1700-000000'}
              onChange={(e) => handleChange('store_phone', e.target.value)}
              className="input-field text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Support Email
            </label>
            <input
              type="email"
              value={settings.store_email || 'info@bytetechbd.com'}
              onChange={(e) => handleChange('store_email', e.target.value)}
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Physical Hub Address
            </label>
            <input
              type="text"
              value={settings.store_address || 'Level 4, Multiplan Center, Dhaka, Bangladesh'}
              onChange={(e) => handleChange('store_address', e.target.value)}
              className="input-field text-sm"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary text-xs font-bold py-2.5 px-6 shadow-md shadow-teal-500/20 disabled:opacity-50 flex items-center gap-2"
        >
          <Save size={15} />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>
    </form>
  );
}

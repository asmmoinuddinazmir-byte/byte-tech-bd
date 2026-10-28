import { adminGetSettings } from '@/lib/actions/admin';
import { SettingsClient } from './SettingsClient';

export default async function AdminSettingsPage() {
  const settings = await adminGetSettings();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
          Store Configuration & Delivery Rates
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Adjust delivery fees for Dhaka and outer districts, hotline numbers, and store location details.
        </p>
      </div>

      <SettingsClient initialSettings={settings} />
    </div>
  );
}

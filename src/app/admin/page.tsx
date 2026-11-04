'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, BedDouble, DollarSign, Globe, BarChart3, Calendar } from 'lucide-react'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const kpiCards = [
  { label: 'Revenue Growth', value: '+12.5%', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50', trend: 'up' },
  { label: 'Booking Conversion', value: '24.8%', icon: Calendar, color: 'text-blue-600 bg-blue-50', trend: 'up' },
  { label: 'Guest Retention', value: '68%', icon: Users, color: 'text-purple-600 bg-purple-50', trend: 'up' },
  { label: 'Avg Room Rate', value: '$420', icon: BedDouble, color: 'text-amber-600 bg-amber-50', trend: 'up' },
]

const revenueTrend = [
  { month: 'Jan', revenue: 85000, lastYear: 72000 }, { month: 'Feb', revenue: 92000, lastYear: 78000 },
  { month: 'Mar', revenue: 78000, lastYear: 68000 }, { month: 'Apr', revenue: 105000, lastYear: 88000 },
  { month: 'May', revenue: 118000, lastYear: 95000 }, { month: 'Jun', revenue: 132000, lastYear: 108000 },
  { month: 'Jul', revenue: 145000, lastYear: 120000 }, { month: 'Aug', revenue: 156000, lastYear: 130000 },
  { month: 'Sep', revenue: 128000, lastYear: 110000 }, { month: 'Oct', revenue: 112000, lastYear: 98000 },
  { month: 'Nov', revenue: 98000, lastYear: 85000 }, { month: 'Dec', revenue: 141000, lastYear: 118000 },
]

const bookingSources = [
  { name: 'Direct Website', value: 35, color: '#C8A951' }, { name: 'Booking.com', value: 28, color: '#1A1A2E' },
  { name: 'Expedia', value: 15, color: '#E8D5B7' }, { name: 'Travel Agent', value: 12, color: '#B8952F' },
  { name: 'Corporate', value: 10, color: '#9ca3af' },
]

const roomPopularity = [
  { type: 'Royal Suite', bookings: 145 }, { type: 'Deluxe Ocean', bookings: 128 }, { type: 'Presidential', bookings: 98 },
  { type: 'Garden View', bookings: 112 }, { type: 'Penthouse', bookings: 76 }, { type: 'Family Suite', bookings: 104 },
]

const guestDemographics = [
  { age: '18-25', male: 120, female: 98 }, { age: '26-35', male: 340, female: 380 },
  { age: '36-45', male: 280, female: 260 }, { age: '46-55', male: 190, female: 175 },
  { age: '56-65', male: 140, female: 155 }, { age: '65+', male: 85, female: 95 },
]

const seasonalTrends = [
  { season: 'Winter', occupancy: 72, revenue: 320000 }, { season: 'Spring', occupancy: 82, revenue: 405000 },
  { season: 'Summer', occupancy: 92, revenue: 533000 }, { season: 'Fall', occupancy: 78, revenue: 338000 },
]

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function AnalyticsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-secondary">Analytics Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Comprehensive analytics and insights for your hotel.</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiCards.map((kpi) => (
          <motion.div key={kpi.label} variants={item} className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-3xl font-bold text-secondary mt-2">{kpi.value}</p>
                <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +2.3% vs last month
                </p>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Trend */}
      <motion.div variants={item} className="bg-white rounded-xl p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-secondary">Revenue Trend</h3>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-primary rounded" /> This Year</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-gray-300 rounded" /> Last Year</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={revenueTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }} formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
            <Line type="monotone" dataKey="revenue" stroke="#C8A951" strokeWidth={3} dot={{ r: 4, fill: '#C8A951' }} name="This Year" />
            <Line type="monotone" dataKey="lastYear" stroke="#d1d5db" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Last Year" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Booking Sources */}
        <motion.div variants={item} className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="font-semibold text-secondary mb-4">Booking Sources</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={bookingSources} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" stroke="none">
                {bookingSources.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {bookingSources.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                {s.name} ({s.value}%)
              </div>
            ))}
          </div>
        </motion.div>

        {/* Room Popularity */}
        <motion.div variants={item} className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="font-semibold text-secondary mb-4">Room Popularity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roomPopularity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="type" tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }} />
              <Bar dataKey="bookings" fill="#C8A951" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Demographics & Seasonal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Guest Demographics */}
        <motion.div variants={item} className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="font-semibold text-secondary mb-4">Guest Demographics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={guestDemographics}>
              <defs>
                <linearGradient id="maleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C8A951" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C8A951" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="femaleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1A1A2E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1A1A2E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="age" tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }} />
              <Area type="monotone" dataKey="male" stroke="#C8A951" strokeWidth={2} fill="url(#maleGrad)" name="Male" />
              <Area type="monotone" dataKey="female" stroke="#1A1A2E" strokeWidth={2} fill="url(#femaleGrad)" name="Female" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Seasonal Trends */}
        <motion.div variants={item} className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="font-semibold text-secondary mb-4">Seasonal Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={seasonalTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="season" tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }} formatter={(value, name) => name === 'revenue' ? [`$${Number(value).toLocaleString()}`, 'Revenue'] : [`${value}%`, 'Occupancy']} />
              <Legend />
              <Bar name="Occupancy %" dataKey="occupancy" fill="#C8A951" radius={[4, 4, 0, 0]} />
              <Bar name="Revenue ($)" dataKey="revenue" fill="#1A1A2E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  )
}

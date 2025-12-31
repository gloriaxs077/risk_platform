import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, StatusLight, Button } from '../components/ui';
import { RiskLevel } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ArrowUpRight, ShieldCheck, Activity, AlertTriangle } from 'lucide-react';

const mockTrendData = [
  { name: 'Day-6', events: 12, redObjects: 1 },
  { name: 'Day-5', events: 18, redObjects: 1 },
  { name: 'Day-4', events: 10, redObjects: 0 },
  { name: 'Day-3', events: 25, redObjects: 2 },
  { name: 'Day-2', events: 32, redObjects: 2 },
  { name: 'Yesterday', events: 45, redObjects: 3 },
  { name: 'Today', events: 38, redObjects: 3 },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToDetail = () => {
    navigate('/monitor');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Risk Overview Cards (4 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Platform Risk Index */}
        <Card className="relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-gray-700">全平台风险指数</h3>
            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">过去 24 小时</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <div className="text-4xl font-bold text-primary tracking-tight">72</div>
              <div className="text-xs text-text-secondary mt-1">当前处于 <span className="font-semibold text-orange-500">中风险区间</span> (60–80)</div>
            </div>
            {/* Simple CSS Ring Chart Representation */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-blue-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                <path className="text-primary" strokeDasharray="72, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
              <div className="absolute text-sm font-bold text-gray-700">72%</div>
            </div>
          </div>
        </Card>

        {/* Card 2: Red Light Objects */}
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-gray-700">当前红灯监控对象</h3>
            <div className="animate-pulse"><StatusLight level={RiskLevel.HIGH} /></div>
          </div>
          <div className="text-4xl font-bold text-risk-high tracking-tight">3</div>
          <div className="text-xs text-text-secondary mt-2 truncate">
            <span className="font-medium text-gray-600">TOP1:</span> 维保日期监控 · <span className="font-medium text-gray-600">TOP2:</span> 活动额度监控
          </div>
        </Card>

        {/* Card 3: New Risk Events */}
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-gray-700">近 24 小时新增风险事件</h3>
            <Activity size={16} className="text-gray-400" />
          </div>
          <div className="text-4xl font-bold text-gray-900 tracking-tight">38</div>
          <div className="text-xs text-text-secondary mt-2 flex gap-3">
             <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>处理中: <span className="font-medium text-blue-600">21</span></span>
             <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>待处理: <span className="font-medium text-orange-500">7</span></span>
          </div>
        </Card>

        {/* Card 4: Potential Impact */}
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-gray-700">潜在收入影响 (预估)</h3>
            <AlertTriangle size={16} className="text-gray-400" />
          </div>
          <div className="text-4xl font-bold text-gray-900 tracking-tight">¥ 421k</div>
          <div className="text-xs text-green-600 mt-2 flex items-center gap-1 bg-green-50 self-start px-2 py-0.5 rounded-md w-max">
            <ShieldCheck size={12} />
            已避免损失: ¥ 163k
          </div>
        </Card>
      </div>

      {/* 2. Monitoring Modules Area (Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module 1: Data Monitoring */}
        <MonitoringModuleCard 
          title="数据监控" 
          tags={['维保', '电子保卡']}
          riskLevel={RiskLevel.HIGH}
          stats={{ exceptions: 161, new: 27, highRisk: 12 }}
          objects={[
            { name: "维保日期监控", count: 134, new: 27, level: RiskLevel.HIGH, onClick: handleNavigateToDetail },
            { name: "电子保卡监控", count: 27, new: 0, level: RiskLevel.MEDIUM, onClick: handleNavigateToDetail }
          ]}
        />

        {/* Module 2: Business Config */}
        <MonitoringModuleCard 
          title="业务配置监控" 
          tags={['活动额度']}
          riskLevel={RiskLevel.MEDIUM}
          stats={{ exceptions: 45, new: 5, highRisk: 2 }}
          objects={[
            { name: "活动额度监控", count: 32, new: 4, level: RiskLevel.MEDIUM, onClick: handleNavigateToDetail },
            { name: "可授予监控", count: 13, new: 1, level: RiskLevel.LOW, onClick: handleNavigateToDetail }
          ]}
        />

        {/* Module 3: Equity Activation */}
        <MonitoringModuleCard 
          title="权益生效监控" 
          tags={['订单']}
          riskLevel={RiskLevel.MEDIUM} 
          isYellow
          stats={{ exceptions: 12, new: 2, highRisk: 0 }}
          objects={[
            { name: "未生效订单监控", count: 12, new: 2, level: RiskLevel.LOW, onClick: handleNavigateToDetail }
          ]}
        />

        {/* Module 4: Exception Import */}
        <MonitoringModuleCard 
          title="例外导入监控" 
          tags={['设备信息']}
          riskLevel={RiskLevel.LOW}
          stats={{ exceptions: 0, new: 0, highRisk: 0 }}
          objects={[
            { name: "设备信息导入监控", count: 0, new: 0, level: RiskLevel.NORMAL, onClick: handleNavigateToDetail },
            { name: "电子保卡导入监控", count: 0, new: 0, level: RiskLevel.NORMAL, onClick: handleNavigateToDetail }
          ]}
        />
      </div>

      {/* 3. Global Trend Chart */}
      <Card title="最近 7 天风险事件趋势" subTitle="从宏观趋势识别异常波动，并关联到具体监控模块和监控对象" className="min-h-[350px]">
        <div className="h-[280px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0052CC" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#0052CC" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3E6EE" />
              <XAxis dataKey="name" tick={{fontSize: 12, fill: '#6B7280'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fontSize: 12, fill: '#6B7280'}} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E3E6EE', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontSize: '12px', fontWeight: 500 }}
              />
              <Area type="monotone" dataKey="events" stroke="#0052CC" strokeWidth={2} fillOpacity={1} fill="url(#colorEvents)" name="风险事件数" />
              <Area type="monotone" dataKey="redObjects" stroke="#EF4444" strokeWidth={2} fill="none" name="红灯监控对象数" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

// Sub-component for Module Cards
const MonitoringModuleCard: React.FC<{
  title: string;
  tags: string[];
  riskLevel: RiskLevel;
  isYellow?: boolean;
  stats: { exceptions: number; new: number; highRisk: number };
  objects: Array<{ name: string; count: number; new: number; level: RiskLevel; onClick: () => void }>;
}> = ({ title, tags, riskLevel, isYellow, stats, objects }) => {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {tags.map(t => <span key={t} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded">{t}</span>)}
          </div>
        </div>
        <StatusLight level={isYellow ? RiskLevel.WARNING : riskLevel} />
      </div>

      {/* Middle Stats */}
      <div className="flex items-center justify-between mb-4 bg-gray-50/50 p-3 rounded-xl">
        <div className="space-y-1">
          <div className="text-xs text-gray-500">异常总数</div>
          <div className="text-xl font-bold text-gray-900">{stats.exceptions}</div>
        </div>
        <div className="h-8 w-px bg-gray-200"></div>
        <div className="space-y-1">
          <div className="text-xs text-gray-500">今日新增</div>
          <div className="text-xl font-bold text-blue-600">+{stats.new}</div>
        </div>
        <div className="h-8 w-px bg-gray-200"></div>
        <div className="space-y-1">
          <div className="text-xs text-gray-500">高风险事件</div>
          <div className="text-xl font-bold text-red-500">{stats.highRisk}</div>
        </div>
      </div>

      {/* Object List */}
      <div className="space-y-3 flex-1">
        {objects.map((obj, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-xl p-3 flex items-center justify-between hover:border-blue-200 cursor-pointer group transition-colors" onClick={obj.onClick}>
            <div className="flex items-center gap-3">
              <StatusLight level={obj.level} size="sm" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary">{obj.name}</span>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <span className="text-gray-500">总异常: <span className="font-semibold text-gray-900">{obj.count}</span></span>
              <span className="text-gray-500">新增: <span className={`font-semibold ${obj.new > 0 ? 'text-blue-600' : 'text-gray-900'}`}>{obj.new}</span></span>
              <Button variant="link" size="sm" className="hidden group-hover:inline-flex">查看</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
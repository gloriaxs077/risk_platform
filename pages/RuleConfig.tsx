import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from '../components/ui';
import { RiskLevel } from '../types';
import { Info, Edit3, Save } from 'lucide-react';

export const RuleConfig: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">规则配置中心</h2>
          <p className="text-sm text-text-secondary mt-1">配置不同监控对象在 SN 数量、收入金额、变化幅度等因子下，如何触发风险告警。</p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/')}>返回大屏</Button>
      </div>

      {/* Main Config Editor Area */}
      <Card>
        {/* Selector Bar */}
        <div className="border-b border-gray-100 pb-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-sm font-semibold text-gray-700">选择监控对象:</label>
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-w-[240px]">
              <option>数据监控 / 维保日期监控</option>
              <option>数据监控 / 电子保卡监控</option>
              <option>业务配置 / 活动额度监控</option>
            </select>
          </div>
          
          <div className="mt-4 bg-yellow-50 text-yellow-800 text-sm px-4 py-3 rounded-lg flex items-start gap-3">
            <Info size={18} className="mt-0.5 flex-shrink-0" />
            <p>规则因子统一为: <strong>SN 数量</strong>、<strong>收入金额</strong>、<strong>变化幅度</strong> (三选一或多选组合)。不同监控对象可以使用不同阈值，但共用同一套方法论模型。</p>
          </div>
        </div>

        {/* 3 Columns Rule Editor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RuleEditorColumn 
            title="低风险触发条件" 
            riskLevel={RiskLevel.LOW}
            logic="SN 数量 > 10 或 日增幅 > 10%"
          />
          <RuleEditorColumn 
            title="中风险触发条件" 
            riskLevel={RiskLevel.MEDIUM}
            logic="SN 数量 > 50 或 收入 > ¥5,000"
          />
          <RuleEditorColumn 
            title="高风险触发条件" 
            riskLevel={RiskLevel.HIGH}
            logic="SN 数量 > 100 或 收入 > ¥10,000 或 日增幅 > 50%"
          />
        </div>

        <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
          <Button variant="ghost">重置更改</Button>
          <Button>保存配置 <Save size={14} className="ml-2"/></Button>
        </div>
      </Card>

      {/* Rules Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Example Overview Card 1 */}
         <OverviewCard 
            title="维保日期监控规则" 
            updated="10 mins ago by Admin" 
            preference="高风险偏紧"
            prefColor="red"
         />
         {/* Example Overview Card 2 */}
         <OverviewCard 
            title="电子保卡监控规则" 
            updated="2 days ago by System" 
            preference="中风险严控"
            prefColor="orange"
         />
         {/* Example Overview Card 3 */}
         <OverviewCard 
            title="活动额度监控规则" 
            updated="1 week ago by User" 
            preference="默认配置"
            prefColor="green"
         />
      </div>
    </div>
  );
};

// --- Sub-components for Rule Config ---

const RuleEditorColumn: React.FC<{ title: string; riskLevel: RiskLevel; logic: string }> = ({ title, riskLevel, logic }) => {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
        <Badge text={riskLevel} type={riskLevel} />
      </div>
      
      {/* Mock Logic Builder UI */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-3 shadow-sm mb-3">
         <div className="text-sm font-medium text-gray-700 leading-relaxed font-mono">
           {logic}
         </div>
      </div>
      
      <div className="text-xs text-gray-500 mb-4">适用: 数据监控 / 维保日期监控</div>

      <button className="flex items-center justify-center gap-2 w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 hover:bg-white hover:text-primary hover:border-primary transition-colors">
        <Edit3 size={12} /> 编辑条件
      </button>
    </div>
  );
};

const OverviewCard: React.FC<{ title: string; updated: string; preference: string; prefColor: string }> = ({ title, updated, preference, prefColor }) => {
  const colorClass = prefColor === 'red' ? 'text-red-600 bg-red-50' : prefColor === 'orange' ? 'text-orange-600 bg-orange-50' : 'text-green-600 bg-green-50';
  
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <div className="text-xs text-gray-500 mb-4">
        <div className="mb-1">包含因子: SN数, 金额, 增幅</div>
        <div>更新于: {updated}</div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${colorClass}`}>{preference}</span>
        <Button variant="link" size="sm">配置</Button>
      </div>
    </Card>
  );
};
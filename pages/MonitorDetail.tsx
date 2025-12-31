import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, StatusLight, Badge, StatusBadge } from '../components/ui';
import { RiskLevel, ProcessStatus } from '../types';
import { ChevronDown, ChevronRight, ExternalLink, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const MonitorDetail: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'processing' | 'closed'>('all');

  // Navigation handlers
  const goToRules = () => navigate('/rules');
  const goToProcess = () => navigate('/process');

  return (
    <div className="space-y-6">
      {/* 1. Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-text-secondary mb-1">监控对象详情工作台 / 数据监控 / 维保日期监控</div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            维保日期监控
            <span className="text-sm font-normal text-text-secondary bg-gray-100 px-2 py-0.5 rounded-full">数据监控模块</span>
          </h2>
          <p className="text-xs text-text-secondary mt-1">按模块和监控对象维度，下钻查看：风险事件中心、风险规则、风险处理流程配置结果。</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => navigate('/')}>返回大屏</Button>
          <Button onClick={goToRules}>查看规则配置中心 <ArrowRight size={14} className="ml-2" /></Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 2. Left Sidebar: Module Tree */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <Card className="h-full min-h-[600px] p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-semibold text-sm text-gray-700">监控对象列表</h3>
            </div>
            <div className="p-3 space-y-4">
              <SidebarModuleGroup title="数据监控" isOpen={true}>
                <SidebarItem name="维保日期监控" risk={RiskLevel.HIGH} active />
                <SidebarItem name="电子保卡监控" risk={RiskLevel.MEDIUM} />
              </SidebarModuleGroup>
              <SidebarModuleGroup title="业务配置监控" isOpen={false}>
                <SidebarItem name="活动额度监控" risk={RiskLevel.MEDIUM} />
                <SidebarItem name="可授予监控" risk={RiskLevel.LOW} />
              </SidebarModuleGroup>
              <SidebarModuleGroup title="权益生效监控" isOpen={false}>
                <SidebarItem name="未生效订单" risk={RiskLevel.LOW} />
              </SidebarModuleGroup>
              <SidebarModuleGroup title="例外导入监控" isOpen={false}>
                <SidebarItem name="设备导入监控" risk={RiskLevel.NORMAL} />
              </SidebarModuleGroup>
            </div>
          </Card>
        </div>

        {/* 3. Main Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* Top: Current Object Overview */}
          <Card className="bg-gradient-to-r from-white to-red-50/30">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Risk Level Indicator */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white flex flex-col items-center justify-center shadow-lg shadow-red-500/30 flex-shrink-0">
                <span className="text-[10px] font-bold opacity-80">RISK</span>
                <span className="text-xl font-bold tracking-wider">HIGH</span>
              </div>
              
              {/* Text Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">维保日期监控</h3>
                  <Badge text="高风险 (Red)" type={RiskLevel.HIGH} />
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  <span className="font-semibold text-gray-700">自动诊断：</span> 过去 2 小时内维保日期异常 SN 数显著高于近 7 日均值 (Z-Score > 3.5)。
                </p>
                
                {/* 3 Mini KPIs */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-red-100">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">134</div>
                    <div className="text-xs text-red-500 font-medium">近30分新增: 27</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">¥ 213k</div>
                    <div className="text-xs text-green-600 font-medium">已挽回: ¥ 48k</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">58</div>
                    <div className="text-xs text-gray-500">主要命中: 高风险规则</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Middle: Risk Event Center (Table) */}
          <Card 
            title="风险事件中心" 
            subTitle="聚合【当前监控对象】下所有风险事件，支持按处理状态、风险等级、责任人、SLA 等维度筛选。"
            extra={
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 rounded-lg p-1 flex text-xs">
                  {['all', 'pending', 'processing', 'closed'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`px-3 py-1 rounded-md transition-all ${activeTab === tab ? 'bg-white shadow-sm text-primary font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {tab === 'all' ? '全部' : tab === 'pending' ? '待处理' : tab === 'processing' ? '处理中' : '已关闭'}
                    </button>
                  ))}
                </div>
                <Button variant="ghost" size="sm">导出 SN 明细</Button>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wide">
                    <th className="pb-3 pl-2">事件 ID</th>
                    <th className="pb-3">风险等级</th>
                    <th className="pb-3">状态</th>
                    <th className="pb-3">责任人</th>
                    <th className="pb-3 w-32">SLA 剩余</th>
                    <th className="pb-3 text-right">SN 数</th>
                    <th className="pb-3 text-right">收入影响</th>
                    <th className="pb-3 text-right">更新时间</th>
                    <th className="pb-3 text-center">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <TableRow 
                    id="EVT-2023-001" 
                    risk={RiskLevel.HIGH} 
                    status={ProcessStatus.PENDING} 
                    owner="运营A组" 
                    sla={20} 
                    sn={85} 
                    money="¥ 12,400" 
                    time="10 mins ago" 
                  />
                  <TableRow 
                    id="EVT-2023-002" 
                    risk={RiskLevel.HIGH} 
                    status={ProcessStatus.PROCESSING} 
                    owner="技术值班" 
                    sla={65} 
                    sn={42} 
                    money="¥ 5,800" 
                    time="45 mins ago" 
                  />
                  <TableRow 
                    id="EVT-2023-003" 
                    risk={RiskLevel.MEDIUM} 
                    status={ProcessStatus.CLOSED} 
                    owner="运营B组" 
                    sla={100} 
                    sn={7} 
                    money="¥ 900" 
                    time="2 hours ago" 
                  />
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Button variant="link" size="sm">查看更多历史事件</Button>
            </div>
          </Card>

          {/* Bottom: Rules & Process Split View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Rules Read-Only */}
            <Card title="风险规则" extra={<Button variant="link" size="sm" onClick={goToRules}>在规则中心查看 <ExternalLink size={12} className="ml-1"/></Button>}>
              <div className="bg-yellow-50 text-yellow-800 text-xs px-3 py-2 rounded-lg mb-4 flex items-center gap-2">
                <AlertCircle size={14} />
                规则修改请在规则配置中心进行，本页仅为只读展示。
              </div>
              <div className="space-y-3">
                <RuleItem level={RiskLevel.HIGH} desc="SN 数量 > 100 或 收入 > ¥10,000" />
                <RuleItem level={RiskLevel.MEDIUM} desc="SN 数量 > 50 或 收入 > ¥5,000" />
                <RuleItem level={RiskLevel.LOW} desc="SN 数量 > 10 或 日增幅 > 10%" />
              </div>
            </Card>

            {/* Right: Process Flow Read-Only */}
            <Card title="处理流程摘要" extra={<Button variant="link" size="sm" onClick={goToProcess}>在流程配置中编辑 <ExternalLink size={12} className="ml-1"/></Button>}>
              <div className="py-6 px-2 overflow-x-auto">
                <div className="flex items-center gap-2 min-w-max">
                  <ProcessNode text="异常触发" type="start" />
                  <ArrowRight size={16} className="text-gray-300" />
                  <ProcessNode text="规则判定" />
                  <ArrowRight size={16} className="text-gray-300" />
                  <ProcessNode text="运营承接" />
                  <ArrowRight size={16} className="text-gray-300" />
                  <ProcessNode text="通知+SLA" />
                  <ArrowRight size={16} className="text-gray-300" />
                  <ProcessNode text="闭环/升级" type="end" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 leading-relaxed">
                <span className="font-semibold text-gray-700">Meta:</span> 适用高风险 · 责任角色: 运营团队 · 默认 SLA: 24h · 超时自动升级至风控负责人。
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components for Page 2 ---

const SidebarModuleGroup: React.FC<{ title: string; isOpen?: boolean; children: React.ReactNode }> = ({ title, isOpen = false, children }) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <div>
      <div 
        className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2 cursor-pointer hover:text-primary"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </div>
      {open && <div className="space-y-1 pl-1">{children}</div>}
    </div>
  );
};

const SidebarItem: React.FC<{ name: string; risk: RiskLevel; active?: boolean }> = ({ name, risk, active }) => {
  return (
    <div className={`
      flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition-all
      ${active ? 'bg-white shadow-sm ring-1 ring-border text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}
    `}>
      <div className="flex items-center gap-2">
        <StatusLight level={risk} size="sm" />
        {name}
      </div>
      {risk === RiskLevel.HIGH && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 rounded">High</span>}
    </div>
  );
};

const TableRow: React.FC<{ id: string; risk: RiskLevel; status: ProcessStatus; owner: string; sla: number; sn: number; money: string; time: string }> = (props) => {
  // Color for SLA bar
  let slaColor = 'bg-green-500';
  if (props.sla < 30) slaColor = 'bg-red-500';
  else if (props.sla < 60) slaColor = 'bg-orange-500';

  return (
    <tr className="hover:bg-gray-50 group">
      <td className="py-3 pl-2 font-medium text-gray-900">{props.id}</td>
      <td className="py-3"><Badge text={props.risk} type={props.risk} /></td>
      <td className="py-3"><StatusBadge status={props.status} /></td>
      <td className="py-3 text-gray-600">{props.owner}</td>
      <td className="py-3 pr-4">
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
          <div className={`${slaColor} h-1.5 rounded-full`} style={{ width: `${props.sla}%` }}></div>
        </div>
        <div className="text-[10px] text-gray-400 text-right">{props.sla}% left</div>
      </td>
      <td className="py-3 text-right font-medium">{props.sn}</td>
      <td className="py-3 text-right text-gray-600">{props.money}</td>
      <td className="py-3 text-right text-gray-500 text-xs">{props.time}</td>
      <td className="py-3 text-center">
        <button className="text-primary hover:text-blue-700 text-xs font-medium">查看详情</button>
      </td>
    </tr>
  );
};

const RuleItem: React.FC<{ level: RiskLevel; desc: string }> = ({ level, desc }) => (
  <div className="border border-gray-100 rounded-lg p-3 bg-gray-50/50">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs font-semibold text-gray-500">
        {level === RiskLevel.HIGH ? '高风险规则' : level === RiskLevel.MEDIUM ? '中风险规则' : '低风险规则'}
      </span>
      <Badge text={level} type={level} />
    </div>
    <div className="text-sm text-gray-800 font-medium">{desc}</div>
  </div>
);

const ProcessNode: React.FC<{ text: string; type?: 'start' | 'end' | 'normal' }> = ({ text, type = 'normal' }) => {
  let border = 'border-gray-200';
  let bg = 'bg-white';
  if (type === 'start') { border = 'border-green-200'; bg = 'bg-green-50'; }
  if (type === 'end') { border = 'border-red-200'; bg = 'bg-red-50'; }

  return (
    <div className={`px-3 py-2 rounded-lg border ${border} ${bg} text-xs font-medium text-gray-700 shadow-sm whitespace-nowrap`}>
      {text}
    </div>
  );
};
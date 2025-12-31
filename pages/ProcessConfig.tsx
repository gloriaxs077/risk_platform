import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/ui';
import { ArrowRight, Settings, Plus, RotateCcw, Save } from 'lucide-react';

export const ProcessConfig: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">处理流程配置</h2>
          <p className="text-sm text-text-secondary mt-1">为每个监控对象配置异常触发后的处理流程，包括处理节点、责任人、SLA、通知方式。</p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/')}>返回大屏</Button>
      </div>

      <Card>
        <div className="flex items-center gap-4 mb-2">
           <label className="text-sm font-semibold text-gray-700">选择监控对象:</label>
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-w-[240px]">
              <option>数据监控 / 维保日期监控</option>
              <option>数据监控 / 电子保卡监控</option>
            </select>
            <span className="text-xs text-gray-400">可复用模板，也可为单个监控对象定制流程。</span>
        </div>
      </Card>

      {/* 3 Column Layout */}
      <div className="grid grid-cols-12 gap-6 h-[600px]">
        
        {/* Col 1: Node Library (Static Demo) */}
        <div className="col-span-2 bg-white rounded-2xl border border-border p-4 flex flex-col gap-3">
          <h3 className="font-semibold text-sm text-gray-900 mb-2">流程节点库</h3>
          <div className="text-[10px] text-gray-400 mb-4">此区域展示可用节点类型</div>
          {['开始节点', '条件判断', '责任人分配', '通知发送', 'SLA 设置', '升级节点', '结束节点'].map((node, i) => (
            <div key={i} className="p-3 border border-dashed border-gray-300 rounded-lg text-xs text-gray-600 bg-gray-50 cursor-grab hover:bg-white hover:border-primary hover:text-primary hover:shadow-sm transition-all text-center">
              {node}
            </div>
          ))}
        </div>

        {/* Col 2: Canvas */}
        <div className="col-span-7 bg-gray-50 rounded-2xl border border-border relative overflow-hidden flex flex-col">
          <div className="bg-white border-b border-border px-6 py-4">
             <h3 className="font-bold text-gray-800">维保日期高风险默认流程 (Template)</h3>
             <p className="text-xs text-gray-500 mt-1">高风险事件触发后，自动分配运营责任人并在 24 小时内闭环处理。</p>
          </div>
          
          {/* Visual Flow Representation */}
          <div className="flex-1 p-8 flex items-center justify-center overflow-auto">
             <div className="flex flex-col items-center gap-6">
                
                {/* Flow Visual */}
                <div className="flex items-center gap-4">
                   <CanvasNode text="异常触发 (High)" type="start" />
                   <ArrowRight className="text-gray-300" />
                   <CanvasNode text="规则引擎判定" />
                   <ArrowRight className="text-gray-300" />
                   <CanvasNode text="分配责任人: 运营" active />
                   <ArrowRight className="text-gray-300" />
                   <CanvasNode text="通知: IM + 邮件" />
                   <ArrowRight className="text-gray-300" />
                   <CanvasNode text="SLA: 24h" />
                   <ArrowRight className="text-gray-300" />
                   <CanvasNode text="闭环 / 升级" type="end" />
                </div>

                <div className="text-xs text-gray-400 mt-12 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                  画布预览模式 · 点击节点编辑属性
                </div>
             </div>
          </div>
        </div>

        {/* Col 3: Properties Panel */}
        <div className="col-span-3 bg-white rounded-2xl border border-border p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <Settings size={16} className="text-primary" />
            <h3 className="font-semibold text-sm text-gray-900">节点属性</h3>
          </div>

          <div className="flex-1 space-y-5">
             <div className="space-y-1">
               <label className="text-xs font-medium text-gray-500">节点名称</label>
               <input type="text" defaultValue="分配责任人: 运营团队" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-primary outline-none" />
             </div>

             <div className="space-y-1">
               <label className="text-xs font-medium text-gray-500">责任角色</label>
               <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-white outline-none">
                 <option>运营负责人</option>
                 <option>技术值班</option>
                 <option>风控专员</option>
               </select>
             </div>

             <div className="space-y-1">
               <label className="text-xs font-medium text-gray-500">优先级</label>
               <div className="flex gap-2">
                 <button className="flex-1 py-1.5 text-xs bg-red-50 text-red-600 rounded border border-red-100 font-medium">High</button>
                 <button className="flex-1 py-1.5 text-xs bg-white text-gray-500 rounded border border-gray-200 hover:bg-gray-50">Med</button>
                 <button className="flex-1 py-1.5 text-xs bg-white text-gray-500 rounded border border-gray-200 hover:bg-gray-50">Low</button>
               </div>
             </div>
             
             <div className="space-y-1">
               <label className="text-xs font-medium text-gray-500">SLA (Hours)</label>
               <input type="number" defaultValue="24" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-primary outline-none" />
             </div>
          </div>

          <div className="mt-auto pt-4 flex flex-col gap-3">
            <Button className="w-full justify-center">保存配置</Button>
            <Button variant="ghost" className="w-full justify-center">重置</Button>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Sub-component ---
const CanvasNode: React.FC<{ text: string; type?: 'start' | 'end' | 'normal'; active?: boolean }> = ({ text, type = 'normal', active }) => {
  let style = 'bg-white border-gray-200 text-gray-700';
  if (type === 'start') style = 'bg-green-50 border-green-200 text-green-700';
  if (type === 'end') style = 'bg-red-50 border-red-200 text-red-700';
  if (active) style = 'bg-blue-50 border-primary text-primary shadow-md ring-2 ring-blue-100';

  return (
    <div className={`
      px-4 py-3 rounded-full border ${style} text-xs font-bold shadow-sm whitespace-nowrap transition-all cursor-pointer relative
      ${!active && 'hover:-translate-y-1 hover:shadow-md'}
    `}>
      {text}
      {active && <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white"></div>}
    </div>
  );
}

import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { Bill } from '../../../data/recurringBills/billsData';


const BillRow: React.FC<{ bill: Bill }> = ({ bill }) => {
  const Icon = bill.icon;
  
  return (
    <div className="grid grid-cols-12 items-center py-5 px-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0">
      <div className="col-span-6 flex items-center gap-4">
        <div className={`${bill.iconBg} p-2.5 rounded-full text-white`}>
          <Icon size={18} />
        </div>
        <span className="font-bold text-gray-800 tracking-tight">{bill.title}</span>
      </div>

      <div className="col-span-4 flex items-center gap-2">
        <span className={`text-sm ${bill.status === 'paid' ? 'text-[#479186] font-medium' : 'text-gray-400'}`}>
          {bill.dueDate}
        </span>
        {bill.status === 'paid' && <CheckCircle2 size={16} className="text-[#479186]" />}
        {bill.status === 'overdue' && <AlertCircle size={16} className="text-[#C64B3F]" />}
      </div>

      <div className={`col-span-2 text-right font-bold tracking-tight ${bill.status === 'overdue' ? 'text-[#C64B3F]' : 'text-gray-800'}`}>
        ${bill.amount.toFixed(2)}
      </div>
    </div>
  );
};

export default BillRow;
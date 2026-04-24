import React from 'react';

const StatusBadge = ({ status }) => {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const statusConfig = {
    in_progress: {
      label: 'Active Work',
      styles: 'bg-blue-100 text-blue-800',
    },
    awaiting_payment: {
      label: 'Awaiting Payment',
      styles: 'bg-yellow-100 text-yellow-800',
    },
    funded: {
      label: 'Funded',
      styles: 'bg-green-100 text-green-800',
    },
    awaiting_approval: {
      label: 'Awaiting Approval',
      styles: 'bg-purple-100 text-purple-800',
    },
    completed: {
      label: 'Completed',
      styles: 'bg-green-800 text-white',
    },
    default: {
        label: status,
        styles: 'bg-gray-100 text-gray-800',
    }
  };

  const config = statusConfig[status] || statusConfig.default;

  return (
    <span className={`${base} ${config.styles}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;

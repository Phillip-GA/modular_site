/* Milano Labs V6.0 - Shared React Components */

// Virtual Assistant Link Component
window.VirtualAssistantLink = ({ title, description, className = "" }) => {
  return React.createElement('div', {
    className: `bg-gray-700 text-white p-4 rounded-lg flex items-center justify-between ${className}`
  }, [
    React.createElement('div', { key: 'content' }, [
      React.createElement('h3', { 
        key: 'title',
        className: 'font-medium mb-1' 
      }, title || 'Need help?'),
      React.createElement('p', { 
        key: 'desc',
        className: 'text-sm text-gray-300' 
      }, description || 'Ask the Virtual Assistant for guidance and support')
    ]),
    React.createElement('div', {
      key: 'button',
      className: 'bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600 transition-colors',
      onClick: () => {
        // Navigate to assistant page or open chat
        window.location.hash = '#assistant';
      }
    }, [
      React.createElement('div', {
        key: 'button-content',
        className: 'flex items-center'
      }, [
        React.createElement('span', { key: 'icon', className: 'mr-2' }, '💬'),
        React.createElement('span', { key: 'text' }, 'Ask Assistant')
      ])
    ])
  ]);
};

// Metric Card Component
window.MetricCard = ({ title, value, unit, trend, icon, color = "blue" }) => {
  const colorClasses = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400',
    red: 'text-red-400'
  };

  return React.createElement('div', {
    className: 'bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700 metric-card'
  }, [
    React.createElement('h3', {
      key: 'title',
      className: 'font-medium mb-3 text-gray-200'
    }, title),
    React.createElement('div', {
      key: 'content',
      className: 'h-24 flex items-center justify-center bg-gray-700 rounded'
    }, [
      React.createElement('div', {
        key: 'metric',
        className: 'text-center'
      }, [
        React.createElement('div', {
          key: 'value',
          className: `text-3xl font-bold ${colorClasses[color] || colorClasses.blue} mb-1 metric-value`
        }, value),
        React.createElement('div', {
          key: 'unit',
          className: 'text-sm text-gray-400'
        }, unit)
      ])
    ])
  ]);
};

// Status Badge Component
window.StatusBadge = ({ status, type = "default" }) => {
  const statusClasses = {
    active: 'status-active',
    pending: 'status-pending',
    inactive: 'status-inactive'
  };

  return React.createElement('span', {
    className: `status-badge ${statusClasses[type] || 'status-badge'}`
  }, status);
};

// Progress Bar Component
window.ProgressBar = ({ progress, color = "blue", height = "h-2" }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500'
  };

  return React.createElement('div', {
    className: `w-full bg-gray-600 rounded-full ${height} progress-bar`
  }, [
    React.createElement('div', {
      key: 'fill',
      className: `${colorClasses[color] || colorClasses.blue} ${height} rounded-full progress-fill`,
      style: { width: `${progress}%` }
    })
  ]);
};

// Phase Card Component
window.PhaseCard = ({ number, title, description, color = "blue", active = false }) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-900', border: 'border-blue-700', text: 'text-blue-200', desc: 'text-blue-300' },
    green: { bg: 'bg-green-900', border: 'border-green-700', text: 'text-green-200', desc: 'text-green-300' },
    purple: { bg: 'bg-purple-900', border: 'border-purple-700', text: 'text-purple-200', desc: 'text-purple-300' },
    orange: { bg: 'bg-orange-900', border: 'border-orange-700', text: 'text-orange-200', desc: 'text-orange-300' }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return React.createElement('div', {
    className: `${colors.bg} p-3 rounded-lg border ${colors.border} phase-card ${active ? 'phase-card-' + color : ''}`
  }, [
    React.createElement('div', {
      key: 'header',
      className: 'text-center mb-2'
    }, [
      React.createElement('div', {
        key: 'number',
        className: `w-8 h-8 ${colors.bg.replace('bg-', 'bg-').replace('-900', '-700')} rounded-full flex items-center justify-center mx-auto`
      }, [
        React.createElement('span', {
          key: 'num',
          className: `${colors.text} font-bold text-sm`
        }, number)
      ]),
      React.createElement('h4', {
        key: 'title',
        className: `font-medium ${colors.text} mt-1 text-sm`
      }, title)
    ]),
    React.createElement('p', {
      key: 'desc',
      className: `text-xs ${colors.desc}`
    }, description)
  ]);
};

// Loading Spinner Component
window.LoadingSpinner = ({ size = "default", text = "" }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  return React.createElement('div', {
    className: 'flex items-center justify-center'
  }, [
    React.createElement('div', {
      key: 'spinner',
      className: `loading-spinner ${sizeClasses[size] || sizeClasses.default}`
    }),
    text && React.createElement('span', {
      key: 'text',
      className: 'text-gray-400 ml-3'
    }, text)
  ]);
};

// Data Table Component
window.DataTable = ({ headers, rows, className = "" }) => {
  return React.createElement('div', {
    className: `bg-gray-800 rounded-lg border border-gray-700 overflow-x-auto data-table ${className}`
  }, [
    React.createElement('div', {
      key: 'table',
      className: 'min-w-full'
    }, [
      React.createElement('div', {
        key: 'header',
        className: 'grid text-sm font-medium text-gray-400 p-3 border-b border-gray-600',
        style: { gridTemplateColumns: `repeat(${headers.length}, 1fr)` }
      }, headers.map((header, index) => 
        React.createElement('div', { key: index }, header)
      )),
      React.createElement('div', {
        key: 'body',
        className: 'divide-y divide-gray-700'
      }, rows.map((row, rowIndex) =>
        React.createElement('div', {
          key: rowIndex,
          className: 'grid p-3 hover:bg-gray-700 table-row cursor-pointer',
          style: { gridTemplateColumns: `repeat(${headers.length}, 1fr)` }
        }, row.map((cell, cellIndex) =>
          React.createElement('div', {
            key: cellIndex,
            className: cellIndex === 0 ? 'font-medium text-gray-200' : 'text-gray-300'
          }, cell)
        ))
      ))
    ])
  ]);
};

// Button Component
window.Button = ({ 
  children, 
  variant = "primary", 
  size = "default", 
  onClick, 
  disabled = false,
  className = "" 
}) => {
  const variantClasses = {
    primary: 'btn-primary text-white',
    secondary: 'btn-secondary text-gray-300',
    outline: 'border border-gray-600 text-gray-300 hover:bg-gray-700'
  };

  const sizeClasses = {
    small: 'py-1 px-3 text-sm',
    default: 'py-2 px-4 text-sm',
    large: 'py-3 px-6 text-base'
  };

  return React.createElement('button', {
    className: `${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.default} rounded transition-all focus-ring ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`,
    onClick: disabled ? undefined : onClick,
    disabled
  }, children);
};

// Card Component
window.Card = ({ title, children, className = "", headerAction = null }) => {
  return React.createElement('div', {
    className: `bg-gray-800 rounded-lg border border-gray-700 p-4 content-card ${className}`
  }, [
    title && React.createElement('div', {
      key: 'header',
      className: 'flex justify-between items-center mb-4'
    }, [
      React.createElement('h3', {
        key: 'title',
        className: 'font-medium text-gray-200'
      }, title),
      headerAction && React.createElement('div', {
        key: 'action'
      }, headerAction)
    ]),
    React.createElement('div', {
      key: 'content'
    }, children)
  ]);
};

// Alert Component
window.Alert = ({ type = "info", title, message, dismissible = false, onDismiss }) => {
  const typeClasses = {
    info: { bg: 'bg-blue-900', border: 'border-blue-600', text: 'text-blue-200', icon: 'ℹ️' },
    success: { bg: 'bg-green-900', border: 'border-green-600', text: 'text-green-200', icon: '✅' },
    warning: { bg: 'bg-yellow-900', border: 'border-yellow-600', text: 'text-yellow-200', icon: '⚠️' },
    error: { bg: 'bg-red-900', border: 'border-red-600', text: 'text-red-200', icon: '❌' }
  };

  const styles = typeClasses[type] || typeClasses.info;

  return React.createElement('div', {
    className: `${styles.bg} border ${styles.border} rounded-lg p-4`
  }, [
    React.createElement('div', {
      key: 'content',
      className: 'flex items-start'
    }, [
      React.createElement('div', {
        key: 'icon',
        className: `${styles.bg.replace('bg-', 'bg-').replace('-900', '-800')} p-2 rounded-full mr-3 flex-shrink-0`
      }, [
        React.createElement('span', { key: 'emoji' }, styles.icon)
      ]),
      React.createElement('div', {
        key: 'text',
        className: 'flex-1'
      }, [
        title && React.createElement('h4', {
          key: 'title',
          className: `font-medium mb-1 ${styles.text}`
        }, title),
        React.createElement('p', {
          key: 'message',
          className: `text-sm ${styles.text}`
        }, message)
      ]),
      dismissible && React.createElement('button', {
        key: 'dismiss',
        className: `${styles.text} hover:opacity-75`,
        onClick: onDismiss
      }, '×')
    ])
  ]);
};

// Export components for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    VirtualAssistantLink: window.VirtualAssistantLink,
    MetricCard: window.MetricCard,
    StatusBadge: window.StatusBadge,
    ProgressBar: window.ProgressBar,
    PhaseCard: window.PhaseCard,
    LoadingSpinner: window.LoadingSpinner,
    DataTable: window.DataTable,
    Button: window.Button,
    Card: window.Card,
    Alert: window.Alert
  };
}
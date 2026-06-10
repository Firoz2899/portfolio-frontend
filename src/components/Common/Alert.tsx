import { createContext, useContext, useState } from 'react';
import { CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface IAlertContext {
 showAlert: (newAlert: IShowAlertProps) => void;
}

const AlertContext = createContext<IAlertContext>({
  showAlert: () => {}
});

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}

interface IShowAlertProps {
  type: "success" | "error" | "info" | "warning";
  message: string;
}

interface AlertProps {
  children: React.ReactNode;
}

export const AlertProvider : React.FC<AlertProps> = ({ children }) => {
  const [alert, setAlert] = useState<IShowAlertProps | null>(null);

  const showAlert = (newAlert: IShowAlertProps) => {
    setAlert(newAlert);
    setTimeout(() => setAlert(null), 5000);
  };

  const iconMap = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <AlertTriangle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  } as Record<string, React.JSX.Element>;

  const bgMap = {
    success: 'bg-green-50 border border-green-200 text-green-800',
    error: 'bg-red-50 border border-red-200 text-red-800',
    info: 'bg-blue-50 border border-blue-200 text-blue-800',
  } as Record<string, string>;

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {alert && (
        <div className="fixed top-5 right-5 z-[9999] animate-slide-in">
          <div
            className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${bgMap[alert.type]}`}
          >
            {iconMap[alert.type]}
            <span>{alert.message}</span>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

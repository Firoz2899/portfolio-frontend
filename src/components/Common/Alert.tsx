import { createContext, useContext, useState } from 'react';
import { CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { Toaster, toast, type ToasterProps } from "sonner";
import { useThemeMode } from '@/hooks';

interface IAlertContext {
 showAlert: (newAlert: IShowAlertProps) => void;
 showAlertMessage: (isSuccess: boolean, message: string) => void;
 showConfirmation: (props: IConfirmationAlertProps) => void;
}

const AlertContext = createContext<IAlertContext>({
  showAlert: () => {},
  showAlertMessage: () => {},
  showConfirmation: () => {}
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

interface IConfirmationAlertProps {
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

interface AlertProps {
  children: React.ReactNode;
}

export const AlertProvider : React.FC<AlertProps> = ({ children }) => {
  const {mode} = useThemeMode()
  const [alert, setAlert] = useState<IShowAlertProps | null>(null);

  const showAlert = (newAlert: IShowAlertProps) => {
    setAlert(newAlert);
    setTimeout(() => setAlert(null), 5000);
  };

  const showAlertMessage = (isSuccess: boolean, message: string) => {
    setAlert({
      type: isSuccess ? "success" : "error",
      message
    });
    setTimeout(() => setAlert(null), 5000);
  };

  const showConfirmation = ({
    title,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
  }: IConfirmationAlertProps) => {
    toast.warning(title, {
      action: {
        label: confirmLabel,
        onClick: onConfirm,
      },
      cancel: {
        label: cancelLabel,
        onClick: () => {},
      },
    });
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
    <AlertContext.Provider value={{ showAlert, showAlertMessage, showConfirmation }}>
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
      <Toaster theme={mode as ToasterProps['theme']} />
    </AlertContext.Provider>
  );
}

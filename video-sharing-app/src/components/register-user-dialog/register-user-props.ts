export interface RegisterUserProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: any) => Promise<boolean>;
}

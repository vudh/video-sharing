export interface ShareVideoProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: any) => Promise<boolean>;
}

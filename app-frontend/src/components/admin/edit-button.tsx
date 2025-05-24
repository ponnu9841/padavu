import { MdModeEditOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";

type EditButtonProps = {
  onClick: () => void;
};
export default function EditButton(props: EditButtonProps) {
  return (
    <Button onClick={props.onClick} size="icon" className="w-8 h-8 mr-2">
      <MdModeEditOutline />
    </Button>
  );
}

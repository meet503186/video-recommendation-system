import { IFormField } from "@/interfaces/FormField.interface";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const RenderFormField = (props: IFormField) => {
  const { inputType, control, name, label, placeholder } = props;

  switch (inputType) {
    case "input":
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    default:
      break;
  }
};

export default RenderFormField;

import * as ReactAriaDialog from "@/components/ReactAriaDialog";
import * as RadixDialog from "@/components/RadixDialog";
import { SimpleDialog } from "@/components/SimpleDialog";

export default function Home() {
  return (
    <div className="space-x-4">
      <ReactAriaDialog.Dialog>
        <ReactAriaDialog.DialogTrigger>
          Open React Aria Dialog
        </ReactAriaDialog.DialogTrigger>
        <ReactAriaDialog.DialogContent>
          <div
            style={{
              height: "1000px",
            }}
          ></div>
          <input placeholder="Focus Me" />
        </ReactAriaDialog.DialogContent>
      </ReactAriaDialog.Dialog>

      <RadixDialog.Dialog>
        <RadixDialog.DialogTrigger>Open Radix Dialog</RadixDialog.DialogTrigger>

        <RadixDialog.DialogContent>
          <div
            style={{
              height: "1000px",
            }}
          ></div>
          <input placeholder="Focus Me" />
        </RadixDialog.DialogContent>
      </RadixDialog.Dialog>
      <SimpleDialog>
        <div
          style={{
            height: "1000px",
          }}
        ></div>
        <input placeholder="Focus Me" />
      </SimpleDialog>
    </div>
  );
}

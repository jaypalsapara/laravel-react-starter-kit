import { cn } from "cn"
import { Loader2Icon } from "lucide-react"
import { Icon } from "@/components/ui/icon"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Icon node={Loader2Icon} data-slot="spinner" role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }

import { Button } from "@/components/ui/button"

export function ButtonDefault({Text, className}: {Text: string, className?: string}) {
  return <Button className={className}>{Text}</Button>
}

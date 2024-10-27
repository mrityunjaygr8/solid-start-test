import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authenticated/oink')({
  component: () => (
    <>
      <div>Hello /oink!</div>
      <Button>Click Me!</Button>
    </>
  ),
})

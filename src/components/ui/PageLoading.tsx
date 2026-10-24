import { Spinner } from './Spinner'

export function PageLoading() {
  return (
    <div role="status" className="flex min-h-[40vh] items-center justify-center gap-3 font-bold">
      <Spinner />
      Carregando…
    </div>
  )
}

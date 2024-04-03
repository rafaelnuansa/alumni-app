import { Container } from '@/components/container'
import { Header } from '@/components/header'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Container>
        <Header title='404 Not Found' subtitle='Sorry, the page you are looking for could not be found'></Header>
      <div className="flex flex-col items-center justify-center h-full py-5">
        <div className="max-w-md text-center">
        <Link href="/"  className="font-bold hover:underline"> Back to home
          </Link>
        </div>
      </div>
    </Container>
  )
}

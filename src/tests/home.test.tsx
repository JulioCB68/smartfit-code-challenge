import Home from '@/app/page'
import TanstackProvider from '@/providers/TanStackQuery'
import { render, screen } from '@testing-library/react'

const renderHomeComponent = () => {
  render(
    <TanstackProvider>
      <Home />
    </TanstackProvider>,
  )
}

describe('Home page render', () => {
  it('should render home page with correct content', () => {
    renderHomeComponent()

    expect(screen.getByText('REABERTURA SMART FIT')).toBeInTheDocument()
    expect(
      screen.getByText(
        'O horário de funcionamento das nossas unidades está seguindo os decretos de cada município. Por isso, confira aqui se a sua unidade está aberta e as medidas de segurança que estamos seguindo.',
      ),
    ).toBeInTheDocument()
  })

  it('should render form with correct fields', async () => {
    renderHomeComponent()

    const form = screen.getByRole('form')

    const radio = screen.getByRole('radio', { name: 'Manhã' })

    const checkbox = screen.getByRole('checkbox', {
      name: 'Exibir unidades fechadas',
    })

    expect(form).toBeInTheDocument()
    expect(radio).toBeInTheDocument()
    expect(checkbox).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggleable from './Toggleable'

describe('<Toggleable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Toggleable buttonLabel="show...">
        <div>
          toggleable content
        </div>
      </Toggleable>,
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('toggleable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('[data-testid=toggleable-content]')
    expect(div).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('[data-testid=toggleable-content]')
    expect(div).toBeVisible()
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('[data-testid=toggleable-content]')
    expect(div).not.toBeVisible()
  })
})

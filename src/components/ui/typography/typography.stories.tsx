import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui/typography/typography'

const meta = {
  title: 'Components/Typography',
  component: Typography,
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant={'large'}>Large</Typography>
      <Typography variant={'h1'}>H1</Typography>
      <Typography variant={'h2'}>H2</Typography>
      <Typography variant={'h3'}>H3</Typography>
      <Typography variant={'body1'}>Body 1</Typography>
      <Typography variant={'subtitle1'}>Subtitle 1</Typography>
      <Typography variant={'body2'}>Body 2</Typography>
      <Typography variant={'subtitle2'}>Subtitle 2</Typography>
      <Typography variant={'caption'}>Caption</Typography>
      <Typography variant={'overline'}>Overline</Typography>
      <Typography variant={'link1'}>Link 1</Typography>
      <Typography variant={'link2'}>Link 2</Typography>
    </div>
  ),
}
export const Large: Story = {
  args: {
    variant: 'large',
    children: 'Large',
  },
}
export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'H1',
  },
}
export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'H2',
  },
}

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'H3',
  },
}

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Body 1',
  },
}

export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    children: 'Subtitle 1',
  },
}

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Body 2',
  },
}

export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    children: 'Subtitle 2',
  },
}

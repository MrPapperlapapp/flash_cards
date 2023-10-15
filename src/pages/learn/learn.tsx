import { useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './learn.module.scss'

import { Button, Card, Typography } from '@/components'
import { RateCardForm, RateType } from '@/components/auth/rate-card/rate-card.tsx'
import { BackButton } from '@/components/ui/back-button/back-button.tsx'
import { useGetRandomCardQuery, useRateCardMutation } from '@/features/cards/model'
import { useGetDeckInfoQuery } from '@/features/packs/model/services'
export const Learn = () => {
  const [rateMode, setRateMode] = useState(false)

  const [rateCard] = useRateCardMutation()

  const params = useParams()
  const id = params.id as string
  const { data: pack } = useGetDeckInfoQuery({ id })
  const { data: card } = useGetRandomCardQuery({ id })

  const onSubmit = (data: RateType) => {
    setRateMode(false)
    rateCard({ packId: id, cardId: card!.id, grade: +data.grade })
  }

  return (
    <>
      <BackButton title={'Back to Packs List'} link={'/'} />
      <section className={s.root}>
        <Card className={s.content}>
          <Typography as="h1" variant="large">
            Learn {pack?.name}
          </Typography>
          <div className={s.question}>
            <Typography variant="body1">
              <b>Question:</b> {card?.question}
            </Typography>
            <Typography variant="body2" className={s.caption}>
              Count of attempts: {card?.shots}
            </Typography>
          </div>

          {rateMode ? (
            <div className={s.answer}>
              <Typography variant="body1">
                <b>Answer:</b> {card?.answer}
              </Typography>
              <Typography variant="body1" className={s.rate}>
                <b>Rate yourself:</b>
              </Typography>
              <RateCardForm onSubmit={onSubmit} />
            </div>
          ) : (
            <Button onClick={() => setRateMode(true)} fullWidth>
              Show Answer
            </Button>
          )}
        </Card>
      </section>
    </>
  )
}

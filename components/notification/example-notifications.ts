export type Notification = {
  isNew: boolean
  time: string
  title: string
}
export const exampleNotifications: Notification[] = [
  {
    isNew: true,
    time: '1 час назад',
    title: 'Следующий платеж у вас спишется через 1 день',
  },
  {
    isNew: true,
    time: '1 час назад',
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  },
  {
    isNew: true,
    time: '1 день назад',
    title: 'jsonplaceholder.typicode.com',
  },
  {
    isNew: false,
    time: '1 день назад',
    title: 'уведомление, извещение, внимание, сообщение, предупреждение, объявление',
  },
  {
    isNew: false,
    time: '1 день назад',
    title: 'Следующий платеж у вас спишется через 7 дней',
  },
]

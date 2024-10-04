// import { useState } from 'react'
// type Props = {
//   field: string
//   register: (field: string, options: { onBlur: () => void }) => any
//   trigger: (field: string) => void
// }
// export const useFormFieldError = ({ field, register, trigger }: Props) => {
//   const [touched, setTouched] = useState(false)
//
//   return {
//     inputProps: register(field, {
//       onBlur: () => {
//         setTouched(true)
//         trigger(field)
//       },
//     }),
//     touched,
//   }
// }

// const [touchedFields, setTouchedFields] = useState<{ email: boolean; password: boolean }>({
//   email: false,
//   password: false,
// })
//
// useEffect(() => {
//   trigger()
// }, [t, trigger])
//
// const handleBlurInt = (field: keyof FormFields) => {
//   setTouchedFields(prev => ({ ...prev, [field]: true }))
//   trigger(field)
// }

// const { inputProps: emailProps, touched: emailTouched } = useFormFieldError({
//   field: 'email',
//   register,
//   trigger,
// })
//
// const { inputProps: passwordProps, touched: passwordTouched } = useFormFieldError({
//   field: 'password',
//   register,
//   trigger,
// })

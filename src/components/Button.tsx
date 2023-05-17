import { PencilSimpleLine, Plus, Trash } from 'phosphor-react-native'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import theme from '@theme/index'
import clsx from 'clsx'

type Props = TouchableOpacityProps & {
  icon?: 'pencil' | 'trash' | 'add' | 'none'
  buttonStyle?: 'primary' | 'secondary'
  title: string
}

export default function Button({
  buttonStyle = 'primary',
  icon = 'none',
  title,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      className={clsx(
        'flex-row border items-center justify-center py-4 px-6 rounded-md',
        'bg-gray-200 border-gray-200 active:bg-gray-100 active:border-gray-100',
        {
          'bg-white border-gray-100 active:bg-gray-500':
            buttonStyle === 'secondary',
        },
      )}
      activeOpacity={1}
      {...rest}
    >
      {icon !== 'none' &&
        ((icon === 'add' && (
          <Plus
            color={clsx({
              [theme.colors.white]: buttonStyle === 'primary',
              [theme.colors.gray[100]]: buttonStyle === 'secondary',
            })}
            style={{ marginRight: 12 }}
            size={18}
          />
        )) ||
          (icon === 'pencil' && (
            <PencilSimpleLine
              color={clsx({
                [theme.colors.white]: buttonStyle === 'primary',
                [theme.colors.gray[100]]: buttonStyle === 'secondary',
              })}
              style={{ marginRight: 12 }}
              size={18}
            />
          )) ||
          (icon === 'trash' && (
            <Trash
              color={clsx({
                [theme.colors.white]: buttonStyle === 'primary',
                [theme.colors.gray[100]]: buttonStyle === 'secondary',
              })}
              style={{ marginRight: 12 }}
              size={18}
            />
          )))}
      <Text
        className={clsx('text-white text-sm font-nunito_bold', {
          'text-gray-100': buttonStyle === 'secondary',
        })}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

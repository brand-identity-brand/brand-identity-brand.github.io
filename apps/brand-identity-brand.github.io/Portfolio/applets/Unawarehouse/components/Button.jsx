import React, { forwardRef } from 'react'

const buttonStyle = {
  padding: 0,
  border: 0,
  color: 'inherit',
  background: 'inherit',
  cursor: 'pointer',
}

const Button = forwardRef(function AppletButton({
  style,
  type = 'button',
  ...props
}, ref) {
  return (
    <button
      {...props}
      data-applet-button=""
      ref={ref}
      style={{ ...buttonStyle, ...style }}
      type={type}
    />
  )
})

const ButtonSquare = forwardRef(function AppletButtonSquare({
  ...props
}, ref) {
  return (
    <Button
      {...props}
      data-applet-button-variant="square"
      ref={ref}
    />
  )
})

Button.Square = ButtonSquare

export default Button

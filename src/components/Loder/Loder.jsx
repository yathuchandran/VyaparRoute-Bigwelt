import { Backdrop } from '@mui/material'
import React from 'react'
import { Hourglass } from 'react-loader-spinner'
import {  Graygreen, secondaryColorTheme } from '../.././config'

export default function Loader({open,handleClose}) {
  return (
      <Backdrop
      sx={{
        color: "#fff",
        zIndex: 1500, // Set a higher value for maximum z-index
      }}
      open={open}
      onClick={handleClose}
    >
    <Hourglass
        visible={true}
        height="40"
        width="40"
        ariaLabel="hourglass-loading"
        wrapperStyle={{zIndex: 1500}}
        wrapperClass=""
        colors={[`${Graygreen}`, `${secondaryColorTheme}`]}
    />
  </Backdrop>
  )
}
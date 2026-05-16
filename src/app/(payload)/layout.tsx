import type { ServerFunctionClient } from 'payload'

import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import configPromise from '@payload-config'
import React from 'react'

import { importMap } from './admin/importMap.js'

import '@payloadcms/next/css'

export const metadata = {
  title: 'BusinessBARN Admin',
}

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return RootLayout({
    children,
    config: configPromise,
    importMap,
    serverFunction,
  })
}

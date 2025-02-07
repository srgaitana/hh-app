import '@/styles/globals.css';
export const metadata = {
  title: 'Healthy app',
  description: 'By Hex',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
